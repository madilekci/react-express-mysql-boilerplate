import { useState } from 'react';
import { Button, Input, Col, Divider } from 'antd';
import Swal from 'sweetalert2';

import { useBackend } from '../context/backend-context.js';
import TcProFamilyTable from '../components/TcProFamilyTable.js';

function AquaGSM() {
    const backend = useBackend();
    const [familyData, setFamilyData] = useState([]);
    const [tc, setTc] = useState('');

    async function fetchData(tc) {
        if (!tc || tc.length !== 11) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'TC kimlik no 11 haneli olmalıdır!',
            });
            return;
        }
        const response = await backend.post(
            'tcPro/family',
            {
                filter: { TC: tc },
            },
            false
        );
        if (response) {
            setFamilyData(response);
        }
    }

    return (
        <div style={{ minHeight: '700px' }}>
            <h1>TC PRO - Aile</h1>
            <Col span={6} style={{ marginBottom: '8px' }}>
                <Input maxLength={11} name='TC' placeholder='TC' onChange={e => setTc(e.target.value)} />
            </Col>
            <Button type='primary' onClick={() => fetchData(tc)} > Search </Button>
            <Divider/>
            <TcProFamilyTable dataSource={familyData} />
        </div>
    );
}

export default AquaGSM;
