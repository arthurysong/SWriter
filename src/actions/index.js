import axios from 'axios';
import { API_URL } from '../utils/URL';

export const setNoteTitle = (notePosition, title) => ({ type: 'SET_NOTE_TITLE', notePosition, title })
export const setNoteContent = (notePosition, content) => ({ type: 'SET_NOTE_CONTENT', notePosition, content })
export const setNoteUpdatedAt = (notePosition, date) => ({ type: 'SET_NOTE_UPDATED_AT', notePosition, date });
export const setUser = user => ({ type: 'SET_USER', user });

export const setAuthTokens = (accessToken, refreshToken) => ({ type: 'SET_AUTH_TOKENS', accessToken, refreshToken })

export const getUser = (queryObject, history, setLoading) => async (dispatch, getState) => {
    const { accessToken, refreshToken } = getState().auth;

    // If accessToken and refreshToken are available use tokens to fetch user information
    if (accessToken !== undefined && refreshToken !== undefined) {
        console.log("or am i here??");
        const resp = await axios.post(`${API_URL}/users/medium`, {
            access_token: accessToken,
            refresh_token: refreshToken,
        })

        // The response will contain the same access token OR it might send a new one because the old one expired
        // Reset the access_token
        const { access_token, user } = resp.data;
        dispatch(setAuthTokens(access_token));

        dispatch(setUser(user));
        setTimeout(() => setLoading(false), 1000);
    } else {
        try {
            // Use query parameters from Medium redirect to fetch user information and tokens
            const resp = await axios.post(`${API_URL}/users/medium-oauth`, {
                queryObject
            })

            const { access_token, refresh_token, user } = resp.data;

            // Here set auth.accessToken and auth.refreshToken
            dispatch(setAuthTokens(access_token, refresh_token));
            dispatch(setUser(user));

            setTimeout(() => setLoading(false), 1000);
        } catch (err) {
            history.replace('/login');
        }
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

export const saveNote = (note, body ) => (dispatch, getState) => {
    const { notePosition } = getState();
    dispatch(incSavingNumber()); // add one to current number of saving 

    // an interval that we use to make sure saveStatus stays >= 1 for more than 3 seconds
    // So that the saving icon stays displayed for at least x seconds.
    let timePassed = 0;
    const minTimeInterval = setInterval(() => {
        timePassed += 100
    }, 100)

    axios.put(`${API_URL}/notes/${note._id}`, body)
        .then(resp => {

            // Delay updating the saveStatus for at least x - however seconds has passed
            setTimeout(() => {
                // Only incSavedNumber if savingNumber is greater than 0
                // For case when user switches notes while saving is taking place
                // The numbers will be reset to 0 and savedNumber shouldn't be incremented for the switched note
                if (getState().savingNumber > 0) dispatch(incSavedNumber());
                dispatch(setNoteUpdatedAt(notePosition, resp.data.note.updatedAt)); // Update the note's updatedAt so the TopBar can update the last saved...
                // setTimeout(() => dispatch(setSaveStatus(null)), 3000)
            }, 2000 - timePassed < 0 ? 0 : 2000 - timePassed)
            clearInterval(minTimeInterval); // clear counter
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
export const incSavingNumber = () => ({ type: 'INC_SAVING_NUMBER' });
export const incSavedNumber = () => ({ type: 'INC_SAVED_NUMBER' });
export const resetSaving = () => ({ type: 'RESET_SAVING' }) // When we switch documents we should reset the saving numbers to 0.
