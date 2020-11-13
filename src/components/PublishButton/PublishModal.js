import React, { useEffect, useState } from 'react'
import './PublishModal.scss';
// import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import rainySpinner from '../../assets/images/rainy2.gif';
import { useSelector, useDispatch } from 'react-redux';
import { setPublishingStatus } from '../../actions/publishingStatus';
import Select from 'react-select';
import { WithContext as ReactTags } from 'react-tag-input';

const PublishModal = ({ show, modalClosed }) => {
  const publishingStatus = useSelector(state => state.publishingStatus);
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

  console.log(publishingStatus);

  return (
    <div className="publishModal">
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
                    Publishing to: <strong>Arthur Song</strong>
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

                  <div className="modal__learnMore">
                    <a href="https://help.medium.com/hc/en-us/articles/360018677974">
                      Learn more
                    </a> about what happens to your post when you publish.
                  </div>

                  <div className="modal__choosePublication">
                    Choose a publication you want to publish this note to.

                    <Select
                    // TODO: Grab the publications from Medium API...
                      className="modal__selectPub"
                      value={publication}
                      onChange={option => setPublication(option)}
                      options={[
                        { value: 'DevGenius', label: 'DevGenius'}
                      ]} />
                  </div>

                  <div 
                    // TODO: Need to actually publish the note, instead of just setting the status
                    // TODO: Make sure to add tags and the publication to note.
                    className="modal__publishButton"
                    onClick={() => {
                      dispatch(setPublishingStatus(1));
                      setTimeout(() => dispatch(setPublishingStatus(2)), 3000)
                      }}>
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
                  <div className="modal__yourLink">
                    Your post has been successfully posted on Medium. <a href="">Click here</a> to see the post.
                  </div>
                </div>
              </> : null}
            </div>
        </div>
  )
}

export default PublishModal
