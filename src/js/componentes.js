import { Todo } from '../classes';

import  {  todolist } from '../index';

// referencias en html
const divTodoList     = document.querySelector('.todo-list');
const txtInput        = document.querySelector('.new-todo');
const btnBorrar       = document.querySelector('.clear-completed');
const ulFiltors       = document.querySelector('.filters');
const anchorFiltros   = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo) => {

const htmlTodo = `
<li class="${ (todo.completado) ? 'completed' : ''}" data-id="${ todo.id }">
<div class="view">
    <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
    <label>${ todo.tarea }</label>
    <button class="destroy"></button>
</div>
<input class="edit" value="Create a TodoMVC template">
</li>`

const div = document.createElement('div');
div.innerHTML = htmlTodo;


divTodoList.append( div.firstElementChild );

return div.firstElementChild;

}


// Eventos
txtInput.addEventListener('keyup', (event) => {

    if (event.keyCode ===13 && txtInput.value.length > 0) {

        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todolist.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
    }


});

divTodoList.addEventListener('click', (event) => {


    const nombreElemento = event.target.localName;   // = Imput, label o button
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) {  // click en check
        todolist.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    } else if( nombreElemento.includes('button')) { // hay que biorrar el todo

        todolist.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );

    }


});


btnBorrar.addEventListener('click', () => {

    todolist.eliminarCompletados();

    for( let i = divTodoList.children.length-1; i >= 0; i-- ){

        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild(elemento);
        }

    }

});

ulFiltors.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if( !filtro ){ return };

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){

            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
                break;

                case 'Completados':
                    if( !completado ){
                        elemento.classList.add('hidden');
                    }
                    break;


        }

    }



});


