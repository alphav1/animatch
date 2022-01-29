import { useRouter } from 'next/router'
import { useState } from 'react'

export default function fromPage() {
    const [ErrorMsg, setError] = useState("")
    const [User, setUser] = useState("")
    const [Friend, setFriend] = useState("")
    const [CallData, setCallData] = useState("") 
    const router = useRouter()
    const search = async (e) => {
        try {
            setError('call loading')
            let res = await fetch(`https://api.jikan.moe/v4/users/${User}/friends`)
            setError('call loaded')
            if(res.status == 200){
                let data = await res.json()
                setCallData(data.data)
            }
        } catch (error) {
            setError(`ERROR from the API call in search(): ${error}`)
        }
    }

    const routeToNext = (e) => {
        if (User != "" && Friend != ""){
            router.push({
                pathname: '/routing2',
                query: {
                    'name': User,
                    'friend': Friend
                }
            })
        }else{
            if(User == "" && Friend == ""){
                setError("ERROR: please enter a valid username and friend")
            }else if(Friend != ""){
                setError("ERROR: please set a valid User parameter")
            }else{
                setError("ERROR: please set a valid Friend parameter")
            }
            
        }
    }

    const Friend_elem = ({user}) => (
        <div>
            {user.username}
        </div>
    )
    
    return(
        <div>
        <text>{ErrorMsg}</text>
        <input type="text" onChange={(e) => setUser(e.target.value)}></input>
        <button onClick={search}>Search</button>
        <input type="text" onChange={(e) => setFriend(e.target.value)}></input>
        <text>User: {User} Friend: {Friend}</text>
        <button onClick={routeToNext}>Click to route</button>
        <div>Results: {JSON.stringify(CallData)}</div>
        </div>
    )
}