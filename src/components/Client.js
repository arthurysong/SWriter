import React, { useEffect } from 'react'
import qs from 'qs';
import './Client.scss';
import 'react-markdown-editor-lite/lib/index.css';
import Main from './Main';
import SideBar from './SideBar';
import { useDispatch } from 'react-redux';
// import { fetchFiles, fetchValidFileIds } from '../actions';

const Client = ({ history }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        // const queryObject = qs.parse(history.location.hash);
        // console.log(qs.parse(history.location.search));
        // dispatch(fetchFiles(queryObject, history));
        // if (!localStorage.getItem('valid_ids') || localStorage.getItem('valid_ids') === "[]") dispatch(fetchValidFileIds());
    }, [history])

    return <div data-test="client" className="client">
        <SideBar />
        <Main />
    </div>
}

export default Client