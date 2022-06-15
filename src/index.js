import createTask from "./task";
import createProject from "./project";

const taskContainer = document.getElementById('container');
const newTaskForm = document.getElementById('new-task');
const newTaskTitle = document.querySelector('[name="Title"]');



//event listener for submission of new task
newTaskForm.addEventListener('submit', handleNewTaskSubmission);

function handleNewTaskSubmission(e) {
    e.preventDefault();
    
    //create new task object
    const submittedTask = new createTask(newTaskTitle.value);

    //find active project in projectsArray
    const activeProjectIndex = projectsArray.findIndex(project => {
        return project.activeProject === true;
    })

    //push task object into active project object's array
    projectsArray[activeProjectIndex].addTaskToProject(submittedTask)
    
    console.log(projectsArray[activeProjectIndex]);


    //add task into DOM and clear task input
    taskContainer.innerHTML += `
        <li class='taskItem'>
            <div class="checkbox-custom" data-checked="false"></div>
            <p>${submittedTask.getTitle()}</p>
        </li>`;
    newTaskTitle.value = '';
}


// Default state of app if no other projects are loaded
let projectsArray = [];
const defaultProject = new createProject('Unassigned Project');
projectsArray.push(defaultProject);
defaultProject.setAsActiveProject();

// console.log(projectsArray)
