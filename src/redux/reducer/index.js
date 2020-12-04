import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    // access_token and refresh_token for medium authentication
    // this state is persisted between refreshes, so we can keep user logged in...
    auth: {},

    notePosition: {
        notebook: undefined,
        note: undefined,
    }, 
    
    // This is the last selected notebook...
    // So that we can select a notebook and then create a new file under the last selected notebook.
    // It's the index in the users.notebooks array.
    activeNotebook: undefined, 

    // Notebooks and notes are also contained in here...
    user: {}, 
    publications: [],

    // Compare these two numbers to determine whether saving is in progress or has saved, because multiple saves take place sometimes.
    savingNumber: 0, 
    savedNumber: 0,

    // Used to display proper information in publishing modal
    // possible statuses
    // 0 => starting
    // 1 => in progress
    // 2 => finished
    publishingStatus: undefined,
}

const getNoteFromPosition = (state, notePosition) => state.user.notebooks[notePosition.notebook].notes[notePosition.note];

export default createReducer(initialState, {
    // Actions for auth
    SET_AUTH_TOKENS: (state, action) => { state.auth = { accessToken: action.accessToken, refreshToken: action.refreshToken } },
    REMOVE_AUTH_TOKENS: state => { state.auth = {} },

    // Actions for Note
    SET_NOTE_TITLE: (state, action) => { getNoteFromPosition(state, action.notePosition).title = action.title },
    UPDATE_NOTE_PUBLISHED: (state, action) => { getNoteFromPosition(state, action.notePosition).published = true },

    // update the mediumURL of note after publish, so we can show link in publish modal
    UPDATE_NOTE_MEDIUM_URL: (state, action) => { getNoteFromPosition(state, action.notePosition).mediumURL = action.mediumURL },
    SET_NOTE_CONTENT: (state, action) => { getNoteFromPosition(state, action.notePosition).content = action.content },
    SET_NOTE_UPDATED_AT: (state, action) => { getNoteFromPosition(state, action.notePosition).updatedAt = action.date }, 
    ADD_NOTE: (state, action) => { 
        // state.user.notebooks[action.activeNotebook].notes.push(action.note)
        state.user.notebooks[action.activeNotebook].notes[action.note._id] = action.note;
        state.notePosition = {
            notebook: action.note.notebook,
            note: action.note._id,
        }
    },
    DELETE_NOTE: (state) => { delete state.user.notebooks[state.notePosition.notebook].notes[state.notePosition.note] },
    
    // Actions for User
    SET_USER: (state, action) => { state.user = action.user },
    SET_PUBLICATIONS: (state, action) => { state.publications = action.publications },

    // activeNotebook
    SET_ACTIVE_NOTEBOOK: (state, action) => { state.activeNotebook = action.id },

    // notePosition
    SET_NOTE_POSITION: (state, action) => { 
        state.notePosition.notebook = action.note.notebook;
        state.notePosition.note = action.note._id;
    },
    
    // Actions for the saving in progress status
    INC_SAVING_NUMBER: state => { state.savingNumber += 1 },
    INC_SAVED_NUMBER: state => { state.savedNumber += 1 },
    RESET_SAVING: state => { 
        state.savedNumber = 0;
        state.savingNumber = 0;
    },

    // publishStatus
    SET_PUBLISHING_STATUS: (state, action) => { state.publishingStatus = action.status },
})