import React from 'react';
import { UsersServiceConsumer } from '../users-service-context';

const withUsersService = () => (Wrapped) => {

    return (props) => {

        return (
            <UsersServiceConsumer>
                {
                    (usersService) => {
                        return (
                            <Wrapped {...props}  usersService={usersService} />
                        );
                        
                    }
                }
            </UsersServiceConsumer>
        );

    }
};

export default withUsersService;