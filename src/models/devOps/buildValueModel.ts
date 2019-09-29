import {ILogModel} from "../logModel";
import {IDefinitionModel} from "./definitionModel";
import {ILinkModel} from "./linkModel";
import {IProjectModel} from "./projectModel";
import {IQueueModel} from "./queueModel";
import {IRepositoryModel} from "./repositoryModel";
import {IRequestUserModel} from "./requestUserModel";

export interface IBuildValueModel {
    _links: {
        self: ILinkModel;
        web: ILinkModel;
        timeline: ILinkModel;
        badge: ILinkModel;
    };
    properties: object;
    tags: object[];
    validationResults: object[];
    plans: Array<{
        planId: string;
    }>;
    triggerInfo: object;
    id: number;
    buildNumber: string;
    status: string;
    result: string;
    queueTime: string;
    startTime: string;
    finishTime: string;
    url: string;
    definition: IDefinitionModel;
    buildNumberRevision: number;
    project: IProjectModel;
    uri: string;
    sourceBranch: string;
    sourceVersion: string;
    queue: IQueueModel;
    priority: string;
    reason: string;
    requestedFor: IRequestUserModel;
    requestedBy: IRequestUserModel;
    lastChangedDate: string;
    lastChangedBy: IRequestUserModel;
    parameters: string;
    orchestrationPlan: {
        planId: string;
    };
    logs: ILogModel;
    repository: IRepositoryModel;
    keepForever: boolean;
    retainedByRelease: false;
    triggeredByBuild: object;
}
