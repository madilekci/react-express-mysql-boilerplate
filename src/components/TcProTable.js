import { Table } from 'antd';

const TcProTable = ({ dataSource }) => {
    // dataSource is an array of objects like below:
    // dataSource = [{
    //     TC: '19000000000',
    //     AD: 'Muhammed Ali',
    //     SOYAD: 'Dilekçi',
    //     GSM: '5427459710',
    //     BABAADI: 'Ramazan',
    //     BABATC: '19103024024',
    //     ANNEADI: 'Ayşegül',
    //     ANNETC: '19203024024',
    //     DOGUMTARIHI: '12.02.1928',
    //     AILESIRANO: '234',
    //     BIREYSIRANO: '523',
    //     MEDENIHAL: 'Evli',
    //     CINSIYET: 'Erkek',
    //     OLUMTARIHI: 'YOK',
    //     DOGUMYERI: 'Çelikhan/Adıyaman',
    //     MEMLEKETIL: 'Adıyaman',
    //     MEMLEKETILCE: 'Çelikhan',
    //     MEMLEKETKOY: 'Bistikhan',
    //     ADRESIL: 'İstanbul',
    //     ADRESILCE: 'Zeytinburnu'
    // }];

    const columnNames = ['TC', 'AD', 'SOYAD', 'GSM', 'BABAADI', 'BABATC', 'ANNEADI', 'ANNETC', 'DOGUMTARIHI'];
    const columns = [
        ...columnNames.map(columnName => ({
            title: columnName,
            dataIndex: columnName,
            key: columnName
        }))
    ];

    return <Table
        dataSource={dataSource}
        columns={columns}
        expandable={{
            expandedRowRender: data => (
                <>
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
            rowExpandable: record => record.name !== 'Not Expandable'
        }}
    />;
};

export default TcProTable;
