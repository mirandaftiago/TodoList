//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Function to load all event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);

  //Add task event
  form.addEventListener('submit', addTask);

  //Remove task event
  taskList.addEventListener('click', removeTask);

  //Clear task event
  clearBtn.addEventListener('click', clearTasks);

  //Filter tasks events
  filter.addEventListener('keyup', filterTasks)
}

//Get tasks from LocalStorage
function getTasks() {
  let tasks;
  
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    //Create li element
    const li = document.createElement('li');

    //Add class
    li.className = 'collection-item';
    
    //Create text node and append to li
    li.appendChild(document.createTextNode(task));
    
    //Create new link element
    const link = document.createElement('a');

    //Add class
    link.className = 'delete-item secondary-content';

    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
  });
}


//Add Task function
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  createItem();

  //Store in LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  //Clear input field
  taskInput.value = '';

  e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;

  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }

  }  
}

//Clear tasks
function clearTasks() {
  // taskList.innerHTML = '';

  //faster way based on https://jsperf.com/innerhtml-vs-removechild
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

//Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

//Helper Functions

function createItem() {

  //Create li element
  const li = document.createElement('li');
  
  //Add class
  li.className = 'collection-item';
  
  //Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  
  //Create new link element
  const link = document.createElement('a');

  //Add class
  link.className = 'delete-item secondary-content';

  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //Append the link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);
  }

