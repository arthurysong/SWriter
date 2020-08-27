import React from 'react';
import { shallow, mount } from 'enzyme';
import { wait } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
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

    describe('On Mount', () => {
        let mock = new MockAdapter(axios);

        describe('When SWriter folder is already created', () => {
            beforeEach(() => {
                // we will give mock data of three different files
                const files = [{ 
                    id: "1VWD6Ja_YbsugU2-elCQydcYvr1rhjore",
                    kind: "drive#file",
                    mimeType: "application/vnd.google-apps.folder",
                    name: "SWriter", }]
                const items = [
                    { id: "1nURwWPirBb2BhAEPgzz1KtUVs6rfDTnNdT6oVvjR434"},
                    { id: "1nURwWPirBb2BhAEPgzz1KtUVs6rfDTnNdT6oVvjR435"},
                    { id: "1nURwWPirBb2BhAEPgzz1KtUVs6rfDTnNdT6oVvjR436"},]
                    
                mock.onGet('https://www.googleapis.com/drive/v3/files').reply(200, { files });
                mock.onGet(/https:\/\/www\.googleapis\.com\/drive\/v2\/files\/\S+\/children/).reply(200, { items })
                mock.onGet(/https:\/\/www.googleapis.com\/drive\/v3\/files\/\S+\/export/).reply(200, "Test test test")
            })

            it('Should fetch text for each child', async () => {
                const wrapper = mount(<Client history={{ location: { hash: ""}}}/>)
                await wait(() => {
                    expect(mock.history.get.length).toBe(5) // 1 for folder, 1 for children, 3 for each export
                })
            })

            it('Should not create a new SWriter file', () => {
                // expect(1).toBe(2)
            })
        })

        describe('When SWriter folder has not been created', () => {
            // Should create a new SWriter folder successfully
            beforeEach(() => {
                const files = [];
                mock.onGet('https://www.googleapis.com/drive/v3/files').reply(200, { files });
                mock.onPost('https://www.googleapis.com/drive/v3/files').reply(200, {
                    "kind": "drive#file",
                    "id": "1Z9gLJ3u0FAVEeJ1z9XpWIIonnlj5dfcy",
                    "name": "Test Create 2",
                    "mimeType": "application/vnd.google-apps.folder"
                   });
            })

            it('Should successfully post new SWriter folder', async () => {
                const wrapper = mount(<Client history={{ location: { hash: ""}}}/>)
                await wait(() => {
                    expect(mock.history.post.length).toBe(1)
                })
            })
        })
    })
});