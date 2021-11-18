import React from 'react'


function Modal({ setOpenModal, image, setImage }) {

  const handleClick = () => {
    setImage(image);
    setOpenModal(false);
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h3>Edit Profile Picture</h3>
        </div>
        <div className="body">
          <input
            className="image"
            placeholder="Add image url here..."
            value={image}
            onChange={(e) => setImage(e.target.value)}  
          />
        </div>
        <div className="footer">
          <button
            onClick={() => {setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={handleClick}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;