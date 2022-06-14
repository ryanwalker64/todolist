import createTask from "./task";

const taskContainer = document.getElementById('container');
const newTaskForm = document.getElementById('new-task');
const newTaskTitle = document.querySelector('[name="Title"]');



class createProject {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    setTitle(title){
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    getTasks() {
        return this.tasks;
    }
}


newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const testTask = new createTask(newTaskTitle.value);
    
    console.log('The title is: ' + testTask.getTitle());

    taskContainer.innerHTML += `<p>${testTask.getTitle()}</p>`;
})

