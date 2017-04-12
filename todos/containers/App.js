import React, { Component } from 'react';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			filter: 'SHOW_ALL',
			todos: [{
				text: 'Use Redux',
				completed: true
			}, {
				text: 'Learn to connect it to React',
				completed: false
			}]
		};
	}

	render() {
		return (
			<div>
				<AddTodo
					onAddClick={text => 
						this.setState({todos: [...this.state.todos, {text, completed: false}]})
					} />
				<TodoList
					filter={this.state.filter}
					todos={this.state.todos}
					onTodoClick={index => 
						this.setState({todos: this.state.todos.map((todo, i) => {
							if(i == index) {
								return Object.assign({}, todo, {completed: !todo.completed});
							}

							return todo;
						})})
					} />
				<Footer
					filter={this.state.filter}
					onFilterChange={filter => 
						this.setState({filter})
					} />
			</div>
		);
	}
}