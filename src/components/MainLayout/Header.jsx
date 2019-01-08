import React, { PropTypes } from 'react';
import { Menu, Dropdown, Icon} from 'antd';
import {Link} from "dva/router";
import styles from './Header.less'
import { history } from '../../config'
import strings from '../../constants/strings';
import {loadValidator, clearValidator} from '../../models/validator';
import { connect } from 'dva';
function Header({dispatch, menus}) {

    function logout() {
        dispatch({type:'login/logout'});
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <a onClick={logout}> <Icon type="logout"/> &nbsp;&nbsp;{strings.getString('header_quit')}</a>
            </Menu.Item>
        </Menu>
    );

    let userName = loadValidator();
    return (
        <div className={styles.header}>
            <div className={styles.brand}>
                <div className={styles.logoimg}></div>
                <div></div>
            </div>
            <div className={styles.user}>
                <Dropdown overlay={menu} placement="bottomLeft">
                    <div className={styles.headerBut}><Icon type="user" className={styles.IconCom}/> {userName.userName}<Icon type="caret-down" /></div>
                </Dropdown>



            </div>
        </div>
    );

}


export default connect(({login}) => ({login}))(Header);
