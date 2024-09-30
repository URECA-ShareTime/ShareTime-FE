import axios from 'axios';
import moment from 'moment';

export const getTodosByDate = async (today) => {
  try {
    const response = await axios.get('http://localhost:8080/main/todos', {
			params: {
				date: today,
			},
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});
		
    if (response.status === 200) {
      const todos = response.data;
      console.log('Todos fetched successfully:', todos);
      return todos;
    } else {
      console.error('Unexpected response:', response.status);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
  return [];
};

export const createTodo = async (newTodo) => {
	const parsedTodo = {
		title: newTodo.title,
		description: newTodo.description,
		created_at: newTodo.date,
		is_completed: newTodo.isCompleted,
	};

	try {
		const response = await axios.post('http://localhost:8080/main/todos', parsedTodo, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});

		if (response.status === 201) {
			const createTodo = response.data;
			console.log('Todo created successfully:', createTodo);
			return createTodo;
		} else {
			console.error('Unexpected response:', response.status);
		}
	} catch (error) {
		console.error('Network error:', error);
	}
	return null;
};

export const updateTodo = async (todo) => {
	const parsedTodo = {
		...todo,
		todo_id: todo.id,
		title: todo.title,
		description: todo.description,
		created_at: todo.date,
		is_completed: todo.isCompleted,
	};

	console.log(parsedTodo);

	try {
		const response = await axios.put(`http://localhost:8080/main/todos/${parsedTodo.todo_id}`, parsedTodo, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.status === 200) {
			const updateTodo = response.data;
			console.log('Todo updated successfully:', updateTodo);
			return updateTodo;
		} else {
			console.error('Unexpected response:', response.status);
		}
	} catch (error) {
		console.error('Network error:', error);
	}
	return null;
}

export const deleteTodo = async (id) => {
	try {
		const response = await axios.delete(`http://localhost:8080/main/todos/${id}`);

		if (response.status === 200) {
			const updateTodo = response.data;
			console.log('Todo deleted successfully:', updateTodo);
			return updateTodo;
		} else {
			console.error('Unexpected response:', response.status);
		} 
	} catch (error) {
		console.error('Network error:', error);
	}
	return null;
}
