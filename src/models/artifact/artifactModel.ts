import {IArtifactValueModel} from "@/models/artifact/artifactValueModel";

export interface IArtifactModel {
    count: number;
    value: IArtifactValueModel[];
}
