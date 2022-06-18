import createTask from "./task";
import createProject from "./project";
import ProjectsList from "./projectsList";
import { formatDistance, subDays } from 'date-fns'

// const taskContainer = document.getElementById('container');
const newTaskForm = document.getElementById('new-task');
const newTaskTitle = document.querySelector('[name="Title"]');
const taskContainer = document.getElementById('container');

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
function initApp () {
    //check localstorage for existing projects and tasks
    const getLocalStorage = JSON.parse(localStorage.getItem('projects-list'));
    //if localstorage exists, add 
    if (getLocalStorage) {
        const projectObjs = getLocalStorage.map(project => {
            const projObj = new createProject(project.title, project.tasks, project.id)
            projObj.addPrototypesToTasks();
            return projObj;
        });

        InitProjectList.setProjects(projectObjs);
        InitProjectList.findActiveProject().setAsActiveProject();

    } else { // Default state of app if no other projects are loaded
        defaultAppState()
    }
}

function defaultAppState() {
    const defaultProject = new createProject('Inbox');
    InitProjectList.addProjectToList(defaultProject);
    defaultProject.setAsActiveProject();
}


initApp ()


function checkForNewProjectCreator() {
    if (newTaskTitle.value.split('')[0] === '/') {
        const newProjectTitle = newTaskTitle.value.slice(1);
        const newProject = new createProject(newProjectTitle);
        InitProjectList.addProjectToList(newProject)
        newProject.setAsActiveProject();
        newTaskTitle.value = '';
        return true
    }
}

//EVENT LISTENERS
taskContainer.addEventListener('click', handleTaskContainerEvents)

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