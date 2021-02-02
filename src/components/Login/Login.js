import React from 'react'
import styled from 'styled-components';

import { oauth2 } from '../../utils/medium';
import wallpaper from '../../assets/images/wallpaper.jpg';
import logo from '../../assets/images/logo.png';

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
        max-width: 360px;
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.3);
        padding: 24px 99px 48px;
        text-align: center;
        font-family: ${props => props.theme.fontFamily.main};

        .login__title {
            // font-family: 'Merriweather', serif;
        }

        .login__description {
            margin-top: 12px;
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

        .login__signup {
            &:hover {
                cursor: pointer;
            }
        }
    }
`;

const Login = () => {
    return <StyledLogin>
        <div className="login__background"></div>
        <div className="login__container">
        <img src={logo} alt="mwriter logo" width={75}/>
            {/* <h1 className="login__title">MWriter</h1> */}
            <p className="login__description">A journaling app that posts to Medium. Organize and automate blogging.</p>
            {/* <div className="login__button" onClick={oauth2}>Continue with Medium</div> */}
            <div className="login__button" onClick={oauth2}><i class="fab fa-medium"></i> Continue with Medium</div>
            <div className="login__signup" onClick={oauth2} style={{ fontSize: 14, marginTop: 16, textDecoration: 'underline', "&:hover": {
                cursor: "pointer",
            } }}>Don't have an account? Sign up with Medium.</div>
        </div>
    </StyledLogin>
}

export default Login
