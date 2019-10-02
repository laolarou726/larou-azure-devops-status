<template>
  <v-app>
    <v-card>
      <v-navigation-drawer
              :clipped="clipped"
              :mini-variant="miniVariant"
              app
              fixed
              v-model="drawer"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              构建列表
            </v-list-item-title>
            <v-list-item-subtitle>
              历史记录
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
                  :key="i"
                  :to="item.to + '/' + i"
                  @click="updateBuildIndex(i)"
                  exact
                  router
                  v-for="(item,i) in builds"
          >
            <v-list-item-action>
              <v-icon :color="item.success === null ? 'yellow darken-2' : item.success ? 'green' : 'red'">{{
                item.success === null ? "mdi-alert-circle" : item.success ? "mdi-check-circle" : "mdi-close-circle" }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"/>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar :clipped-left="clipped" app fixed>
        <v-app-bar-nav-icon :disabled="isLoading" @click.stop="drawer = !drawer"/>
        <v-btn @click.stop="miniVariant = !miniVariant" icon>
          <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
        </v-btn>
        <v-btn @click.stop="clipped = !clipped" icon>
          <v-icon>mdi-application</v-icon>
        </v-btn>
        <v-btn @click="switchDarkMode" icon>
          <v-icon>{{
            isDarkMode ? "mdi-brightness-5" : "mdi-brightness-2"
            }}
          </v-icon>
        </v-btn>
        <v-toolbar-title v-text="this.$store.getters.config.siteName"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
                :loading="isLoading"
                @click="updateBuildIndex(0)"
                router
                target="_blank"
                text
                to="/timeline/0"
        >
          <span class="mr-2">最新构建</span>
        </v-btn>
      </v-app-bar>
    </v-card>

    <v-content>
      <router-view/>
    </v-content>

    <v-card height="400px">
      <v-footer
              absolute
              padless
      >
        <v-card
                :color="color"
                class="text-center"
                flat
                tile
                width="100%"
        >
          <v-card-text>
            <v-btn
                    v-for="(link, i) in footerLinks"
                    :key="i"
                    :to="link.to"
                    class="mx-4"
                    icon
            >
              <v-icon size="24px">{{ link.icon }}</v-icon>
            </v-btn>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>{{ this.$store.getters.config.siteName }}</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script lang="ts">
  import DevOpsInfoHelper from "@/helper/HttpHelper";
  import StatusHelper from "@/helper/statusHelper";
  import AlertModel from "@/models/alertModel";
  import BuildListModel from "@/models/buildListModel";
  import {IDevOpsBuildModel} from "@/models/devOps/devOpsBuildModel";
  import Vue from "vue";
  import RandomHelper from "./helper/randomHelper";

  export default Vue.extend({
    name: "App",
    mounted() {
      DevOpsInfoHelper.Get<IDevOpsBuildModel>(
              `https://dev.azure.com/${this.$store.getters.config.organization}/${this.$store.getters.config.project}/_apis/build/builds`).then((result) => {
        this.$store.dispatch("updateDevOpsData", result);
        this.isLoading = false;
      }).catch((err) => {
        this.$store.dispatch("updateDevOpsData", err);
      });
    },
    data: () => ({
      footerLinks: [
        {
          icon: "mdi-home",
          to: "/",
        },
        {
          icon: "mdi-email",
          to: "",
        },
        {
          icon: "mdi-information",
          to: "/about",
        },
      ],
      items: [
        "default",
        "absolute",
        "fixed",
      ],
      isDarkMode: false,
      clipped: false,
      drawer: false,
      miniVariant: false,
      isLoading: true,
      devOpsData: {},
      alerts: [] as AlertModel[],
    }),
    computed: {
      builds(): BuildListModel[] {
        const arr: BuildListModel[] = [];
        const result = this.$store.state.currentDevOpsData;

        if (result != null) {
          (result as IDevOpsBuildModel).value.forEach((val) => {
            const title = `构建ID：#${val.buildNumber}`;

            const succeeded = StatusHelper.getStatus(val.status, val.result);

            arr.push(new BuildListModel(title, "/timeline", succeeded));
          });
        }

        return arr;
      },
      color(): string | null {
        return RandomHelper.randomSample([
          "amber accent-3",
          "light-green darken-2",
          "light-blue lighten-1",
          "red lighten-1",
          "lime lighten-1",
          "amber darken-3",
          "pink accent-1",
        ]);
      },
    },
    methods: {
      switchDarkMode(): void {
        this.isDarkMode = !this.isDarkMode;
        this.$vuetify.theme.dark = this.isDarkMode;
      },
      updateBuildIndex(buildIndex: number): void {
        this.$store.dispatch("updateBuildIndex", buildIndex);
      },
    },
  });
</script>
