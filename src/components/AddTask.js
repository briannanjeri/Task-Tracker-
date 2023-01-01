import React from 'react'
import { useState } from 'react'

const AddTask = ({onAdd}) => {
    const [text, settext]=useState('')
    const [day, setday]=useState('')
    const [reminder,setReminder]=useState(false)

  const onSubmit=(e)=>{
    e.preventDefault()

    if(!text){
        alert('please add text')
        return
    }
    onAdd({ text, day, reminder })
    settext('')
    setday('')
    setReminder(false)
   }

  return (
    <form className='add-form' onSubmit={onSubmit}>
    <div className='form-control'>
        <label>Task</label>
        <input type='text' placeholder='add task'   value={text} 
        onChange={(e)=>settext(e.target.value)} />
    </div>

    <div className='form-control form-control-check'>
        <label>Add day and time</label>
        <input type='text' placeholder='add day and time' value={day} 
        onChange={(e)=>setday(e.target.value)} />
    </div>

    <div className='form-control'>
        <label>Set Reminder</label>
        <input type='checkbox' checked= {reminder } value={reminder} 
        onChange={(e)=>setReminder(e.currentTarget.checked, console.log(e))} />
    </div>


    <input type='submit' value='save' className='btn-btn-block'/>

t    </form>
  )
}

export default AddTask