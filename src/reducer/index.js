import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    files: {},
    editorFileId: undefined,
}

export default createReducer(initialState, {
    NEW_FILE: (state, action) => { state.files[action.id] = { name: "Untitled", text: "" } },
    // NEW_FILE: (state, action) => { state.files.unshift({ id: action.id, name: "", text: "" }) },
    // NEW_DUMMY_FILE: (state, action) => { state.files[action.id] = { name: "Untitled", text: "" } },
    SET_FILE_NAME: (state, action) => { state.files[action.id].name = action.name },
    SET_FILE_TEXT: (state, action) => { state.files[action.id].text = action.text },
    SET_EDITOR_FILE_ID: (state, action) => { state.editorFileId = action.id },
    DELETE_FILE: (state, action) => { delete state.files[action.id] },
    // SET_DUMMY_FILE_OFFICIAL_ID: (state, action) => { 
    //     state.files[action.id] = state.files[action.dummyId];
    //     delete state.files[action.dummyId];
    // }
    // NEW_DUMMY_FILE: (state, action) => { state.files[action.]}
})