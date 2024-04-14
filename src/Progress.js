import React from 'react'

export default function Progress({index,numQuestion,totalPoints,points}) {
  return (
    <div className='progress'>
        <progress max={numQuestion} value={index-1}/>
        <h4>Question:{index}/{numQuestion}</h4>
        <h4>{points}/{totalPoints}</h4>
    </div>
  )
}
