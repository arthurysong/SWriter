import React from 'react'
import styled from 'styled-components';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { useDispatch } from 'react-redux';
import qs from 'qs';

import Main from './Main';
import SideBar from '../SideBar';
import { getUser } from '../../redux/actions';

const Page = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    z-index: 0;
`;

const Client = () => {
    return <Page>
        <SideBar /> 
        <Main />
    </Page>
}

const LoaderPage = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #eaeaea;
    text-align: center;

    .page__wrapper {
        display: inline-block;
        vertical-align: text-top;
        position: relative;
        top: 40%;
        transform: translate(0, -50%);
        text-align: center;
    }

    .page__text {
        text-transform: uppercase;
        letter-spacing: 6px;
        color: #26a65b;
        margin-bottom: 24px;
    }
`;

const ClientLoader = ({ history }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const queryObject = qs.parse(history.location.search.substring(1));
        dispatch(getUser(queryObject, history, setLoading));
    }, [])

    if (loading) {
        return <LoaderPage>
            <div className="page__wrapper">
                <div className="page__text">
                    Loading your ideas :)
                </div>
                <PacmanLoader css="margin-left: 70px;" loading={loading} color="#26a65b" size="32px" margin="4px"/>
            </div>
        </LoaderPage>
    }

    return <Client />
}

export default ClientLoader