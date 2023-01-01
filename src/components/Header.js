import React from 'react'
import Button from './Button'

const Header = ({title,onAdd, showAdd}) => {
  const onClick=()=>{
    console.log('clicked')
  }
  return (
    <header className='header'>
        <h1 style={{color:'red'}}>{title}</h1>
        <Button color={showAdd ? 'red':'green'} text={showAdd ? 'close':'Add'} onClick={onAdd}/>
    </header>
  )
}




export default Header