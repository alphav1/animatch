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
    const [ListData1, setListData1] = useState([])
    const [ListData2, setListData2] = useState([])
    const [ListData3, setListData3] = useState([])
    const [ListData4, setListData4] = useState([])
    const [Fav1, setFav1] = useState([])
    const [Fav2, setFav2] = useState([])
    const [ErrorMsg, setError] = useState("")
    const [FriendList, setFriendList] = useState([])
    const router = useRouter()

    const routeToNext = (e) => {
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

    return (
        <div>
            <h1 className={styles.pagecommon}>animatch</h1>

            <input type="text" onChange={(e) => setUser1(e.target.value)}></input>
            <button onClick={async (e) => setFriendList(await getFriends(User1))}> Pick Friend </button>
            <button onClick={async (e) => setListData1(await getList(User1, "watching"))}> Search /Watching/ List </button>
            <button onClick={async (e) => setListData2(await getList(User1, "completed"))}> Search /Completed/ List </button>
            <button onClick={async (e) => setFav1(await getFavorites(User1))}> Favorites </button>
            <button onClick={async (e) => routeToNext(User1, User2)}> Compare </button>

            <div>
                Watching List: {ListData1.map(anime => <UserAnimeSearch key={anime.title} data={anime} />)}
                Completed List: {ListData2.map(anime => <UserAnimeSearch key={anime.title} data={anime} />)}
                Favorites: {Fav1.map(fav => <Favorites key={fav.title} data={fav} />)}
                Friends: {FriendList.map(user => <UserTileSearch key={user.username} data={user} />)}
            </div>

            <input type="text" onChange={(e) => setUser2(e.target.value)}></input> {User2}
            <button onClick={async (e) => setListData3(await getList(User2, "watching"))}> Search /Watching/ List </button>
            <button onClick={async (e) => setListData4(await getList(User2, "completed"))}> Search /Completed/ List </button>
            <button onClick={async (e) => setFav2(await getFavorites(User2))}> Favorites </button>

            <div>
                Watching List: {ListData3.map(anime => <UserAnimeSearch key={anime.title} data={anime} />)}
                Completed List: {ListData4.map(anime => <UserAnimeSearch key={anime.title} data={anime} />)}
                Favorites: {Fav2.map(fav => <Favorites key={fav.title} data={fav} />)}
            </div>
            {ErrorMsg}
        </div>
    )
}