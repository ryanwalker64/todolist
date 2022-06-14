export default class createTask {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        // this.description = description;
        this.dueDate = dueDate;
        // this.priority = priority;
        this.id = Date.now().toString();
        this.complete = false;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    getDueDate() {
        return this.dueDate;
    }

    

}