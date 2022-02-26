import React from "react";
/* worth to see how a custom component is created, the most important is the default export at the bottom */

class UserAnimeSearch extends React.Component {
    render() {
        return (
            this.props.data != null ? (
                <div color="blue">
                    <h4>Name: {this.props.data.anime.title}</h4> {/*as referenced in the JSON file (the call works the same as the data structure)*/}
                </div>
            )
                : <h4>no data yet!</h4>
        )
    }
}

export default UserAnimeSearch