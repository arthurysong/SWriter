import React from 'react'
import styled from 'styled-components';

import logo from '../../assets/images/logo.png';
import blog from '../../assets/images/blog.svg';
import Button from '../../Button';
import Link from '../../Link';


const StyledLandingPage = styled.div`

`;

const ContentContainer = styled.div`
  width: 1220px;
  margin: 0 auto;
  margin-top: 3em;

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 60px;
  }
`;

const Section = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  margin-bottom: 10px;
`;

const Subtitle = styled(H3)`
  margin-bottom: 30px;
`;

const StyledButton = styled(Button)`
  margin-bottom: 20px;
  padding: 16px 80px;
`;

export default function LandingPage() {
  return (
    <StyledLandingPage>
      <ContentContainer>
        <div className="row">
          <img src={logo} alt="mwriter logo" width={100}/>
          <Button>Get Started</Button>
        </div>
        <Section>
          <SectionText>
            <Title>Improve your Technical blogging with organization and automation</Title>
            <Subtitle>MWriter helps Medium technical writers share their ideas efficiently</Subtitle>
            <StyledButton>Sign up for free</StyledButton>
            <Link>Already have an account? Log in</Link>
          </SectionText>
          <img src={blog} alt="someone writing a blog on their laptop" width={600}/>
          {/* <SectionBox>
            <img src={blog} alt="art of someone writing blog on their laptop" width={600}/>
          </SectionBox> */}



        </Section>
      </ContentContainer>
    </StyledLandingPage>
  )
}
