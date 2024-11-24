import { Table } from 'antd';

const TcProFamilyTable = ({ dataSource }) => {
    // dataSource is an array of objects like below:
    // dataSource = [{
    //     TC: '19000000000',
    //     AD: 'Muhammed Ali',
    //     SOYAD: 'Dilekçi',
    //     GSM: '5427459710',
    //     DOGUMTARIHI: '12.02.1928',
    //     DOGUMYERI: 'Çelikhan/Adıyaman',
    //     ADRESIL: 'İstanbul',
    //     ADRESILCE: 'Zeytinburnu',
    //     YAKINLIK: 'Kendisi',
    //     DIGERGSM: ['5337459710', '5327459710', '5317459710'],
    // },
    // {
    //     TC: '19054321099',
    //     AD: 'Ramazan',
    //     SOYAD: 'Dilekçi',
    //     GSM: '5337459710',
    //     DOGUMTARIHI: '05.03.1966',
    //     DOGUMYERI: 'Çelikhan/Adıyaman',
    //     ADRESIL: 'Malatya',
    //     ADRESILCE: 'Yeşilyurt',
    //     YAKINLIK: 'Babası',
    //     DIGERGSM: ['5337459710', '5327459710', '5317459710'],
    // }
    // ];

    const columnNames = ['YAKINLIK', 'TC', 'AD', 'SOYAD', 'GSM', 'DOGUMTARIHI', 'DOGUMYERI', 'ADRESIL', 'ADRESILCE'];
    const columns = [
        ...columnNames.map(columnName => ({
            title: columnName,
            dataIndex: columnName,
            key: columnName
        }))
    ];

    return <Table
        rowKey={record => record.TC}
        dataSource={dataSource}
        columns={columns}
        expandable={{
            expandedRowRender: data => (
                <>
                    {
                        data.DIGERGSM?.length && (
                            <>
                                <h3>Diğer GSM</h3>
                                <ul>
                                    {data.DIGERGSM?.map((gsm, index) => (
                                        <li key={index}>{gsm}</li>
                                    ))}
                                </ul>
                            </>
                        )
                    }
                </>
            ),
        }}
    />;
};

export default TcProFamilyTable;
