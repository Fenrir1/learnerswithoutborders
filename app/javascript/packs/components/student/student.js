import React, { Component, useState } from 'react';

import axios from 'axios';
import { withRouter } from "react-router";
import { apiURL } from '../../config';

import { connect } from 'react-redux';
import { studentLoggedIn  } from '../../actions';
import { compose } from '../../utils';

import './student.css';
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
        if (!documentFile) return null;

        const formData = new FormData();
        if (documentFile) { formData.append('picture', documentFile); }                
        formData.append('documentname', documentName);
        formData.append('user_id', user.id);
        formData.append('user_type', 'Student');

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



class Student extends Component {

    render() {
        if (this.props.user) {

            const { email,
                    picturepath,
                    firstname,
                    middlename,
                    lastname,
                    birthdate,
                    document
            } = this.props.user;

            let picturepathActual = picturepath.replace("public", "..");
            let birthdateActual = new Date(Number(birthdate));

            return (
                <div className="student">
                    <h2>Личный кабинет ученика</h2>
                    <div className="row">
                        <div className="col-4">
                            <img alt="Нет фото" src={picturepathActual} className="w-100"/>
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
                        
                        <FormDocuments documents={document} logginHandler={this.props.studentLoggedIn} user={this.props.user} />
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
)(Student);

