import React, { Component, useState } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { withRouter } from "react-router";

import { connect } from 'react-redux';
import { teacherLoggedIn  } from '../../actions';
import { compose } from '../../utils';

import './teacher-registration.css';
import "react-datepicker/dist/react-datepicker.css";


const FormContacts = ({ outerContacts, updateContacts}) => {
    const [contacts, handleContacts] = useState(outerContacts);

    const [contactName, handleContactName] = useState('WhatsApp');
    const [contactValue, handleContactValue] = useState('');
   /* const [contactIsNew, handleContactIsNew] = useState(false);*/

    const handleContactsHelper = (newContacts) => {
        handleContacts(newContacts);
        updateContacts(contacts);
    };

    const deleteContact = (i) => {
        const newContacts = [ ...contacts.slice(0, i), ...contacts.slice(i+1) ];
        handleContactsHelper(newContacts);
    };

    const addContact = () => {
        if (contactValue.length<=0) return null;
        const newContacts = [ ...contacts, {name: contactName, value: contactValue} ];
        handleContactsHelper(newContacts);
    };


    return (<div className='formContacts'><div>
      {contacts.map((contact, i) => {
         return (
            <p key={i}>{contact.name} {contact.value} <span className="badge badge-danger" onClick={() => deleteContact(i)} >X</span></p>
          )     
      })}
        </div>
        <div className='form-inline'>
        <div className="form-group mr-2">
            <label htmlFor="exampleFormControlSelect2" className="mr-2" >Выберите тип связи</label>
            <select className="form-control" 
                defaultValue="WhatsApp"
                onChange={(e) => handleContactName(e.target.value) } 
            >
                <option value="WhatsApp">WhatsApp</option>
                <option value="Telegram">Telegram</option>
                <option value="Viber">Viber</option>
                <option value="Skype">Skype</option>
            </select>
        </div>
        <div className="form-group mr-2">
            <input type="text" className="form-control" value={contactValue} onChange={(e) => handleContactValue(e.target.value) } />
        </div>
                   
            <button type="button" className="btn btn-primary"  onClick={addContact}>Добавить</button>
        

    </div>
    </div> );  
  };

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

class TeacherRegistration extends Component {
    state = {
        email: '',
        password: '',
        picture: null,
        picturePath: '',
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        birthDate: null,
        address: '',
		city: '',
	    country: '',
        contacts: [],

        nameToUseInClass: '',
        documents: [],

        backupPersonName: '',
        backupPersonEmail: '',
        backupPersonPhone: '',
        backupPersonAddress: '',
        backupPersonCountry: '',
        backupPersonCity: '',

        formErrors: {email: '', password: ''},
        emailValid: false,
        passwordValid: false,
        formValid: false
      }

    handleUserInput = (e) => {
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

    updateDocuments(documents) {
        console.log(documents);
        this.setState({
            documents: documents
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
                formData.append('contacts', JSON.stringify({contacts: this.state.contacts}) );
                formData.append('phone', this.state.phone);
                formData.append('address', this.state.address);
                formData.append('city', this.state.city);
                formData.append('country', this.state.country);
                /*if (this.state.documents.length>0) { 
                    for(let i=0; i< this.state.documents.length; i++){
                        const formDataTmp = new FormData();
                        formDataTmp.append("name", this.state.documents[i].mane);
                        formDataTmp.append("value", this.state.documents[i].value);
                        formData.append("documents",formDataTmp);
                    }
                    
                }  */
                
                


                axios.post('/api/v1/teachers',
                    formData,
                    {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }                  
                      }                   
                ).then(
                    (response) => {
                        console.log('teacher created',response.data.data);
                        this.props.teacherLoggedIn(response.data.data);
                        this.props.history.push('/teacher');   
                    } 
                );


          
                console.log(postVal);
            } catch (err) {
                if (err.response.status === 500) {
                    console.log('There was a problem with the server');
                } else {
                    console.log(err.response.data.msg);
                }
              }


      }      


    render() {
        return (
            <div>
                <form className="teacher-registration" onSubmit={this.handleSubmit} >
                    <h2>Регистрация учителя</h2>
                    <div className="panel panel-default">
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`} >
                        <label htmlFor="email">Email</label>
                        <input type="email" required className="form-control" name="email" value={this.state.email} onChange={this.handleUserInput} />
                    </div>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`} >
                        <label htmlFor="password">Пароль</label>
                        <input type="password" required className="form-control" name="password" value={this.state.password} onChange={this.handleUserInput} />
                    </div>

                    <div className="form-group" >
                        <label>Фото</label>
                        <div className='custom-file'>                        
                            <input
                                type='file'
                                className='custom-file-input'
                                id='customFile'
                                onChange={this.onImgChange}
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                {this.state.picturePath}
                            </label>
                        </div>
                    </div>                    
        
                    <div className="form-group" >
                        <label htmlFor="firstName">Имя</label>
                        <input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={this.handleUserInput} />
                    </div>
                    <div className="form-group" >
                        <label htmlFor="middleName">Фамилия</label>
                        <input type="text" className="form-control" name="middleName" value={this.state.middleName} onChange={this.handleUserInput} />
                    </div>
                    <div className="form-group" >
                        <label htmlFor="lastName">Отчество</label>
                        <input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={this.handleUserInput} />
                    </div>

                    <div className="form-group mt-5 mb-5" >
                        <label className="mr-4" >Дата рождения</label>                        
                        <DatePicker dateFormat="dd/MM/yyyy" selected={this.state.birthDate} onChange={date => this.setBirthDate(date)} />
                    </div>

                    <div className="form-group" >
                        <label htmlFor="phone">phone</label>
                        <input type="tel" className="form-control" name="phone" value={this.state.phone} onChange={this.handleUserInput} />
                    </div>
                    <div className="form-group" >
                        <label htmlFor="address">address</label>
                        <input type="text" className="form-control" name="address" value={this.state.address} onChange={this.handleUserInput} />
                    </div>
                    <div className="form-group" >
                        <label htmlFor="city">city</label>
                        <input type="text" className="form-control" name="city" value={this.state.city} onChange={this.handleUserInput} />
                    </div>
                    <div className="form-group" >
                        <label htmlFor="country">country</label>
                        <input type="text" className="form-control" name="country" value={this.state.country} onChange={this.handleUserInput} />
                    </div>

                    <FormContacts outerContacts={this.state.contacts} updateContacts={contacts => this.updateContacts(contacts)} />


                    

                    <button type="submit" className="btn btn-primary" disabled={!this.state.formValid} >Далее</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ logged_in, user}) => {
    return { logged_in, user};
}

const mapDispatchToProps = {
    teacherLoggedIn
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(TeacherRegistration);

/*export default TeacherRegistration;*/
