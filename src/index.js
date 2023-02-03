import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css'
import {v4 as uuid} from 'uuid';
import {ImBin2} from "react-icons/im"
import {BsCheckSquare} from "react-icons/bs"
import {FiSearch} from "react-icons/fi"

import Modal from 'react-modal';
import "../src/components/modal.css"
import {AiFillCloseCircle} from 'react-icons/ai'
const customStyles = {
    content: {
     border:"2px solid black",
      top: '50%',
      width:"600px",
      height:"300px",
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement(document.getElementById('root'));

const App = () => {
  
  const [category,setCategory] = useState('default');
  const [todo,setTodo] = useState('');
  const [date,setDate] = useState('1999-09-15');
  const [todos,setTodos] = useState([]);
  const [showtodos,setShowtodos] = useState(todos);
  const [search,setSearch] = useState('');
  const [filter,setFilter] = useState('');
  const [datefilter,setDateFilter] = useState('');
  
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if(items){
      setTodos(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todos));
    setShowtodos(todos);
  }, [todos]);

  const filterSearch = (to) => {
    if(search){
      return to.filter(t => t.text.includes(search));
    }else return to;

  }
  const filterCategory = (to) => {
    if(filter==="") return to;
    if(filter==="all") return to;
    return to.filter(t => t.filter===filter);
    
  }
  const filterDate = (to) => {
    if(datefilter==="") return to;
    return to.filter(t => t.date===datefilter);
  }
  useEffect(() => {
    let result = todos;
    result = filterSearch(result);
    setShowtodos(result);
    result = filterCategory(result);
    setShowtodos(result);
    result = filterDate(result);
    setShowtodos(result);
  },[search,filter,datefilter]);

  const addTodo = () => {
    const id = uuid();
    setTodos([...todos,{id:id,text:todo,status:false,category:category,date:date,filter:category}]);
    setTodo("");
  }
  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id!== id));
  }

  const markDone = (id) => {
    setTodos(
      todos.map(t => {
        if(t.id==id) t.status = !t.status;
        return t;
      })
    )
  }
  return(
    <main>
      <div className='container'>
        <h1>To-Do List</h1>
        <div className="search-and-filter">
          <div className="search-container">
          <input
          value={search}
          className='search'
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search Here'
          type="text"
           /><FiSearch className='search-icon'/>
          </div>
        <ModalElement className="modal-element" fl = {filter} setFl = {setFilter} df = {datefilter} setDf = {setDateFilter}  />
          
          {/* <div className="filters">
            <span>Filter By :-</span>
            <input type="date" onChange={(e)=>setDateFilter(e.target.value)} />
            <select name="category" id="category" onChange={(e)=>setFilter(e.target.value)}>
            <option value="all">All Category</option>
            <option value="default">Default</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="fitness">Fitness</option>
          </select>

          </div> */}
        </div>
        <div className='add-container'>
        <input
        placeholder='Enter To-Do here'
        value = {todo}
        onChange={(e) => setTodo(e.target.value)}
        type="text" />
        <div className='category-container'>
          <input type="date" name="" id="" onChange={(e)=>setDate(e.target.value)}/>
          <select name="category" id="category" onChange={(e)=>setCategory(e.target.value)}>
            <option value="default">Default</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="fitness">Fitness</option>
          </select>
        </div>

          <button className='add-button' onClick={addTodo}>ADD</button>
        </div>
      <div className='todos-container'>
        {
          showtodos.map((todo) => {
            return <div className={`todo-item ${todo.status && `strikethrough`}`}>
                     <BsCheckSquare className={`check ${todo.status && `checked`}`} onClick={() => {markDone(todo.id)}} />
                     <div className='todo-details'>
                      <span className='todo-text'>{todo.status===true?<s>{todo.text}</s>:todo.text}</span>
                      <div className="date-category">
                        <span className='category'>{todo.status===true?<s>{todo.category}</s>:todo.category}</span>
                        <span className='date'>{todo.status===true?<s>{todo.date}</s>:todo.date}</span>
                      </div>
                     </div>
                     <ImBin2 className='delete-button' onClick={() => deleteTodo(todo.id)} />
                     {/* <button className='delete-button' onClick={() => deleteTodo(todo.id)}>Delete</button> */}
                   </div>
          })
        }
      </div>
      </div>
    </main>
  )
}

const ModalElement = (props) => {
  let filter = props.fl;
  let setFilter = props.setFl
  let datefilter = props.df;
  let setDateFilter = props.setDf
  let subtitle;
const [modalIsOpen, setIsOpen] = React.useState(false);

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
              {/* <select name="category" id="category" onChange={(e)=>setFilter(e.target.value)}> */}
              <select name="category" id="category" onChange={(e)=>setFilter(e.target.value)}>
                  <option value="all" selected={filter==="all"}>All Category</option>
                  <option value="default" selected={filter==="default"}>Default</option>
                  <option value="food" selected={filter==="food"} >Food</option>
                  <option value="travel" selected={filter==="travel"}>Travel</option>
                  <option value="fitness" selected={filter==="fitness"}>Fitness</option>
              </select>
          </div>
          <div className="date-filter">
          <div className="filter-heading">Filter by Date</div>
              <div className="date-range">
                  <input type="date" value={datefilter} onChange={(e)=>setDateFilter(e.target.value)} />
                  {/* <input type="date" name="" id="" /> */}
              </div>
          </div>
              
      </div>
      </div>
      
    </Modal>
  </div>

)
}

ReactDOM.render(<App />,document.getElementById('root'));

