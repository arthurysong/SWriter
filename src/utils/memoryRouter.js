import { mount } from "enzyme"
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../routes/Routes';

export const memoryRouter = route => {
    return mount(
        <MemoryRouter initialEntries={[ `${route}` ]}>
            <Routes/>
        </MemoryRouter>
    )
}   