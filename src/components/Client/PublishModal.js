import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import rainySpinner from '../../assets/images/rainy2.gif';
import { useSelector, useDispatch } from 'react-redux';
import { setPublishingStatus } from '../../redux/actions/publishingStatus';
import { publishPost } from '../../redux/actions';
import Select from 'react-select';
import { WithContext as ReactTags } from 'react-tag-input';

const StyledPublishModal = styled.div`
  .modal {
    position: fixed;
    background-color: white;
    z-index: 500;
    // margin: auto;
    // transform: translate isn't working so using set numbers and margin to center
    width: 500px;
    height: 250px;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -125px;
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    color: black;

    &--big {
      height: 450px;
      margin-top: -225px;
    }

    .modal__closeButton {
      position: absolute;
      right: 0;
      padding: 12px;
      color: rgb(128, 128, 128);
        // font-weight:00;

      &:hover {
        cursor: pointer;
        color: rgb(102, 102, 102);
      }
    }

    // PublishingStatus = 0 styles
    .modal__container {
      // padding: 60px 44px;
      padding: 24px;
      font-size: 13px;

      .modal__publishingTo {
        font-size: 16px;
      }

      .modal__addTags {
        margin-top: 18px;
      }

      // ReactTag styles
      .ReactTags__tags {
        margin-top: 4px;
      }

      .ReactTags__selected .ReactTags__tag {
        line-height: 32px; // Need the line-height, to make enough space for padding. It's weird...
        padding: 4px 6px;
        margin-right: 4px;
        background-color: rgb(204, 204, 204);
        border: 1px solid black;
        border-radius: 3px;
      }

      .ReactTags__selected .ReactTags__remove {
        margin-left: 6px;
        padding: 2px;

        &:hover {
          cursor: pointer;
        }
      }

      .ReactTags__tagInputField {
        padding: 8px;
        width: 100%;
        box-sizing: border-box;

        &:focus {
          // border: none;
          outline: none;
        }
      }

      .modal__learnMore {
        margin-top: 24px;
        opacity: .6;

        a {
          color: black;
        }
      }

      .modal__choosePublication {
        margin-top: 24px;

        .modal__selectPub {
          margin-top: 12px;
        }
      }

      .modal__formatTip {
        display: block;
        margin-top: 18px;
      }

      .modal__warning {
        display: block;
        margin-top: 6px;
        color: #eb3939;
      }


      .modal__publishButton {
        display: inline-block;
        background-color: #358D35;
        border-radius: 6px;
        padding: 12px 16px;
        color: #fff;
        margin-right: 10px;
        // margin-top: 44px;
        margin-top: 22px;
        font-size: 12px;
    
        &:hover {
            cursor: pointer;
            background-color: #2d792d;
        }
    
        &:active {
            cursor: pointer;
            background-color: #276927;
        }
      }
    }

    // PublishingStatus = 1 styles

    .modal__spinner {
      display: block;
      width: 100px;
      margin: 32px auto 0px;
    }

    .modal__text {
      text-align: center;
      margin: 12px 55px 0px;
      font-size: 14px;

      .text__light {
        margin-top: 10px;
        opacity: .5;
        font-size: .9em;
      }
    }

    // PublishingStatus = 2 styles

    .modal__finishedPublishing {
      // margin-top: 24px;
      font-size: 17px;
    }

    .modal__yourLink {
      margin-top: 32px;

      a {
        color: black;
      }
    }
  }

  .backdrop {
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      background-color: black;
      opacity: .6;
  }
`;

