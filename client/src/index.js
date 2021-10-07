import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import CreatePost from './components/post/CreatePost';
import NavBar from './components/NavBar';
import Show from './components/post/Show';
import EditPost from './components/post/EditPost';
//Routing here
const Routing=()=>{
  return(
    <Router>
      <NavBar />
      <Switch>
        <PrivateRoute exact path="/" component={App} />
        <PrivateRoute exact path="/create" component={CreatePost} />
        <PrivateRoute exact path="/show/:pid" component={Show} />
        <PrivateRoute exact path="/post/:pid/edit" component={EditPost} />

        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/register" component={Register} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
