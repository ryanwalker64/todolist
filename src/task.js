import { format, compareAsc } from 'date-fns'

export default class createTask {
    constructor(title, id, complete, dueDate, priority) {
        this.title = title;
        this.dueDate = dueDate;
        // this.priority = priority;
        this.id = id ? id : Date.now().toString();
        this.complete = complete ? complete : false;
        
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

   

    getDOMElement() {
        return `<li class='taskItem' tabIndex="-1" data-taskid="${this.id}">
                    <div class="checkbox-custom" data-checked="${this.complete}" ></div>
                    <p class="taskTitle" contenteditable="true">${this.title}</p>
                    <div class="dueDateContainer">
                    
                        <p class="dueDate">${this.dueDate ? this.getDueDate() : 'No Date'}</p>
                    </div>
                    <p class="deleteBtn">Delete</p>
                    
                </li>`;

    }

    showDatePicker(dueDateContainer) {
        const datePicker =  `
        <form class="dateSelection">
             <input type="date" name="dateInput" class="dateInput" value="" autofocus>
             <input type=submit hidden>
             </form>`

        dueDateContainer.insertAdjacentHTML('afterbegin', datePicker);
    }

    setDueDate(date) {
        const formatedDate = format(new Date(date), 'dd MMM')
        this.dueDate = formatedDate;
    }

    getDueDate() {
       return this.dueDate;
    }

    toggleComplete() {
        this.complete = !this.complete; 
    }




    

}