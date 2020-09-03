import axios from 'axios';
// import uuidv4 from 'uuid';

export const newFile = id => ({ type: 'NEW_FILE', id })
export const setFileName = (id, name) => ({ type: 'SET_FILE_NAME', id, name })
export const setFileText = (id, text) => ({ type: 'SET_FILE_TEXT', id, text})
export const setEditorFileId = id => ({ type: 'SET_EDITOR_FILE_ID', id })

export const fetchValidFileIds = () => dispatch => {
    axios.get('https://www.googleapis.com/drive/v3/files/generateIds', {
        headers:  { authorization: `Bearer ${localStorage.getItem('access_token')}` }
    })
        .then(resp => {
            // console.log('allo??')
            // console.log(resp.data);
            localStorage.setItem('valid_ids', JSON.stringify(resp.data.ids))
        });
}

export const fetchFiles = (queryObject, history) => dispatch => {
    console.log(queryObject.access_token)
    axios.get('https://www.googleapis.com/drive/v3/files', {
        headers: { authorization: `Bearer ${queryObject.access_token}` },
        params: { q: "mimeType='application/vnd.google-apps.folder'andname='SWriter'" }})
        .then(resp => {
            // console.log(resp.data);
            localStorage.setItem('swriter_id', resp.data.files[0].id)
            localStorage.setItem('access_token', queryObject.access_token);

            if (resp.data.files.length) {
                const id = resp.data.files[0].id;
                axios.get(`https://www.googleapis.com/drive/v2/files/${id}/children`, {
                    headers: { authorization: `Bearer ${queryObject.access_token}` },
                    // params: { q: "mimeType='application/vnd.google-apps.file'" }
                })
                    .then(resp => {
                        // console.log('only files', resp.data)
                        resp.data.items.forEach(i => {
                            dispatch(newFile(i.id))
                            axios.get(`https://www.googleapis.com/drive/v3/files/${i.id}`, {
                                headers: { authorization: `Bearer ${queryObject.access_token}` }, 
                            })
                                .then(resp => {
                                    // console.log('item desc', resp.data)
                                    const { id, name } = resp.data
                                    dispatch(setFileName(id, name))
                                })
                                .catch(err => console.log(err.response.data));
                            axios.get(`https://www.googleapis.com/drive/v3/files/${i.id}?alt=media`, {
                                headers: { authorization: `Bearer ${queryObject.access_token}` }, 
                            })
                                .then(resp =>{
                                    // console.log('text', resp.data)
                                    dispatch(setFileText(i.id, resp.data))
                                })
                                .catch(err => console.log(err.response.data));
                        })
                    })
                    .catch(err => console.log(err.response.data))

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
    axios.put(`https://www.googleapis.com/upload/drive/v2/files/${id}`, body, { 
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
    const validIds = JSON.parse(localStorage.getItem('valid_ids'));
    const id = validIds.pop();
    if (validIds.length) {
        localStorage.setItem('valid_ids', JSON.stringify(validIds));
    } else {
        dispatch(fetchValidFileIds());
    }
    // console.log(validIds);
    dispatch(newFile(id));
    dispatch(setEditorFileId(id));
    // console.log(id);
    axios.post('https://www.googleapis.com/drive/v3/files', {
        parents: [localStorage.getItem('swriter_id')],
        "id": id
    }, {
        headers: { 
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json", }
    })
        .then(resp => { console.log('note successfully created')})
        .catch(err => console.log(err.response.data));
}