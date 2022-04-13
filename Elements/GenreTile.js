import React from 'react'
import style from '../styles/GenreTile.module.css'

class GenreTile extends React.Component{
    render(){
        return(
            <ul className={style.tile} key={this.props.title}><h2>{this.props.title}</h2></ul>
        )
    }
}

export default GenreTile;