import { useEffect, useState } from 'react'
import sun from './assets/images/icon-sun.svg'
import './App.css'


function App() {
  const [checked,setCheked] = useState(false)
  const [newTasks,setTasks] = useState([])
  const tasks = newTasks
  useEffect(() => {
    const tasksFromLocalStorage = localStorage.getItem('tasks');
    if (tasksFromLocalStorage) {
      setTasks(JSON.parse(tasksFromLocalStorage));
    }
  }, []);
  const handleFormSubmit = (e) =>{
    e.preventDefault()
    const inputValue = e.target[1].value
    if(!inputValue || !inputValue.trim()){
      return
    }
    setTasks([...newTasks, inputValue])
    localStorage.setItem('tasks', JSON.stringify([...newTasks, inputValue]));
    e.target[1].value = ''
  }
 
  const handleDelete = (e) =>{
    console.log(e.target.value)
    const inputValue = e.target.value
    const filteredTasks = tasks.filter(item => item !== inputValue )
    localStorage.setItem('tasks', JSON.stringify([...filteredTasks]));
    setTasks([...filteredTasks])
  }
  return (
    <>
      <div className='TodoApp'>
        <header className='todo-header'>
          <h1 className='todo-h1'>Todo App</h1>
          <img style={{width:"40px", height:"40px"}} src={sun} alt="" />
        </header>
        <main className='todo-main'>
          <form onSubmit={handleFormSubmit} action="" id="todo-form">
            <div className='todo-input-wrap'>
            <button className='todo-button' type="submit"/>
            <input name='todo' placeholder='Create a new todo..' type="text" id='todo-input'/>
            </div>
          </form>
          
            <ol className='todo-tasks'>
            
              {
                tasks.map((task, index) => {
                  return <>
                  <li key={index}
                  className="todo-task">
                  <input  name={'input'+ index} type='checkbox' className='todo-task-input'/>
                  {
                    checked ? <p>{task}</p> : <p className='checked'>{task}</p>
                  }                 
                  <button style={{fontSize:'40px'}} className='todo-task-delete' value={task} name='value' onClick={handleDelete}>X</button>

                </li>
                  <hr/></> 
                })
              }
              
            </ol>
          
          <div>
            <ul className='todo-states'>
              <li>All</li>
              <li>Active</li>
              <li>Completed</li>
            </ul>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
