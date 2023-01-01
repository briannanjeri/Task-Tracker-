import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask';
import About from './components/About'




const App=()=> {
  const[showAddTask, setshowAddTask]=useState(false)
  const [tasks, setTasks]= useState([])

  useEffect(()=>{
    const getTasks= async () =>{
      const tasksFromServer= await fetchTasks()
      setTasks(tasksFromServer)
     }
   
     getTasks()
  },[])

  //fetchTasks
  const fetchTasks=async()=>{
    const res= await fetch('http://localhost:5000/tasks')
    const data= await res.json()
    return data
   }

    //fetchTasks
  const fetchTask=async()=>{
    const res= await fetch('http://localhost:5000/tasks/${id}')
    const data= await res.json()
    return data
   }
    //add task
    const addTask=async(task)=>{

      const res=await fetch('http://localhost:5000/tasks', {
        method:'POST',
        headers:{
          'Content-type':'application/json'
         },
        body:JSON.stringify(task)
        })

        const data= await res.json()
        setTasks([...tasks, data])

      //  console.log(task)
      //  const id=Math.floor(Math.random()*1000)+1
      //  const newTask={id, ...task}
      //  setTasks([...tasks, newTask])

    }


    //delete Task
    
    const deleteTask=async(id)=>{ 
      await fetch('http://localhost:5000/tasks/${id} ', {
        method:'DELETE',
      })
      setTasks(tasks.filter((task)=>task.id !==id))
    }
//Toggle Reminder   }

    const toggleReminder=async(id)=>{

      const taskToToggle=await fetchTask(id)
      const updTask= {...taskToToggle, reminder:!taskToToggle.reminder}
      const res=await fetch('http:localhost:5000/tasks/${id}',{
        method:'PUT',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(updTask)

      })
      const data=await res.json()

      console.log(id)
      setTasks(tasks.map((task)=>task.id===id ? {task, reminder:!data.reminder} : task ))
    }

    return (
      <Router>
      <div className="App">
        <h1>hello from react</h1>
        <h2>hello</h2>
        <Header title='Task Tracker' onAdd={()=>setshowAddTask(!showAddTask)} showAdd={showAddTask}  
 />
        {showAddTask && <AddTask onAdd={addTask}/>} 
         
        {tasks.length > 0 ?(
          <Tasks tasks={tasks} onDelete={deleteTask}
          onToggle={toggleReminder}/>
        ):(
          'NO Tasks to show'
        )}
        <Route path='/about' Component={About}/>
        <Footer/>
      </div>
      </Router>
    );
  } 

export default App;

// const App = () => {
//   const [showAddTask, setShowAddTask]=useState(false)
//   const [tasks, setTasks]=useState([
//     {
//     id:1,
//     text:'Doctors appointment',
//     day:'Feb 5th 2022',
//     reminder:true,
//    },{
//     id:2,
//     text:'Office appointment',
//     day:'Feb 5th 2022',
//     reminder:true,

//    },
//    {
//     id:3,
//     text:'nurse appointment',
//     day:'Feb 5th 2022',
//     reminder:true,

//     }
// ])
// //Add Task
// const addTask=(task)=>{ 

//   console.log(task)
//   const id=Math.floor(Math.random() * 10000) +1
//   const newTask={id, ...task}
//   setTasks([...tasks, newTask])
// }


// //Delete Task

// const deleteTask=(id)=>{ 
// setTasks(tasks.filter((task)=>task.id!=id))
//  }

// //ToggleReminder
// const ToggleReminder=(id)=>{ 
// setTasks(tasks.map((task)=>task.id=id? {...task, reminder:!task.reminder} : task))
// }


//    return (
//     <div className='container'>
//       <Header onAdd={()=>setShowAddTask(!showAddTask) }  showAdd={showAddTask }
// /> 
//       {showAddTask  && <AddTask onAdd= {addTask}/>}
//       {tasks.length>0? <Tasks tasks={tasks} onToggle={ToggleReminder}
//        onDelete={deleteTask}/>:'No tasks found' }
     
//     </div>
//   )
// }

// export default App