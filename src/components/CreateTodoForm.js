import { useState } from 'react'
import { Button, Input, Row, Col, Divider } from 'antd';
import { useBackend } from '../context/backend-context.js';

const CreateTodoForm = ({ onSubmit }) => {
    const [todoItem, setTodoItem] = useState({ title: '', description: '' });
    const backend = useBackend();

    const handleSubmit = async () => {
        const response = await backend.post(
            'todos',
            { ...todoItem },
             false
        );
        if (response) {
            console.log(response);
            
            // Add new todo to the list
            setTodoItem({
                title: response.title,
                description: response.description
            });
            onSubmit();
        }
    }
    
    return <Row>
        <Col span={6}>
            <Input size='medium' placeholder='Title' value={todoItem.title} onChange={el => setTodoItem(prevState => ({...prevState, title: el.target.value}))}/>
        </Col>
        <Col span={6}>
            <Input size='medium' placeholder='Description' value={todoItem.description} onChange={el => setTodoItem(prevState => ({...prevState, description: el.target.value}))}/>
        </Col>
        <Button onClick={handleSubmit}>Create</Button>
        <Divider/>
    </Row>
};

export default CreateTodoForm;
