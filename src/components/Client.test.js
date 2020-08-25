import React from 'react';
import { shallow } from 'enzyme';
import Client from './Client';

describe('Client Component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Client />);
    });

    it('Should render', () => {
        const component = wrapper.find(".client");
        expect(component.length).toBe(1);
    })
});