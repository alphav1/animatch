import { useRouter } from "next/router";
import { useState } from "react";
import Link from 'next/link'
import { compareUsers, genreScore } from '../Elements/Functions'
import Header from '../Elements/Header'
import Footer from '../Elements/Footer'
import GenreTile from "../Elements/GenreTile";
import hStyle from '../styles/Header.module.css'

export default function genres({ data }) {
    const { query } = useRouter()
    const [User1] = useState(query.name)
    const [User2] = useState(query.friend)
    const router = useRouter()

    const routeToCompare = (e) => {
        if (User1 != "" && User2 != "") {
            router.push({
                pathname: '/scores',
                query: {
                    'name': User1,
                    'friend': User2,
                    'gscore': genreScore(Object.keys(data["watching"]).length, Object.keys(data["completed"]).length)
                }
            })
        } else {
        }
    }

    return (
        (typeof data == typeof 0) ?
            <div>
                <text>
                    An error has occurred, go <Link href={`/?name=${User1}&&errCode=${data}`}> HOME </Link> <br></br>
                </text>
            </div> :

            <div className={hStyle.mainDiv}>
                <body>

                    <Header></Header>

                    <text className={hStyle.InputField}>

                        <h1 className={hStyle.text}>You share {Object.keys(data["watching"]).length} genre(s) from the anime you're currently watching, and {Object.keys(data["completed"]).length} genre(s) from the ones you completed.</h1>
                        <div><button className={hStyle.forwardBtn} onClick={async (e) => routeToCompare(User1, User2)}> Score comparison </button></div>

                        {Object.keys(data["watching"]).length != 0 ?
                            <div>
                                <h2 className={hStyle.text}>Watching genres: </h2>
                                <li className={hStyle.tableS}>{Object.keys(data["watching"]).map(entry => <GenreTile title={entry} />)}</li></div>
                            : <br></br>}

                        {Object.keys(data["completed"]).length != 0 ?
                            <div>
                                <h2 className={hStyle.text}>Completed genres:</h2>
                                <li className={hStyle.tableS}>{Object.keys(data["completed"]).map(entry => <GenreTile title={entry} />)}</li>
                            </div>
                            : <br></br>}
                        <br></br>

                    </text>

                    <Footer></Footer>

                </body>


            </div>
    )
}

genres.getInitialProps = async (ctx) => {
    const matchingGenres = await compareUsers(ctx.query.name, ctx.query.friend);
    return { data: matchingGenres }
}