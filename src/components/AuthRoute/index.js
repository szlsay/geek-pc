import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { hasToken } from 'utils/storage'
import { Redirect } from 'react-router-dom'
export default class AuthRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props
    console.log(rest)

    return (
      // <Route path="????"></Route>
      <Route
        {...rest}
        render={(props) => {
          if (hasToken()) {
            // 有token，登录了
            return <Component {...props}></Component>
          } else {
            // 如果没有token，没有登录，渲染Redirect组件跳转到 /login
            return <Redirect to="/login"></Redirect>
          }
        }}
      ></Route>
    )
  }
}
