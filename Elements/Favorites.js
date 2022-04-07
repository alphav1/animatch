import React from "react";

class Favorites extends React.Component {
    render() {
        return (
            this.props.data != null ? (
                <div>
                    <h4>Name: {this.props.data.title}</h4>
                </div>
            )
                : <h4>no data yet!</h4>
        )
    }
}

export default Favorites