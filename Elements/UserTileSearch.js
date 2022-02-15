import React from "react";
import Image from "next/image";
/* worth to see how a custom component is created, the most important is the default export at the bottom */

class UserTileSearch extends React.Component{
    render() {
        return(
            this.props.data != null ?(
                <div color="blue">
            <h4>Name: {this.props.data.user.username}</h4> {/*as referenced in the JSON file (the call works the same as the data structure)*/}
            <h4>url: {this.props.data.user.url}</h4>
            <h4>image_url: {this.props.data.user.images.jpg.image_url}</h4>
                </div>
            )
            : <h4>no data yet!</h4>
        )
    }
}

export default UserTileSearch