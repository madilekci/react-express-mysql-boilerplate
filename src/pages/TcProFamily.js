import { useState } from 'react';
import { Button, Input, Col, Divider, Checkbox } from 'antd';
import Swal from 'sweetalert2';

import { useBackend } from '../context/backend-context.js';
import TcProFamilyTable from '../components/TcProFamilyTable.js';
import Spinner from '../components/Spinner.js';

function AquaGSM() {
    const backend = useBackend();
    const [loading, setLoading] = useState(false);
    const [familyData, setFamilyData] = useState([]);
    const [advancedSearch, setAdvancedSearch] = useState(false);
    const [tc, setTc] = useState('');

    async function fetchData() {
        try {
            setLoading(true);
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
                { tc, advancedSearch },
                false
            );
            if (response) {
                setFamilyData(response);
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

    return (
        <div style={{ minHeight: '700px' }}>
            <h1>TC PRO - Aile</h1>
            <Col span={6} style={{ marginBottom: '8px' }}>
                <Input maxLength={11} name='TC' placeholder='TC' onChange={e => setTc(e.target.value)} onKeyDown={handleKeyDown}/>
                <Checkbox checked={advancedSearch} onChange={e => setAdvancedSearch(e.target.checked)}>Detaylı arama</Checkbox>
            </Col>
            <Col span={2}>
                <Button type='primary' disabled={loading} onClick={() => fetchData()} > Search </Button>
            </Col>
            <Divider/>
            {
                loading ?
                    <Spinner /> :
                    <TcProFamilyTable dataSource={familyData} />
            }
        </div>
    );
}

export default AquaGSM;
