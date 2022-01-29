import Link from 'next/link';
import { useState } from 'react';

export default function nextpage() {
    const [input, setUsername] = useState("input")
    return (
        <div>
            <h> glad you arrived here </h>
            <h><Link href="/">home</Link></h> <br></br>
            <h> input your match </h> <br></br>
            <input placeholder="Friend1" pattern="^[a-zA-Z0-9]" type="text" onChange={(e) => setUsername(e.target.value)}></input>
            <h> <Link href={"/friends/" + encodeURIComponent(input)} > GO </Link></h>
        </div>
    )
}