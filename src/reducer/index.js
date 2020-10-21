import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    // files: {},
    // editorFileId: undefined,
    // notebookIndex: undefined,
    // noteIndex: undefined,
    notePosition: [], // This is to find the note in the user array... 
    // index 0 => index of notebook in user.notebook
    // index 1 => index of note in user.notebook.notes
    
    activeNotebook: undefined, // This is the last selected notebook...
    // So that we can select a notebook and then create a new file under the last selected notebook.
    // It's the index in the users.notebooks array.

    user: {},
}

export default createReducer(initialState, {
    // NEW_FILE: (state, action) => { state.files[action.id] = { name: "Untitled", text: "" } },
    // NEW_FILE: (state, action) => { state.files.unshift({ id: action.id, name: "", text: "" }) },
    // NEW_DUMMY_FILE: (state, action) => { state.files[action.id] = { name: "Untitled", text: "" } },
    // SET_FILE_NAME: (state, action) => { state.files[action.id].name = action.name },
    SET_NOTE_TITLE: (state, action) => { state.user.notebooks[action.notePosition[0]].notes[action.notePosition[1]].title = action.title },
    UPDATE_NOTE_PUBLISHED: (state, action) => { state.user.notebooks[action.notePosition[0]].notes[action.notePosition[1]].published = true },
    // SET_FILE_TEXT: (state, action) => { state.files[action.id].text = action.text },
    SET_NOTE_CONTENT: (state, action) => { state.user.notebooks[action.notePosition[0]].notes[action.notePosition[1]].content = action.content },
    // SET_EDITOR_FILE_ID: (state, action) => { state.editorFileId = action.id },
    DELETE_FILE: (state, action) => { delete state.files[action.id] },
    SET_USER: (state, action) => { state.user = action.user },
    SET_ACTIVE_NOTEBOOK: (state, action) => { state.activeNotebook = action.index },
    SET_NOTE_POSITION: (state, action) => { 
        state.notePosition[0] = action.notebookIndex;
        state.notePosition[1] = action.noteIndex;
    },
    ADD_NOTE: (state, action) => { state.user.notebooks[action.activeNotebook].notes.push(action.note) }
})