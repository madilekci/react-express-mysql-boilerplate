import React from 'react';

const List = todos => (
    <ul>
        {todos.map((todo, index) => (
            <li key={index}>{todo.title}
                <p>{todo.description}</p>
            </li>
        ))}
    </ul>
);

export default List;
