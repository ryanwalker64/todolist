import createTask from "./task";
import createProject from "./project";
import ProjectsList from "./projectsList";

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
    
    // console.log(activeProject)
   
    //clear task input
    newTaskTitle.value = '';
}


// Default state of app if no other projects are loaded
function defaultAppState() {
    const defaultProject = new createProject('Inbox');
    InitProjectList.addProjectToList(defaultProject);
    defaultProject.setAsActiveProject();
}

defaultAppState()



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
    const clickedTask = e.target;
    const taskObj = activeProject.getTaskInProject(clickedTask.dataset.taskid);
    
    if(clickedTask.classList.contains('checkbox-custom')){
        handleTaskCompletions(clickedTask, taskObj)
    }

    // add delete function
    
}

function handleTaskCompletions(clickedTask, taskObj) {
    
    
    if (clickedTask.dataset.checked === 'false') {
        clickedTask.dataset.checked = 'true'
        
    } else {
        clickedTask.dataset.checked = 'false'
    }
    
    taskObj.toggleComplete();
    console.log(taskObj)
}