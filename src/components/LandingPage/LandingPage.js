import React from 'react'
import styled, { keyframes } from 'styled-components';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import { useHistory } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import logo from '../../assets/images/logo.png';
import blog from '../../assets/images/blog.svg';
import info from '../../assets/images/info.svg';
import publish from '../../assets/images/publish.svg';
import organize from '../../assets/images/organize.svg';
import medium from '../../assets/images/medium.svg';
import twitter from '../../assets/images/twitter.svg';
import linkedin from '../../assets/images/linkedin.svg';
import reddit from '../../assets/images/reddit.svg';
import reddit2 from '../../assets/images/reddit2.svg';
import codeblocks from '../../assets/images/codeblocks.svg';
import codereview from '../../assets/images/codereview.svg';
import codetyping from '../../assets/images/codetyping.svg';

import publishicon from '../../assets/images/publish.png';
import folder from '../../assets/images/folder.png';
import prettier from '../../assets/images/prettier.png';

import Button from '../../Button';
import Link from '../../Link';


const StyledLandingPage = styled.div`

`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  width: 1220px;
  margin: 0 auto;
  justify-content: space-between;
`;

const Section = styled.section`

`;

const SectionContainer = styled.div`
  width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SectionText = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

// const text = styled.keyframes``;
const slideUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const Title = styled.h1`
  font-size: 42px;
  letter-spacing: -.5px;
  font-weight: 500;
  font-style: normal;
  line-height; 60px;
  text-decoration: unset;
  margin-bottom: 25px;
  // animation: ${slideUp} 1s ease;
  animation: 1s ease 0.2s 1 normal forwards running ${slideUp}
`;

const Subtitle = styled.h3`
  text-decoration: unset;
  font-size: 24px;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: -0.24px;
  text-decoration: unset;
  margin-bottom: 20px;
`;

const Header = styled.h2`
  font-size: 32px;
  font-weight: normal;
  margin-bottom: 16px;
  // animation: ${slideUp} 1s ease;
  animation: 1s ease 0.2s 1 normal forwards running ${slideUp}
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 150%;
  margin-bottom: 36px;
  line-height: 28px;
  text-decoration: unset;
  letter-spacing: -0.25px;
`;

const P = styled.p`
  font-size: 18px;
  line-height: 150%;
  line-height: 28px;
  text-decoration: unset;
  letter-spacing: -0.25px;
`;

const SmallP = styled.p`
  font-size: 15px;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: -0.1px;
  text-deocoration: unset;
`;

const Bold = styled.strong`
  font-weight: 500;
`;

