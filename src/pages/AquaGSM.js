import { useState } from 'react';
import { Button, Input } from 'antd';

import { useBackend } from '../context/backend-context.js';
import AquaGSMTable from '../components/AquaGSMTable.js';

function AquaGSM() {
    const backend = useBackend();
    const [aquaGSMs, setAquaGSMs] = useState([]);
    const [filter, setFilter] = useState({
        TC: null,
        GSM: null
    });

    async function fetchData(filter = {}, sort = {}) {
        const response = await backend.get(
            'aquaGSM',
            {
                filter: filter ? { ...filter } : undefined,
                sort: sort ? { ...sort } : undefined
            },
            false
        );
        if (response) {
            setAquaGSMs(response);
        }
    }

    return (
        <div style={{ minHeight: '700px' }}>
            <h1>TC - GSM</h1>
            <Input placeholder="TC" onChange={e => setFilter({ ...filter, TC: e.target.value })} />
            <Input placeholder="GSM" onChange={e => setFilter({ ...filter, GSM: e.target.value })} />
            <Button type="primary" onClick={() => fetchData(filter)} > Search </Button>
            <AquaGSMTable dataSource={aquaGSMs} />
        </div>
    );
}

export default AquaGSM;
