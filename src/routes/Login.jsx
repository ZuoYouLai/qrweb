import React, { PropTypes } from 'react';
import { connect } from 'dva';
import LoginForm from '../components/Login/LoginForm';
import styles from './Login.less';
import strings from '../constants/strings';


function Login({ dispatch ,login}) {

    const {
        loading,
        user,
        isLogin,
    } = login;
  const LoginProps = {
    user: user,
    loading: loading,
    isLogin: isLogin,
    onLogin(value) {
      dispatch({
         url: 'login',
        type: 'login/login',
        payload: value,
      });
    }
  };

  return (
          <div className={styles.login}>

              <div className={styles.content}>
                  <div className={styles.loginComponents}>
                      <div className={styles.codeBoxDemo}>
                          <div className={styles.managementSystem}>
                              <h3>{strings.getString('title_header_logo')}</h3></div>
                          <LoginForm {...LoginProps}></LoginForm>
                      </div>
                  </div>
              </div>
              {/*<div className={styles.footer}>*/}
                    {/*<div>{strings.getString('loginVersionContent')}</div>*/}
                    {/*<div>{strings.getString('loginRecordContent')}</div>*/}
              {/*</div>*/}
          </div>
        );
}

Login.propTypes = {
  dispatch: PropTypes.func
};

function mapStateToProps({ login }) {
  return { login };
}

export default connect(mapStateToProps)(Login)
