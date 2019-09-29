import {IProjectModel} from "./projectModel";

export interface IDefinitionModel {
    draft: object[];
    id: number;
    name: string;
    url: string;
    uri: string;
    path: string;
    type: string;
    queueStatus: string;
    revision: number;
    project: IProjectModel;
}
