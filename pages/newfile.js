export function getAlign(diff) {
    if (diff == 0) {
        return "Your opinions are perfectly aligned on"
    }
    else if (diff >= 1 && diff <= 2) {
        return "You agree on"
    }
    else if (diff >= 3 && diff <= 4) {
        return "You disagree on"
    }
    else {
        return "You strongly disagree on"
    }
}

export function getOpinion(rating) {
    if ((rating >= 0) && (rating <= 4)) {
        return ("very much hated it")
    }
    else if ((rating >= 5) && (rating <= 6)) {
        return ("found it mediocre")
    }
    else if ((rating >= 7) && (rating <= 8)) {
        return ("enjoyed it a lot")
    }
    else {
        return "absolutely loved it"
    }
}

export function getAlign(diff) {
    if (diff == 0) {
        return "Your opinions are perfectly aligned on"
    }
    else if (diff >= 1 && diff <= 2) {
        return "You agree on"
    }
    else if (diff >= 3 && diff <= 4) {
        return "You disagree on"
    }
    else {
        return "You strongly disagree on"
    }
}

export function getOpinion(rating) {
    if ((rating >= 0) && (rating <= 4)) {
        return ("very much hated it")
    }
    else if ((rating >= 5) && (rating <= 6)) {
        return ("found it mediocre")
    }
    else if ((rating >= 7) && (rating <= 8)) {
        return ("enjoyed it a lot")
    }
    else {
        return "absolutely loved it"
    }
}

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

import { useState } from "react";
import { useRouter } from "next/router"
import { getFriends } from "../Elements/Functions";
import Image from 'next/image'
import Header from '../Elements/Header'
import Footer from '../Elements/Footer'
import hStyle from '../styles/Header.module.css'

