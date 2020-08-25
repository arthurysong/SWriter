import React from 'react';
import Login from '../components/Login'
import Client from '../components/Client'
import Invalid from '../components/Invalid'
import { memoryRouter } from '../utils/memoryRouter';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { wait } from '@testing-library/react'

describe('Routes component', () => {
    describe('Basic routes', () => {
        it('/login should render Login', () => { // login will simply just render.
            const { wrapper } = memoryRouter('/login');
            expect(wrapper.find(Login)).toHaveLength(1);
        });

        it('/ should redirect to Client', () => {
            const { wrapper, history } = memoryRouter('/');
            expect(history.location.pathname).toBe('/client');
            expect(wrapper.find(Client)).toHaveLength(1);
        });

        it('/client should render to Client', () => {
            const { wrapper } = memoryRouter('/client');
            expect(wrapper.find(Client)).toHaveLength(1);
        });

        it('Invalid Route should render Invalid', () => {
            const { wrapper } = memoryRouter('/badroute');
            expect(wrapper.find(Invalid)).toHaveLength(1);
        })
    });

    describe('When access_token is valid', () => {
        let mock;
        beforeEach(() => {
            mock = new MockAdapter(axios);
            const items = ['hi', 'bye', 'okay']
            mock.onGet('https://www.googleapis.com/drive/v2/files').reply(200, { items });
        })

        it('/client should render Client', async () => {
            const { wrapper, history } = memoryRouter('/client');
            await wait(() => { // wait till the this test passes before moving forward.
                expect(mock.history.get.length).toBe(1);
            }) 
            wrapper.update();
            expect(wrapper.find(Client)).toHaveLength(1);
            expect(history.location.pathname).toEqual('/client')
        })
    })

    describe('When access_token is invalid', () => {
        let mock;
        beforeEach(() => {
            mock = new MockAdapter(axios);
            mock.onGet('https://www.googleapis.com/drive/v2/files').reply(401);
        })

        it('/client should redirect to /login', async () => { 
            const { wrapper, history } = memoryRouter('/client');
            await wait(() => { // wait till the this test passes before moving forward.
                expect(mock.history.get.length).toBe(1);
            }) 
            wrapper.update();
            expect(wrapper.find(Login)).toHaveLength(1);
            expect(history.location.pathname).toEqual('/login')
        })
    })
})