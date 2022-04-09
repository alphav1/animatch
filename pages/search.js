import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router"
import { getFriends } from "../Elements/Functions";
import UserTileSearch from "../Elements/UserTileSearch";

export default function toPage({ data }) {
    const { query } = useRouter()
    const router = useRouter()
    const [User1] = useState(query.name)

    const routeToCompare = (name) => {
        if (User1 != "" && name != "") {
            router.push({
                pathname: '/results',
                query: {
                    'name': User1,
                    'friend': name
                }
            })
        } else {
            if (User1 == "" && name == "") {
                console.log("ERROR: please enter a valid username and friend")
            } else if (name != "") {
                console.log("ERROR: please set a valid User parameter")
            } else {
                console.log("ERROR: please set a valid Friend parameter")
            }

        }
    }

    return (
        <div>
            <div>User1: {User1}</div>
            {/* <div> <button onClick={async (e) => setFriendList(await getFriends(User1))}> Pick Friend </button> </div> */}
            {/* Friends: {FriendList.map(user => <UserTileSearch key={user.username} data={user} />)} */}
            <div> User2: {data.map(inst => <button onClick={(e) => { routeToCompare(inst.user.username) }}> {inst.user.username} </button>)} </div>
        </div>
    )
}

toPage.getInitialProps = async (ctx) => {
    const FriendsData = await getFriends(ctx.query.name) //https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
    //console.log(FriendsData)
    return { data: FriendsData }
}