import React, { useEffect, useState } from 'react';

import { useBackend } from '../../context/backend-context.jsx';
import List from '../components/list.js';

function Home() {
    const backend = useBackend();
    const [todos, setTodos] = useState([]);

    useEffect(async() => {
        // Send a GET request to backend endpoint and get the list of todos
        const response = await backend.get('todos', {}, false);
        if (response) {
            // Add new todo to the list
            setTodos(response.data);
        }
    }, []);

    return (
        <div style={{ minHeight: '700px' }}>
            <h1>Home</h1>
            <List todos={todos} />
        </div>
    );
}

export default Home;
