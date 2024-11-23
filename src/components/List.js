import { List, Typography } from 'antd';

const CustomList = ({ todos }) => (
    <List
        header={<div>Todo list</div>}
        bordered
        dataSource={todos}
        renderItem={item => (
            <List.Item>
                <Typography.Text mark>[{item?.title}]</Typography.Text> {item?.description}
            </List.Item>
        )}
    />

);

export default CustomList;
