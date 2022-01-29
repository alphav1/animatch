import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router"

export default function Test(props) {
    const { query } = useRouter();
    const [field, setField] = useState("")
    const [var1, setVar1] = useState("")

    if (typeof window !== 'undefined') {
        const var1 = localStorage.getItem('var1')
    }

    return (
        <>
            <h3>The User param: {query.user}</h3>
            <h3>The Firend param: {query.friend}</h3>
            <h2>{var1}</h2>
        </>
    )
}