import React from 'react'
import Main from '../Main';
import SideBar from '../SideBar';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions';
import PacmanLoader from 'react-spinners/PacmanLoader';
import qs from 'qs';

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
`;

const Wrapper = styled.div`
    display: inline-block;
    vertical-align: text-top;
    position: relative;
    top: 40%;
    transform: translate(0, -50%);
    text-align: center;
`;

const Text = styled.div`
    text-transform: uppercase;
    letter-spacing: 6px;
    color: #26a65b;
    margin-bottom: 24px;
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
            <Wrapper>
                <Text>
                    Loading your ideas :)
                </Text>
                <PacmanLoader css="margin-left: 70px;" loading={loading} color="#26a65b" size="32px" margin="4px"/>
            </Wrapper>
        </LoaderPage>
    }

    return <Client />
}

export default ClientLoader