import { Router, Route, Switch } from 'react-router-dom'
import Login from 'pages/Login'
import PrivateRoute from 'components/PrivateRoute'
import Layout from 'pages/Layout'
import history from 'utils/history'
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
        <Switch>
          {/* 只要path是/home, component对应的组件就会渲染 */}
          {/* <Route path="/home" component={Home}></Route> */}
          {/* 只要path是/home, render函数就会执行 */}
          <PrivateRoute path="/home" component={Layout}></PrivateRoute>

          <Route path="/login" component={Login}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
