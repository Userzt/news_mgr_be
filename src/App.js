import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';


import Login from './pages/login/index'
import LoginAuth from './component/loginAuth';
import Manager from './pages/manager/manager';


function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <LoginAuth path='/manager' component={Manager}></LoginAuth>
          <Redirect from='/' to='/login' />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
