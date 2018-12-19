import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import {history,api} from '../config'
import {connect} from "dva";
import {Button, Form,Input,Breadcrumb } from 'antd';
import pathToRegexp from 'path-to-regexp';
import {Link} from 'dva/router'
// 定义rem基准值
const sizeBase = 23.4375

// 定义输入转换函数
const unitImportFn = (unit, type, source) => {

    // type为单位类型，例如font-size等
    // source为输入来源，可能值为create或paste
    console.log(type, source)

    // 此函数的返回结果，需要过滤掉单位，只返回数值
    if (unit.indexOf('rem')) {
        return parseFloat(unit, 10) * sizeBase
    } else {
        return parseFloat(unit, 10)
    }

}

// 定义输出转换函数
const unitExportFn = (unit, type, target) => {

    if (type === 'line-height') {
        // 输出行高时不添加单位
        return unit
    }

    // target的值可能是html或者editor，对应输出到html和在编辑器中显示这两个场景
    if (target === 'html') {
        // 只在将内容输出为html时才进行转换
        return unit / sizeBase + 'rem'
    } else {
        // 在编辑器中显示时，按px单位展示
        return unit + 'px'
    }

}

 class Detail extends React.Component {
    state = {
        editorState: BraftEditor.createEditorState('<p>Hello <span style="font-size:1.28rem;">World!</span></p>', { unitImportFn })
    }

     componentDidMount(){
        setTimeout(() => {
            const {Item}  = this.props.list;
            this.setState({editorState:BraftEditor.createEditorState(Item.content, { unitImportFn })})
            console.log(Item)
        },500)

     }


    handleChange = (editorState) => {
        this.setState({ editorState })
    }

    preview = () => {

      //  history.push('/preview/1111')


//        console.log(this.state.editorState.toHTML())

        // if (window.previewWindow) {
        //     window.previewWindow.close()
        // }
        //
        // window.previewWindow = window.open()
        // window.previewWindow.document.write(this.buildPreviewHtml())
        // window.previewWindow.document.close()

    }

    buildPreviewHtml () {

        return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `

    }

     handleSubmit = () => {
         const {validateFields} = this.props.form;

         validateFields((errors, value) => {
             if (errors) {
                 return
             }
             let payload = {
                 name:value.name,
                 content:this.state.editorState.toHTML()
             }
             const detail = pathToRegexp(`/detail/:id`).exec(location.pathname);
             if(detail){
                 payload.id = detail[1];
             }
             console.log(payload)
             this.props.dispatch({type:'list/update',payload})
         })

     }

      myUploadFn = (param) => {

     const serverURL = api+ '/img/upload';
     const xhr = new XMLHttpRequest
     const fd = new FormData()

     const successFn = (response) => {
         // 假设服务端直接返回文件上传后的地址
         // 上传成功后调用param.success并传入上传后的文件地址
         let data = JSON.parse(response.target.responseText).data;
         console.log(JSON.parse(response.target.responseText))
         param.success({
             url: api+ data.path,
             meta: {
                 id: 'xxx',
                 title: 'xxx',
                 alt: 'xxx',
                 loop: true, // 指定音视频是否循环播放
                 autoPlay: true, // 指定音视频是否自动播放
                 controls: true, // 指定音视频是否显示控制栏
                 poster: 'http://xxx/xx.png', // 指定视频播放器的封面
             }
         })
     }

     const progressFn = (event) => {
         // 上传进度发生变化时调用param.progress
         param.progress(event.loaded / event.total * 100)
     }

     const errorFn = (response) => {
         // 上传发生错误时调用param.error
         param.error({
             msg: 'unable to upload.'
         })
     }

     xhr.upload.addEventListener("progress", progressFn, false)
     xhr.addEventListener("load", successFn, false)
     xhr.addEventListener("error", errorFn, false)
     xhr.addEventListener("abort", errorFn, false)

     fd.append('file', param.file)
     xhr.open('POST', serverURL, true)
     xhr.send(fd)

 }

    render () {

        const extendControls = [
            {
                key: 'custom-button',
                type: 'button',
                text: '预览',
                onClick: this.preview
            }
        ]
        const {getFieldDecorator} = this.props.form;
        const {Item}  = this.props.list

      //  console.log(this.props)

        const formItemLayouts = {
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 18,
            },
        };


        return (
            <div>
                <div className="editor-wrapper">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>{Item ? Item.name : ''}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Form>
                        <Form.Item label="名称"  {...formItemLayouts}>
                            {getFieldDecorator("name", {
                                initialValue: Item ? Item.name: '',
                                rules: [{required: true, message: "输入名称"}]
                            })(
                                <Input style={{ width: '100%'}} placeholder={('输入名称')}/>
                            )
                            }
                        </Form.Item>
                        <BraftEditor
                            value={this.state.editorState}
                            converts={{ unitImportFn, unitExportFn }}
                            onChange={this.handleChange}

                            media={{uploadFn: this.myUploadFn}}
                        />
                        <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                    </Form>

                </div>
            </div>
        )
    }
}
export default Form.create()(connect(({list}) => ({list}))(Detail))
