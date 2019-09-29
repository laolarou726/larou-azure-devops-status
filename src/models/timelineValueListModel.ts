export default class TimelineValueListModel {
    public icon: string;
    public title: string;
    public value: string;

    constructor(icon: string, title: string, value: string) {
        this.icon = icon;
        this.title = title;
        this.value = value;
    }
}
