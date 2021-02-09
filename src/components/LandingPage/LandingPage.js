import React from 'react'
import styled, { keyframes } from 'styled-components';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import { useHistory } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useSpring, animated} from 'react-spring';

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
import demo from '../../assets/images/demo.gif';

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

const FullWidth = styled.div`
  width: auto;
  // justify-content: s;
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

const HoverUnderline = styled.span`
  // &:before {
  //   content: "";
  //   position: absolute;
  //   width: 100%;
  //   height: 3px;
  //   bottom: 0;
  //   left: 0;
  //   background: #9CF5A6;
  //   visibility: hidden;
  //   border-radius: 5px;
  //   transform: scaleX(0);
  //   transition: .25s linear;
  // }

  // &:hover:before {
  //   visibility: visible;
  //   transform: scaleX(1);
  // }
  &:hover {
    text-decoration: underline;
  }
`;

const DropInUnderline = styled.span`
  // font-size: 20px;
  // color: #584E4A;
  position: relative;
  // text-transform: uppercase;
  text-decoration: none;
  padding-bottom: 8px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0; right: 0;
    height: 2px;
    background-color: #ADB968;
  }
  &:before {
    opacity: 0;
    transform: translateY(-8px);
    transition: transform 0s cubic-bezier(0.175, 0.885, 0.320, 1.275), opacity 0s;
  }
  &:after {
    opacity: 0;
    transform: translateY(8px/2);
    transition: transform .2s cubic-bezier(0.175, 0.885, 0.320, 1.275), opacity .2s;
  }
  &:hover,
  &:focus {

    cursor: pointer;
    &:before,
    &:after {
      opacity: 1;
      transform: translateY(0);
    }
    &:before {
      transition: transform .2s cubic-bezier(0.175, 0.885, 0.320, 1.275), opacity .2s;
    }
    &:after {
      transition: transform 0s .2s cubic-bezier(0.175, 0.885, 0.320, 1.275), opacity 0s .2s;
    }
  }
`;

// const GrowFromCenter = styled.div`
//   animation: createBox .25s;

//   @keyframes createBox {
//     from {
//       transform: scale(0);
//     }

//     to {
//       transform: scale(1);
//     }
//   }
// `;

const AnimatedDiv = styled(animated.div)`
  transform: scale(${props => props.x});
`;

const GrowFromCenter2 = ({ children }) => {
  const animatedProps = useSpring({ 
    config: {
      mass: 3,
      // duration: 250,
    },
    transform: "scale(1)", from: { transform: "scale(0)" }});

  console.log("x", animatedProps.x);

  return <animated.div style={animatedProps}>{children}</animated.div>
}

