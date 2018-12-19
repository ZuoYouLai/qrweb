import {request} from "../utils/request";
import {parse} from "qs";
import {message} from "antd";
import { query ,create} from '../services/index';
import {api, history} from "../config";
import pathToRegexp from 'path-to-regexp';
export default {
    namespace: 'list',
    state: {
        loading: false,
        visible:false,
        Item:{},
        data:{list:[],totalRecord:0,currentPage:1,pageSize:10},
        previewItem:[]
    },
    subscriptions: {
        setup({history,dispatch}) {
            history.listen(({pathname}) => {

                if(pathname == '/'){
                    dispatch({type:'query'});
                    dispatch({type:'setState',Item:{}})
                }
                const detail = pathToRegexp(`/detail/:id`).exec(pathname);
                const preview = pathToRegexp(`/preview/:id`).exec(pathname);
                if(detail){
                    dispatch({type:'fetchDetail',id:detail[1]})
                }
                if(preview){
                    dispatch({type:'preview',id:preview[1]})
                }
            })
        }
    },
    effects: {
        *query({payload }, { call, put }) {
            const data  = yield call(query,parse(payload),api+'item');
            console.log(data.data)
            yield put({type:'setState',data:data.data})
        },
        *delete({id}, { call, put }) {
            const data  = yield call(query,{},api+'item/'+id +'/destroy');
            if(!data.code){
                message.success('删除成功！');
                yield put({type:'query'});
            }
            else{
                message.error(data.msg)
            }
        },
        *update({payload}, { call, put }) {

            const data  = yield call(create,parse(payload),api+ 'item');
            if(!data.code){
                message.success('保存成功！')
                history.push('/')
            }
            else{
                message.error(data.msg)
            }

        },
        *fetchDetail({id }, { call, put }) {
            const data  = yield call(query,{},api+'item/'+id);
            if(!data.code){
                yield put({type:'setState',Item:data.data})
            }
        },
        *preview({id }, { call, put }) {
            const data  = yield call(query,{},api+'item/'+id + '/qr');
            if(!data.code){
                yield put({type:'setState',previewItem:data.data})
            }
        },
    },
    reducers: {
        loginRequest(state) {
            return {...state, loading: true}
        },
        setState(state, action){
            return{...state,...action}
        }
    },
}