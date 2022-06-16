import createProject from "./project"; // I DON"T THINK I NEED THIS"

export default class ProjectsList {
    constructor() {
        this.projects = [];
    }

    findActiveProject() {
       const projectIndex = this.projects.findIndex(project => {
            return project.activeProject === true;
         })
         return this.projects[projectIndex];
    }

    findProject(id) {
        const projectIndex = this.projects.findIndex(project => {
             return project.id === id;
          })
          return this.projects[projectIndex];
     }

    addProjectToList(project){
        this.deactiveAllProjects();
        this.projects.push(project);
        console.log(this.projects); // REMOVE
        this.updateProjectsSidebar();
        project.activeProject = true; // THIS SHOULD BE A MODULE ON THE PROJECT CLASS

    }

    deactiveAllProjects() {
       const deactivateProjects = this.projects.map(project => {
            project.activeProject = false // THIS SHOULD BE A MODULE ON THE PROJECT CLASS
       })

    }

    updateProjectsSidebar() {
        const sidebar = document.querySelector('.sideBarProjectsList');

        const ProjectsHTML = this.projects.map(project => {
            return `<li class="projectTitle" data-projectId="${project.id}" data-activeproject="${project.activeProject}">${project.title}</li>`
       }).join(''); // MOVE TO SEPERATE MODULE

       sidebar.innerHTML = ProjectsHTML;
       this.addEventListenersToProjects();
    }

    addEventListenersToProjects() {
        const projects = document.querySelectorAll('.projectTitle');
    
        for (let i = 0; i < projects.length; i++) {
            projects[i].addEventListener('click', (e) => {
                e.target.dataset.activeproject = 'true'; // THIS SHOULD BE USED
                const selectedProject = this.findProject(e.target.dataset.projectid);
                this.deactiveAllProjects()

                // deactivate all projects so they appear <<<FIXXX
                selectedProject.setAsActiveProject();
           
            })
        }
    }
}