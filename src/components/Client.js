import React, { useEffect } from 'react'
import qs from 'qs';
import './Client.scss';
import 'react-markdown-editor-lite/lib/index.css';
import Main from './Main';
import SideBar from './SideBar';
import { useDispatch } from 'react-redux';
import { fetchFiles } from '../actions';

const Client = ({ history }) => {
    // const [editorText, setEditorText] = useState('# What??');
    const dispatch = useDispatch();
    useEffect(() => {
        const queryObject = qs.parse(history.location.hash);
        dispatch(fetchFiles(queryObject, history));
    }, [history])

    return <div data-test="client" className="client">
        <SideBar />
        <Main />
    </div>
}

export default Client