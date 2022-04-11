import { useRouter } from "next/router";
import { useState } from "react";
import ResultsTile from "../Elements/ResultsTile"
import { getScoreComp, listScore } from '../Elements/Functions'
import Image from 'next/image'
import Header from '../Elements/Header'
import Footer from '../Elements/Footer'
import hStyle from '../styles/Header.module.css'

export default function scores({ data }) {
    const { query } = useRouter()
    const [User1] = useState(query.name)
    const [User2] = useState(query.friend)
    const [ScoreList, setScoreList] = useState([]);
    const [FavoritesArray, setFavoritesArray] = useState([])
    const router = useRouter()

    const routeToCompare = (e) => {
        if (User1 != "" && User2 != "") {
            router.push({
                pathname: '/favorites',
                query: {
                    'name': User1,
                    'friend': User2,
                    'fScore': parseInt(query.gscore) + listScore(1) //TODO here a function to match the fav scores 
                }
            })
        } else {
            if (User1 == "" && User2 == "") {
                setError("ERROR: please enter a valid username and friend")
            } else if (User2 != "") {
                setError("ERROR: please set a valid User parameter")
            } else {
                setError("ERROR: please set a valid Friend parameter")
            }

        }
    }

    return (
        <div>
            <body className={hStyle.Background1}>

                <Header></Header>

                <text className={hStyle.InputField}>

                    <div>Current user: {User1} </div> <div></div>
                    <div>Second user: {User2}</div> <div></div>
                    <br></br>
                    {/* <div> Your shared anime scores: <button onClick={async (e) => setScoreList(await getScoreComp(User1, User2))}> Compare Scores </button> 
                    <br></br> 
                    {ScoreList.map(data1 => <ResultsTile data={data1} you={User1} friend={User2} />)} </div> */}
                    <div> Your Shared Scores: </div>
                    <br></br>
                    <div>{data.map(res => <ResultsTile data={res} you={query.name} friend={query.friend} />)}</div>
                    <br></br>
                    <div><button onClick={async (e) => routeToCompare(User1, User2)}> Favorite comparison </button></div>

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