import { Table } from 'antd';

const AquaGSMTable = ({ dataSource }) => {
    const columnNames = ['TC', 'GSM', 'AD', 'SOYAD'];
    const columns = columnNames.map(name => ({
        title: name,
        dataIndex: name,
        key: name,
    }));

    return <Table dataSource={dataSource} columns={columns} />;
};

export default AquaGSMTable;
