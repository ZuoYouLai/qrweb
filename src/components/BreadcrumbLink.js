import React from "react";
import {Icon,Breadcrumb} from 'antd'
import {Link} from 'dva/router'
import {isUser} from '../models/validator';
import strings from '../constants/strings';
const BreadcrumbLink = ({ items}) => {


    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>

                    <Link to={isUser() === true ? `/` : `/admin`}>
                        <Icon type="home" />{ strings.getString('menu_index')}
                    </Link>
                </Breadcrumb.Item>
                {items.length ? items.map((item, i) => (
                    <Breadcrumb.Item  key={`bread_${i}`}>
                        <Link to={item.href}>
                            <Icon type={item.icon} />
                            <span dangerouslySetInnerHTML={{__html: item.text}} />
                        </Link>
                    </Breadcrumb.Item>
                    )):
                    ''
                    }
            </Breadcrumb>
        </div>
    )
}
export default BreadcrumbLink


