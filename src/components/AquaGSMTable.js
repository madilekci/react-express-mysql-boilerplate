import { Table } from 'antd';

const AquaGSMTable = ({ dataSource }) => {
    const columns = [
        {
            title: 'TC',
            dataIndex: 'TC',
            key: 'TC'
        },
        {
            title: 'GSM',
            dataIndex: 'GSM',
            key: 'GSM'
        }
    ];

    return <Table dataSource={dataSource} columns={columns} />;
};

export default AquaGSMTable;
