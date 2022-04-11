import { useRouter } from "next/router";
import { useState } from "react";
import ResultsTile from "../Elements/ResultsTile"
import { compareUsers, getScoreComp, compareFavorites, getFavorites } from '../Elements/Functions'
import Image from 'next/image'
import Header from '../Elements/Header'
import Footer from '../Elements/Footer'
import hStyle from '../styles/Header.module.css'


export default function favorites({ data }) {
    const { query } = useRouter()
    const [User1] = useState(query.name)
    const [User2] = useState(query.friend)
    const [ScoreList, setScoreList] = useState([]);
    const [FavoritesArray, setFavoritesArray] = useState([])

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
        <div>
            <body className={hStyle.Background1}>

                <Header></Header>

                <text className={hStyle.InputField}>

                    <div>Current user: {User1} </div> <div></div>
                    <div>Second user: {User2}</div> <div></div>
                    <br></br>
                    <div> Your shared favorites: {data.flatMap(fav => <text> Name: {fav}, </text>)} </div>
                    <br></br>
                    <div> Your final animatch score: <button onClick={async (e) => { }}> ANIMATCH SCORE </button> </div>

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