const PublishModal = ({ note, show, modalClosed }) => {
  const publishingStatus = useSelector(state => state.publishingStatus);
  const publications = useSelector(state => state.publications);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [publication, setPublication] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(setPublishingStatus(0));
    // setTimeout(() => dispatch(setPublishingStatus(false)), 2000);
  }, []);

  const handleAddition = tag => {
    if (tags.length === 3) {
      return
    }
    setTags(tags => [...tags, tag]);
  }

  const handleDelete = i => {
    setTags(tags => tags.filter((_, index) => index !== i));
  }

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  }

  return (
    // TODO: Refactor this component into smaller components and use styled-components...
    <StyledPublishModal>
            {/* The black backdrop */}
            {show ? <div className="backdrop"></div> : null}

            {/* The actual modal */}
            <div 
              className={`modal ${publishingStatus === 0 ? 'modal--big' : ''}`} 
              style={{transform: show ? 'translateY(0)' : 'translateY(100vh)' // This is so it's out of the main browser pageand not blocking other components
            }}>
              {publishingStatus === 0 ? <>
                <i onClick={modalClosed} className="fas fa-times modal__closeButton"></i>
                <div className="modal__container">
                  <div className="modal__publishingTo">
                    {/* TODO: Add real user name */}
                    Publishing to: <strong>{user.name}</strong>
                  </div>

                  <div className="modal__addTags">Add (up to 3) tags so readers will know what your story is about</div>
                  {/* TODO: Use react-tag-input */}
                  {/* <input placeholder="Add a tag"></input> */}
                  <ReactTags
                    tags={tags}
                    handleAddition={handleAddition}
                    handleDelete={handleDelete}
                    delimiters={[188, 13]} // Reacts to "enter" and "comma" keys
                    handleDrag={handleDrag}
                    />

                  {/* <div className="modal__learnMore">
                    <a href="https://help.medium.com/hc/en-us/articles/360018677974">
                      Learn more
                    </a> about what happens to your post when you publish.
                  </div> */}

                  <div className="modal__choosePublication">
                    Choose a publication you want to publish this note to.

                    <Select
                    // TODO: Grab the publications from Medium API...
                      className="modal__selectPub"
                      value={publication}
                      onChange={option => setPublication(option)}
                      options={publications.map(p => ({ value: p.id, label: p.name }))} />
                  </div>

                  <a className="modal__formatTip" target="_blank" href="https://github.com/arthurysong/swriter">
                    Did you format your post correctly?
                  </a>

                  <p className="modal__warning">Once you publish your post, you can only make edits to the Medium post using Medium. Gists are not editable at this time.</p>

                  <div 
                    // TODO: Need to actually publish the note, instead of just setting the status
                    // TODO: Make sure to add tags and the publication to note.
                    className="modal__publishButton"
                    onClick={() => dispatch(publishPost(note, tags, publication?.value))}>
                      Publish Now
                  </div>
                </div>
              </> : publishingStatus === 1 ? <>
                <img 
                  className="modal__spinner"
                  src={rainySpinner} 
                  alt="loading icon" />
                <div className="modal__text">
                  <div>Please give us a moment...</div>
                  <div className="text__light">Your note is being published to Medium.</div>
                  {/* The Medium account is ... */}
                </div>
              </> : publishingStatus === 2 ? <>
                <i onClick={modalClosed} className="fas fa-times modal__closeButton"></i>
                <div className="modal__container">
                  <div className="modal__finishedPublishing">
                    Finished publishing
                  </div>
                  {/* Show title here */}
                  <div className="modal__yourLink">
                    Your post has been successfully posted on Medium. <a target="_blank" href={note.mediumURL}>Click here</a> to see the post.
                  </div>
                </div>
                {/* TODO: publishingStatus === 3 for error */}
              </> : publishingStatus === 3 ? <>
                <i onClick={() => {
                  modalClosed();
                  dispatch(setPublishingStatus(0))
                }} className="fas fa-times modal__closeButton"></i>
                <div className="modal__container">
                  <h3>Publishing Error</h3>
                  <p style={{ marginTop: "24px" }}>Oops, something went wrong. Please make sure you are not publishing an empty note.</p>
                </div>
              </> : null}
            </div>
        </StyledPublishModal>
  )
}

export default PublishModal
