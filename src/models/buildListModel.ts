export default class BuildListModel {
    public title: string;
    public to: string;
    public success: boolean | null;

    constructor(title: string, to: string, success: boolean | null) {
        this.title = title;
        this.to = to;
        this.success = success;
    }
}
