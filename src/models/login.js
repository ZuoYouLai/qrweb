import { usersQ,query } from '../services/index';
import { parse } from 'qs';
import { history, api} from '../config'
import { message} from 'antd';
import {saveValidator,isUser} from "./validator";
import {clearValidator} from '../models/validator';
export default {

  namespace: 'login',

  state: {
    user: [],
    loading: false,
    isLogin: false,
  },

  effects: {
    *login({ payload ,url}, { call, put }) {
      yield put({ type: 'loginLoading' });
      const data  = yield call(usersQ, parse(payload),api + url, false);
        if (data.code && data.code!= 0) {
          message.error(data.code+':'+data.message);
        }else{
          saveValidator(data.data);
          history.replace('/')
        }
    },
    *logout({ }, { call, put }){
        const data  = yield call(query, {},api + '/logout', false);
        if(!data.code){
            clearValidator();
            history.replace('/login')
        }
    }
  },

  reducers: {
    loginLoading(state) {
      return { ...state, loading: true };
    },
    loginRequest(state, action) {
          return { ...action, isLogin: true,loading: false };
    }
  }

};
