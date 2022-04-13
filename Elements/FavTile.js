import React from 'react'
import Image from 'next/image'
import style from '../styles/FavTile.module.css'

class FavTile extends React.Component {
    render() {
        return (
            <ul className={style.tile} key={this.props.data.title}>
                <div className={style.imFrame}>
                    <Image src={this.props.data.image} layout={"fixed"} width={"300px"} height={"400px"} />
                </div>
                <h2>{this.props.data.title}</h2>
            </ul>
        )
    }
}

export default FavTile