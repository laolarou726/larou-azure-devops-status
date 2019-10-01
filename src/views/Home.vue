<template>
  <v-container>
    <v-layout
            wrap
    >
      <v-alert
              color="info"
              text
      >
        <h3 class="headline">欢迎访问{{ this.$store.getters.config.siteName }}</h3>
        <div>
          {{ this.$store.getters.config.siteDescription }}
        </div>

        <v-divider
                class="my-4 info"
                style="opacity: 0.22"
        ></v-divider>

        <v-row
                align="center"
                no-gutters
        >
          <v-col class="grow">
            {{ this.$store.getters.config.siteSubDescription }}
          </v-col>
          <div class="flex-grow-1"></div>
          <v-col class="shrink">
            <v-btn
                    color="info"
                    outlined
                    to="/about"
            >
              关于我们
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
      <v-container class="pa-0 ma-0" fluid>
        <v-alert
                color="deep-grey"
                icon="mdi-bell"
                outlined
                text
        >
          当构建信息检索完成时，您可以通过点击左上角的"
          <v-icon>mdi-menu</v-icon>
          "按钮来查看历史构建列表，选择一个您需要检索的项目之后，将会跳转到该构建的详细信息。
        </v-alert>
        <v-alert
                :key="i"
                :type="item.type"
                prominent
                v-for="(item,i) in alerts"
        >
          <v-row align="center">
            <v-col class="grow">{{ item.message }}</v-col>
            <v-col class="shrink" v-if="item.action !== undefined">
              <v-btn @click="item.action">检视</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import AlertModel from "@/models/alertModel";
  import Vue from "vue";

  export default Vue.extend({
    computed: {
      alerts(): AlertModel[] {
        const arr = [];
        const result = this.$store.state.currentDevOpsData;

        if (result instanceof Error) {
          arr.push(new AlertModel("error", "无法获取编译记录，请尝试刷新页面或者联系系统管理员。", () => {
            window.open(`mailto:${this.$store.getters.config.adminMail}`);
          }));
        } else {
          if (result === null) {
            arr.push(new AlertModel("info", "正在拉取构建历史记录, 请稍等片刻"));
          } else {
            const isSucceed = result.value[0].result === "succeeded";

            arr.push(new AlertModel(isSucceed ? "success" : "error", `最新的构建状态：最新的一次构建发生于：${new Date(result.value[0].startTime)}，${isSucceed ? "构建成功" : "构建失败"}`, undefined));
            arr.push(new AlertModel("info", `查询到的编译历史记录总数：${result.count}个`, undefined));
          }
        }

        return arr;
      },
    },
  });
</script>
