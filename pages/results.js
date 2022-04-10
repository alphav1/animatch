import { useRouter } from "next/router";
import { useState } from "react";
import ResultsTile from "../Elements/ResultsTile"
import { compareUsers, getScoreComp, compareFavorites, getFavorites } from '../Elements/Functions'
import Image from 'next/image'
import Header from '../Elements/Header'
import Footer from '../Elements/Footer'
import hStyle from '../styles/Header.module.css'

export default function toPage() {
    const { query } = useRouter()
    const [User1] = useState(query.name)
    const [User2] = useState(query.friend)
    const [data, setData] = useState({ "watching": {}, "completed": {} })
    const [ScoreList, setScoreList] = useState([]);
    const [FavoritesArray, setFavoritesArray] = useState([])

    return (
        <div>
            <body className={hStyle.Background1}>

                <Header></Header>

                <text className={hStyle.InputField}>

                    <div>Current user: {User1} </div> <div></div>
                    <div>Your friend: {User2}</div> <div></div>
                    <div>Your shared genres: </div>
                    <button onClick={async (e) => setData(await compareUsers(User1, User2))}> Compare Genres </button>
                    <div>Watching genres: {Object.keys(data["watching"]).map(entry => <text> {entry}, </text>)}</div>
                    <div>Completed genres: {Object.keys(data["completed"]).map(entry => <text> {entry}, </text>)}</div>
                    <div> Your shared anime scores: </div><button onClick={async (e) => setScoreList(await getScoreComp(User1, User2))}> Compare Scores </button> <div> </div>
                    <div> Scores: {ScoreList.map(data1 => <ResultsTile data={data1} you={User1} friend={User2} />)} </div>
                    <div> Your shared favorites: </div><button onClick={async (e) => { setFavoritesArray(await compareFavorites(await getFavorites(User1), await getFavorites(User2))); console.log("updated: " + FavoritesArray); }}> Favorites </button>
                    {/* <h4> Scores: {ScoreList.map(data => <body> title: {data.name} {User1} : {data.user1} {User2} : {data.user2} difference: {data.difference}</body>)} </h4> */}
                    <div> Favorites: {FavoritesArray.flatMap(fav => <text> Name: {fav}, </text>)} </div>

                </text>

                <Footer></Footer>

            </body>


        </div>
    )
}