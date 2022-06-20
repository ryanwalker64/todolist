import createTask from "./task";

export default class createProject {
    constructor(title, tasks, id, activeProject) {
        this.title = title;
        this.tasks = tasks ? tasks : [];
        this.id = id ? id : Date.now().toString();
        this.activeProject = activeProject === true ? activeProject : false;
    }

    setTitle(title){
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    getId() {
        return this.id;
    }
    
    getTasks() {
        return this.tasks;
    }


    deleteTask(taskId) {
        const taskIndex = this.tasks.findIndex(task => {
            return task.id === taskId;
        });
        this.tasks.splice([taskIndex], 1);
    }


    addTaskToProject(task){
        this.tasks.push(task);

        this.addTasksToDOM()
    }

    addTasksToDOM() {
        const taskContainer = document.getElementById('container');
       
        const tasksHTML = this.tasks.map(task => {
            return task.getDOMElement()
        }).join('')        

        taskContainer.innerHTML = tasksHTML;
        // this.addEventListenersToCheckboxes();
    }

    // setAsActiveProject() {
    // }

    toggleActiveStatusProject(status) {
        this.activeProject = status;

        
        const projectTab = document.querySelector(`[data-projectid="${this.id}"]`) 
        // projectTab.dataset.projectid = status;
        

        if(status === true) {
            const activeProjectTitle = document.getElementById('activeProject');
            activeProjectTitle.setAttribute('data-activeProject', this.id);
            activeProjectTitle.textContent = this.title;
            this.addTasksToDOM();
        // } else if (status === true) {
        //     const projectTab = document.querySelector(`[data-projectid="${this.id}"]`) 
        //     projectTab.dataset.projectid = 'false';
        // }
    }
}

    getTaskInProject(id) {
        const taskIndex = this.tasks.findIndex(task => {
            return task.id === id;
         });
         return this.tasks[taskIndex];
    }

    addPrototypesToTasks(){
        const protoTasks = this.tasks.map(task => {
            return new createTask(task.title, task.id, task.complete, task.dueDate);
        })

        this.tasks = protoTasks;
        
    }


    

}