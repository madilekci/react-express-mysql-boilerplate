import { Table } from 'antd';

const TcProPersonalTable = ({ dataSource }) => {
    // dataSource is an array of objects like below:
    dataSource = [{
        TC: '19000000000',
        AD: 'Muhammed Ali',
        SOYAD: 'Dilekçi',
        GSM: '5427459710',
        BABAADI: 'Ramazan',
        BABATC: '19103024024',
        ANNEADI: 'Ayşegül',
        ANNETC: '19203024024',
        DOGUMTARIHI: '12.02.1928',
        AILESIRANO: '234',
        BIREYSIRANO: '523',
        MEDENIHAL: 'Evli',
        CINSIYET: 'Erkek',
        OLUMTARIHI: 'YOK',
        DOGUMYERI: 'Çelikhan/Adıyaman',
        MEMLEKETIL: 'Adıyaman',
        MEMLEKETILCE: 'Çelikhan',
        MEMLEKETKOY: 'Bistikhan',
        ADRESIL: 'İstanbul',
        ADRESILCE: 'Zeytinburnu',
        DIGERGSM: ['5337459710', '5327459710', '5317459710']
    }];

    const columnNames = ['TC', 'AD', 'SOYAD', 'GSM', 'BABAADI', 'BABATC', 'ANNEADI', 'ANNETC', 'DOGUMTARIHI'];
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
                                    {data.DIGERGSM.map((gsm, index) => (
                                        <li key={index}>{gsm}</li>
                                    ))}
                                </ul>
                                <hr/>
                            </>
                        )
                    }
                    <p>
                        <b>Aile Sıra No:</b> {data.AILESIRANO} <br/>
                        <b>Birey Sıra No:</b> {data.BIREYSIRANO} <br/>
                        <b>Medeni Hal:</b> {data.MEDENIHAL} <br/>
                        <b>Cinsiyet:</b> {data.CINSIYET}
                    </p>
                    <p>
                        <b>Ölüm Tarihi:</b> {data.OLUMTARIHI} <br/>
                        <b>Doğum Yeri:</b> {data.DOGUMYERI} <br/>
                        <b>Memleket İl:</b> {data.MEMLEKETIL} <br/>
                        <b>Memleket İlçe:</b> {data.MEMLEKETILCE} <br/>
                        <b>Memleket Köy:</b> {data.MEMLEKETKOY} <br/>
                        <b>Adres İl:</b> {data.ADRESIL} <br/>
                        <b>Adres İlçe:</b> {data.ADRESILCE}
                    </p>
                </>
            ),
        }}
    />;
};

export default TcProPersonalTable;
