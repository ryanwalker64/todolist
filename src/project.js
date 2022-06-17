export default class createProject {
    constructor(title, task) {
        this.title = title;
        this.tasks = [];
        this.id = Date.now().toString();
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

    addTaskToProject(task){
        this.tasks.push(task);
        // console.log( this.tasks)
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

    // addEventListenersToCheckboxes() {
    //     const checkboxes = document.querySelectorAll('.checkbox-custom');
    
    //     for (let i = 0; i < checkboxes.length; i++) {
    //         checkboxes[i].addEventListener('click', (e) => {

    //             if (e.target.dataset.checked === 'false'){
    //                 e.target.dataset.checked = 'true'
    //                 this.tasks[i].complete = true;
    //             } { 
    //                 e.target.dataset.checked = 'false';
    //                 this.tasks[i].complete = false;
    //             }
           
    //         })
    //     }
    // }

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

    

}