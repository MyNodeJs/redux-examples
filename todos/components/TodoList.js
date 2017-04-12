import React, { Component, PropTypes } from 'react';
import Todo from './Todo';

export default class TodoList extends Component {
	render() {
		return (
			<ul>
				{this.props.todos.filter((todo, index) => {
					if(this.props.filter == 'SHOW_ALL') {
						return true;
					} else if(this.props.filter == 'SHOW_COMPLETED') {
						if(todo.completed == true) {
							return true;
						}
					} else {
						if(todo.completed == false) {
							return true;
						}
					}
				}).map((todo, index) => 
					<Todo {...todo}
						key={index}
						onClick={() => this.props.onTodoClick(index)} />
				)}
			</ul>
		);
	}
}

TodoList.propTypes = {
	onTodoClick: PropTypes.func.isRequired,
	todos: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired
	}).isRequired).isRequired
};