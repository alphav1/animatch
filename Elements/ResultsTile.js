import React from 'react';

class ResultsTile extends React.Component {
    render() {
        return (
            this.props.data != null ? (
                <div>
                    <text> {getAlign(this.props.data.difference)} {this.props.data.name}</text>
                    {this.props.data.difference >= 3 ? (<text> as {this.props.friend} {getOpinion(this.props.data.user2)} ({this.props.data.user2}) while you {getOpinion(this.props.data.user1)} ({this.props.data.user1}).</text>) : (<text />)}
                    {(this.props.data.difference < 3) && (this.props.data.difference > 0) ? (<text>. {this.props.friend} {getOpinion(this.props.data.user2)} ({this.props.data.user2}) and you {getOpinion(this.props.data.user1)} ({this.props.data.user1}).</text>) : (<text />)}
                    {this.props.data.difference == 0 ? (<text> ({this.props.friend} = {this.props.data.user2},  you = {this.props.data.user1}).</text>) : (<text />)}
                </div>
            )
                : <h4>no data yet!</h4>
        )
    }
}

function getAlign(diff) {
    if (diff == 0) {
        return "Your opinions are perfectly aligned on"
    }
    else if (diff >= 1 && diff <= 2) {
        return "You agree on"
    }
    else if (diff >= 3 && diff <= 4) {
        return "You disagree on"
    }
    else {
        return "You strongly disagree on"
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



export default ResultsTile;