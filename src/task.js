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

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    getDueDate() {
        return this.dueDate;
    }

    getDOMElement() {
        return `<li class='taskItem' tabIndex="-1" data-taskid="${this.id}">
                    <div class="checkbox-custom" data-checked="${this.complete}" ></div>
                    <p class="taskTitle">${this.title}</p>
                    <div class="dueDateContainer">
                    
                        <p class="dueDate">${this.dueDate ? this.dueDate : 'No Date'}</p>
                    </div>
                    <p class="deleteBtn">Delete</p>
                    
                </li>`;

                //contenteditable="true"
    }

    showDatePicker(dueDateContainer) {
        const datePicker =  `
        <form class="dateSelection">
             <input type="date" name="dateInput" class="dateInput" value="" autofocus>
             <input type=submit hidden>
             </form>`

        dueDateContainer.insertAdjacentHTML('afterbegin', datePicker);

        const datePickers = document.querySelectorAll('.dateSelection');
        datePickers.forEach(input => {
           return input.addEventListener('submit', (e) => {
                e.preventDefault()
                const date = document.querySelector('.dateInput').value;
                console.log(date);
                e.target.remove();
                })
            })
    }

    toggleComplete() {
        this.complete = !this.complete; 
    }




    

}