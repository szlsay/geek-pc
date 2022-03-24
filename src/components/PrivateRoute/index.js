import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { hasToken } from 'utils/storage'

export default class PrivateRoute extends Component {
  render() {
    console.log(this.props)
    const { component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={(routeProps) => {
          console.log(routeProps, 'routeProps')
          // 判断用户是否登录，判断是否token
          if (hasToken()) {
            return <Component {...routeProps}></Component>
          } else {
            // 跳转到登录页面的时候，我们需要把当前的地址传过去，登录成功就能够跳转回来

            return (
              <Redirect
                to={{
                  pathname: '/login',
                  // 通过search传递参数
                  // search: '?id=123',
                  state: {
                    from: routeProps.location.pathname,
                  },
                }}
              ></Redirect>
            )
          }
        }}
      ></Route>
    )
  }
}
