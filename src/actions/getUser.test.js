import { getUser } from './index';
import { API_URL } from '../utils/URL';
import thunk from 'redux-thunk';
import configureMockStore from "redux-mock-store";
// import nock from 'nock';
// import fetchMock from 'fetch-mock';
// import { ExpansionPanelActions } from '@material-ui/core';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
    editorFileId: undefined,
    user: {},
};

describe("getUser", () => {
    const mockHistory = {
        push: () => console.log("Fake Push"),
        replace: () => console.log("Fake replace"),
    }
    const mockSetLoading = jest.fn();
    const queryObject = { state: "TESTSTATE", code: "testCode" }

    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    })

    describe("If access_token and refresh_token are not undefined", () => {
        // let mediumScope;
        let mock;
        beforeEach(() => {
            localStorage.setItem('access_token', "testAT");
            localStorage.setItem('refresh_token', "testRT");
            mock = new MockAdapter(axios);
            mock.onPost(`${API_URL}/users/medium`).reply(200, { access_token: "newTestAccessToken", user: { name: "Arthur", username: "Sona", id: 123456 }});
        })

        it("Should call to api/users/medium", () => {
            return store.dispatch(getUser(queryObject, mockHistory, mockSetLoading)).then(() => {
                expect(mock.history.post.length).toBe(1);
            })
        })

        describe("If call to api is successful", () => {
            it("Should set the new access token", () => {
                return store.dispatch(getUser(queryObject, mockHistory, mockSetLoading)).then(() => {
                    expect(localStorage.getItem('access_token')).toBe('newTestAccessToken')
                })
            });

            it("Should setUser action to have been called with user", () => {
                return store.dispatch(getUser(queryObject, mockHistory, mockSetLoading)).then(() => {
                    const expectedActions = [
                        { type: 'SET_USER', user: { name: "Arthur", username: "Sona", id: 123456 }}
                    ]
                    expect(store.getActions()).toEqual(expectedActions);
                })
            });

            // I'm not really sure how to test a setTimeout in a redux function
            // it("Should call setLoading callback function", () => {
            //     return store.dispatch(getUser(queryObject, mockHistory, mockSetLoading)).then(() => {
            //         expect(mockSetLoading).toHaveBeenCalled();
            //     })
            // })
        })

    })

    describe("If access token or refresh token is missing", () => {
        let mock;
        beforeEach(() => {
            localStorage.removeItem("access_token");
            mock = new MockAdapter(axios);
            mock.onPost(`${API_URL}/users/medium-oauth`).reply(200, { access_token: "newTestAccessToken", refresh_token: "newTestRefreshToken", user: { name: "Arthur", username: "Sona", id: 123456 }});
        })

        it("If access token is undefined it should call to api/users/medium-oauth", () => {
            localStorage.setItem('refresh_token', "testRT");
            localStorage.removeItem('access_token');
            return store.dispatch(getUser(queryObject, mockHistory, mockSetLoading)).then(() => {
                expect(mock.history.post.length).toBe(1);
            })
        })

        it("If refresh token is undefined it should call to api/users/medium-oauth", () => {
            localStorage.setItem('access_token', "testAT");
            localStorage.removeItem('refresh_token');
            return store.dispatch(getUser(queryObject, mockHistory, mockSetLoading)).then(() => {
                expect(mock.history.post.length).toBe(1);
            })
        })

        it("If both are undefined it should call to api/users/medium-oauth", () => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return store.dispatch(getUser(queryObject, mockHistory, mockSetLoading)).then(() => {
                expect(mock.history.post.length).toBe(1);
            })
        })

        describe("If call to api/users/medium-oauth is successful", () => {
            beforeEach(() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
            })
          
            it("Should set new access token and refresh token in localStorage", () => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                return store.dispatch(getUser(queryObject, mockHistory, mockSetLoading)).then(() => {
                    // console.log(localStorage);
                    expect(localStorage.getItem("access_token")).toBe("newTestAccessToken");
                    expect(localStorage.getItem("refresh_token")).toBe("newTestRefreshToken");
                })
            })

            it("Should call action setUser", () => {
                return store.dispatch(getUser(queryObject, mockHistory, mockSetLoading)).then(() => {
                    const expectedActions = [
                        { type: 'SET_USER', user: { name: "Arthur", username: "Sona", id: 123456 }}
                    ]
                    expect(store.getActions()).toEqual(expectedActions);
                })
            })
            
            // I'm not sure how to check the setTimeout function call
            // it("Should call setLoading callback function", () => {

            // });
        })

        describe("If call to api/users/medium-oauth fails", () => {
            let mock;
            beforeEach(() => {
                mock = new MockAdapter(axios);
                mock.onPost(`${API_URL}/users/medium-oauth`).reply(403);
            })

            it("Should call history.replace with '/login'", () => {
                const spy = jest.spyOn(mockHistory, 'replace');
                return store.dispatch(getUser(queryObject, mockHistory, mockSetLoading)).then(() => {
                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('/login');
                })
            })
        })
    })
    
})