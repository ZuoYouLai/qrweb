import React, {PropTypes} from "react";
import {Table,Button,Modal,Popconfirm,Popover,Pagination} from 'antd'
import {connect} from "dva";
import {Link} from 'dva/router'
import {history,redit} from '../config'
import {timeString,getQRImage} from '../utils/helper'
const List = ({dispatch,list:{data,loading,visible}}) => {

    let columns = [
        {
            title: '商品id',
            dataIndex: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
        },
        // {
        //     title: '内容',
        //     dataIndex: 'content',
        // },
        // {
        //     title: '创建时间',
        //     dataIndex: 'createdAt',
        //     key:'createdAt'
        // },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            key:'updatedAt',
            render: (text) => timeString(text)
        },
        {
            title: '操作',
            dataIndex: 'action',
            render : (text,row)=> <p>
                <Popover placement="topLeft" title="二维码查看"   content={<img className={`img${row.id}`} src={getQRImage(`${redit}${row.id}`) }/>}>
                    <Link  style={{marginRight:5}}>查看</Link>
                </Popover>
                <Link to={`/detail/${row.id}`}  style={{marginRight:5}}>编辑</Link>
                <a onClick={() => downloadIamge(`img${row.id}`,row.name) } style={{marginRight:5}}>下载二维码<img className={`img${row.id}`} src={getQRImage(`${redit}${row.id}`) } style={{display:'none'}}/></a>
                <Link> <Popconfirm title="是否要删除" onConfirm={() => handleRemove(row)} okText="删除" cancelText="取消">删除</Popconfirm> </Link>
            </p>
        }
    ]

    function downloadIamge(selector, name) {
        // 通过选择器获取img元素，
        var img = document.querySelector('.'+selector);
        // 将图片的src属性作为URL地址
        var url = img.src
        var a = document.createElement('a')
        var event = new MouseEvent('click')
        a.download = name || '下载图片名称'
        a.href = url

        a.dispatchEvent(event)
    }


    function handleRemove(row) {
        dispatch({type:'list/delete',id:row.id})
    }
    function onOpen() {

        history.push('/detail');
     //   dispatch({type:'list/setState',visible:true})
    }

    function onPageChange(page) {
        dispatch({
            type: 'list/query', payload: {page:page}
        });
    }
    return (
       <div>

           {data && data.list  &&
          <div> <Table dataSource={data.list} columns={columns} rowKey={(row,key) => key} loading={loading}  title={() => <Button onClick={onOpen}>创建</Button>} pagination={false}/>
              <Pagination
                  className="ant-table-pagination"
                  total={data.totalRecord}
                  current={data.currentPage}
                  pageSize={data.pageSize}
                  onChange={onPageChange}
              />

          </div>
           }

       </div>
    )
};

export default connect(({list}) => ({list}))(List)