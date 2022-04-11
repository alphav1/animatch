import { useState } from "react";
import { useRouter } from "next/router"
import { getFriends } from "../Elements/Functions";
import Link from 'next/link'
import Image from 'next/image'
import Header from '../Elements/Header'
import Footer from '../Elements/Footer'
import hStyle from '../styles/Header.module.css'

export default function search({ data }) {
    const { query } = useRouter()
    const router = useRouter()
    const [User1] = useState(query.name)


    const errRoute = (backRoute, errCode) => {
        router.push({
            pathname: backRoute,
            query: {
                "name": User1,
                "errCode": errCode
            }
        })
        return "routing finished"
    }

    const routeToCompare = (name) => {
        if (User1 != "" && name != "") {
            router.push({
                pathname: '/genres',
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
        data.length == 0 ?
            <div> Invalid user, go <Link href={`/?name=${User1}&errCode=${404}`}> Home </Link></div>
            :

            <div>
                <body className={hStyle.Background1}>

                    <Header></Header>

                    <text className={hStyle.InputField}>
                        <div> User1: {User1} </div>
                        {/* <div> <button onClick={async (e) => setFriendList(await getFriends(User1))}> Pick Friend </button> </div> */}
                        {/* Friends: {FriendList.map(user => <UserTileSearch key={user.username} data={user} />)} */}
                        <div> User2: {data.map(inst => <button onClick={(e) => { routeToCompare(inst.user.username) }}> {inst.user.username} </button>)} </div>
                    </text>

                    <Footer></Footer>

                </body>


            </div>
    )
}

search.getInitialProps = async (ctx) => {
    const FriendsData = await getFriends(ctx.query.name) //https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
    //console.log(FriendsData)
    return { data: FriendsData }
}