export default function LandingPage() {

  return (
    <StyledLandingPage>
      <TopBar >
        <img src={logo} alt="mwriter logo" width={100}/>
        <div style={{ display: 'flex', alignItems: 'center', }}>
          <Link to="/login" style={{ marginRight: "30px" }}><P as={Bold}>Log In</P></Link>
          <Link to="/login"><Button >
            <P as={Bold}>Get Started</P>
          </Button></Link>
        </div>
      </TopBar>
      <section style={{ padding: '60px 0  75px', }}>
        <SectionContainer>
          <SectionText>
            <Title>Improve your Technical blogging with organization and automation</Title>
            <Subtitle>MWriter helps Medium technical writers share their ideas efficiently</Subtitle>
            <Link to="/login"><Button black style={{ marginBottom: "24px", }}><P as={Bold}>Get Started</P></Button></Link>
            <Link to="/login" style={{ textDecoration: 'underline', }}>Already have an account? Log in</Link>
          </SectionText>
          <img src={codereview} alt="someone writing a blog on their laptop" width={600}/>
        </SectionContainer>
      </section>

      <Section style={{ borderTop: '1px solid #000', padding: '72px 0', backgroundColor: 'rgb(240, 235, 230)' }}>
        <SectionContainer>
          {/* <SectionText style={{ display: 'flex', flexDirection: 'start', alignItems: 'center', }}> */}
          <div style={{ width: 450, textAlign: 'center', }}>
            <Header >Bug-free, Powerful Editor</Header>
            <Text>Draft your blog posts using a powerful, bug-free text editor. Easily include images, headers, links, code blocks and more with no hassle.</Text>
            <GetStartedButton />
          </div>
          {/* </SectionText> */}
        </SectionContainer>
      </Section>

      <section style={{ borderTop: '1px solid #000', padding: '100px 0' }}>
        <SectionContainer style={{ marginBottom: 100 }} >
          <SectionText style={{ width: 560 }}>
            <img src={folder} width={60} style={{ marginBottom: 20 }} />
            <Header>Note Organization</Header>
            <Text style={{ width: 430 }}>Keep your Medium drafts and published posts organized using notebooks.</Text>
            <InfoText />
          </SectionText>
          <img src={organize} alt="someone organizing files into foler" height={360} />
        </SectionContainer>
        <SectionContainer style={{ marginBottom: 100 }}>
          <img src={publish} alt="someone publishing a blog post" height={360}/>
          <SectionText style={{ width: 560 }}>
            <img src={publishicon} width={60} style={{ marginBottom: 20 }} />
            <Header>Medium Integration</Header>
            <Text style={{ width: 430 }}>Publish directly to your Medium account with just one click. Before you select "Publish Now", select any tags you want for your post. You can also publish your note under any publications.</Text>
            <InfoText />
          </SectionText>
        </SectionContainer>
        <SectionContainer>
          <SectionText style={{ width: 560 }}>
            <img src={prettier} width={60} style={{ marginBottom: 20 }} />
            <Header>No More Ugly Medium Codeblocks</Header>
            <Text style={{ width: 430 }}>Take Advantage of GitHub Gist's syntax highlighting and prettier formatting. When you hit "Publish", MWriter will automatically create and import any code snippets as GitHub Gists!</Text>
            <InfoText />
          </SectionText>
          <img src={codeblocks} alt="someone publishing a blog post" height={360}/>
        </SectionContainer>
      </section>
      <section style={{ padding: '80px 0', }}>
        <SectionContainer style={{ display: 'block' }}>
          <div style={{ paddingBottom: 48, marginBottom: 48, borderBottom: '3px solid #000' }}>
            <img src={logo} alt="mwriter logo" width={100}/>
          </div>
          <div style={{ display: 'flex', marginBottom: 35, paddingBottom: 60, borderBottom: '1px solid rgba(136,139,141,0.5)', }}>
            <Column>
              <ColumnHeader>Product</ColumnHeader>
              <ColumnItem>Why MWriter</ColumnItem>
              <ColumnItem>Download App</ColumnItem>
            </Column>
            <Column>
              <ColumnHeader>Community</ColumnHeader>
              <ColumnItem>r/MWriter</ColumnItem>
              <ColumnItem>Support us on Patreon</ColumnItem>
              <ColumnItem>Report a Bug</ColumnItem>
              <ColumnItem>Help</ColumnItem>
            </Column>
            <Column>
              <ColumnHeader>Company</ColumnHeader>
              <ColumnItem>About Us</ColumnItem>
              <ColumnItem>Blog</ColumnItem>
              <ColumnItem>Contact Us</ColumnItem>
            </Column>
            <div style={{ display: 'flex', marginLeft: 'auto', }}>
              <SocialIcon src={reddit} alt="reddit"/>
              <SocialIcon src={linkedin} alt="linkedin"/>
              <SocialIcon src={twitter} alt="twitter"/>
              <SocialIcon src={medium} alt="medium"/>
            </div>
          </div>
          <SmallP style={{ opacity: 0.6 }}>© 2021 MWriter. All rights reserved.</SmallP>
          <div>

          </div>
        </SectionContainer>
      </section>
    </StyledLandingPage>
  )
}

const SocialIcon = styled.img`
  margin: 0 10px;
  width: 20px;
  height: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const Column = styled.div`
  display: block;
  width: 250px;
`;

const ColumnHeader = styled(P)`
  text-transform: uppercase;
  font-weight: 500;
  padding: 8px 0;
`;

const ColumnItem = styled(P)`
  // margin-top: 8px;
  padding: 8px 0;
  &:hover {
    cursor: pointer;
  }
`;

export const InfoText = () => {
  return <StyledInfoText>
    <svg style={{ fill: 'rgb(111, 120, 126)', marginRight: '16px' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 18h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z"/></svg>
    <P style={{ fontWeight: 500 }}>Learn More</P>
  </StyledInfoText>
}

const StyledInfoText = styled.div`
  color: rgb(111, 120, 126);
  display: flex;

  &:hover {
    cursor: pointer;
  }
`;

export const GetStartedButton = () => {
  return <div style={{ display: 'flex', justifyContent: 'center' }}>
    <GetStarted>
      <RippleButton><ArrowForwardIcon /></RippleButton>
      <GetStartedText>Get Started</GetStartedText>
    </GetStarted>
  </div>
}

const RippleButton = styled.button`
  background: #3aa82d;
  border-radius: 100%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  // cursor: pointer;
  width: 64px;
  height: 64px;
  color: white;
  // margin: 0 auto;
  // z-index: 4;

  :before {
    content: '';
    width: 64px;
    height: 64px;
    position: absolute;
    // z-index: 0;
    border-radius: 100%;
    animation: ripples 1s ease-out infinite;
  }

  &:hover {
    cursor: pointer;
  }

  @keyframes ripples {
    0% {
      border: 0px solid #3aa82d;
      // border: 0px solid black;
    }

    100% {
      // border: 20px solid darken(#3aa82d, 12%);
      border: 10px solid #3aa82d;
      // border: 20px solid black;
      opacity: 0;
    }
  }
`;


export const GetStarted = styled.span`
  // align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    cursor: pointer;
  }
`;


export const GetStartedText = styled.span`
  font-size: 18px;
  font-size: 22px;
  // font-weight: 700;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.25px;
  text-decoration: unset;
  margin-left: 24px;
`;
