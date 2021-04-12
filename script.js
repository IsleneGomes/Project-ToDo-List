const inputElement = document.getElementById('texto-tarefa');
const toDoList = document.getElementById('lista-tarefas');
const newTaskButton = document.getElementById('criar-tarefa');
const clearAllButton = document.getElementById('apaga-tudo');

function newTask() {
  const task = document.createElement('li');
  task.textContent = inputElement.value;
  toDoList.appendChild(task);
  inputElement.value = '';
}

function selectTask(event) {
  const previouslySelectedElement = document.getElementsByClassName('selected')[0];
  if (previouslySelectedElement) {
    previouslySelectedElement.classList.remove('selected');
  }
  const selectedTask = event.target;
  selectedTask.classList.add('selected');
}

function toggleCompletedTask(event) {
  const task = event.target;
  task.classList.toggle('completed');
}

function deleteAllTasks() {
  toDoList.querySelectorAll('li').forEach((e) => e.remove());
}

newTaskButton.addEventListener('click', newTask);
inputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') newTaskButton.click();
});
toDoList.addEventListener('click', selectTask);
toDoList.addEventListener('dblclick', toggleCompletedTask);
clearAllButton.addEventListener('click', deleteAllTasks);
