import { useContext, useState} from 'react';
import './App.css';
import { Context } from './Context';


const App = () => {

    
    const {value, setValue, tasks, setTasks, count, setCount, deletedTasks, setDeletedTasks} = 
    useContext(Context);
    const [id, setId] = useState(null);
    const [editOn, setEditOn] = useState(false);
    const [current, setCurrent] = useState('');

    
    const handleSubmit = (e)=>{
        setCount(prev => prev + 1);
        setTasks(prevState => [...prevState, {'task':value, 'id':count}]);
        e.preventDefault();
        setValue('');
        setEditOn(false);
    }

    const handleDelete = (id, task)=>{

    if (current === task){
      setEditOn(false);
    }
    const delTask = tasks.filter(ele => {
      return ele.id === id;
    })

    console.log('id: '+id);
    console.log('deleted tasks: '+delTask);
    setDeletedTasks(deletedTasks.concat(delTask))
    
    const newTask = tasks.filter(ele =>{
      return ele.id !== id;
    })
    setTasks(newTask);
  }

  const handleEdit = (id, task)=>{
    
    setId(id);
    setCurrent(task);
    setEditOn(true);
    console.log(id, task, editOn);
  }
  
  const handleSave = (e)=>{
    if(current !== ''){
      const newTask = tasks.filter(ele =>{
        return id !== ele.id;
      });
      setTasks(newTask);
      setTasks(prevState => [...prevState, {'task':current, 'id':id}])
      setEditOn(false)
    }
    e.preventDefault();
  }

  const editForm = <div className='editForm'>
  <h2>Edit Task</h2>
    <form onSubmit={handleSave} >
    <input 
    className='editForm-entry'
    type='text'
    value = {current}
    onChange = {e => setCurrent(e.target.value)}
    />
    <input 
      className='editForm-submit'
      type='submit'
      value='Update'
    />
  </form>
  </div>

  return (
    <div>
        <div className='mainSection'>
        <form onSubmit={handleSubmit} className='inputForm'>
        <input
        className='inputForm-entry'
        type='text' 
        value={value}
        onChange = {e=>setValue(e.target.value)}
        placeholder= 'Add Task'
        />
        <input
        className='inputForm-submit'
          type = 'submit'
          value = 'Add Task'
        />
       </form>
    
   <div className='tasks'>
            <ul className='tasks-list'>
            {tasks.map(({task, id})=>(
            <div className='listItem'>
            <div key={id}>
            {task}
            </div>
            <div className='buttons'>
            <button className='editButton' 
            onClick={()=>handleEdit(id, task)}>Edit</button>
            <button className='deletButton' 
            onClick={()=>handleDelete(id, task)}>Delete</button>
            </div>
            </div>
            ))}
            </ul>
    </div>
        </div>

    {editOn ? editForm : ''}
   
    </div>
  )
}

export default App

