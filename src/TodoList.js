import React, {Component} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';
import './TodoList.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };

        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
    }

    addTodo(todo) {
        this.setState({
            todos: [...this.state.todos, todo]
        });
    }

    removeTodo(id) {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
    }

    updateTodo(id, update) {
        const updateTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return {...todo, task: update};
            }
            return todo;
        });
        this.setState({
            todos: updateTodos
        });
    }

    toggleCompletion(id) {
        const updateTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return {...todo, completed: !todo.completed};
            }
            return todo;
        });
        this.setState({
            todos: updateTodos
        });
    }

    render() {
        const todos = this.state.todos.map(todo => {
            return (
                <CSSTransition key={todo.id} timeout={500} classNames="todo">
                    <Todo 
                        id={todo.id}
                        key={todo.id}
                        task={todo.task}
                        completed={todo.completed}
                        removeTodo={this.removeTodo}
                        updateTodo={this.updateTodo}
                        toggleTodo={this.toggleCompletion}
                    />
                </CSSTransition>
            );
        });

        return (
            <div className="TodoList">
                <h1>
                    Get To Work! <span>An Animated Todo List Made With React Hooks</span>
                </h1>
                <NewTodoForm addTodo={this.addTodo} />

                <ul>
                    <TransitionGroup className="todo-list">
                        {todos}
                    </TransitionGroup>
                </ul>
            </div>
        );
    }
}

export default TodoList;