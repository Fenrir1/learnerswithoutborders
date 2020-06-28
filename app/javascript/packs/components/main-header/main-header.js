import React, { Component} from 'react'
import axios from 'axios';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'
import { apiURL } from '../../config';

import { connect } from 'react-redux';
import { teacherLoggedIn, studentLoggedIn } from '../../actions';
import { compose } from '../../utils';
/*import {withUsersService} from '../hoc';*/

import './main-header.css';

/*const MainHeader = ({handleLogin, logged_in, userName}) => */
class MainHeader extends Component {

    state = {
        /*logged_in: this.props.usersService.user.logged_in,*/
        password: '',
        role: 'student',
        email: ''
    }

 
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value} );
    }


    /*const  redirect = () => {
        this.props.history.push('/')
      }*/

    render() {        

        const { logged_in, role, user } = this.props;

        const handleSubmit = (event) => {
            event.preventDefault();
            let user = {
                role: this.state.role,
                email: this.state.email,
                password: this.state.password
                }
                
            axios.post(`${apiURL}/login`, {user}/*, {withCredentials: true}*/)
                .then(response => {
                if (response.data.logged_in) {
                    /*this.props.usersService.handleLogin(response.data);*/
                    console.log(response.data.user.email+' is loggedin');
                    /*this.setState({
                        logged_in: response.data.logged_in
                    });*/
                    if (this.state.role==='student') {
                        console.log('studentLoggedIn',response.data.user);
                        this.props.studentLoggedIn(response.data.user);
                        this.props.history.push('/student');
                    } else if (this.state.role==='teacher') {
                        console.log('teacherLoggedIn',response.data.user);
                        this.props.teacherLoggedIn(response.data.user);
                        this.props.history.push('/teacher');
                    }
                    
                   /* this.redirect()
                    this.setState({
                        logged_in: response.data.logged_in,
                        user: response.data.user
                    });*/
                } else {
                    this.setState({
                        errors: response.data.errors
                    })
                }
                })
                .catch(error => console.log('api errors:', error))
          };
    

        return (
            
            <header className="main-header">

                <div className="logo" onClick={()=>{this.props.history.push('/')}}>Learners without borders</div> 

                {logged_in ? <div className="main-header-auth link mt-3 mr-2" >
        { (role==="student") && <Link to='/student'><span className="role">Ученик:</span> {user.email}</Link>  }                  
                     { (role==="teacher") && <Link to='/teacher'><span className="role">Учитель:</span> {user.email}</Link>  }  
                </div>:
                <div>                    
                        <form onSubmit={handleSubmit} className="form-inline mt-3 mr-2">
                            <select
                                className="form-control mr-2"
                                placeholder="role"
                                name="role"                 
                                onChange={this.handleUserInput}
                            >
                                <option value="student">Ученик</option>
                                <option value="teacher">Учитель</option>
                            </select>
                            <input
                                className="form-control mr-2"
                                placeholder="email"
                                type="text"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleUserInput }
                            />
                            <input
                                className="form-control mr-2"
                                placeholder="password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleUserInput }
                            />                            
                            <button type="submit" className="btn btn-primary">
                                Log In
                            </button>
                        </form>
                    </div>  
                }  
                       
            </header>
        );       
    };


};

/*export default  withUsersService(MainHeader);*/

const mapStateToProps = ({ logged_in, role, user}) => {
    return { logged_in, role, user};
}

const mapDispatchToProps = {
    teacherLoggedIn, studentLoggedIn
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(MainHeader);

/*connect(mapStateToProps, mapDispatchToProps)(MainHeader)*/
