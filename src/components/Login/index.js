import React from 'react'
import styled from 'styled-components';

import { oauth2 } from '../../utils/medium';
import wallpaper from '../../pictures/wallpaper.jpg';

const StyledLogin = styled.div`
    height: 100%;

    .login__background {
        background-image: url(${wallpaper});
        height: 100%;
        position: absolute;
        width: 100%;
        z-index: -1;
        opacity: .5;
    }

    .login__container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0 auto;
        background: #fff;
        max-width: 512px;
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.3);
        padding: 62px 99px 48px;
        text-align: center;
        font-family: ${props => props.theme.fontFamily.main};

        .login__title {
            // font-family: 'Merriweather', serif;
        }

        .login__description {
            margin-top: 24px;
            font-size: 14px;
        }

        .login__button {
            margin-top: 24px;
            width: 100%;
            // background-color: rgb(66, 66, 66);
            background-color: rgb(1,1,1);
            color: #fff;
            padding: 12px 0px;
            border-radius: 6px;
            font-size: 14px;

            &:hover {
                cursor: pointer;
                background-color: rgb(32, 32, 32);
                // background-color: rgb(70, 70, 70);

            }

            .fa-medium {
                font-size: 1em;
                margin-right: 10px;
            }
        }
    }
`;

const Login = () => {
    return <StyledLogin>
        <div className="login__background"></div>
        <div className="login__container">
            <h1 className="login__title">MWriter</h1>
            <p className="login__description">A journaling app that posts to Medium. Organize and automate blogging.</p>
            {/* <div className="login__button" onClick={oauth2}>Continue with Medium</div> */}
            <div className="login__button" onClick={oauth2}><i class="fab fa-medium"></i> Sign in with Medium
            </div>
        </div>
    </StyledLogin>
}

export default Login
