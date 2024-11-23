import { useState } from 'react';
import { Button, Input, Col, Divider } from 'antd';

import Utils from '../helpers/utils.js';
import { useBackend } from '../context/backend-context.js';
import TcProPersonalTable from '../components/TcProPersonalTable.js';

function AquaGSM() {
    const backend = useBackend();
    const [personalData, setPersonalData] = useState([]);
    const [filter, setFilter] = useState({
        TC: undefined,
        GSM: undefined,
        AD: undefined,
        SOYAD: undefined
    });

    async function fetchData(filter = {}) {
        filter = Utils.removeEmptyStrings(filter);
        const response = await backend.post(
            'tcPro/personal',
            {
                filter: filter ? { ...filter } : undefined,
            },
            false
        );
        if (response) {
            setPersonalData(response);
        }
    }

    const handleChange = e => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ minHeight: '700px' }}>
            <h1>TC PRO</h1>
            <Col span={6} style={{ marginBottom: '8px' }}>
                <Input name='TC' placeholder='TC' onChange={handleChange} />
            </Col>
            <Col span={6} style={{ marginBottom: '8px' }}>
                <Input name='GSM' placeholder='GSM' onChange={handleChange} />
            </Col>
            <Col span={6} style={{ marginBottom: '8px' }}>
                <Input name='AD' placeholder='AD' onChange={handleChange} />
            </Col>
            <Col span={6} style={{ marginBottom: '8px' }}>
                <Input name='SOYAD' placeholder='SOYAD' onChange={handleChange} />
            </Col>
            <Button type='primary' onClick={() => fetchData(filter)} > Search </Button>
            <Divider/>
            <TcProPersonalTable dataSource={personalData} />
        </div>
    );
}

export default AquaGSM;
