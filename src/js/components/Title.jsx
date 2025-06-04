import React from 'react'

export const Title = ({text , attribute, id, tippy}) => {
  return (
    <h2 className={`title ${attribute && 'title__large'} ${attribute && 'title__large'} `} id={id}>{text}{tippy}</h2>
  )
}
