import { useRouter } from "next/router";
import { useState } from "react";
import { compareUsers } from '../Elements/Functions'
// import Link from 'next/link'

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