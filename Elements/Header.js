import React from "react";
import style from "../styles/Header.module.css"
import Link from 'next/link';

class Header extends React.Component {
    render() {
        return (
            <h1 className={style.Header}>MyAnimatch</h1>
        )
    }
}

export default Header