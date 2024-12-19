import { useState } from 'react';
import { Button, Input, Col, Divider } from 'antd';

import Utils from '../helpers/utils.js';
import { useBackend } from '../context/backend-context.js';
import AquaGSMTable from '../components/AquaGSMTable.js';
import Spinner from '../components/Spinner.js';

function AquaGSM() {
    const backend = useBackend();
    const [loading, setLoading] = useState(false);
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
            {
                loading ?
                    <Spinner /> :
                    <AquaGSMTable dataSource={aquaGSMs} />
            }
        </div>
    );
}

export default AquaGSM;
