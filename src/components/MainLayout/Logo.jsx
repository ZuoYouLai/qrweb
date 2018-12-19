import React, { PropTypes } from 'react';
import styles from './Logo.less'
import { Link } from 'dva/router';
import strings from '../../constants/strings';

function Logo({menus}) {
       const logo = require('../../assets/images/logoWhite.png');

        return (
            <div className="logo">
                <Link to="/"><img src={logo} className="logoImg"/>{strings.getString('Ljia系统')}</Link>

            </div>
        )

}

export default Logo;
