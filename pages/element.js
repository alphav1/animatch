import CompTile from '../Elements/CompTile'
import style from '../styles/CompTile.module.css'
import { getScoreComp } from '../Elements/Functions'

export default function element({ user1, user2, data}){

    return (
        (typeof data == typeof 0) ?
        <div>an error has occurred</div>
        :
        <div>
            
        </div>
    )
}

element.getInitialProps = async (ctx) => {
    let name = "aalphaa"
    let friend = "pipus"
    let ret = await getScoreComp(name, friend)
    // console.log(ret)
    return ({ data : ret, user1 : name, user2 : friend})
}

