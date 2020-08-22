import React from 'react';
import Login from '../components/Login'
import Client from '../components/Client'
import { memoryRouter } from '../utils/memoryRouter';

describe('Routes component', () => {
    it('Path /login should render Login', () => {
        // console.log(localStorage);
        // console.log(location.pathname);
        // console.log(wrapper.debug());
        const wrapper = memoryRouter('/login');
        expect(wrapper.find(Login)).toHaveLength(1);
    });

    it('Path /client should render Client', () => {
        const wrapper = memoryRouter('/client');
        expect(wrapper.find(Client)).toHaveLength(1);
    })

    it('Path / should redirect to /login if no token', () => {
        const wrapper = memoryRouter('/')
        console.log(localStorage);
        // expect(wrapper.find(Client))
    })
})