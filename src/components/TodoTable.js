import { Table } from 'antd';

const TodoTable = ({ dataSource }) => {
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        }
    ];

    console.log('dataSource', dataSource);
    return <Table dataSource={dataSource} columns={columns} />;
};

export default TodoTable;
