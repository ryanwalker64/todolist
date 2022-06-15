export default class createProject {
    constructor(title, task) {
        this.title = title;
        this.tasks = [];
        this.id = Date.now().toString();
        this.activeProject = false;
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
    }

    setAsActiveProject() {
        this.activeProject = true;
        const activeProjectTitle = document.getElementById('activeProject')
        activeProjectTitle.setAttribute('data-activeProject', this.id)
        activeProjectTitle.textContent = this.title;
        
    }

}