import React from "react";

class UserAnimeSearch extends React.Component {
    render() {
        return (
            this.props.data != null ? (
                <div color="blue">
                    <h4>Name: {this.props.data.anime.title}</h4>
                </div>
            )
                : <h4>no data yet!</h4>
        )
    }
}

export default UserAnimeSearch