import React from 'react';
import { Layout, Menu, Typography, Space, Button } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeOutlined, 
  RobotOutlined, 
  ProfileOutlined, 
  ScheduleOutlined, 
  SearchOutlined, 
  GithubOutlined,
  LogoutOutlined 
} from '@ant-design/icons';
import './MainLayout.css';
const { Header, Content, Footer } = Layout;
const { Title, Text, Link: AntLink } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Add authentication state

  // Add logout handler
  const handleLogout = () => {
    // Add your logout logic here (e.g., clear token from localStorage)
    localStorage.removeItem('user_token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  // Check authentication status on component mount
  React.useEffect(() => {
    const token = localStorage.getItem('user_token');
    setIsLoggedIn(!!token);
  }, []);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: '/chatbot',
      icon: <RobotOutlined />,
      label: <Link to="/chatbot">Chatbot</Link>,
    },
    {
      key: '/tasks',
      icon: <ScheduleOutlined />,
      label: <Link to="/tasks">Quản lý công việc</Link>,
    },
    {
      key: '/profile',
      icon: <ProfileOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: '/document-search',
      icon: <SearchOutlined />,
      label: <Link to="/document-search">Tìm kiếm tài liệu</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header 
        style={{ 
          padding: '0 24px', 
          background: '#001529', 
          height: '64px', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Space align="center">
          <img 
            src="./logo.png" 
            alt="Logo" 
            style={{ height: '130px', marginRight: '30px' }} 
          />
          <Title 
            level={2} 
            style={{ 
              color: '#fff', 
              margin: 0,
              //textTransform: 'uppercase',
              //fontFamily: '"Poppins", sans-serif',
              fontWeight: 'bold' 
            }}
          >
          PHÒNG KỸ THUẬT - CÔNG NGHỆ
          </Title>
        </Space>
        <Space>
          <Text style={{ color: '#fff', marginRight: '16px' }}>Version 1.0</Text>
          {isLoggedIn && (
            <Button 
              type="primary" 
              danger 
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
          )}
        </Space>
      </Header>
      
      <Header 
        style={{ 
          padding: 0, 
          background: '#fff', 
          height: '0px', 
          lineHeight: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ 
            justifyContent: 'center',
            height: '64px',  // Match menu height with header
            lineHeight: '64px', // Match line height for vertical centering
            fontSize: '16px'  // Optional: increase font size
          }}
        />
      </Header>
      
      <Content 
        className='main-content' 
        style={{ 
          padding: '0px',
          height: 'calc(100vh - 250px)', // Updated to account for footer
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {children}
      </Content>

      <Footer
        style={{
          textAlign: 'center',
          background: '#69b1ff',
          color: '#fff',
          height: '60px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Space direction="vertical" size={4}>
          <Text style={{ color: '#fff' }}>
            PHÒNG KỸ THUẬT-CÔNG NGHỆ / NHÀ MÁY X52 / CỤC HẬU CẦN-KỸ THUẬT QCHQ
          </Text>
          <Space split={<Text style={{ color: '#fff' }}>|</Text>}>
            <AntLink 
              href="https://github.com/remiehneppo/chatbot-fe" 
              target="_blank"
              style={{ color: '#fff' }}
            >
              <Space>
                <GithubOutlined />
                Trần Đức Bảo - P.KT-CN
              </Space>
            </AntLink>
            <AntLink 
              href="https://github.com/remiehneppo/chatbot-be" 
              target="_blank"
              style={{ color: '#fff' }}
            >
              <Space>
                <GithubOutlined />
                Nguyễn Trọng Đạt - P.KT-CN
              </Space>
            </AntLink>
          </Space>
        </Space>
      </Footer>
    </Layout>
  );
};

export default MainLayout;