function tags(elemento) {
  return document.createElement(elemento);
}

const ol = document.getElementById('lista-tarefas');
const entrada = document.getElementById('texto-tarefa');
let li = tags('li');
const limparTudo = document.getElementById('apaga-tudo');
const removerSelec = document.getElementById('remover-selecionado');
const cima = document.getElementById('mover-cima');
const baixo = document.getElementById('mover-baixo');
const finalizados = document.getElementById('remover-finalizados');
const salva = document.getElementById('salvar-tarefas');

function selecionaClasse(event) {
  const atribuiClasse = document.querySelectorAll('.itens');
  for (let index = 0; index < atribuiClasse.length; index += 1) {
    atribuiClasse[index].classList.remove('itens');
  }
  event.target.classList.add('itens');
}
ol.addEventListener('click', selecionaClasse);

function adicionaCor(event) {
  const classeItens = document.querySelectorAll('.itens');
  for (let index = 0; index < classeItens.length; index += 1) {
    classeItens[index].classList.remove('itens');
  }
  event.target.classList.add('itens');
}

function tarefaConcluida(event) {
  if (event.target.classList.contains('itens')) {
    if (event.target.classList.contains('completed') === true) {
      event.target.classList.remove('completed');
    } else {
      event.target.classList.add('completed');
    }
  }
}

function criarLi() {
  li = tags('li');
  li.appendChild(document.createTextNode(entrada.value));
  li.addEventListener('click', adicionaCor);
  li.addEventListener('dblclick', tarefaConcluida);
  ol.appendChild(li);
  entrada.value = '';
}

function adicionar() {
  if (entrada.value !== '') {
    criarLi();
  }
}
adicionar();

function limpaTudo() {
  while (ol.children.length > 0) {
    ol.children[0].remove();
  }
}
limparTudo.addEventListener('click', limpaTudo);

function remover() {
  const liItem = document.querySelectorAll('.itens');
  for (let index = 0; index < liItem.length; index += 1) {
    liItem[index].parentNode.removeChild(liItem[index]);
  }
}
removerSelec.addEventListener('click', remover);

function limparLista() {
  const liItem = document.querySelectorAll('.completed');
  for (let index = 0; index < liItem.length; index += 1) {
    liItem[index].parentNode.removeChild(liItem[index]);
  }
}
finalizados.addEventListener('click', limparLista);

function salvar() {
  localStorage.setItem('Lista de Tarefas', ol.innerHTML);
}
const ItensDaLista = localStorage.getItem('Lista de Tarefas');
ol.innerHTML = ItensDaLista;
salva.addEventListener('click', salvar);

function parabaixo() {
  li = document.getElementsByTagName('li');
  const tamanho = li.length;
  for (let index = tamanho - 1; index >= 0; index -= 1) {
    if (index !== tamanho - 1 && li[index].classList.contains('itens')) {
      const valorTexto = li[index].outerHTML;
      li[index].outerHTML = li[index + 1].outerHTML;
      li[index + 1].outerHTML = valorTexto;
    }
  }
}
baixo.addEventListener('click', parabaixo);

function paracima() {
  li = document.getElementsByTagName('li');
  for (let index = 0; index < li.length; index += 1) {
    if (index !== 0 && li[index].classList.contains('itens')) {
      const valorTexto = li[index].outerHTML;
      li[index].outerHTML = li[index - 1].outerHTML;
      li[index - 1].outerHTML = valorTexto;
    }
  }
}
cima.addEventListener('click', paracima);

window.onload = function carregar() {
  while (li > 0) {
    ol.children.style.backgroundColor = 'green';
  }
};
