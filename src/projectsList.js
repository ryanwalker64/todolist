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
        this.updateProjectsSidebar();
        // project.setAsActiveProject(); // THIS SHOULD BE A MODULE ON THE PROJECT CLASS
        project.toggleActiveStatusProject(true);
        

    }

    deactiveAllProjects() {
       const deactivateProjects = this.projects.map(project => {
            project.toggleActiveStatusProject(false);
       })


    }

    updateProjectsSidebar() {
        const sidebar = document.querySelector('.sideBarProjectsList');
        
        const ProjectsHTML = this.projects.map(project => {
            return `<li class="projectTitle" data-projectId="${project.id}" data-activeproject="${project.activeProject}">${project.title}</li>`
       }).join(''); // MOVE TO SEPERATE MODULE

       sidebar.innerHTML = ProjectsHTML;

    }


    getJSONString() {
        return JSON.stringify(this.projects);
    }

    setProjects(projects) {
        this.projects = projects; 
    }
}