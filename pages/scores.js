import { useRouter } from "next/router";
import { useState } from "react";
import { getAlignVal, getScoreComp, listScore } from '../Elements/Functions'
import CompTile from "../Elements/CompTile";
import Header from '../Elements/Header'
import Footer from '../Elements/Footer'
import hStyle from '../styles/Header.module.css'

export default function scores({ data }) {
    const { query } = useRouter()
    const [User1] = useState(query.name)
    const [User2] = useState(query.friend)
    const router = useRouter()

    const routeToCompare = (e) => {
        if (User1 != "" && User2 != "") {
            router.push({
                pathname: '/favorites',
                query: {
                    'name': User1,
                    'friend': User2,
                    'gScore': parseInt(query.gscore),
                    'fScore': listScore(getAlignVal(data))
                }
            })
        } else {

        }
    }

    return (
        <div className={hStyle.mainDiv}>
            <body className={hStyle.Background1}>

                <Header></Header>

                <text className={hStyle.InputField}>

                    <h1 className={hStyle.text}> You share {data.length} anime score(s) together. </h1>
                    <div><button className={hStyle.forwardBtn} onClick={async (e) => routeToCompare(User1, User2)}> Favorite comparison </button></div>
                    <h2 className={hStyle.text}> Your Shared Scores: </h2>
                    <ul className={hStyle.table}>
                        {data.map(entry => <CompTile user={User1} friend={User2} data={entry}></CompTile>)}
                    </ul>
                    <br></br>

                </text>

                <Footer></Footer>

            </body>


        </div>
    )
}

scores.getInitialProps = async (ctx) => {
    const scoreMatches = await getScoreComp(ctx.query.name, ctx.query.friend);
    return { data: scoreMatches }
}