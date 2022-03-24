import React, { Component } from 'react'
import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import styles from './index.module.scss'
import logo from 'assets/logo.png'
import { login } from 'api/user'
import { setToken } from 'utils/storage'
console.log(styles)
export default class Login extends Component {
  state = {
    // 加载状态
    loading: false,
  }
  render() {
    return (
      <div className={styles.login}>
        <Card className="login-container">
          <img src={logo} alt="" className="login-logo" />
          {/* 表单 */}
          <Form
            size="large"
            validateTrigger={['onChange', 'onBlur']}
            onFinish={this.onFinish}
            initialValues={{
              mobile: '13911111111',
              code: '246810',
              agree: true,
            }}
          >
            <Form.Item
              name="mobile"
              rules={[
                {
                  required: true,
                  message: '手机号不能为空',
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号格式错误',
                },
              ]}
            >
              <Input placeholder="请输入你的手机号" autoComplete="off" />
            </Form.Item>

            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: '验证码不能为空',
                },
                {
                  pattern: /^\d{6}$/,
                  message: '验证码格式错误',
                },
              ]}
            >
              <Input placeholder="请输入验证码" autoComplete="off"></Input>
            </Form.Item>

            <Form.Item
              valuePropName="checked"
              name="agree"
              rules={[
                {
                  // 自定义校验规则
                  // validator: (rule, value) => {
                  //   if (value) {
                  //     // value值为true
                  //     return Promise.resolve()
                  //   } else {
                  //     return Promise.reject(new Error('请阅读并同意用户协议'))
                  //   }
                  // },
                  // 自定义校验规则
                  validator: (rule, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error('请阅读并同意用户协议')),
                },
              ]}
            >
              <Checkbox>我已阅读并同意[隐私条款]和[用户协议]</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={this.state.loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  onFinish = async ({ mobile, code }) => {
    this.setState({
      loading: true,
    })
    try {
      const res = await login(mobile, code)

      // 3. 提示消息
      message.success('登录成功', 1, () => {
        // 登录成功
        // 1. 保存token
        // localStorage.setItem('token', res.data.token)
        setToken(res.data.token)
        // 2. 跳转到首页
        // 判断location.state中是否有值
        const { state } = this.props.location
        if (state) {
          this.props.history.push(state.from)
        } else {
          this.props.history.push('/home')
        }
      })
    } catch (error) {
      // console.dir(error)
      message.warning(error.response.data.message, 1, () => {
        this.setState({
          loading: false,
        })
      })
    }
  }
}
