import React, { Component, useState } from 'react';

import axios from 'axios';
import { withRouter } from "react-router";
import { apiURL } from '../../config';

import { connect } from 'react-redux';
import { teacherLoggedIn  } from '../../actions';
import { compose } from '../../utils';

import './teacher.css';
import "react-datepicker/dist/react-datepicker.css";

const FormDocuments = ({ documents, user, logginHandler }) => {

    const [documentsList, updateDocumentsList] = useState(documents);
    const [documentName, handleDocumentName] = useState('');
    const [documentFileName, handleDocumentFileName] = useState('');
    const [documentFile, handledDocumentFile] = useState(null);


    const deleteDocument = (i) => {
        
        axios.delete(`${apiURL}/api/v1/documents/${i}`).then(
                    (response) => {
                        console.log('document deleted',response.data.data);
                        let newDocumentsList = documentsList.filter((document) => document.id !== i);
                        updateDocumentsList(newDocumentsList);
                    } 
                );
        //handleDocumentsHelper(newDocuments);
    };

    const addDocument = () => {
        console.log("add doc starrt");
        if (!documentFile) return null;

        const formData = new FormData();
        if (documentFile) { formData.append('picture', documentFile); }                
        formData.append('documentname', documentName);
        formData.append('user_id', user.id);
        formData.append('user_type', 'Teacher');

        axios.post(`${apiURL}/api/v1/documents`,
                    formData,
                    {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }                  
                      }                   
                ).then(
                    (response) => {
                        console.log('document created',response.data.data);
                        let newDocumentsList = [...documentsList]; 
                        newDocumentsList.push(response.data.data);
                        updateDocumentsList(newDocumentsList);  
                    } 
                );

       /* const newDocuments = [ ...documents, {name: documentName, value: documentFile} ];
        handleDocumentsHelper(newDocuments);*/
    };

    const onImgChange = (e) => {
        handledDocumentFile(e.target.files[0]);
        handleDocumentFileName(e.target.files[0].name);
      }


    return (<div className='formContacts'><div>
      {documentsList.map((document, i) => {
         return (
            <p key={i}>{document.documentname} <span className="badge badge-danger" onClick={() => deleteDocument(document.id)} >X</span></p>
          )     
      })}
        </div>
        <div className='form-inline'>
        <div className="form-group mr-2">
            <label className="mr-2" >Описание документа</label>
            <input type="text" className="form-control" value={documentName} onChange={(e) => handleDocumentName(e.target.value) } />
        </div>
        <div className="form-group mr-2">
            <div className='custom-file'>                        
                <input
                    type='file'
                    className='custom-file-input'
                    id='customDocument'
                    onChange={onImgChange}
                />
                <label className='custom-file-label' htmlFor='customDocument'>{documentFileName}</label>
            </div>
        </div>
                   
            <button type="button" className="btn btn-primary"  onClick={addDocument}>Добавить</button>
        

    </div>
    </div> );  
  };


class Teacher extends Component {

    state = {
        nameToUseInClass: '',
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

    handleUserInput = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
      }
    
