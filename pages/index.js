import { useRouter } from 'next/router'
import { useState } from 'react'
import UserAnimeSearch from '../Elements/UserAnimeSearch'
import UserTileSearch from '../Elements/UserTileSearch'
import { getList, getFavorites, getFriends } from '../Elements/Functions'
import Favorites from '../Elements/Favorites'
import styles from '../styles/Home.module.css'

export default function fromPage() {
    const [User1, setUser1] = useState("")
    const [User2, setUser2] = useState("")
    const [ErrorMsg, setError] = useState("")
    const router = useRouter()

    const routeToCompare = (e) => {
        if (User1 != "" && User2 != "") {
            router.push({
                pathname: '/results',
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
            <h1>animatch</h1>
            Input your MyAnimeList profile name (User1): <input type="text" onChange={(e) => setUser1(e.target.value)}></input>

            <div>Choose from your friend list (User2): <button onClick={async (e) => routeToNext(User1)}> Friend list </button> </div>

            Or input the second MyAnimeList profile name (User2): <input type="text" onChange={(e) => setUser2(e.target.value)}></input> <button onClick={async (e) => routeToCompare(User1, User2)}> Compare </button>

            {ErrorMsg}
        </div>
    )
}