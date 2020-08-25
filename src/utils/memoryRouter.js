import { mount } from "enzyme"
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Routes from '../routes/Routes';

export const memoryRouter = route => {
    const history = createMemoryHistory({ initialEntries: [route] });

    return {
        wrapper: mount(
        <Router history={history}>
            <Routes/>
        </Router>
    ), 
        history
}}   