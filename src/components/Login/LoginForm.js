import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button} from 'antd';
import strings from '../../constants/strings';
import style from './login.less';
const FormItem = Form.Item;

const LoginForm = ({
  onLogin,
  loading,
  form: {
    getFieldDecorator,
    validateFields,
  },
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors,value) => {
      if (!!errors) {
        return;
      }
      onLogin(value);

    });
  }
  var message_name = strings.getString('login_pleaseEnterUserName')
  var message_pwd = strings.getString('login_pleaseEnterPassword')

  function onChangeType(){  
    //var pwd = document.getElementById("pwd");
   // pwd.type = 'password'
   }
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <FormItem  className="login-input">

        {getFieldDecorator('userName', {

          rules: [{ required: true, message: message_name}],
        })(
          <Input prefix={<Icon type="user" />} placeholder={strings.getString('login_userName')} />
        )}
      </FormItem>
      <FormItem  className="login-input">
        {getFieldDecorator('password', {

          rules: [{ required: true, message: message_pwd}],
        })(
          <Input prefix={<Icon type="lock" />} type="password" placeholder={strings.getString('login_password')}  onChange={onChangeType}/>
        )}
      </FormItem>
      <FormItem  className="login-input">
        <div className={style.loginFormButton}>
            <Button type="primary" htmlType="submit" loading={loading}>
                {strings.getString('login_loginBtnLabel')}
            </Button>
        </div>
      </FormItem>
    </Form>
  );

};


LoginForm.propTypes = { 
    onLogin: PropTypes.func.isRequired,

};

export default Form.create()(LoginForm);
