const List = ({ todos }) => (
    <ul>
        { todos ?
            todos?.map((todo, index) => (
                <li key={index}>{todo.title}
                    <p>{todo.description}</p>
                </li>
            )) :
            <li>Nothing to show</li>
        }
    </ul>
);

export default List;
