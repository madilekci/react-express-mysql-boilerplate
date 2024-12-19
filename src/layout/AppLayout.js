import { Layout as AntLayout } from 'antd';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const { Content } = AntLayout;

const AppLayout = () => (
    <AntLayout>
        <Navbar />
        <Content style={{ padding: '0 50px', minHeight: '700px' }}>
            <div className="site-layout-content">
                <Outlet />
            </div>
        </Content>
    </AntLayout>
);

export default AppLayout;
