<template>
    <v-container>
        <v-layout wrap>
            <v-container class="px-0 mx-0" fluid>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-card
                                :color="isSucceed === null ? 'yellow darken-2' : isSucceed ? 'green' : 'red'"
                                class="pa-2"
                                dark
                        >
                            <v-card-text class="white--text">
                                <v-row align="center" class="headline mb-2">
                                    <v-icon class="px-3">{{ isSucceed === null ? "mdi-alert-circle" :
                                        isSucceed ? "mdi-check-circle" : "mdi-close-circle" }}
                                    </v-icon>
                                    构建ID:#{{ buildId }}
                                </v-row>
                                以下是本次构建的详细信息：
                                <v-simple-table fixed-header height="218px">
                                    <template v-slot:default>
                                        <thead>
                                        <tr>
                                            <th class="text-left">清单项目</th>
                                            <th class="text-left">值</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr :key="i" v-for="([k, v], i) in detailsTableList">
                                            <td>{{ k }}</td>
                                            <td>{{ v }}</td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn :disabled="!isSucceed" :loading="!isArtifactLoadingComplete" text @click="downloadArtifact">下载本次构建</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-card
                                class="pa-2"
                                tile
                        >
                            <v-list rounded>
                                <v-subheader>构建摘要</v-subheader>
                                <v-list-item-group color="primary">
                                    <v-list-item
                                            :key="i"
                                            v-for="(item, i) in valueList"
                                    >
                                        <v-list-item-icon>
                                            <v-icon v-text="item.icon"></v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title v-text="item.title"></v-list-item-title>
                                            <v-spacer></v-spacer>
                                            {{ item.value }}
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
                <v-container class="pa-0 ma-0" fluid>
                    <v-card>
                        <v-card-title class="indigo white--text headline">
                            编译日志
                        </v-card-title>
                        <v-row
                                class="pa-4"
                                justify="space-between"
                        >
                            <v-col cols="5">
                                <v-treeview
                                        :items="logsTreeData"
                                        :load-children="getLogs"
                                        :active.sync="active"
                                        :open.sync="open"
                                        activatable
                                        color="warning"
                                        open-on-click
                                        transition
                                >
                                    <template v-slot:prepend="{ item, active }">
                                        <v-icon v-if="!item.children">mdi-file-document</v-icon>
                                    </template>
                                </v-treeview>
                            </v-col>

                            <v-divider vertical></v-divider>

                            <v-col
                                    class="d-flex text-center"
                            >
                                <v-scroll-y-transition mode="out-in">
                                    <v-container class="pa-0 ma-0">
                                        <div
                                                class="title grey--text text--lighten-1 font-weight-light"
                                                style="align-self: center;"
                                                v-if="!logTreeItemSelected"
                                        >
                                            选择一个日志片段
                                        </div>
                                        <v-card
                                                :key="logTreeItemSelected.id"
                                                flat
                                                v-else
                                        >
                                            <v-card-text>
                                                <div>日志：#{{ logTreeItemSelected.id }}</div>
                                            </v-card-text>
                                            <v-divider></v-divider>
                                            <v-card dark>
                                                <v-list rounded>
                                                    <v-simple-table fixed-header height="650">
                                                        <template v-slot:default>
                                                            <tbody>
                                                            <tr :key="i" v-for="(l, i) in logTreeItemSelected.value">
                                                                <td class="text-left">{{ l }}</td>
                                                            </tr>
                                                            </tbody>
                                                        </template>
                                                    </v-simple-table>
                                                </v-list>
                                            </v-card>
                                        </v-card>
                                    </v-container>
                                </v-scroll-y-transition>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-container>
                <v-container class="pa-0 ma-0 py-3" fluid>
                    <v-alert
                            border="left"
                            color="teal"
                            dense
                            icon="mdi-clock-fast"
                            text
                            v-if="!isTimelineLoadingComplete"
                    >
                        <v-col>
                            <v-row>
                                <div>正在加载编译时间线，这通常需要一些时间来完成。</div>
                                <v-spacer></v-spacer>
                                <v-progress-circular
                                        color="red"
                                        indeterminate
                                ></v-progress-circular>
                            </v-row>
                        </v-col>
                    </v-alert>
                    <v-card>
                        <v-card-title class="orange white--text headline">
                            构建时间线
                        </v-card-title>
                        <v-timeline dense>
                            <v-slide-x-reverse-transition
                                    group
                                    hide-on-leave
                            >
                                <v-timeline-item
                                        v-for="(timeline, i) in timeLineData"
                                        :color="timeline.color"
                                        :icon="timeline.color === 'green' ? 'mdi-check-circle' : timeline.color === 'red' ? 'mdi-close-circle' : 'mdi-information'"
                                        :key="i"
                                        fill-dot
                                >
                                    <v-card
                                            :color="timeline.color"
                                            dark
                                    >
                                        <v-card-title class="title">任务：{{ timeline.title }}</v-card-title>
                                        <v-card-text class="text--primary">
                                            <div class="mb-4">构建ID：{{ timeline.id }}</div>
                                            <v-container fluid>
                                                <v-simple-table fixed-header height="350px">
                                                    <template v-slot:default>
                                                        <thead>
                                                        <tr>
                                                            <th class="text-left">时间线信息</th>
                                                            <th class="text-left">值</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr :key="i" v-for="([k, v], i) in timeline.buildInfo">
                                                            <td>{{ k }}</td>
                                                            <td>{{ v }}</td>
                                                        </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                                <v-list class="my-3" rounded three-line
                                                        v-if="timeline.issues !== undefined">
                                                    <v-subheader>错误与警告</v-subheader>
                                                    <v-list-item-group color="primary">
                                                        <v-list-item
                                                                :key="i"
                                                                v-for="(issue, i) in timeline.issues"
                                                        >
                                                            <v-list-item-icon>
                                                                <v-icon :color="issue.type === 'error' ? 'red darken-2' : 'yellow darken-2'">
                                                                    {{ issue.type === "error" ?
                                                                    "mdi-close-circle" : "mdi-alert" }}
                                                                </v-icon>
                                                            </v-list-item-icon>
                                                            <v-list-item-content>
                                                                <v-list-item-title
                                                                        v-html="issue.data.code"></v-list-item-title>
                                                                <v-list-item-subtitle
                                                                        v-html="issue.message"></v-list-item-subtitle>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                    </v-list-item-group>
                                                </v-list>
                                            </v-container>
                                        </v-card-text>
                                    </v-card>
                                </v-timeline-item>
                            </v-slide-x-reverse-transition>
                        </v-timeline>
                    </v-card>
                </v-container>
            </v-container>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import DelayHelper from "@/helper/delayHelper";
    import HttpHelper from "@/helper/HttpHelper";
    import StatusHelper from "@/helper/statusHelper";
    import {IArtifactModel} from "@/models/artifact/artifactModel";
    import {IBuildLogModel} from "@/models/buildLog/buildLogModel";
    import BuildTimeLineModel from "@/models/buildTimeLineModel";
    import {IDevOpsBuildModel} from "@/models/devOps/devOpsBuildModel";
    import LogSearchModel from "@/models/logSearchModel";
    import {ITimeLineModel} from "@/models/timeLine/timeLineModel";
    import TimelineValueListModel from "@/models/timelineValueListModel";
    import Vue from "vue";

    export default Vue.extend({
    mounted() {
        this.updateData();
    },
    data: () => ({
        buildLogs: null as IBuildLogModel | Error | null,
        active: [],
        logs: [] as LogSearchModel[],
        logsTreeData: [{
            name: "所有日志",
            children: [] as object[],
        }],
        open: [],
        isLogsLoadingComplete: false,
        isTimelineLoadingComplete: false,
        isArtifactLoadingComplete: false,
        timeLineData: [] as BuildTimeLineModel[],
        artifactUrl: "",
    }),
    methods: {
        async updateData() {
            this.isLogsLoadingComplete = false;
            this.isTimelineLoadingComplete = false;
            this.isArtifactLoadingComplete = false;
            this.buildLogs = null;
            this.active = [];
            this.logs = [];
            this.logsTreeData = [{
                name: "所有日志",
                children: [] as object[],
            }];
            this.open = [];
            this.timeLineData = [];
            this.artifactUrl = "";

            await this.getTimeline();
            await this.getArtifactDownloadUrl();
        },
        async getTimeline(): Promise<void> {
            if (this.devOpsData != null) {
                if (this.buildIndex != null) {
                    const result =
                        await HttpHelper
                            .Get<ITimeLineModel>(this.devOpsData!.value[this.buildIndex!]._links.timeline.href);
                    for (const record of result.records) {
                        const map = new Map<string, string>();
                        const color = record.result === "succeeded" ? "green" : record.result === "failed" ? "red" : "grey";

                        map.set("工作站名称", record.workerName);
                        map.set("类型", record.type);
                        map.set("变更ID", "" + record.changeId);
                        map.set("顺序", "" + record.order);
                        map.set("错误计数", "" + record.errorCount);
                        map.set("警告计数", "" + record.warningCount);
                        map.set("工作站名称", record.workerName);
                        map.set("尝试计数", "" + record.attempt);
                        map.set("标识符", record.identifier);

                        this.timeLineData.push(new BuildTimeLineModel(
                            record.id,
                            record.name,
                            record.state,
                            record.result,
                            map,
                            record.issues,
                            color,
                        ));

                        await DelayHelper.sleep(500);
                    }

                    this.isTimelineLoadingComplete = true;
                }
            }
        },
        async getLogs(): Promise<void> {
            if (this.devOpsData != null) {
                if (this.buildIndex != null) {
                    const result = await HttpHelper
                        .Get<IBuildLogModel>(this.devOpsData!.value[this.buildIndex!].logs.url);

                    for (let i = 0; i < result.value.length; i++) {
                        this.logs.push(
                            new LogSearchModel(result.value[i].id, await HttpHelper.Get<object>(result.value[i].url)));
                        this.logsTreeData[0].children.push({
                            id: i,
                            name: `${result.value[i].type} #${result.value[i].id}`,
                            children: [
                                {
                                    id: result.value[i].id,
                                    name: `创建于：${new Date(result.value[i].createdOn)}`,
                                },
                            ],
                        });
                    }

                    this.isLogsLoadingComplete = true;
                }
            }
        },
        async getArtifactDownloadUrl(): Promise<void> {
            if (this.devOpsData!.value[this.buildIndex!].result === "succeeded") {
                const artifact = await HttpHelper.Get<IArtifactModel>(
                    `https://dev.azure.com/${this.$store.getters.config.organization}/${
                        this.$store.getters.config.project}/_apis/build/builds/${
                        this.devOpsData!.value[this.buildIndex!].id}/artifacts`);
                if (Object.keys(artifact.value).length > 0) {
                    this.artifactUrl = artifact.value[0].resource.downloadUrl;
                }
            }
            this.isArtifactLoadingComplete = true;
        },
        downloadArtifact() {
            if (this.artifactUrl !== "") {
                window.open(this.artifactUrl);
            }
        },
    },
    computed: {
        logTreeItemSelected(): object | undefined {
            if (!this.active.length) {
                return undefined;
            }

            const id = this.active[0];
            return (this.logs.find((log) => log.id === id))!.log;
        },
        devOpsData(): IDevOpsBuildModel | null {
            const data = this.$store.state.currentDevOpsData as IDevOpsBuildModel;
            if (data !== undefined) {
                return data;
            }

            return null;
        },
        valueList(): TimelineValueListModel[] {
            const arr: TimelineValueListModel[] = [];

            if (this.devOpsData != null) {
                if (this.buildIndex != null) {
                    arr.push(new TimelineValueListModel("mdi-timeline-plus",
                        "队列时间", new Date(this.devOpsData!.value[this.buildIndex!].queueTime).toString()));
                    arr.push(new TimelineValueListModel("mdi-clock-start",
                        "起始时间", new Date(this.devOpsData!.value[this.buildIndex!].startTime).toString()));
                    arr.push(new TimelineValueListModel("mdi-clock-end",
                        "结束时间", new Date(this.devOpsData!.value[this.buildIndex!].finishTime).toString()));
                    arr.push(new TimelineValueListModel("mdi-priority-high", "优先级",
                        this.devOpsData!.value[this.buildIndex!].priority));
                }
            }

            return arr;
        },
        buildId(): string | null {
            const data = this.$store.state.currentDevOpsData;

            if (data !== undefined) {
                if (this.$store.state.buildIndex != null) {
                    return data.value[this.$store.state.buildIndex].buildNumber;
                }
            }

            return null;
        },
        buildIndex(): number | null {
            const index = this.$store.state.buildIndex;

            if (index != null) {
                return index;
            }

            return null;
        },
        isSucceed(): boolean | null {
            if (this.devOpsData != null || this.devOpsData !== undefined) {
                if (this.buildIndex != null) {
                    return StatusHelper.getStatus(
                        this.devOpsData!.value[this.buildIndex!].status,
                        this.devOpsData!.value[this.buildIndex!].result);
                }
            }
            return null;
        },
        detailsTableList(): Map<string, string> {
            const map: Map<string, string> = new Map<string, string>();

            if (this.devOpsData != null) {
                if (this.buildIndex != null) {
                    map.set("名称",
                        this.devOpsData!.value[this.buildIndex!].definition.name);
                    map.set("项目名称",
                        this.devOpsData!.value[this.buildIndex!].definition.project.name);
                    map.set("项目公开状态",
                        this.devOpsData!.value[this.buildIndex!].definition.project.visibility);
                    map.set("修订",
                        this.devOpsData!.value[this.buildIndex!].definition.project.revision.toString());
                    map.set("最后一次修改",
                        new Date(
                            this.devOpsData!.value[this.buildIndex!].definition.project.lastUpdateTime).toString());
                    map.set("构建编号",
                        this.devOpsData!.value[this.buildIndex!].buildNumber);
                    map.set("构建状态",
                        this.devOpsData!.value[this.buildIndex!].status);
                    map.set("构建原因",
                        this.devOpsData!.value[this.buildIndex!].reason);
                    map.set("构建号码修订",
                        this.devOpsData!.value[this.buildIndex!].buildNumberRevision.toString());
                    map.set("队列ID",
                        this.devOpsData!.value[this.buildIndex!].queue.id.toString());
                    map.set("管线名称",
                        this.devOpsData!.value[this.buildIndex!].queue.name);
                    map.set("类型",
                        this.devOpsData!.value[this.buildIndex!].definition.type);
                }
            }

            return map;
        },
    },
    watch: {
        $route: "updateData",
    },
});
</script>

<style scoped>

</style>
