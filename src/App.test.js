import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App Component', () => {
    it('Should render', () => {
        const wrapper = shallow(<App />)
        // console.log(wrapper.debug())
        expect(wrapper.length).toBe(1);
    });

    
});

// I want to test routes.. where if it's / I want it to render login
// I want to test where if I don't have a token yada yada.