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

    getId() {
        return this.id;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    getDueDate() {
        return this.dueDate;
    }

    getDOMElement() {
        return `<li class='taskItem'>
                    <div class="checkbox-custom" data-checked="${this.complete}" data-taskid="${this.id}"></div>
                    <p>${this.title}</p>
                </li>`;
    }



    

}