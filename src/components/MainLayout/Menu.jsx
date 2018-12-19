import React, { PropTypes } from 'react';
import {Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import strings from '../../constants/strings';
import Logo from "./Logo";
import styles from '../../routes/users.less';
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item
const {  Sider } = Layout;
const SiderC  = React.createClass({

        onCollapse (){
            this.setState({
            collapsed:!this.state.collapsed,
            mode: !this.state.collapsed ? 'vertical' : 'inline',
            })
        },
       // const dispatch = this.props.dispatch;
        //dispatch({type: 'count/setRefresh'})


        getInitialState() {
            return {
                current: '1',
                openKeys: [],
                collapsed: false,
                mode: 'inline',

            };
        },
        handleClick(e) {

            this.setState({ current: e.key });
        },
        onOpenChange(openKeys) {
            const state = this.state;
            const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
            const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
        
            let nextOpenKeys = [];
            if (latestOpenKey) {
                nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
            }
            if (latestCloseKey) {
                nextOpenKeys = this.getAncestorKeys(latestCloseKey);
            }
            this.setState({ openKeys: nextOpenKeys });
        },
        getAncestorKeys(key) {
            const map = {
                sub1: ['sub1'],
            };
            return map[key] || [];
        },
        render() {
        const menus = this.props.menu[this.props.menus]
        const user = this.props.menus;
        return (
            <Sider style={{ height:'100%'}}

                   width="200"
                   trigger={null}
                   collapsible
                   collapsed={this.state.collapsed}>
                <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.onCollapse}
                />

                <Logo menus={user}/>
            <Menu
                theme='dark'
                mode={this.state.mode}
                openKeys={this.state.openKeys}
                selectedKeys={[this.state.current]}
                onOpenChange={this.onOpenChange}
                onClick={this.handleClick}
             >

                {menus.map((menu, i) => (
                    <SubMenu key={`sub${i}`}
                             title={<Link to={menu.url}>
                                 <span className="menuIcon"><i  className={styles.icon} dangerouslySetInnerHTML={{__html:menu.icon}}/><span>{strings.getString(menu.label)}</span></span>
                             </Link>}>{
                        menu.items && menu.items.map((item, j) => (
                            <MenuItem key={`${i}${j}`}><Link to={item.url}>{strings.getString(item.label)}</Link></MenuItem>
                        ))
                    }</SubMenu>
                ))}
            </Menu>
            </Sider>
         );
        }
    })


SiderC.propTypes = {
    menus: PropTypes.string.isRequired,
}

export default connect(({menu}) => ({menu}))(SiderC)