    validateForm() {
        this.setState({formValid: this.state.emailValid &&
                                  this.state.passwordValid});
      }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
     }

    updateUserInfo = (id) => {
        axios.post(`${apiURL}/api/v1/teachers/${id}`).then(
                (response) => {
                    console.log('Teacher loaded',response.data.data);
                    this.props.teacherLoggedIn(response.data.data);
                }                    
            );
    }

   
    handleSubmit = async (event) => {
        event.preventDefault();

        /*
                nameToUseInClass: '',
        backupPersonName: '',
        backupPersonEmail: '',
        backupPersonPhone: '',
        backupPersonAddress: '',
        backupPersonCountry: '',
        backupPersonCity: '',
        */
       
            try {

                const formData = new FormData();             
                formData.append('nameToUseInClass', this.state.nameToUseInClass);
                formData.append('backupPersonName', this.state.backupPersonName);
                formData.append('backupPersonEmail', this.state.backupPersonEmail);
                formData.append('backupPersonPhone', this.state.backupPersonPhone);
                formData.append('backupPersonAddress', this.state.backupPersonAddress);
                formData.append('backupPersonCountry', this.state.backupPersonCountry);
                formData.append('backupPersonCity', this.state.backupPersonCity);


                axios.patch(`${apiURL}/api/v1/teachers/${this.props.user.id}`,
                    formData,
                    {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }                  
                      }                   
                ).then(
                    (response) => {
                        console.log('Teacher updated',response.data.data);
                        this.props.teacherLoggedIn(response.data.data);                         
                    }                    
                );

            } catch (err) {
                if (err.response.status === 500) {
                    console.log('There was a problem with the server');
                } else {
                    console.log(err.response.data.msg);
                }
              }

      }

    render() {
        if (this.props.user) {

            const { 
                picturepath,
                firstname,
                middlename,
                lastname,
                birthdate,
                email,
                nameToUseInClass,
                backupPersonName,
                backupPersonEmail,
                backupPersonPhone,
                backupPersonAddress,
                backupPersonCountry,
                backupPersonCity,
                document
            } = this.props.user;

            let picturepathActual = picturepath.replace("public", "..");

            let birthdateActual = new Date(Number(birthdate));
            //let birthdateActual = new Intl.DateTimeFormat('en-GB').format(tmpDate);

            return (
                <div className="teacher">
                    <h2>Личный кабинет учителя</h2>
                    <div className="row">
                        <div className="col-4">
                            <img alt="Нет фото" src={picturepathActual} width="200px" />
                        </div>
                        <div className="col-8">
                            <h2>{firstname} {middlename} {lastname}</h2>
                            <p>{birthdateActual.toLocaleDateString()}</p>
                            <p>{email}</p>                        
                        </div>
                    </div>    
                    <div className="row">
                        <h2>Загрузка необходимых документов</h2>
                        <div className="alert alert-secondary col-12" role="alert">...здесь можно вывести список документов для загузки</div>
                        
                        <FormDocuments documents={document} logginHandler={this.props.teacherLoggedIn} user={this.props.user} />
                    </div>
                    <div className="row">                        
                        <form onSubmit={this.handleSubmit}>
                            <h2>Дополнительная информация</h2>
                            <div className="form-group" >
                                <label htmlFor="nameToUseInClass">Имя используемое в классе</label>
                                <input type="text" className="form-control" name="nameToUseInClass" defaultValue={nameToUseInClass} onChange={this.handleUserInput} />
                            </div>
                           
                            <h2>Информация о заместителе</h2>
                            <div className="form-group" >
                                <label htmlFor="backupPersonName">Имя</label>
                                <input type="text" className="form-control" name="backupPersonName" defaultValue={backupPersonName} onChange={this.handleUserInput} />
                            </div>
                            <div className="form-group" >
                                <label htmlFor="backupPersonEmail">Email</label>
                                <input type="text" className="form-control" name="backupPersonEmail" defaultValue={backupPersonEmail} onChange={this.handleUserInput} />
                            </div>
                            <div className="form-group" >
                                <label htmlFor="backupPersonPhone">Телефон</label>
                                <input type="text" className="form-control" name="backupPersonPhone" defaultValue={backupPersonPhone} onChange={this.handleUserInput} />
                            </div>
                            <div className="form-group" >
                                <label htmlFor="backupPersonAddress">Адрес</label>
                                <input type="text" className="form-control" name="backupPersonAddress" defaultValue={backupPersonAddress} onChange={this.handleUserInput} />
                            </div>
                            <div className="form-group" >
                                <label htmlFor="backupPersonCountry">Страна</label>
                                <input type="text" className="form-control" name="backupPersonCountry" defaultValue={backupPersonCountry} onChange={this.handleUserInput} />
                            </div>
                            <div className="form-group" >
                                <label htmlFor="backupPersonCity">Город</label>
                                <input type="text" className="form-control" name="backupPersonCity" defaultValue={backupPersonCity} onChange={this.handleUserInput} />
                            </div>

                            <button placeholder="submit" type="submit" className="btn btn-primary">
                                Сохранить
                            </button>
                        </form>
                        
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
    teacherLoggedIn
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(Teacher);

