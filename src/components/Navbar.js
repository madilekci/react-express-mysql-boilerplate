import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'

const { Header } = Layout

const Navbar = () => (
	<Header>
		<div className="logo" />
		<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
			<Menu.Item key="1">
				<Link to="/">Home</Link>
			</Menu.Item>
			<Menu.Item key="2">
				<Link to="/aqua-gsm">Aqua GSM</Link>
			</Menu.Item>
			<Menu.Item key="3">
				<Link to="/tcpro-personal">TC PRO - Kişisel bilgiler</Link>
			</Menu.Item>
			<Menu.Item key="4">
				<Link to="/tcpro-family">TC PRO - Aile</Link>
			</Menu.Item>
		</Menu>
	</Header>
)

export default Navbar
