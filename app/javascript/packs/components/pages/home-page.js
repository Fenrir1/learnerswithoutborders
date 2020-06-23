import React from 'react';
import {Link} from 'react-router-dom';
import MainHeader from '../main-header';
/*import BookList from '../book-list';
import ShoppingCartTable from '../shopping-cart-table';*/

const HomePage = () => {
    return (
        <React.Fragment>
        <MainHeader />
        <div  className="container">
        <div className="row justify-content-md-center">
        <div className="col-12 col-md-6">
            <Link to="/studentregistration">                
                <button type="button" className="btn btn-info btn-lg btn-block mb-4">Регистраци ученика</button>
            </Link>
            <Link to="/teacherregistration">  
                <button type="button" className="btn btn-info btn-lg btn-block">Регистраци учителя</button>
            </Link>
        </div>
        </div>
        </div>
        </React.Fragment>
    );

};

export default HomePage;