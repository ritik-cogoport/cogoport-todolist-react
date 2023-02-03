import React,{useState} from 'react'
import Modal from 'react-modal';
import "../components/modal.css"
import {AiFillCloseCircle} from 'react-icons/ai'
const customStyles = {
    content: {
     border:"2px solid black",
      top: '50%',
      width:"70vh",
      height:"40vh",
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement(document.getElementById('root'));
  


const ModalElement = () => {
    let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'black';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className='modal-container'>
      <button className='open-button' onClick={openModal}>Apply Filter</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="opened-container">
        <h2 className='modal-heading' ref={(_subtitle) => (subtitle = _subtitle)}>Filters</h2>
        <AiFillCloseCircle className='close-button' onClick={closeModal} />
        {/* <button className='close-button' onClick={closeModal}>close</button> */}
        <div className="filters-container">
            <div className="category-filter">
                <div className="filter-heading">Filter by Category</div>
                <select name="category" id="category">
                    <option value="all">All Category</option>
                    <option value="default">Default</option>
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                    <option value="fitness">Fitness</option>
                </select>
            </div>
            <div className="date-filter">
            <div className="filter-heading">Filter by Date</div>
                <div className="date-range">
                    <input type="date" name="" id="" />
                    {/* <input type="date" name="" id="" /> */}
                </div>
            </div>
                
        </div>
        </div>
        
      </Modal>
    </div>

  )
}

export default ModalElement