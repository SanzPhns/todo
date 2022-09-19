import { useContext} from 'react';
import './App.css';
import { Context } from './Context';


const App = () => {

    // const [value, setValue] = useState('');
    // const [tasks, setTasks] = useState([]);
    // let [count, setCount] = useState(0);
    // const [deletedTasks, setDeletedTasks] = useState([]);
    
    const {value, setValue, tasks, setTasks, count, setCount, deletedTasks, setDeletedTasks} = 
    useContext(Context);

    
    const handleSubmit = (e)=>{
        setCount(prev => prev + 1);
        setTasks(prevState => [...prevState, {'task':value, 'id':count}]);
        e.preventDefault();
        setValue('');
    }

    const handleDelete = (id)=>{

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

  return (
    <div>
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
            <button className='deletButton' 
            onClick={()=>handleDelete(id)}>Delete</button>
            <button className='deletButton' 
            onClick={()=>handleDelete(id)}>Delete</button>
            </div>
            </div>
            ))}
            </ul>
    </div>
   
    </div>
  )
}

export default App

