import { useRouter } from 'next/router'
import { useState } from 'react'
import { interpret } from '../Elements/Functions'
import Image from 'next/image'
import Header from '../Elements/Header'
import Footer from '../Elements/Footer'
import hStyle from '../styles/Header.module.css'

export default function fromPage() {
    const { query } = useRouter()
    const [User1, setUser1] = useState("")
    const [User2, setUser2] = useState("")
    const [ErrorMsg, setError] = useState(query.errCode)
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
                    <br></br><text>ERROR : {interpret(ErrorMsg)}</text>
                    {/* {ErrorMsg} */}

                </text>

                <Footer></Footer>
            </body>
        </div>
    )
}