export default class BuildListModel {
    public title: string;
    public to: string;
    public success: boolean;

    constructor(title: string, to: string, success: boolean) {
        this.title = title;
        this.to = to;
        this.success = success;
    }
}
