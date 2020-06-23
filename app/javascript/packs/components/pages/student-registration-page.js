import React from 'react';
import StudentRegistration from '../student-registration';
import MainHeader from '../main-header';
/*import ShoppingCartTable from '../shopping-cart-table';*/

const StudentRegistrationPage = () => {
    return (
        <React.Fragment>
        <MainHeader />
        <div  className="container">
            <StudentRegistration />
        </div>
        </React.Fragment>
    );

};

export default StudentRegistrationPage;