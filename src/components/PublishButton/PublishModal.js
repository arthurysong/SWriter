import React, { useEffect, useState } from 'react'
import './PublishModal.scss';
// import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import rainySpinner from '../../assets/images/rainy2.gif';
import { useSelector, useDispatch } from 'react-redux';
import { setPublishingStatus } from '../../actions/publishingStatus';
import Select from 'react-select';

const PublishModal = ({ show, modalClosed }) => {
  const publishingStatus = useSelector(state => state.publishingStatus);
  const dispatch = useDispatch();
  const [publication, setPublication] = useState(null);

  useEffect(() => {
    dispatch(setPublishingStatus(0));
    // setTimeout(() => dispatch(setPublishingStatus(false)), 2000);
  }, []);

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
                  <div>
                    {/* TODO: Add real user name */}
                    Publishing to: Arthur Song
                  </div>

                  <div>Add (up to 3) tags so readers will know what your story is about</div>
                  {/* TODO: Use react-tag-input */}
                  <input placeholder="Add a tag"></input>

                  <div>
                    <a href="https://help.medium.com/hc/en-us/articles/360018677974">
                      Learn more
                    </a> about what happens to your post when you publish.
                  </div>

                  <div>
                    Choose a publication you want to publish this note to.

                    <Select
                    // TODO: Grab the publications from Medium API...
                      value={publication}
                      onChange={option => setPublication(option)}
                      options={[
                        { value: 'DevGenius', label: 'DevGenius'}
                      ]} />
                  </div>

                  <div className="modal__publishButton">Publish Now</div>
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
                Finished publishing
              </> : null}
            </div>
        </div>
  )
}

export default PublishModal
