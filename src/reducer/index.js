import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    // access_token and refresh_token for medium authentication
    auth: {},

    // This is to find the note in the user array... 
    // index 0 => index of notebook in user.notebook
    // index 1 => index of note in user.notebook.notes
    notePosition: [], 
    
    // This is the last selected notebook...
    // So that we can select a notebook and then create a new file under the last selected notebook.
    // It's the index in the users.notebooks array.
    activeNotebook: undefined, 

    // Notebooks and notes are also contained in here...
    user: {}, 

    // Compare these two numbers to determine whether saving is in progress or has saved, because multiple saves take place sometimes.
    savingNumber: 0, 
    savedNumber: 0,
}

export default createReducer(initialState, {
    // Actions for auth
    SET_AUTH_TOKENS: (state, action) => { state.auth = { accessToken: action.accessToken, refreshToken: action.refreshToken } },

    // Actions for Note
    SET_NOTE_TITLE: (state, action) => { state.user.notebooks[action.notePosition[0]].notes[action.notePosition[1]].title = action.title },
    UPDATE_NOTE_PUBLISHED: (state, action) => { state.user.notebooks[action.notePosition[0]].notes[action.notePosition[1]].published = true },
    SET_NOTE_CONTENT: (state, action) => { state.user.notebooks[action.notePosition[0]].notes[action.notePosition[1]].content = action.content },
    SET_NOTE_UPDATED_AT: (state, action) => { state.user.notebooks[action.notePosition[0]].notes[action.notePosition[1]].updatedAt = action.date }, 
    ADD_NOTE: (state, action) => { 
        state.user.notebooks[action.activeNotebook].notes.push(action.note)
        state.notePosition = [action.activeNotebook, state.user.notebooks[action.activeNotebook].notes.length - 1]
    },
    DELETE_NOTE: (state) => { delete state.user.notebooks[state.notePosition[0]].notes[state.notePosition[1]] },
    
    // Actions for User
    SET_USER: (state, action) => { state.user = action.user },

    // activeNotebook
    SET_ACTIVE_NOTEBOOK: (state, action) => { state.activeNotebook = action.index },

    // notePosition
    SET_NOTE_POSITION: (state, action) => { 
        state.notePosition[0] = action.notebookIndex;
        state.notePosition[1] = action.noteIndex;
    },
    
    // Actions for the saving in progress status
    INC_SAVING_NUMBER: state => { state.savingNumber += 1 },
    INC_SAVED_NUMBER: state => { state.savedNumber += 1 },
    RESET_SAVING: state => { 
        state.savedNumber = 0;
        state.savingNumber = 0;
    }
})