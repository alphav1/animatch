import React from "react";
import style from "../styles/Header.module.css"
import Link from 'next/link'

class Footer extends React.Component {
    render() {
        return (
            <h2 className={style.Header}> <Link href={`/`}> MyAnimatch </Link> for myanimelist.net</h2>
        )
    }
}

export default Footer