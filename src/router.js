import React from 'react';
import { Router, Route, IndexRoute} from 'dva/router';

/* eslint react/prop-types:0 */
export default function ({ history }) {

    const UserMainLayout = (location, callback) => {
        require.ensure([], require => {
            callback(null, require('./routes/Home'))
        }, 'home')
    }
    const List = (location, callback) => {
        require.ensure([], require => {
            callback(null, require('./routes/List'))
        }, 'list')
    }
    const Detail = (location, callback) => {
        require.ensure([], require => {
            callback(null, require('./routes/Detail'))
        }, 'detail')
    }
    const Login = (location, callback) => {
        require.ensure([], require => {
            callback(null, require('./routes/Login'))
        }, 'Login')
    }
    const NotFound = (location, callback) => {
        require.ensure([], require => {
            callback(null, require('./routes/NotFound'))
        }, 'NotFound')
    }

    return (
        <Router history={history}>
            <Route path="/" getComponent={UserMainLayout}>
                    <IndexRoute getComponent={List}/>
                <Route path="/list" getComponent={List}/>
                <Route path="/detail" getComponent={Detail}/>
                <Route path="/detail/:id" getComponent={Detail}/>

            </Route>
            {/*<Route path="/preview/:id" component={Preview}/>*/}
            <Route path="/login" getComponent={Login}/>
            <Route path="*" getComponent={NotFound}/>
        </Router>
    );
}

