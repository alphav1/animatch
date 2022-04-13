import React from 'react'
import style from '../styles/CompTile.module.css'
import Image from 'next/image'

class CompTile extends React.Component {
    render() {
        return (
            <ul key={this.props.data.name} className={style.card}>
                <div className={style.imFrame}>
                    <Image src={this.props.data.image} layout={"responsive"} width={"100px"} height={"100px"}></Image>
                </div>
                <h3>{this.props.data.name}</h3>

                {getAlign(this.props.data.difference)}

                {(this.props.data.difference < 3) && (this.props.data.difference > 0) ?
                    (<text className={style.text}>{this.props.friend} {getOpinion(this.props.data.user2)} ({this.props.data.user2}) and you {getOpinion(this.props.data.user1)} ({this.props.data.user1}).</text>) :

                    this.props.data.difference >= 3 ?
                        (<text className={style.text}>{this.props.friend} {getOpinion(this.props.data.user2)} ({this.props.data.user2}) while you {getOpinion(this.props.data.user1)} ({this.props.data.user1}).</text>) :

                        this.props.data.difference == 0 ?
                            (<text className={style.text}>Your scores perfectly matched on {this.props.data.user1}.</text>) : (<text />)}
            </ul>
        )
    }
}

function getAlign(diff) {
    if (diff == 0) {
        return "Your opinions are perfectly aligned - "
    }
    else if (diff >= 1 && diff <= 2) {
        return "You vaguely agree - "
    }
    else if (diff >= 3 && diff <= 4) {
        return "You disagree - "
    }
    else {
        return "You strongly disagree - "
    }
}

function getOpinion(rating) {
    if ((rating >= 0) && (rating <= 4)) {
        return ("very much hated it")
    }
    else if ((rating >= 5) && (rating <= 6)) {
        return ("found it mediocre")
    }
    else if ((rating >= 7) && (rating <= 8)) {
        return ("enjoyed it a lot")
    }
    else {
        return "absolutely loved it"
    }
}

export default CompTile;