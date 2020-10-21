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

// export const postNewNote = id => dispatch => {
//     const validIds = JSON.parse(localStorage.getItem('valid_ids'));
//     const id = validIds.pop();
//     if (validIds.length) {
//         localStorage.setItem('valid_ids', JSON.stringify(validIds));
//     } else {
//         dispatch(fetchValidFileIds());
//     }
//     // console.log(validIds);
//     dispatch(newFile(id));
//     dispatch(setEditorFileId(id));
//     // console.log(id);
//     axios.post('https://www.googleapis.com/drive/v3/files', {
//         parents: [localStorage.getItem('swriter_id')],
//         "id": id
//     }, {
//         headers: { 
//             authorization: `Bearer ${localStorage.getItem('access_token')}`,
//             "Accept": "application/json",
//             "Content-Type": "application/json", }
//     })
//         .then(resp => { console.log('note successfully created')})
//         .catch(err => console.log(err.response.data));
// }

// export const deleteFile = id => dispatch => {
//     dispatch({ type: 'DELETE_FILE', id })
//     axios.delete(`https://www.googleapis.com/drive/v2/files/${id}`, {
//         headers: { authorization: `Bearer ${localStorage.getItem('access_token')}` }
//     })
//         .then(resp => { 
//             if (resp.status === 204) {
//                 console.log('successfully deleted') 
//                 // i need to remove editorFileId, and also remove last_saved_id from localStorage
//                 localStorage.removeItem('last_saved_id');
//                 dispatch(setEditorFileId(undefined))
                
//             }
//         })
//         .catch(err => console.log(err.response.data));
// }

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

// export const getUser

export const setActiveNotebook = index => ({ type: 'SET_ACTIVE_NOTEBOOK', index })
export const setNotePosition = (notebookIndex, noteIndex) => ({ type: 'SET_NOTE_POSITION', notebookIndex, noteIndex })

export const saveNote = (note, body) => dispatch => {
    // console.log("note", note);
    // console.log("in saveNote", body);
    axios.put(`${API_URL}/notes/${note._id}`, body)
        .then(resp => console.log(resp))
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