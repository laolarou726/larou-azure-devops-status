import {IBuildLogValueModel} from "./buildLogValueModel";

export interface IBuildLogModel {
    count: number;
    value: IBuildLogValueModel[];
}
