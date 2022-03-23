import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Layout'
import Login from './pages/Login'
function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
