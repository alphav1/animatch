import { useRouter } from "next/router";
import { useState } from "react";
import ResultsTile from "../Elements/ResultsTile"
import { compareFavorites, getFavorites, getAniScore } from '../Elements/Functions'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../Elements/Header'
import Footer from '../Elements/Footer'
import hStyle from '../styles/Header.module.css'

export default function favorites({ data }) {
    const { query } = useRouter()
    const [gScore] = useState(query.gScore)
    const [fScore] = useState(query.fScore)
    const [AniScore, setAniScore] = useState("")

    return (
        <div>
            <body className={hStyle.Background1}>

                <Header></Header>

                <div className={hStyle.InputField}>

                    <h2 className={hStyle.text}> You have {data.length} shared favorite(s). Your shared favorite(s) name(s): {data.flatMap(fav => <text> {fav}; </text>)} </h2>
                    <h1 className={hStyle.text}> Your final animatch score: </h1>
                    <button className={hStyle.aniButton} onClick={async (e) => { setAniScore(getAniScore(fScore, gScore, data)) }}> ANIMATCH SCORE </button>
                    <h1 className={hStyle.aniFont}> {AniScore} </h1> <text> Note: The higher the Animatch Score, the better in case of similarity! </text>
                    <text> Want to try again? Click <Link href={`/`}> here. </Link> </text>

                </div>

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
