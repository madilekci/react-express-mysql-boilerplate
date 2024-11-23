import { useState } from 'react';
import { Button, Input, Col, Divider } from 'antd';

import Utils from '../helpers/utils.js'
import { useBackend } from '../context/backend-context.js';
import AquaGSMTable from '../components/AquaGSMTable.js';

function AquaGSM() {
    const backend = useBackend();
    const [aquaGSMs, setAquaGSMs] = useState([]);
    const [filter, setFilter] = useState({
        TC: undefined,
        GSM: undefined
    });

    async function fetchData(filter = {}) {
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

    return (
        <div style={{ minHeight: '700px'}}>
            <h1>TC - GSM</h1>
            <Col span={6} style={{ marginBottom: '8px' }}>
                <Input placeholder="TC" onChange={e => setFilter({ ...filter, TC: e.target.value })} />
            </Col>
            <Col span={6} style={{ marginBottom: '8px' }}>
                <Input placeholder="GSM" onChange={e => setFilter({ ...filter, GSM: e.target.value })} />
            </Col>
            <Button type="primary" onClick={() => fetchData(filter)} > Search </Button>
            <Divider/>
            <AquaGSMTable dataSource={aquaGSMs} />
        </div>
    );
}

export default AquaGSM;
