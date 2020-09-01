import axios from 'axios';

export const setFileId = id => ({ type: 'SET_FILE_ID', id })
export const setFileName = (id, name) => ({ type: 'SET_FILE_NAME', id, name })
export const setFileText = (id, text) => ({ type: 'SET_FILE_TEXT', id, text})
export const setEditorFileId = id => ({ type: 'SET_EDITOR_FILE_ID', id })
// export const addNewNote = id => ({ type: 'NEW_NOTE', id })

export const fetchFiles = (queryObject, history) => dispatch => {
    axios.get('https://www.googleapis.com/drive/v3/files', {
        headers: { authorization: `Bearer ${queryObject.access_token}` },
        params: { q: "mimeType='application/vnd.google-apps.folder'andname='SWriter'" }})
        .then(resp => {
            console.log(resp.data);
            localStorage.setItem('swriter_id', resp.data.files[0].id)
            localStorage.setItem('access_token', queryObject.access_token);

            if (resp.data.files.length) {
                const id = resp.data.files[0].id;
                axios.get(`https://www.googleapis.com/drive/v2/files/${id}/children`, {
                    headers: { authorization: `Bearer ${queryObject.access_token}` },
                    params: { q: "mimeType='application/vnd.google-apps.document'" }})
                    .then(resp => {
                        console.log('only files', resp.data)
                        resp.data.items.forEach(i => {
                            dispatch(setFileId(i.id))
                            axios.get(`https://www.googleapis.com/drive/v3/files/${i.id}/`, {
                                headers: { authorization: `Bearer ${queryObject.access_token}` }, 
                            })
                                .then(resp => {
                                    // console.log('item desc', resp.data)
                                    const { id, name } = resp.data
                                    dispatch(setFileName(id, name))
                                });
                            axios.get(`https://www.googleapis.com/drive/v3/files/${i.id}/export`, {
                                headers: { authorization: `Bearer ${queryObject.access_token}` }, 
                                params: { mimeType: "text/plain" },
                                // params: { mimeType: "text/html" },
                            })
                                .then(resp =>{
                                    // console.log('text', resp)
                                    dispatch(setFileText(i.id, resp.data))
                                })
                        })
                    })

            } else {
                axios.post('https://www.googleapis.com/drive/v3/files', 
                {
                    "mimeType": "application/vnd.google-apps.folder",
                    "name": "SWriter"
                }, {
                    headers: { 
                        authorization: `Bearer ${queryObject.access_token}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    }})
                    .then(resp => console.log('SWriter successfully created'));
            }
        })
        .catch(err => {
            if (err.response?.status === 401) {
                localStorage.setItem('access_token', undefined);
                history.replace('/login');
            }
        })
}

export const saveFileContent = (id, body) => dispatch => {
    axios.put(`https://www.googleapis.com/upload/drive/v2/files/${"1qgjtmuv7MA9NkksL2LcB6Q5dZuad63OTI1gNAoicJ7o"}`, body, { 
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
    }})
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
}

export const saveFileName = (id, name) => dispatch => {
    axios.put(`https://www.googleapis.com/drive/v2/files/${id}`, {
        "title": name
    }, { 
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
    }})
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
}

export const postNewNote = id => dispatch => {
    // axios.post('https://www.googleapis.com/drive/v3/files', {
    console.log(localStorage.getItem('access_token'))
    // const body = 
    //     `
    //     --foo_bar
    //     Content-Type: application/json; charset=UTF-8

    //     {
    //         parents: [localStorage.getItem('swriter_id')],
    //         "mimeType": "application/vnd.google-apps.document",
    //     }

    //     --foo_bar
    //     Content-Type: text/plain
        
    //     `
    axios.post('https://www.googleapis.com/drive/v3/files', {
        parents: [localStorage.getItem('swriter_id')],
        "mimeType": "application/vnd.google-apps.document",
    }, {
        headers: { 
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json", }
    })
        .then(resp => {
            console.log('note successfully created')
            dispatch(setFileId(resp.data.id));
            dispatch(setFileName(resp.data.id, resp.data.name));
            dispatch(setFileText(resp.data.id, ""));
            // add new note in reducer.
        })
        .catch(err => console.log(err));
}