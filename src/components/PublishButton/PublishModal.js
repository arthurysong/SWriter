import React, { useEffect, useState } from 'react'
import './PublishModal.scss';
import rainySpinner from '../../assets/images/rainy2.gif';
import { useSelector, useDispatch } from 'react-redux';
import { setPublishingStatus } from '../../redux/actions/publishingStatus';
import { publishPost } from '../../redux/actions';
import Select from 'react-select';
import { WithContext as ReactTags } from 'react-tag-input';

const PublishModal = ({ note, show, modalClosed }) => {
  const publishingStatus = useSelector(state => state.publishingStatus);
  const publications = useSelector(state => state.publications);
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
        </div>
  )
}

export default PublishModal
