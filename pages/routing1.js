import { useRouter } from 'next/router'
import { useState } from 'react'
import UserAnimeSearch from '../Elements/UserAnimeSearch'
import UserTileSearch from '../Elements/UserTileSearch'

export default function fromPage() {
    const [ErrorMsg, setError] = useState("")
    const [User, setUser] = useState("")
    const [Friend, setFriend] = useState("")
    const [CallData, setCallData] = useState([])
    const [ListData, setListData] = useState([])
    const router = useRouter()
    const search = async (e) => {
        try {
            setError('call loading')
            let res = await fetch(`https://api.jikan.moe/v4/users/${User}/friends`)
            setError('call loaded')
            if (res.status == 200) {
                let data = await res.json()
                setCallData(data.data)
            }
        } catch (error) {
            setError(`ERROR from the API call in search(): ${error}`)
        }
    }

    const searchList = async (e) => {
        try {
            setError('call loading')
            let res = await fetch(`https://api.jikan.moe/v4/users/${User}/animelist/watching`)
            setError('call loaded')
            if (res.status == 200) {
                let list = await res.json()
                setListData(list.data)
            }
        } catch (error) {
            setError(`ERROR from the API call in search(): ${error}`)
        }
    }

    const routeToNext = (e) => {
        if (User != "" && Friend != "") {
            router.push({
                pathname: '/routing2',
                query: {
                    'name': User,
                    'friend': Friend
                }
            })
        } else {
            if (User == "" && Friend == "") {
                setError("ERROR: please enter a valid username and friend")
            } else if (Friend != "") {
                setError("ERROR: please set a valid User parameter")
            } else {
                setError("ERROR: please set a valid Friend parameter")
            }

        }
    }

    return (
        <div>
            <text>{ErrorMsg}</text>
            <input type="text" onChange={(e) => setUser(e.target.value)}></input>
            <button onClick={search}>Search</button>
            <button onClick={searchList}>Search List</button>
            <input type="text" onChange={(e) => setFriend(e.target.value)}></input>
            <text>User: {User} Friend: {Friend}</text>
            <button onClick={routeToNext}>Click to route</button>

            {/* <div>Anime list: {JSON.stringify(ListData)}</div> */}
            {ListData.map(anime => <UserAnimeSearch key={anime.title} data={anime} />)}

            {/* <div>Results: {JSON.stringify(CallData)}</div> */}
            {CallData.map(user => <UserTileSearch key={user.username} onClick={() => { setFriend(user.username); console.log("clicked!!") }} data={user} />)}

            {/* onClick doesn't work yet but im working on it, the map function is important make sure you understand it
         not sure if the key property works properly here but you can always read about it (as far i know now it not that important tbh)
         make sure you understand how the data is passed to each individual custom reatc component
         also, look how the custom compnents are created and used*/}
            {/* https://api.jikan.moe/v4/users/{username}/animelist */}
            {/* print("name: "+res_json_obj["anime"][i]['title']) print("id: "+str(res_json_obj["anime"][i]['mal_id']), end="\n\n")i += 1 except:print("user animelist printed!") */}
        </div>
    )
}