export interface IArtifactValueModel {
    id: number;
    name: string;
    source: string;
    resource: {
        type: string;
        data: string;
        properties: {
            localpath: string;
            artifactsize: string;
        };
        url: string;
        downloadUrl: string;
    };
}
