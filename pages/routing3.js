import { useRouter } from 'next/router'
import { useState } from 'react'
import UserAnimeSearch from '../Elements/UserAnimeSearch'
import UserTileSearch from '../Elements/UserTileSearch'
import { getList, compareLists, compareUsers, getScore, getScoreComp, getFavorites } from '../Elements/Functions'
import Favorites from '../Elements/Favorites'

export default function fromPage() {
    const [User1, setUser1] = useState("")
    const [User2, setUser2] = useState("")
    const [ListData1, setListData1] = useState([])
    const [ListData2, setListData2] = useState([])
    const [Fav1, setFav1] = useState([])
    const [Fav2, setFav2] = useState([])
    const [ErrorMsg, setError] = useState("")
    const router = useRouter()

    const routeToNext = (e) => {
        if (User1 != "" && User2 != "") {
            router.push({
                pathname: '/routing4',
                query: {
                    'name': User1,
                    'friend': User2
                }
            })
        } else {
            if (User1 == "" && User2 == "") {
                setError("ERROR: please enter a valid username and friend")
            } else if (User1 != "") {
                setError("ERROR: please set a valid User parameter")
            } else {
                User2
                setError("ERROR: please set a valid Friend parameter")
            }

        }
    }

    return (
        <div>
            <div></div>

            <input type="text" onChange={(e) => setUser1(e.target.value)}></input> {User1}
            <button onClick={async (e) => setListData1(await getList(User1, "completed"))}> Search List </button>
            <button onClick={async (e) => setFav1(await getFavorites(User1))}> Favorites </button>
            <button onClick={routeToNext}> Compare </button>

            <div>
                Anime List: {ListData1.map(anime => <UserAnimeSearch key={anime.title} data={anime} />)}
                Favorites: {Fav1.map(fav => <Favorites key={fav.title} data={fav} />)}
            </div>

            <input type="text" onChange={(e) => setUser2(e.target.value)}></input> {User2}
            <button onClick={async (e) => setListData2(await getList(User2, "completed"))}> Search List </button>
            <button onClick={async (e) => setFav2(await getFavorites(User2))}> Favorites </button>

            <div>
                Anime List: {ListData2.map(anime => <UserAnimeSearch key={anime.title} data={anime} />)}
                Favorites: {Fav2.map(fav => <Favorites key={fav.title} data={fav} />)}
            </div>
            {ErrorMsg}
        </div>
    )
}