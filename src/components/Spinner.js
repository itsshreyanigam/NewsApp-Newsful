import React from 'react'
import spinner from './spinner.gif'

const Spinner = () => {
    return (
      <div className='text-center'>
        <img style={{width:"100px"}}src={spinner} alt="spinner" />
      </div>
    )
}
export default Spinner
