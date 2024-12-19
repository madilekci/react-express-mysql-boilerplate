import { Layout } from 'antd';
import HomeInfo from '../components/HomeInfo';

const { Content } = Layout;

const Home = () => (
    <Layout>
        <Content style={{ padding: '0 50px', minHeight: '700px' }}>
            <div className="site-layout-content">
                <HomeInfo />
            </div>
        </Content>
    </Layout>
);

export default Home;
