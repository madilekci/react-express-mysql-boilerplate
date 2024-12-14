// src/pages/Home.js

import React from 'react'
import { Layout } from 'antd'
import Navbar from '../components/Navbar'
import HomeInfo from '../components/HomeInfo'

const { Content } = Layout

const Home = () => (
	<Layout>
		<Navbar />
		<Content style={{ padding: '0 50px', minHeight: '700px' }}>
			<div className="site-layout-content">
				<HomeInfo />
			</div>
		</Content>
	</Layout>
)

export default Home
