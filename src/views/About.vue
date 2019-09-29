<template>
  <v-container>
    <v-layout wrap>
      <v-card class="pa-5 ma-5">
        <v-card-title>关于</v-card-title>
        <v-card-text>
          这是一个使用Vue.JS + Typescript + Vuetify 开发的Azure
          DevOps构建历史记录管理系统。目的是方便非团队内的成员检视构建情况和编译进度。同时您也可以检索详细的编译时间线以及编译使用的具体参数。后期可能会开源，希望大家多多滋兹我（跑
        </v-card-text>
        <v-card-actions>
          <v-btn
                  href="https://github.com/laolarou726"
                  color="primary"
                  raised
          >
            我的Github主页
          </v-btn>
          <div class="subtitle-2 pl-2">可以的话，请多给我砸一点小星星！！（厚颜无耻</div>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
  });
</script>
