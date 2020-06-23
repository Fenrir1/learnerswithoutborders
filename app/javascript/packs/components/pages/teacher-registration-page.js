import React from 'react';
import TeacherRegistration from '../teacher-registration';
import MainHeader from '../main-header';
/*import ShoppingCartTable from '../shopping-cart-table';*/

const TeacherRegistrationPage = () => {
    return (
        <React.Fragment>
        <MainHeader />
        <div  className="container">
            <TeacherRegistration />
        </div>
        </React.Fragment>
    );

};

export default TeacherRegistrationPage;