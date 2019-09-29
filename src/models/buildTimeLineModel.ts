import {IIssueModel} from "./timeLine/issueModel";

export default class BuildTimeLineModel {
    public id: string;
    public title: string;
    public state: string;
    public result: string;
    public buildInfo: Map<string, string>;
    public issues: IIssueModel[] | null;
    public color: string;

    constructor(
        id: string, title: string, state: string, result: string,
        buildInfo: Map<string, string>, issues: IIssueModel[] | null, color: string) {
        this.id = id;
        this.title = title;
        this.state = state;
        this.result = result;
        this.buildInfo = buildInfo;
        this.issues = issues;
        this.color = color;
    }
}
