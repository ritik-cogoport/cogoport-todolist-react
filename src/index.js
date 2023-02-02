import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css'
import {v4 as uuid} from 'uuid';
import {ImBin2} from "react-icons/im"
import {BsCheckSquare} from "react-icons/bs"
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

  useEffect(() => {
    // if(showtodos.length==todos.length){
      setShowtodos(todos.filter(t => t.text.includes(search)));
    // }else{
    //   setShowtodos(showtodos.filter(t => t.text.includes(search)));
    // }
  }, [search]);

  useEffect(() => {
    // console.log(filter);
    // console.log(showtodos);
    setShowtodos(todos.filter(t => t.filter===filter));
    if(filter==="all") setShowtodos(todos);
  }, [filter]);
  useEffect(() => {
    setShowtodos(todos.filter(t => t.date===datefilter));
  }, [datefilter]);

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
          
          <input
          value={search}
          className='search'
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search Here'
          type="text" />
          <div className="filters">
            <span>Filter By :-</span>
            <input type="date" onChange={(e)=>setDateFilter(e.target.value)} />
            <select name="category" id="category" onChange={(e)=>setFilter(e.target.value)}>
            <option value="all">All Category</option>
            <option value="default">Default</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="fitness">Fitness</option>
          </select>

          </div>
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
        {/* {
          search===""?(todos.map((todo) => {
            return <div className='todo-item'>
                     <input className='check' type="checkbox" onChange={() => {markDone(todo.id)}} />
                     <div className='todo-details'>
                      <span>{todo.status===true?<s>{todo.text}</s>:todo.text}</span>
                      <span className='category'>{todo.category}</span>
                      <span className='date'>{todo.date}</span>
                     </div>
                     <ImBin2 className='delete-button' onClick={() => deleteTodo(todo.id)} />
                     
                   </div>
          })):(todos.map((todo) => {
            if(todo.text.includes(search)){
              return <div className='todo-item'>
              <input className='check' type="checkbox" onChange={() => {markDone(todo.id)}} />
              <div className='todo-details'>
                      <span>{todo.status===true?<s>{todo.text}</s>:todo.text}</span>
                      <span className='category'>{todo.category}</span>
                      <span className='date'>{todo.date}</span>
                     </div>
                     <ImBin2 className='delete-button' onClick={() => deleteTodo(todo.id)} />

            </div>
            }
          }))

          // console.log("hello")
        } */}
      </div>
      </div>
    </main>
  )
}

ReactDOM.render(<App />,document.getElementById('root'));

