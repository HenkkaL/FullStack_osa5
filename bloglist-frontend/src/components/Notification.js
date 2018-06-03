import React from 'react'

const Notification = ({ errorType, message }) => {
  if (message === null) {
    return null
  }
  console.log(errorType, typeof errorType)
  return (    
    <div className={errorType}>
      {message}
    </div>
  )
}

export default Notification

