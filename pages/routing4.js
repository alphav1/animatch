import { useRouter } from "next/router";
import { useState } from "react";
import { getList, compareLists, compareUsers, getScoreComp } from '../Elements/Functions'

export default function toPage() {

    const router = useRouter()
    const { query } = useRouter()
    const [User1] = useState(query.name)
    const [User2] = useState(query.friend)
    const [data, setData] = useState({ "watching": {}, "completed": {} })
    const [ScoreList, setScoreList] = useState([])

    return (
        <div>
            <text>Current user: {User1} </text> <div></div>
            <text>Your friend: {User2}</text> <div></div>
            <text>Your shared genres: </text>
            <button onClick={async (e) => setData(await compareUsers(User1, User2))}> Compare Genres </button>
            <h4>Watching genres: {Object.keys(data["watching"])}</h4>
            <h4>Completed genres: {Object.keys(data["completed"])} </h4>
            <text> Your shared anime scores: </text><button onClick={async (e) => setScoreList(await getScoreComp(User1, User2))}> Compare Scores </button> <div> </div>
            <h4> Scores: {ScoreList.map(data => <body> title: {data.name} {User1} : {data.user1} {User2} : {data.user2} </body>)} </h4>
        </div>
    )
}