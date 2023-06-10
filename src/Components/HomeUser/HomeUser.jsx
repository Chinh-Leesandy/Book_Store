import React from 'react'
import "./HomeUser.css"
import { Header } from '../Header/Header'
export const HomeUser = () => {
  return (
    <div>
        <Header/>
        <div className='image-slider'>
            <img style={{width : "100vw", height : "80vh"}} src="https://bom.so/1uGKrV" alt="" />
            <img style={{width : "100vw", height : "80vh"}} src="https://bom.so/szqxQz" alt="" />
            <img style={{width : "100vw", height : "80vh"}} src="https://bom.so/lV1UxI" alt="" />
        </div>
    </div>
  )
}
