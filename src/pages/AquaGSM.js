import { useState, useRef } from 'react'
import { Button, Input, Col, Divider, Spin } from 'antd'

import Utils from '../helpers/utils.js'
import { useBackend } from '../context/backend-context.js'
import AquaGSMTable from '../components/AquaGSMTable.js'

function AquaGSM() {
	const backend = useBackend()
	const [aquaGSMs, setAquaGSMs] = useState([])
	const [filter, setFilter] = useState({
		TC: undefined,
		GSM: undefined
	})

	const [loading, setLoading] = useState(false)
	const searchButtonRef = useRef(null)

	async function fetchData(filter = {}) {
		setLoading(true)
		filter = Utils.removeEmptyStrings(filter)
		const response = await backend.post(
			'aquaGSM',
			{
				filter: filter ? { ...filter } : undefined
			},
			false
		)
		if (response) {
			setAquaGSMs(response)
		}
		setLoading(false)
	}

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			searchButtonRef.current.click()
		}
	}

	return (
		<div style={{ minHeight: '700px' }}>
			<h1>TC - GSM</h1>
			<Col span={6} style={{ marginBottom: '8px' }}>
				<Input placeholder="TC" onKeyDown={handleKeyDown} onChange={(e) => setFilter({ ...filter, TC: e.target.value })} />
			</Col>
			<Col span={6} style={{ marginBottom: '8px' }}>
				<Input placeholder="GSM" onKeyDown={handleKeyDown} onChange={(e) => setFilter({ ...filter, GSM: e.target.value })} />
			</Col>
			<Button type="primary" ref={searchButtonRef} disabled={loading} onClick={() => fetchData(filter)}>
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
	)
}

export default AquaGSM
