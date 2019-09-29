import {IDataModel} from "./dataModel";

export interface IIssueModel {
    type: string;
    category: string;
    message: string;
    data: IDataModel;
}
