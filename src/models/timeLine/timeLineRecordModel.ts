import {ILogModel} from "../logModel";
import {IDetailModel} from "./detailModel";
import {IIssueModel} from "./issueModel";
import {ITaskModel} from "./taskModel";

export interface ITimeLineRecordModel {
    previousAttempts: object[];
    id: string;
    parentId: string;
    type: string;
    name: string;
    startTime: string;
    finishTime: string;
    currentOperation: object;
    percentComplete: object;
    state: string;
    result: string;
    resultCode: object;
    changeId: number;
    lastModified: string;
    workerName: string;
    order: number;
    details: IDetailModel;
    errorCount: number;
    warningCount: number;
    url: object;
    log: ILogModel;
    task: ITaskModel;
    attempt: number;
    identifier: string;
    issues: IIssueModel[];
}
