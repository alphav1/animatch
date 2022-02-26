import { useRouter } from "next/router";
import { useState } from "react";
import { getList, compareLists, compareUsers } from '../Elements/Functions'

export default function toPage() {

    const router = useRouter()
    const { query } = useRouter()
    const [User1] = useState(query.name)
    const [User2] = useState(query.friend)
    const [data, setData] = useState({ "watching": {}, "completed": {} })

    return (
        <div>
            <text>Current user: {User1} </text> <div></div>
            <text>Your friend: {User2}</text> <div></div>
            <text>Your shared genres:</text>
            <button onClick={async (e) => setData(await compareUsers(User1, User2))}> Watching </button>
            <h4>watching genres: {Object.keys(data["watching"])}</h4>
        </div>
    )
}