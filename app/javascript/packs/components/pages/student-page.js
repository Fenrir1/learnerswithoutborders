import React from 'react';
import MainHeader from '../main-header';
import Student from '../student';

const StudentPage = () => {
    return (
        <React.Fragment>
        <MainHeader />
        <div className="container">
            <Student/>
        </div>
        </React.Fragment>
    );

};

export default StudentPage;