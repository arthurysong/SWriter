import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    notePosition: [], // This is to find the note in the user array... 
    // index 0 => index of notebook in user.notebook
    // index 1 => index of note in user.notebook.notes
    
    activeNotebook: undefined, // This is the last selected notebook...
    // So that we can select a notebook and then create a new file under the last selected notebook.
    // It's the index in the users.notebooks array.

    user: {}, // Notebooks and notes are contained in here...
    saveStatus: undefined,
}

export default createReducer(initialState, {
    SET_NOTE_TITLE: (state, action) => { state.user.notebooks[action.notePosition[0]].notes[action.notePosition[1]].title = action.title },
    UPDATE_NOTE_PUBLISHED: (state, action) => { state.user.notebooks[action.notePosition[0]].notes[action.notePosition[1]].published = true },
    SET_NOTE_CONTENT: (state, action) => { state.user.notebooks[action.notePosition[0]].notes[action.notePosition[1]].content = action.content },
    SET_NOTE_UPDATED_AT: (state, action) => { state.user.notebooks[action.notePosition[0]].notes[action.notePosition[1]].updatedAt = action.date },
    DELETE_FILE: (state, action) => { delete state.files[action.id] },
    SET_USER: (state, action) => { state.user = action.user },
    SET_ACTIVE_NOTEBOOK: (state, action) => { state.activeNotebook = action.index },
    SET_NOTE_POSITION: (state, action) => { 
        state.notePosition[0] = action.notebookIndex;
        state.notePosition[1] = action.noteIndex;
    },
    ADD_NOTE: (state, action) => { 
        state.user.notebooks[action.activeNotebook].notes.push(action.note)
        state.notePosition = [action.activeNotebook, state.user.notebooks[action.activeNotebook].notes.length - 1]
    },
    DELETE_NOTE: (state) => { delete state.user.notebooks[state.notePosition[0]].notes[state.notePosition[1]] },
    SET_SAVE_STATUS: (state, action) => { state.saveStatus = action.status },
})