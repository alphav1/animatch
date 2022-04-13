import React from 'react'
import Image from 'next/image'
import style from '../styles/FavTile.module.css'

class FavTile extends React.Component{
    render(){
        return(
            <li className={style.tile} key={this.props.data.title}>
                <div className={style.imFrame}>
                <Image src = {this.props.data.image} layout={"fixed"} width={"100px"} height={"100px"}/>
                </div>
                <h2>{this.props.data.title}</h2>
            </li>
        )
    }
}

export default FavTile