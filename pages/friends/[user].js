import Link from 'next/link';
import { useState } from 'react';

export default function nextpage() {
    const [friend, setFriend] = useState("")
    const [user, setUser] = useState("")

    return (
        <div>
            <h> here are your friends </h> <br></br>
            <h><Link href="/"> go home </Link></h> <br></br>
            <h></h>
            <h> find a specific user from your friends list </h> <input placeholder="Friend1" onChange={(friend) => setFriend(friend.target.value)}></input>
            <Link href={"/search?user=" + encodeURIComponent(user) + "&friend=" + encodeURIComponent(friend)}>to Search</Link>
            <datalist id="browsers"> <option value="Friend1"> </option> </datalist> <br></br>
            <input list="browsers" placeholder='Friend1'></input> <br></br>

            <h> or find a user you want from the mal database</h> <input placeholder="Friend2" onChange={(user) => setUser(user.target.value)}></input>
            <h><Link href={"/match/" + friend}> see your results </Link></h> <br></br>
        </div>
    )
}