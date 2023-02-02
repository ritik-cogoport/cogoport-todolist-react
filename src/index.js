import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css'
import {v4 as uuid} from 'uuid';
const App = () => {
  
  const [category,setCategory] = useState('default');
  const [todo,setTodo] = useState('');
  const [date,setDate] = useState('1999-09-15');
  const [todos,setTodos] = useState([]);
  const [search,setSearch] = useState('');
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if(items){
      setTodos(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todos));
  }, [todos]);
  
  
  const addTodo = () => {
    const id = uuid();
    setTodos([...todos,{id:id,text:todo,status:false,category:category,date:date}]);
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
        <input
        value={search}
        className='search'
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search Here'
        type="text" />
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
          search===""?(todos.map((todo) => {
            return <div className='todo-item'>
                     <input className='check' type="checkbox" onChange={() => {markDone(todo.id)}} />
                     <div className='todo-details'>
                      <span>{todo.status===true?<s>{todo.text}</s>:todo.text}</span>
                      <span className='category'>{todo.category}</span>
                      <span className='date'>{todo.date}</span>
                     </div>
                     <button className='delete-button' onClick={() => deleteTodo(todo.id)}>Delete</button>
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
              <button className='delete-button' onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
            }
          }))
        }
      </div>
      </div>
    </main>
  )
}

ReactDOM.render(<App />,document.getElementById('root'));

