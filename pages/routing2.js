import { useRouter } from "next/router";
import { useState } from "react";

export default function toPage() {
    const router = useRouter()
    const { query } = useRouter()
    const [User, setUser] = useState(query.name)
    const [Friend, setFriend] = useState(query.friend)

    return(
        <div>
            <text>Current user: {User}</text>
            <text>Your friend: {Friend}</text>
        </div>
    )
}