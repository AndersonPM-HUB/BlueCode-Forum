import React from 'react'

export default function Imagenes(props) {
  const { imagen , texto } = props; 

  return (
    <img src={imagen} alt={texto}/>
  )
}
