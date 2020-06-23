import React from 'react';
import MainHeader from '../main-header';
import Teacher from '../teacher';

const TeacherPage = () => {
    return (
        <React.Fragment>
        <MainHeader />
        <div className="container">
            <Teacher />
        </div>
        </React.Fragment>
    );

};

export default TeacherPage;