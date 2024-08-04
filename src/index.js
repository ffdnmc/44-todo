import './styles.css';

import { Todo, TodoList } from "./classes";
import { crearTodoHtml } from './js/componentes';


export const todolist = new TodoList();

// todolist.todos.forEach(todo => crearTodoHtml(todo) );  // equivalente
todolist.todos.forEach(crearTodoHtml );

console.log( 'todos:', todolist.todos );
