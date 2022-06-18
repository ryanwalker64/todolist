import createTask from "./task";

export default class createProject {
    constructor(title, tasks, id) {
        this.title = title;
        this.tasks = tasks ? tasks : [];
        this.id = id ? id : Date.now().toString();
        this.activeProject = true;
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


    deleteTask(taskId) {
        const taskIndex = this.tasks.findIndex(task => {
            return task.id === taskId;
        });
        // console.log(taskIndex)
        this.tasks.splice([taskIndex], 1);
    }


    addTaskToProject(task){
        this.tasks.push(task);
        // console.log( this.tasks)
        this.addTasksToDOM()
    }

    addTasksToDOM() {
        const taskContainer = document.getElementById('container');
        console.log(this.tasks)
        const tasksHTML = this.tasks.map(task => {
            return task.getDOMElement()
        }).join('')        

        taskContainer.innerHTML = tasksHTML;
        // this.addEventListenersToCheckboxes();
    }

    setAsActiveProject() {
        this.activeProject = true;
        const activeProjectTitle = document.getElementById('activeProject');
        activeProjectTitle.setAttribute('data-activeProject', this.id);
        activeProjectTitle.textContent = this.title;
        this.addTasksToDOM();
    }

    getTaskInProject(id) {
        const taskIndex = this.tasks.findIndex(task => {
            return task.id === id;
         })
         return this.tasks[taskIndex];
    }

    addPrototypesToTasks(){
        const protoTasks = this.tasks.map(task => {
            return new createTask(task.title, task.id, task.complete);
        })

        this.tasks = protoTasks;
        
    }


    

}