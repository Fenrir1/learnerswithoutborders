import React, { Component, useState } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { withRouter } from "react-router";

import { connect } from 'react-redux';
import { studentLoggedIn  } from '../../actions';
import { compose } from '../../utils';

import './teacher.css';
import "react-datepicker/dist/react-datepicker.css";


const FormErrors = ({formErrors}) => {
  return (<div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div> );  
};

class Teacher extends Component {
    state = {
        email: '',
        password: '',
        picture: null,
        picturePath: '',
        firstName: '',
        middleName: '',
        lastName: '',
        birthDate: null,
        firstNameOfParent: '',
        lastNameOfParent: '',
        emailOfParents: '',
        contacts: [],

        formErrors: {email: '', password: ''},
        emailValid: false,
        passwordValid: false,
        formValid: false
      }

    handleUserInput = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, 
                      () => { this.validateField(name, value) });
      }
    
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch(fieldName) {
            case 'email':
                emailValid = value.length >= 3;
                fieldValidationErrors.email = emailValid ? '' : ' не корректный';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': ' слишком короткий';
                break;
            default:
                break;
            }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid
                      }, this.validateForm);
      }

    validateForm() {
        this.setState({formValid: this.state.emailValid &&
                                  this.state.passwordValid});
      }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
     }

    setBirthDate(date) {
        this.setState({
            birthDate: date
        });
    };

    updateContacts(contacts) {
        this.setState({
            contacts: contacts
        });
    }

    onImgChange = (e) => {
        this.setState({
            picture: e.target.files[0],
            picturePath: e.target.files[0].name
        });
      };
    
    handleSubmit = async (event) => {
        event.preventDefault();
        const postVal = {
            email: this.state.email,
            password: this.state.password,
            picture: this.state.picture,
            picturePath: this.state.picturePath,
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            birthDate: this.state.birthDate,
            firstNameOfParent: this.state.firstNameOfParent,
            lastNameOfParent: this.state.lastNameOfParent,
            emailOfParents: this.state.emailOfParents};
        
        /*let data = JSON.stringify({data: postVal});*/

        
            try {

                const formData = new FormData();
                if (this.state.picture) { formData.append('picture', this.state.picture); }                
                formData.append('email', this.state.email);
                formData.append('password', this.state.password);
                formData.append('firstname', this.state.firstName);
                formData.append('middlename', this.state.middleName);
                formData.append('lastname', this.state.lastName);
                formData.append('birthdate', this.state.birthDate.valueOf());
                formData.append('firstNameOfParent', this.state.firstNameOfParent);
                formData.append('lastNameOfParent', this.state.lastNameOfParent);
                formData.append('emailOfParents', this.state.emailOfParents);
                formData.append('contacts', JSON.stringify({contacts: this.state.contacts}) );


                /*formData.append('picturePath', this.state.picturePath);*/

                axios.post('http://localhost:3000/api/v1/students',
                    formData,
                    {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }                  
                      }                   
                ).then(
                    (response) => {
                        console.log('student created',response.data.data);
                        this.props.studentLoggedIn(response.data.data);
                        this.props.history.push('/student');   
                    }                    
                );

               /* const res = await axios.post('http://localhost:3000/api/v1/students',  {data: postVal} ,
                {headers: {'Content-Type': 'application/json' }}
                );*/
                
                /*axios.post('http://localhost:3000/api/v1/students', {data: postVal} , {
                  headers: {
                    'Content-Type': 'multipart/application/json'
                  }                  
                });*/
          
                /*const { fileName, filePath } = res.data;*/
          
                /*setUploadedFile({ fileName, filePath });*/
          
                console.log(postVal);
            } catch (err) {
                if (err.response.status === 500) {
                    console.log('There was a problem with the server');
                } else {
                    console.log(err.response.data.msg);
                }
              }

        /*console.log(postVal);*/
      }

    render() {
        if (this.props.user) {
            const { email,
            picturepath,
            firstname,
            middlename,
            lastname,
            birthdate
            } = this.props.user;

            let picturepathActual = picturepath.replace("public", "..");

            return (
                <div className="student">
                    <h2>Личный кабинет учителя</h2>
                    <div className="row">
                        <div className="col-4">
                            <img alt="Нет фото" src={picturepathActual} width="200px" />
                        </div>
                        <div className="col-8">
                            <h2>{firstname} {middlename} {lastname}</h2>
                            <p>{birthdate}</p>
                            <p>{email}</p>
                        </div>
                    </div>                                        
                </div>
            )            
        } else {       
            return (
                <div className="d-flex justify-content-center" >
                    <div className="card text-center">
                    <div className="card-body">
                        <p className="card-title text-info"><i className="fa fa-user-circle" aria-hidden="true"></i></p>
                        <p className="card-text text-danger">Необходимо пройти аутентификацию!</p>
                    </div>
                    </div>
                </div>

            )
        }

    }
}


const mapStateToProps = ({ logged_in, user}) => {
    return { logged_in, user};
}

const mapDispatchToProps = {
    studentLoggedIn
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(Teacher);

