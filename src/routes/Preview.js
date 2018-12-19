import React, {PropTypes} from "react";
import {Table,Button} from 'antd'
import {connect} from "dva";
import {Link} from 'dva/router'
import style from './List.less'
const Preview = ({list:{previewItem}}) => {

    console.log(previewItem)
    return (
        <div className={style.preview} dangerouslySetInnerHTML={{ __html: previewItem.content}}>

        </div>
    )
};

export default connect(({list}) => ({list}))(Preview)