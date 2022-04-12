import { useRouter } from "next/router";
import { useState } from "react";
import ResultsTile from "../Elements/ResultsTile"
import { compareFavorites, getFavorites, getAniScore } from '../Elements/Functions'
import Image from 'next/image'
import Header from '../Elements/Header'
import Footer from '../Elements/Footer'
import hStyle from '../styles/Header.module.css'

export default function favorites({ data }) {
    const { query } = useRouter()
    const [User1] = useState(query.name)
    const [User2] = useState(query.friend)
    const [gScore] = useState(query.gScore)
    const [fScore] = useState(query.fScore)
    const [AniScore, setAniScore] = useState("")

    return (
        <div>
            <body className={hStyle.Background1}>

                <Header></Header>

                <text className={hStyle.InputField}>

                    <div>Current user: {User1} </div> <div></div>
                    <div>Second user: {User2}</div> <div></div>
                    <br></br>
                    <div> You have {data.length} favorites. <br></br>
                        Your shared favorites: {data.flatMap(fav => <text> Name: {fav}, </text>)} </div>
                    <br></br>
                    <div> Your final animatch score: {AniScore} <button onClick={async (e) => { setAniScore(getAniScore(fScore, gScore, data)) }}> ANIMATCH SCORE </button> </div>

                </text>

                <Footer></Footer>

            </body>


        </div>
    )
}

favorites.getInitialProps = async (ctx) => {
    // console.log("a: " + ctx.query.name + " b: " + ctx.query.friend)
    const favoriteList = await compareFavorites(await getFavorites(ctx.query.name), await getFavorites(ctx.query.friend));
    // console.log("genres: " + matchingGenres)
    return { data: favoriteList }
}
