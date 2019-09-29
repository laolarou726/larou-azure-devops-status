import {ITimeLineRecordModel} from "./timeLineRecordModel";

export interface ITimeLineModel {
    records: ITimeLineRecordModel[];
    lastChangedBy: string;
    lastChangedOn: string;
    id: string;
    changeId: number;
    url: string;
}
