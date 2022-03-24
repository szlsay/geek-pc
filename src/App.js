import { Router, Route, Switch, Redirect } from 'react-router-dom'
import React, { Suspense } from 'react'
import PrivateRoute from 'components/PrivateRoute'
import history from 'utils/history'

// import Login from 'pages/Login'
// import Layout from 'pages/Layout'
const Login = React.lazy(() => import('pages/Login'))
const Layout = React.lazy(() => import('pages/Layout'))
/*
  import { HashRouter } from 'react-router-dom

  hashRouter = <Router history={createHashHistory()}></Router>
  BrowserRouter = <Router history={createBrowserHistory()}></Router>
*/
function App() {
  return (
    <Router history={history}>
      <div className="App">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}

        {/* 配置路由的规则 */}
        {/* fallback: 兜底 如果组件还没有加载，默认会显示fall的内容 */}
        <Suspense fallback={<div>loading....</div>}>
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            {/* 只要path是/home, component对应的组件就会渲染 */}
            {/* <Route path="/home" component={Home}></Route> */}
            {/* 只要path是/home, render函数就会执行 */}
            <PrivateRoute path="/home" component={Layout}></PrivateRoute>

            <Route path="/login" component={Login}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
