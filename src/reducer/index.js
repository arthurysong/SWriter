import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    files: {},
    fileId: undefined,
}

export default createReducer(initialState, {
    SET_FILE_NAME: (state, action) => { state.files[action.file.id] = { name: action.file.name } },
    SET_FILE_TEXT: (state, action) => { state.files[action.id].text = action.text }
})