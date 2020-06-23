import React from 'react';

const {
    Provider: UsersServiceProvider,
    Consumer: UsersServiceConsumer
} = React.createContext();

export {
    UsersServiceProvider,
    UsersServiceConsumer
};