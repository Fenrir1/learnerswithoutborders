import React,{ Component }  from 'react';
import { Route, Switch } from 'react-router-dom';
/*import axios from 'axios';*/

import {
    HomePage,
    StudentRegistrationPage,
    TeacherRegistrationPage,
    StudentPage,
    TeacherPage
} from '../pages';
import './App.css';


class App extends Component {
    state = {
        logged_in: false,
        role: 'student',
        email: '',
        password: '',
        user: null
    }   


    handleLogin = (data) => {
        console.log('logged in');
    }

    redirect = () => {
        this.props.history.push('/')
      }

 
    render() {
        return (
            <React.Fragment>
            <main role="main" >                
                    <Switch>
                        <Route 
                            path="/"
                            component={HomePage}
                            exact
                        />
                        <Route 
                            path="/studentregistration"
                            component={StudentRegistrationPage}
                        />
                        <Route 
                            path="/teacherregistration"
                            component={TeacherRegistrationPage}
                        />
                        <Route 
                            path="/teacher"
                            component={TeacherPage}
                        />
                        <Route 
                            path="/student"
                            component={StudentPage}
                        />
                    </Switch>
                
            </main>
            </React.Fragment>
        );        
    }

};

export default App;