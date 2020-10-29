import axios from 'axios';
import { API_URL } from '../utils/URL';

export const setFileName = (id, name) => ({ type: 'SET_FILE_NAME', id, name })
export const setNoteTitle = (notePosition, title) => ({ type: 'SET_NOTE_TITLE', notePosition, title })
export const setNoteContent = (notePosition, content) => ({ type: 'SET_NOTE_CONTENT', notePosition, content })

export const fetchValidFileIds = () => dispatch => {
    axios.get('https://www.googleapis.com/drive/v3/files/generateIds', {
        headers:  { authorization: `Bearer ${localStorage.getItem('medium_access_token')}` }
    })
        .then(resp => {
            // console.log(resp.data);
            localStorage.setItem('valid_ids', JSON.stringify(resp.data.ids))
        });
}

export const setUser = user => ({ type: 'SET_USER', user })

export const getUser = (queryObject, history, setLoading) => dispatch => {
    // console.log(queryObject);
    // console.log(localStorage);
    if (localStorage.getItem('medium_access_token') && localStorage.getItem('medium_access_token') !== "undefined" && localStorage.getItem('medium_refresh_token') && localStorage.getItem('medium_refresh_token') !== "undefined") {
        return axios.post(`${API_URL}/users/medium`, {
            access_token: localStorage.getItem('medium_access_token'),
            refresh_token: localStorage.getItem('medium_refresh_token'),
        })
            .then(resp => {
                // console.log(resp.data)
                const { access_token, user } = resp.data;
                localStorage.setItem('medium_access_token', access_token);
                dispatch(setUser(user));
                setTimeout(() => setLoading(false), 1000);
            })
            .catch(err => console.log(err));

    } else {
        return axios.post(`${API_URL}/users/medium-oauth`, {
            queryObject
        })
            .then(resp => {
                // console.log(resp.data)
                const { access_token, refresh_token, user } = resp.data;
                localStorage.setItem('medium_access_token', access_token);
                localStorage.setItem('medium_refresh_token', refresh_token);
                dispatch(setUser(user));
                setTimeout(() => setLoading(false), 1000);
            })
            .catch(err => {
                // console.log("error", err)
                history.replace('/login');
            });
    }
}

export const logout = (history) => dispatch => {
    // Should delete medium tokens from localStorage, should unset the user
    // Should push to the login route
    localStorage.removeItem('medium_access_token');
    localStorage.removeItem('medium_refresh_token');
    dispatch(setUser({}));
    history.replace('/login');
}

export const setActiveNotebook = index => ({ type: 'SET_ACTIVE_NOTEBOOK', index })
export const setNotePosition = (notebookIndex, noteIndex) => ({ type: 'SET_NOTE_POSITION', notebookIndex, noteIndex })

export const saveNote = (note, body) => dispatch => {
    // console.log("note", note);
    // console.log("in saveNote", body);
    dispatch(saveStatus("Saving"))
    let timePassed = 0;
    const minTimeInterval = setInterval(() => {
        timePassed += 1000
    }, 1000)
    axios.put(`${API_URL}/notes/${note._id}`, body)
        .then(resp => {
            console.log(resp);
            console.log(3 - timePassed);
            setTimeout(() => {
                dispatch(saveStatus("Saved"))
                setTimeout(() => dispatch(saveStatus(null)), 5000);
            // }, 3 - timePassed < 0 ? 0 : 3 - timePassed)
            }, 3000 - timePassed < 0 ? 0 : 3000 - timePassed)
            clearInterval(minTimeInterval);
            // dispatch(saveStatus("Saved"));
            // setTimeout(() => dispatch(saveStatus(undefined)), 5000);
        })
        .catch(err => console.log(err));
}

export const newNote = (notebook, owner, activeNotebook) => dispatch => {
    axios.post(`${API_URL}/notes`, { notebook, owner })
        .then(resp => {
            console.log(resp)
            // add the note book to notebooks
            dispatch({ type: 'ADD_NOTE', note: resp.data, activeNotebook })
        })
        .catch(err => console.log(err));
}

export const deleteNote = note => dispatch => {
    axios.delete(`${API_URL}/notes/${note}`)
        .then(resp => {
            console.log(resp);
            dispatch({ type: 'DELETE_NOTE' })
        })
        .catch(err => console.log(err));
}

export const publishPost = (note, notePosition) => dispatch => {
    console.log("Publishing...");
    // console.log(note.content);
    axios.post(`${API_URL}/notes/${note._id}/publish`, {
        access_token: localStorage.getItem('medium_access_token'),
        refresh_token: localStorage.getItem('medium_refresh_token'),
    })
        .then(resp => {
            console.log(resp);
            dispatch({ type: 'UPDATE_NOTE_PUBLISHED', notePosition })
        })
        .catch(err => console.log(err));
}

// saveStatus Actions
export const saveStatus = status => ({ type: 'SET_SAVE_STATUS', status })