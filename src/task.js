export default class createTask {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        // this.description = description;
        this.dueDate = dueDate;
        // this.priority = priority;
        this.id = Date.now().toString();
        this.complete = false;
        // run this when new task object is created
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

    addTaskToActiveProject() {
        // find active project
        const activeProject = document.getElementById('activeProject');
        const activeProjectID = activeProject.dataset.activeproject;
       
        // push on the end of the project
        // console.log(activeProject)
    }

    

}