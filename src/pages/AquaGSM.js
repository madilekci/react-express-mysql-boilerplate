import { useState } from 'react';
import { Button, Input, Col, Divider, Spin } from 'antd';

import Utils from '../helpers/utils.js';
import { useBackend } from '../context/backend-context.js';
import AquaGSMTable from '../components/AquaGSMTable.js';

function AquaGSM() {
    const [loading, setLoading] = useState(false);
    const backend = useBackend();
    const [aquaGSMs, setAquaGSMs] = useState([]);
    const [filter, setFilter] = useState({
        TC: undefined,
        GSM: undefined
    });

    const fetchData = async(filter = {}) => {
        try {
            setLoading(true);
            filter = Utils.removeEmptyStrings(filter);
            const response = await backend.post(
                'aquaGSM',
                {
                    filter: filter ? { ...filter } : undefined,
                },
                false
            );
            if (response) {
                setAquaGSMs(response);
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter' && !loading) {
            fetchData(filter);
        }
    };

    return (
        <div style={{ minHeight: '700px' }}>
            <h1>TC - GSM</h1>
            <Col span={6} style={{ marginBottom: '8px' }}>
                <Input placeholder="TC" onKeyDown={handleKeyDown} onChange={e => setFilter({ ...filter, TC: e.target.value })} />
            </Col>
            <Col span={6} style={{ marginBottom: '8px' }}>
                <Input placeholder="GSM" onKeyDown={handleKeyDown} onChange={e => setFilter({ ...filter, GSM: e.target.value })} />
            </Col>
            <Button type="primary" disabled={loading} onClick={() => fetchData(filter)}>
				Search
            </Button>
            <Divider />
            {loading ? (
                <Spin tip="Yükleniyor... Lütfen Bekleyiniz!">
                    <div style={{ minHeight: '300px' }}></div>{' '}
                </Spin>
            ) : (
                <AquaGSMTable dataSource={aquaGSMs} />
            )}
        </div>
    );
}

export default AquaGSM;
