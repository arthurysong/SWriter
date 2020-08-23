import React from 'react';
import moxios from 'moxios';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, useHistory } from 'react-router-dom'
import Client from './Client';
import Routes from '../routes/Routes';
import { jobs_v3p1beta1 } from 'googleapis';

describe('Client Component', () => {
    let wrapper;
    beforeEach(() => {
        // need the Router so that Client can access useHistory in test.
        moxios.install();
        
        wrapper = mount(
            <MemoryRouter initialEntries={[ `/client#state=oauth&access_token=ya29.a0AfH6SMAJxKx9xvObo3eKgvjczg4Hpd1vsUxsDXRJCSKqid-0Ts85GT5BT8QzFtmHubSofCikGV2pzNO7l-LBAxwkeSQjfuXStViasUf0ucMk8XEhqbBAHojVerDcjcgQ08o3UkL4tK94yGZfnU7hApvKXnxCrWi8bNY&token_type=Bearer&expires_in=3599&scope=https://www.googleapis.com/auth/drive` ]}> 
                <Routes/>
            </MemoryRouter>)
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('Should render', () => {
        const component = wrapper.find("[data-test='client']");
        expect(component.length).toBe(1);
    })

    it('Should redirect to /login if request responds with 401', () => {
        const mock = new MockAdapter(axios);
        mock.onGet('https://www.googleapis.com/drive/v2/files').reply(401);
        const historyMock = { push: jest.fn() };
        const component = mount(
            <MemoryRouter initialEntries={[ `/client#state=oauth&access_token=ya29.a0AfH6SMAJxKx9xvObo3eKgvjczg4Hpd1vsUxsDXRJCSKqid-0Ts85GT5BT8QzFtmHubSofCikGV2pzNO7l-LBAxwkeSQjfuXStViasUf0ucMk8XEhqbBAHojVerDcjcgQ08o3UkL4tK94yGZfnU7hApvKXnxCrWi8bNY&token_type=Bearer&expires_in=3599&scope=https://www.googleapis.com/auth/drive` ]}> 
                <Client history={historyMock} />
            </MemoryRouter>);
        console.log(component.debug());
        console.log(historyMock.push.mock.calls[0])
        expect(historyMock.push.mock.calls[0])
        console.log(location.pathname === '/login');
    })
});