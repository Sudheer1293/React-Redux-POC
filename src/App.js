import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddUpdateMember from './components/AddUpdateMember';
// import UserRegistration from './components/UserRegistration';
// import UserDataTable from './components/UserDataTable';
import UserCreation from './components/UserCreation';
// import Login from './components/Login';
import MemberDataTable from './components/MemberDataTable';
import LoginCreation from './components/LoginCreation';


class App extends Component {
  render() {
    return (
         
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginCreation} />
            <Route exact path="/login" component={LoginCreation} />
            <Route exact path="/home" component={MemberDataTable} />
            <Route exact path="/register-user" component={UserCreation} />
            <Route exact path="/add-member" component={AddUpdateMember} />
            <Route exact path="/edit-member/:id" component={AddUpdateMember} />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
