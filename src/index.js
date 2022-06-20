import createTask from "./task";
import createProject from "./project";
import ProjectsList from "./projectsList";
import { formatDistance, subDays } from 'date-fns'

// const taskContainer = document.getElementById('container');
const newTaskForm = document.getElementById('new-task');
const newTaskTitle = document.querySelector('[name="Title"]');
const taskContainer = document.getElementById('container');
const projectsContainer = document.querySelector('.sideBarProjectsList');
const deleteProjectBtn = document.querySelector('.deleteProject');
const activeProjectHeading = document.getElementById('activeProject');

//initalise projectsList
const InitProjectList = new ProjectsList();


//event listener for submission of new task
newTaskForm.addEventListener('submit', handleNewTaskSubmission);

function handleNewTaskSubmission(e) {
    e.preventDefault();
   
    //check to see if a new project shortcut was used
    if (checkForNewProjectCreator()) return
    
    //create new task object
    const submittedTask = new createTask(newTaskTitle.value);

    //find active project in projectsArray
    const activeProject = InitProjectList.findActiveProject();

     //push task object into active project object's array and add to dom
    activeProject.addTaskToProject(submittedTask);

    setLocalStorage()
   
   
    //clear task input
    newTaskTitle.value = '';
}

function setLocalStorage() {
    const projectsJSON = InitProjectList.getJSONString()
    localStorage.setItem('projects-list', projectsJSON);
}

//Initalise App 
function initApp() {
    //check localstorage for existing projects and tasks
    const getLocalStorage = JSON.parse(localStorage.getItem('projects-list'));
    //if localstorage exists, add 
    if (getLocalStorage) {
        const projectObjs = getLocalStorage.map(project => {
            const projObj = new createProject(project.title, project.tasks, project.id, project.activeProject);
            projObj.addPrototypesToTasks();
            return projObj;
        });

        InitProjectList.setProjects(projectObjs);
        InitProjectList.findActiveProject().toggleActiveStatusProject(true);
        InitProjectList.updateProjectsSidebar();

        // .toggleActiveStatusProject(true)

    } else { // Default state of app if no other projects are loaded
        defaultAppState()
    }
}

function defaultAppState() {
    const defaultProject = new createProject('Inbox');
    InitProjectList.addProjectToList(defaultProject);
    defaultProject.toggleActiveStatusProject(true);
    InitProjectList.updateProjectsSidebar();
}


function checkForNewProjectCreator() {
    if (newTaskTitle.value.split('')[0] === '/') {
        const newProjectTitle = newTaskTitle.value.slice(1);
        const newProject = new createProject(newProjectTitle);
        InitProjectList.addProjectToList(newProject)
        newProject.toggleActiveStatusProject(true);
        InitProjectList.updateProjectsSidebar()
        newTaskTitle.value = '';
        setLocalStorage();
        return true
    }
}

//EVENT LISTENERS
taskContainer.addEventListener('click', handleTaskContainerEvents)
taskContainer.addEventListener('submit', handleTaskDueDates)
taskContainer.addEventListener('input', handleTaskTitles)
activeProjectHeading.addEventListener('input', handleProjectTitle)
projectsContainer.addEventListener('click', handleProjectsSwitch)
deleteProjectBtn.addEventListener('click', handleProjectsDeletion)

function handleProjectsDeletion(e) {
    if (confirm('Are you sure you want to delete this project? This cannot be undone.')) {
        const activeProject = InitProjectList.findActiveProject();
        InitProjectList.deleteProject(activeProject.getId());
        // find last project in the list and make active
        // update sidebar
        // set localstorage

      }
}

function handleProjectsSwitch(e) {
    if (e.target.classList.contains('projectTitle')) {
    const selectedProject = e.target;
    selectedProject.dataset.activeProject = 'true';
    const projectObj = InitProjectList.findProject(selectedProject.dataset.projectid);
    InitProjectList.deactiveAllProjects();
    projectObj.toggleActiveStatusProject(true);
    InitProjectList.updateProjectsSidebar();
    setLocalStorage();
    };
    // // deactivate all projects so they appear <<<FIXXX
}

function handleTaskDueDates(e) {
    e.preventDefault()
    if(e.target.classList.contains('dateSelection')) {
    const date = document.querySelector('.dateInput').value;
    const taskDOMItem = e.target.closest('.taskItem');
    const activeProject = InitProjectList.findActiveProject()
    const taskObj = activeProject.getTaskInProject(taskDOMItem.dataset.taskid);
    
    taskObj.setDueDate(date);
    activeProject.addTasksToDOM();
    e.target.remove();
    }
    
}

function handleTaskTitles(e) {
    if(e.target.classList.contains('taskTitle')) {
        const newTitle = e.target.textContent;
        const taskDOMItem = e.target.closest('.taskItem');
        const activeProject = InitProjectList.findActiveProject()
        const taskObj = activeProject.getTaskInProject(taskDOMItem.dataset.taskid)
        taskObj.setTitle(newTitle);
    }
}

function handleProjectTitle(e) {
    if (e.target.id === 'activeProject') {
        const newProjectTitle = e.target.textContent;
        const activeProject = InitProjectList.findActiveProject();
        activeProject.setTitle(newProjectTitle);
        setLocalStorage();
        InitProjectList.updateProjectsSidebar();

    }
}

function handleTaskContainerEvents(e){
    const activeProject = InitProjectList.findActiveProject()
    const clickedTaskBtn = e.target;
    const taskDOMItem = e.target.closest('.taskItem');
    const taskObj = activeProject.getTaskInProject(taskDOMItem.dataset.taskid);
    
    if(clickedTaskBtn.classList.contains('checkbox-custom')){
        handleTaskCompletions(clickedTaskBtn, taskObj)
        
    } else if (clickedTaskBtn.classList.contains('deleteBtn')) {
        handleTaskDeletions(taskObj, activeProject)

    } else if (clickedTaskBtn.classList.contains('dueDate')) {
        taskObj.showDatePicker( e.target.closest('.dueDateContainer'));
    }
    setLocalStorage();
}

function handleTaskDeletions(taskObj, activeProject){
    activeProject.deleteTask(taskObj.id);
    activeProject.addTasksToDOM();
    setLocalStorage();
}

function handleTaskCompletions(checkbox, taskObj) {
    if (checkbox.dataset.checked === 'false') {
        checkbox.dataset.checked = 'true'  
    } else {
        checkbox.dataset.checked = 'false'
    }

    taskObj.toggleComplete();
    setLocalStorage()
}

initApp()