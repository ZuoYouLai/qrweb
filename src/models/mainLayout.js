import {isAdmin, isUser,saveValidator,clearValidator} from './validator';
import { query } from '../services/index';
import { parse } from 'qs';
import { history, api} from '../config'
import { message} from 'antd';
export default {
  namespace: 'mainLayout',

  state: {
    loading: false,
  },
  subscriptions: {
    setup({ dispatch, history}) {

    },
  },
  
  effects: {

  },
};
