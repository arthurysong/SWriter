import React from 'react'
import styled from 'styled-components';

import logo from '../../assets/images/logo.png';
import blog from '../../assets/images/blog.svg';
import codereview from '../../assets/images/codereview.svg';
import codetyping from '../../assets/images/codetyping.svg';

import Button from '../../Button';
import Link from '../../Link';


const StyledLandingPage = styled.div`

`;

const ContentContainer = styled.div`
  // width: 1220px;
  // margin: 0 auto;
  margin-top: 3em;

  .row {
    display: flex;
    align-items: center;
    width: 1220px;
    margin: 0 auto;
    justify-content: space-between;
    margin-bottom: 60px;
  }
`;

const Section = styled.section`
  // width: 1280px;
  // margin: 0 auto;

  // padding: 120px 0;
  // display: flex;
  // justify-content: space-around;
  // align-items: center;
  // border-bottom-width: thin;
  // border-bottom-style: solid;
  // border-bottom-color: #000;
  // border-bottom: 1px solid #000;
  // overflow: hidden;
`;

const SectionContainer = styled.div`
  width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // border-bottom: 1px solid #000;
`;

const GreySection = styled(Section)`
  
`;

const H1 = styled.h1`
  font-size: 45px;
  font-weight: 600;
`;

const H3 = styled.h3`
  font-size: 24px;
  font-weight: 400;
`;

// const SectionBox = styled.div`
//   width: 50%;
// `;

const SectionText = styled.div`
  width: 450px;
`;

const Title = styled(H1)`
  margin-bottom: 25px;
`;

const Subtitle = styled(H3)`
  margin-bottom: 30px;
  line-height: 150%;
`;

const Header = styled.h2`
  font-size: 32px;
  font-weight: normal;
  margin-bottom: 16px;
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 150%;
  margin-bottom: 36px;
  line-height: 28px;
  text-decoration: unset;
  letter-spacing: -0.25px;
`;




const StyledButton = styled(Button)`
  margin-bottom: 20px;
  padding: 16px 80px;
`;

// const bubbleRipple = keyframes`
//   from {
//     border: 15px solid #656565;

//   }

//   to {
//     border: 
//   }
// `;

const RippleButton = styled(Button)`
  // background: #fefefe;
  border-radius: 100%;
  // border: none;
  // outline: none;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  cursor: pointer;
  position: absolute;
  // width: 

  &:hover:before {
    animation: ripples 2s linear infinite;
    width: 64px;
    height: 64px;
    position: absolute;
    border-radius: 100%;
    animation: ripples 2s linear infinite;
  }

  // animation: ripples 2s linear infinite;

  @keyframes ripples {
    0% {
      border: 1px solid tranparent;
    }

    100% {
      // border: 20px solid darken(#3aa82d, 12%);
      // opacity: 0;
    }
  }
`;

export default function LandingPage() {
  return (
    <StyledLandingPage>
      <ContentContainer>
        <div className="row">
          <img src={logo} alt="mwriter logo" width={100}/>
          <Button style={{ height: '33px', lineHeight: '33px' }}><p>Get Started</p></Button>
        </div>
        <Section>
          <SectionContainer>
            <SectionText>
              <Title>Improve your Technical blogging with organization and automation</Title>
              <Subtitle>MWriter helps Medium technical writers share their ideas efficiently</Subtitle>
              <StyledButton>Sign up for free</StyledButton>
              <Link>Already have an account? Log in</Link>
            </SectionText>
          <img src={codereview} alt="someone writing a blog on their laptop" width={600}/>
          {/* <SectionBox>
            <img src={blog} alt="art of someone writing blog on their laptop" width={600}/>
          </SectionBox> */}
          </SectionContainer>
        </Section>

        <Section style={{ borderTop: '1px solid #000', padding: '72px 0', marginTop: '60px'}}>
          <SectionContainer>
            <SectionText style={{ textAlign: 'center', }}>
              <Header >Bug-free, Powerful Editor</Header>
              <Text>Draft your blog posts using a powerful, bug-free text editor. Easily include images, headers, links, code blocks and more with no hassle.</Text>
              <RippleButton style={{ borderRadius: '50%', lineHeight: '64px', height: '64px', padding: '0 32px' }}>></RippleButton>
            </SectionText>
            {/* <Button style={{ borderRadius: '100px', lineHeight: '30px', height: '30px', padding: '32px', }}>></Button> */}
          </SectionContainer>
        </Section>
      </ContentContainer>
    </StyledLandingPage>
  )
}
