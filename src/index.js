import './index.html';
import './index.less';
import  './utils/helper'
import dva from 'dva';
import { history } from './config'

const app = dva({
    history: history,
});

app.model(require('./models/mainLayout.js'));
const models = require.context('./models', true, /^\.\/.*\.js$/);
models.keys().forEach((key) => {  
   if(key != './validator.js' && key != './mainLayout.js'){
       app.model(models(key));
   }
})

// 4. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
