import { useRouter } from 'next/router'
import { useState } from 'react'
import { interpret } from '../Elements/Functions'
import Header from '../Elements/Header'
import Footer from '../Elements/Footer'
import hStyle from '../styles/Header.module.css'

export default function fromPage() {
    const { query } = useRouter()
    const [User1, setUser1] = useState("")
    const [User2, setUser2] = useState("")
    const [ErrorMsg] = useState(query.errCode)
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
        <div className={hStyle.mainDiv}>
            <body className={hStyle.MainPageBackground}>

                <Header></Header>

                <text className={hStyle.InputField}>

                    <div className={hStyle.InputField}>Input your MyAnimeList profile name (User1): <input className={hStyle.Input} type="text" placeholder='Input profile name' onChange={(e) => setUser1(e.target.value)}></input> </div> <br></br>
                    <div className={hStyle.InputField}> Choose from your friend list (User2): <button className={hStyle.forwardBtn} onClick={async (e) => routeToNext(User1)}> Friend list </button> </div> <br></br>
                    <div className={hStyle.InputField}> Or input the second MyAnimeList profile name (User2): <input className={hStyle.Input} type="text" placeholder='Input profile name' onChange={(e) => setUser2(e.target.value)}></input> <button className={hStyle.forwardBtn} onClick={async (e) => routeToCompare(User1, User2)}> Compare </button> </div> <br></br>
                    <text>ERROR : {interpret(ErrorMsg)}</text>

                </text>

                <Footer></Footer>
            </body>
        </div>
    )
}