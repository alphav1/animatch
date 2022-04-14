import { useState } from "react";
import { useRouter } from "next/router"
import { getFriends } from "../Elements/Functions";
import Link from 'next/link'
import Header from '../Elements/Header'
import Footer from '../Elements/Footer'
import hStyle from '../styles/Header.module.css'

export default function search({ data }) {
    const { query } = useRouter()
    const router = useRouter()
    const [User1] = useState(query.name)

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
        }
    }

    return (
        (typeof data == typeof 0) ? //try if user has no friends
            <div> An error has occurred, go <Link href={`/?name=${User1}&errCode=${data}`}> HOME </Link></div>
            :

            <div>
                <body className={hStyle.Background1}>

                    <Header></Header>

                    <text className={hStyle.InputField}>
                        <div> User1: {User1} </div> <br></br>
                        <div> Pick User2: <br></br>
                            <text> (Note: If you have trouble finding the User you wish, use Ctrl + F) </text> <br></br> <br></br>
                            {data.map(inst => <button className={hStyle.forwardBtn} onClick={(e) => { routeToCompare(inst.user.username) }}> {inst.user.username} </button>)}  </div>
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