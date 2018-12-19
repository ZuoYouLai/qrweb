import React, { PropTypes } from 'react';
import { connect } from 'dva';
import styles from './MainLayout.less';
import Header from './Header';
import Menu from './Menu';
import { Layout } from 'antd';
import Logo from './Logo';
const {  Content } = Layout;

function MainLayout({ children, location , menus,dispatch}) {

    return (
    <Layout style={{ height:'100%'}} className="ant-layout-has-sider">
        <Menu location={location} menus={menus} dispatch={dispatch}/>
        <Layout>
            <Header location={location} menus={menus}/>
            <Content id="contMain">
                <div className={styles.main}>
                    {children}
                </div>
            </Content>
        </Layout>
    </Layout>


    );
}
export default MainLayout