import { useState } from 'react';
import { Button, Input, Col, Divider } from 'antd';

import Utils from '../helpers/utils.js';
import { useBackend } from '../context/backend-context.js';
import TcProPersonalTable from '../components/TcProPersonalTable.js';
import Spinner from '../components/Spinner.js';

function AquaGSM() {
    const backend = useBackend();
    const [loading, setLoading] = useState(false);
    const [personalData, setPersonalData] = useState([]);
    const [filter, setFilter] = useState({
        TC: undefined,
        GSM: undefined,
        AD: undefined,
        SOYAD: undefined
    });

    async function fetchData() {
        try {
            setLoading(true);
            const _filter = Utils.removeEmptyStrings(filter);
            const response = await backend.post(
                'tcPro/personal',
                {
                    filter: _filter ? { ..._filter } : undefined,
                },
                false
            );
            if (response) {
                setPersonalData(response);
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter' && !loading) {
            fetchData();
        }
    };

    const handleChange = e => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ minHeight: '700px' }}>
            <h1>TC PRO - Kişisel Bilgiler</h1>
            <Col span={6} style={{ marginBottom: '8px' }}>
                <Input name='TC' placeholder='TC' onChange={handleChange} onKeyDown={handleKeyDown} />
            </Col>
            <Col span={6} style={{ marginBottom: '8px' }}>
                <Input name='GSM' placeholder='GSM' onChange={handleChange} onKeyDown={handleKeyDown} />
            </Col>
            <Col span={6} style={{ marginBottom: '8px' }}>
                <Input name='AD' placeholder='AD' onChange={handleChange} onKeyDown={handleKeyDown} />
            </Col>
            <Col span={6} style={{ marginBottom: '8px' }}>
                <Input name='SOYAD' placeholder='SOYAD' onChange={handleChange} onKeyDown={handleKeyDown} />
            </Col>
            <Button type='primary' disabled={loading} onClick={() => fetchData()} > Search </Button>
            <Divider/>
            {
                loading ?
                    <Spinner /> :
                    <TcProPersonalTable dataSource={personalData} />
            }
        </div>
    );
}

export default AquaGSM;