export default function toPage({ data }) {
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

toPage.getInitialProps = async (ctx) => {
    const FriendsData = await getFriends(ctx.query.name) //https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
    //console.log(FriendsData)
    return { data: FriendsData }
}

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

import { useRouter } from "react";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getList(user, param) {
    try {
        console.log('call loading')
        let res = await fetch(`https://api.jikan.moe/v4/users/${user}/animelist/${param}`)
        if (res.status == 200) {
            //console.log(res)
            let list = await res.json()
            return list.data
        } else if (res.status == 500) {
            sleep(500)
            return getList(user, param)
        }
    } catch (error) {
        console.log(`ERROR from the API call in search(): ${error}`)
    }
}

export async function getFriends(user) {
    try {
        let res = await fetch(`https://api.jikan.moe/v4/users/${user}/friends`)
        if (res.status == 200) {
            let data = await res.json()
            return (data.data)
        }
    } catch (error) {
        return (`ERROR from the API call in search(): ${error}`)
    }
}

function getGenreList(list) {
    let l1 = {}
    // while (typeof list == typeof undefined)
    for (let i = 0; i < list.length; i++) {
        let genres = list[i].anime.genres
        for (let x = 0; x < genres.length; x++) {
            let l = Object.keys(l1)
            if (l.includes(genres[x].name)) {
                l1[genres[x].name] += 1
            } else {
                // console.log('new object: ', genres[x].name)
                let key = genres[x].name
                Object.assign(l1, { [key]: 1 })
            }
        }
    }
    return l1
}

function getCommonGenres(l1, l2) {
    let keys2 = Object.keys(l2)
    let keys1 = Object.keys(l1)
    let common = {}
    for (let i = 0; i < keys1.length; i++) {
        if (keys2.includes(keys1[i])) {
            let key = keys1[i]
            if (l1[key] >= l2[key]) {
                let val = l2[key]
                Object.assign(common, { [key]: val })
            } else {
                let val = l1[key]
                Object.assign(common, { [key]: val })
            }
        }
    }
    return common
}

export function compareLists(list1, list2) {
    // console.log(list1, list2)
    let l1 = getGenreList(list1)
    let l2 = getGenreList(list2)
    // console.log("internal listCompare:")
    console.log(l1, l2)
    let common = getCommonGenres(l1, l2)
    // console.log(common)
    return common
}

export async function compareUsers(user1, user2) {
    let watching = [await getList(user1, "watching"), await getList(user2, "watching")]
    let compared1 = compareLists(watching[0], watching[1])
    // console.log("comp1:")
    // console.log(compared1)
    sleep(1000)
    let completed = [await getList(user1, "completed"), await getList(user2, "completed")]
    let compared2 = compareLists(completed[0], completed[1])
    // console.log("comp2:")
    // console.log(compared2)
    return ({ "watching": compared1, "completed": compared2 })
}

export async function getScore(user) {
    let list = await getList(user, "completed")
    let scoreList = []
    for (let i = 0; i < list.length; i++) {
        //console.log([i] + " : " + list[i].anime.title + " : " + list[i].score)
        scoreList.push({ "name": list[i].anime.title, "score": list[i].score })
    }
    return scoreList
}

export async function getScoreComp(user1, user2) {
    let l1 = await getScore(user1)
    let l2 = await getScore(user2)
    let commList = []
    for (let i = 0; i < l1.length; i++) {
        for (let x = 0; x < l2.length; x++) {
            if (l2[x].name == l1[i].name && l2[x].score != 0 && l1[i].score != 0) {
                commList.push({ "name": l1[i].name, "user1": l1[i].score, "user2": l2[x].score, "difference": Math.abs(l1[i].score - l2[x].score) })
            }
        }
    }
    //console.log(commList)
    console.log("done")
    return commList
}

export async function getFavorites(user) {
    try {
        console.log('call loading')
        let res = await fetch(`https://api.jikan.moe/v4/users/${user}/favorites`)
        if (res.status == 200) {
            //console.log(res)
            let list = await res.json()
            //console.log(list.data.anime)
            return list.data.anime
        }
    } catch (error) {
        console.log(`ERROR from the API call in search(): ${error}`)
    }
}

export async function compareFavorites(list1, list2) {
    let common = []
    for (let i = 0; i < list1.length; i++) {
        for (let j = 0; j < list2.length; j++) {
            if (list1[i].mal_id == list2[j].mal_id) {
                //console.log("found")
                common.push(list1[i].title)
                break
            }
        }
    }
    // console.log("common: " + common)
    // console.log("type match: " + (typeof common == typeof []))
    return common
}

export async function printFav(list) {
    for (let i = 0; i < list.length; i++) {
        return list[i]
    }
}

export function genreScore(wLength, cLength) {
    const median = 5
    let addW = (wLength - median) * 4
    let addC = (cLength - median) * 2
    return addW + addC
}

export function getAlign(diff) {
    if (diff == 0) {
        return "Your opinions are perfectly aligned on"
    }
    else if (diff >= 1 && diff <= 2) {
        return "You agree on"
    }
    else if (diff >= 3 && diff <= 4) {
        return "You disagree on"
    }
    else {
        return "You strongly disagree on"
    }
}

export function getOpinion(rating) {
    if ((rating >= 0) && (rating <= 4)) {
        return ("very much hated it")
    }
    else if ((rating >= 5) && (rating <= 6)) {
        return ("found it mediocre")
    }
    else if ((rating >= 7) && (rating <= 8)) {
        return ("enjoyed it a lot")
    }
    else {
        return "absolutely loved it"
    }
}

export function scoreScore() {

}

import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'
import Header from '../Elements/Header'
import Footer from '../Elements/Footer'
import hStyle from '../styles/Header.module.css'

export default function fromPage() {
    const [User1, setUser1] = useState("")
    const [User2, setUser2] = useState("")
    const [ErrorMsg, setError] = useState("")
    const router = useRouter()

    const routeToCompare = (e) => {
        if (User1 != "" && User2 != "") {
            router.push({
                pathname: '/genres',
                query: {
                    'name': User1,
                    'friend': User2
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

    const routeToNext = (e) => {
        if (User1 != "") {
            router.push({
                pathname: '/search',
                query: {
                    'name': User1
                }
            })
        } else {
        }
    }

    return (
        <div>
            <body className={hStyle.MainPageBackground}>

                <Header></Header>

                {/* <div><Image src="https://cdn.myanimelist.net/images/anime/1319/92084.jpg?s=90ba2cd72bd9d35f2401aba942a11779" height="300px" width="200px"></Image></div> */}

                <text className={hStyle.InputField}>

                    <div className={hStyle.InputField}>Input your MyAnimeList profile name (User1): <input className={hStyle.Input} type="text" placeholder='Input profile name' onChange={(e) => setUser1(e.target.value)}></input> </div>
                    {/* <div className={hStyle.InputField}>Input your MyAnimeList profile name (User1) <input className={hStyle.Input} type="text" placeholder='Input profile name' onChange={(e) => setUser1(e.target.value)}></input> </div> */}
                    <div className={hStyle.InputField}> Choose from your friend list (User2): <button className={hStyle.Button} onClick={async (e) => routeToNext(User1)}> Friend list </button> </div>
                    <div className={hStyle.InputField}> or input the second MyAnimeList profile name (User2): <input className={hStyle.Input} type="text" placeholder='Input profile name' onChange={(e) => setUser2(e.target.value)}></input> <button className={hStyle.Button} onClick={async (e) => routeToCompare(User1, User2)}> Compare </button> </div>

                    {/* {ErrorMsg} */}

                </text>

                <Footer></Footer>
            </body>
        </div>
    )
}

import { useRouter } from "next/router";
import { useState } from "react";
import { compareUsers } from '../Elements/Functions'
import Image from 'next/image'
import Header from '../Elements/Header'
import Footer from '../Elements/Footer'
import hStyle from '../styles/Header.module.css'
import { genreScore } from "../Elements/Functions";

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
                    {/* <button onClick={async (e) => { console.log(Object.keys(data["watching"]).length) }}>score</button> */}
                    <div>Watching genres: {Object.keys(data["watching"]).map(entry => <text> {entry}, </text>)}</div>
                    <div>Completed genres: {Object.keys(data["completed"]).map(entry => <text> {entry}, </text>)}</div>
                    <br></br>
                    <div><button onClick={async (e) => routeToCompare(User1, User2)}> Get your score comparison </button></div>

                </text>

                <Footer></Footer>

            </body>


        </div>
    )
}

genres.getInitialProps = async (ctx) => {
    // console.log("a: " + ctx.query.name + " b: " + ctx.query.friend)
    const matchingGenres = await compareUsers(ctx.query.name, ctx.query.friend);
    // console.log("genres: " + matchingGenres)
    return { data: matchingGenres }
}