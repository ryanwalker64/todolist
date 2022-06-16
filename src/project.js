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
        this.addTasksToDOM()
    }

    addTasksToDOM() {
        const taskContainer = document.getElementById('container');

        const tasksHTML = this.tasks.map(task => {
            return `<li class='taskItem'>
            <div class="checkbox-custom" data-checked="${task.complete}" data-taskid="${task.id}"></div>
            <p>${task.title}</p>
        </li>`
        }).join('') // MOVE TO SEPERATE MODULE


        taskContainer.innerHTML = tasksHTML;
        this.addEventListenersToCheckboxes();
    }

    addEventListenersToCheckboxes() {
        const checkboxes = document.querySelectorAll('.checkbox-custom');
    
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener('click', (e) => {
            e.target.dataset.checked === 'false' ? e.target.dataset.checked = 'true' :  e.target.dataset.checked = 'false' ;
            })
        }
    }

    setAsActiveProject() {
        this.activeProject = true;
        const activeProjectTitle = document.getElementById('activeProject');
        activeProjectTitle.setAttribute('data-activeProject', this.id);
        activeProjectTitle.textContent = this.title;
        this.addTasksToDOM();
        
    }

}