export default () => {
// export default function LandingPage() {
  // const animatedProps = useSpring({ transform: "scale(1)", from: { transform: "scale(1)" }})

  return (
    <StyledLandingPage>
      <TopBar >
        <Link to="/"><img src={logo} alt="mwriter logo" width={100}/></Link>
        <div style={{ display: 'flex', alignItems: 'center', }}>
          <Link to="/login" style={{ marginRight: "30px" }}>
            <P as={Bold}>
              {/* <HoverUnderline>Log In
              </HoverUnderline> */}
              <DropInUnderline distance={20}>Log In
              </DropInUnderline>
            </P>
          </Link>
          <Link to="/login"><Button >
            <P as={Bold}>Get Started</P>
          </Button></Link>
        </div>
      </TopBar>
      <section style={{ padding: '60px 0 120px', }}>
        <SectionContainer>
          <SectionText>
            {/* <Title>Improve your Technical blogging with organization and automation</Title> */}
            <Title>Enhance your technical blogging through the utilization of organization and automation</Title>
            {/* <Subtitle>MWriter helps Medium technical writers share their ideas efficiently</Subtitle> */}
            <Subtitle>MWriter helps Medium technical writers share their ideas efficiently</Subtitle>
            <Link to="/login"><Button black style={{ marginBottom: "24px", }}><P as={Bold}>Get Started</P></Button></Link>
            <Link to="/login" style={{ textDecoration: 'underline' }}>Already have an account? Log in</Link>
          </SectionText>
          <GrowFromCenter2 >
            <img src={blog} alt="someone writing a blog on their laptop" width={600}/>
          </GrowFromCenter2>
        </SectionContainer>
      </section>

      <Section style={{ borderTop: '1px solid #000', padding: '72px 0', position: 'relative', backgroundColor: 'rgb(240, 235, 230)' }}>
        <SectionContainer as={FullWidth}>
          <div style={{ width: "50%", display: 'flex', justifyContent: 'flex-end', }}>
            <img src={demo} width={700} style={{ 
              // position: 'absolute',
              // top: 350,
              objectFit: 'cover', borderRadius: 2, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}/>
          </div>
          {/* <SectionText style={{ display: 'flex', flexDirection: 'start', alignItems: 'center', }}> */}
          <div style={{ width: "50%", }}>

            <div style={{ width: 430, marginLeft: 150 }}>
              <Header>A Powerful Editor</Header>
              {/* <Text>Draft your blog posts using a powerful, bug-free text editor. Easily include images, headers, links, code blocks and more with no hassle.</Text> */}
              <Text>Compose blog posts through the use of a powerful, bug-free text editor. Seamlessly, incorporate elements such as images, headers, links, code blocks, and more.</Text>
              <Link to="/login"><GetStartedButton /></Link>
              
            </div>
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
            {/* <Text style={{ width: 430 }}>Publish directly to your Medium account with just one click. Before you select "Publish Now", select any tags you want for your post. You can also publish your note under any publications.</Text> */}
            <Text style={{ width: 430 }}>Publish posts directly to your Medium account with a single click. MWriter enables users to tag posts and publish notes under publications.</Text>
            <InfoText />
          </SectionText>
        </SectionContainer>
        <SectionContainer>
          <SectionText style={{ width: 560 }}>
            <img src={prettier} width={60} style={{ marginBottom: 20 }} />
            <Header>No More Unattractive Medium Codeblocks</Header>
            {/* <Text style={{ width: 430 }}>Take Advantage of GitHub Gist's syntax highlighting and prettier formatting. When you hit "Publish", MWriter will automatically create and import any code snippets as GitHub Gists!</Text> */}
            <Text style={{ width: 430 }}>Utilize GitHub Gist's syntax highlighting and streamlined format. Code snippets are automatically created and imported as GitHub Gists upon publishing.</Text>
            <InfoText />
          </SectionText>
          <img src={codeblocks} alt="someone publishing a blog post" height={360}/>
        </SectionContainer>
      </section>
      <section style={{ padding: '80px 0', }}>
        <SectionContainer style={{ display: 'block' }}>
          <div style={{ paddingBottom: 48, marginBottom: 48, borderBottom: '3px solid #000' }}>
            <Link to="/" ><img src={logo} alt="mwriter logo" width={100}/></Link>
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
              <SocialIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z"/></SocialIcon>
              <SocialIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></SocialIcon>
              <SocialIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></SocialIcon>
              <SocialIcon width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795h6.633v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537v-10.91l-5.389 13.688h-.728l-6.275-13.688v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404h-7.148v-.404l2.521-3.058c.27-.279.39-.67.325-1.052v-10.608z"/></SocialIcon>
              {/* <SocialIcon src={reddit} alt="reddit"/>
              <SocialIcon src={linkedin} alt="linkedin"/>
              <SocialIcon src={twitter} alt="twitter"/>
              <SocialIcon src={medium} alt="medium"/> */}
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

// export default LandingPage;

const SocialIcon = styled.svg`
  margin: 0 10px;
  // width: 20px;
  // height: 20px;

  &:hover {
    cursor: pointer;
    // color: #3aa82d;
    fill: #3aa82d;
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

const ColumnItem = ({ children }) => (
  <P style={{ padding: "8px 0" }}>
    <DropInUnderline>{children}</DropInUnderline>
  </P>
)

// const ColumnItem = styled(P)`
  // margin-top: 8px;
  // padding: 8px 0;
  // &:hover {
  //   cursor: pointer;
  //   text-decoration: underline;
  // }
// `;

export const InfoText = () => {
  return <StyledInfoText>
    <TurnGreenHover xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 18h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z"/></TurnGreenHover>
    <P style={{ fontWeight: 500 }}>Learn More</P>
  </StyledInfoText>
}

const TurnGreenHover = styled.svg`
  fill: rgb(111, 120, 126);
  margin-right: 16px;
`;

const StyledInfoText = styled.div`
  color: rgb(111, 120, 126);
  display: flex;
  align-items: center;


  &:hover {
    cursor: pointer;
    color: #3aa82d;

    svg {
      fill: #3aa82d;
    }
  }
`;

export const GetStartedButton = () => {
  return <div style={{ display: 'flex',  }}>
    <GetStarted>
      <RippleButton><ArrowForwardIcon /></RippleButton>
      <GetStartedText><DropInUnderline>Get Started</DropInUnderline></GetStartedText>
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
    background: #308e26;
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
