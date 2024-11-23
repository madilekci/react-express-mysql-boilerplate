import { useEffect, useState } from 'react';
import { useBackend } from '../context/backend-context.js';
import TodoTable from '../components/TodoTable.js';
import CreateTodoForm from '../components/CreateTodoForm.js';

function Home() {
    const backend = useBackend();
    const [todos, setTodos] = useState([]);

    async function fetchData() {
        console.log('Fetching data...');

        const response = await backend.get('todos', {}, false);
        if (response) {
            // Add new todo to the list
            setTodos(response);
        }
    }

    useEffect(() => {
        fetchData();
    }, [backend, fetchData]);

    return (
        <div style={{ minHeight: '700px' }}>
            <h1>Home</h1>
            <CreateTodoForm onSubmit={fetchData}/>
            <TodoTable dataSource={todos} />
        </div>
    );
}

export default Home;
