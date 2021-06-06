const listaTarefas = 'lista-tarefas';
/**
 * Cria elemento li contendo o texto (string) recebido e adiciona a classe 'task'
 */
function createTask(text) {
  const task = document.createElement('li');
  task.classList.add('task');
  task.innerHTML = text;
  return task;
}
/**
 * Adiciona valor do input (tarefa) à lista de tarefas
 */
function addTask() {
  const listItems = document.getElementById(listaTarefas);
  const input = document.getElementById('texto-tarefa');
  if (input.value === '') {
    alert('Digite uma tarefa.');
  } else {
    const task = createTask(input.value);
    listItems.appendChild(task);
    input.value = '';
  }
}

/**
 * Ao disparadado um evento, remove classe 'selected' de todos os elementos, caso existam, e adiciona classe 'selected' no elemento alvo do evento.
 */
function taskClassSelected(event) {
  const selected = document.querySelectorAll('.selected');
  for (let index = 0; index < selected.length; index += 1) {
    selected[index].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

/**
 * Ao disparado um evento, caso exista a classe 'completed' no elemento alvo do evento, ela é removida. Caso contrário, se ela não exista, a mesma é adicionada ao elemento.
 */
function taskClassCompleted(event) {
  const task = event.target;
  task.classList.toggle('completed');
}

/**
 * Remove todos os elementos com a classe 'task'.
 */
function deleteList() {
  const items = document.querySelectorAll('.task');
  // for (let index = 0; index < items.length; index += 1) {
  //   items[index].remove();
  // }
  items.forEach((item) => item.remove());
}

/**
 * Remove todos os elementos com classe 'completed'.
 */
function removeCompleted() {
  const completed = document.querySelectorAll('.completed');
  for (let index = 0; index < completed.length; index += 1) {
    completed[index].remove();
  }
}

function saveTasks() {
  const itemsList = document.getElementsByTagName('li');
  for (let index = 0; index < itemsList.length; index += 1) {
    itemsList[index].classList.add('saved-item');
    const obj = {
      text: itemsList[index].innerText,
      class: itemsList[index].className,
    };
    localStorage.setItem(index, JSON.stringify(obj));
  }
  alert('Lista salva!');
}

function getTasks() {
  const list = document.getElementById(listaTarefas);
  for (let index = 0; index < localStorage.length; index += 1) {
    const listItem = document.createElement('li');
    const obj = JSON.parse(localStorage.getItem(index));
    listItem.innerText = obj.text;
    listItem.className = obj.class;
    list.appendChild(listItem);
  }
}

function deleteSavedTasks() {
  localStorage.clear();
  const itemsList = document.getElementsByTagName('li');
  for (let index = 0; index < itemsList.length; index += 1) {
    itemsList[index].classList.remove('saved-item');
  }
  alert('Lista apagada!');
}

function moveUpTask() {
  const selected = document.querySelector('.selected');
  let previousElement;
  if (selected) {
    previousElement = selected.previousElementSibling;
  }
  if (previousElement) {
    const objAux = {
      text: previousElement.innerText,
      class: previousElement.className,
    };
    previousElement.innerText = selected.innerText;
    previousElement.className = selected.className;
    selected.innerText = objAux.text;
    selected.className = objAux.class;
  }
}

function moveDownTask() {
  const selected = document.querySelector('.selected');
  let nextElement;
  if (selected) {
    nextElement = selected.nextElementSibling;
  }
  if (nextElement) {
    const objAux = {
      text: nextElement.innerText,
      class: nextElement.className,
    };
    nextElement.innerText = selected.innerText;
    nextElement.className = selected.className;
    selected.innerText = objAux.text;
    selected.className = objAux.class;
  }
}

function deleteSelectedTask() {
  const selected = document.querySelector('.selected');
  // console.log(selected);
  selected.remove();
}

const addButton = document.querySelector('#criar-tarefa');
const listItems = document.getElementById(listaTarefas);
const deleteButton = document.querySelector('#apaga-tudo');
const removeCompletedButton = document.querySelector('#remover-finalizados');
const saveButton = document.getElementById('salvar-tarefas');
const deleteSavedButton = document.getElementById('apaga-lista-salva');
const moveUpButton = document.getElementById('mover-cima');
const moveDownButton = document.getElementById('mover-baixo');
const deleteSelectedButton = document.getElementById('remover-selecionado');

window.onload = function init() {
  addButton.addEventListener('click', addTask);
  listItems.addEventListener('click', taskClassSelected);
  listItems.addEventListener('dblclick', taskClassCompleted);
  deleteButton.addEventListener('click', deleteList);
  removeCompletedButton.addEventListener('click', removeCompleted);
  saveButton.addEventListener('click', saveTasks);
  getTasks();
  deleteSavedButton.addEventListener('click', deleteSavedTasks);
  moveUpButton.addEventListener('click', moveUpTask);
  moveDownButton.addEventListener('click', moveDownTask);
  deleteSelectedButton.addEventListener('click', deleteSelectedTask);
};
