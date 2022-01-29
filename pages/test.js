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
            <h2>Your name is: {field}</h2>
            <input type="text" onChange={(e) => setField(e.target.value)} ></input>
            <input type="text" onChange={(e) => setVar1(e.target.value)}></input>
            <Link href={"/friends/" + field}>take me to match</Link>
            <h3>The name param: {query.name}</h3>
            <h2>{var1}</h2>
        </>
    )
}

/*/import React, { useState } from 'react';

const App = () =>

{
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');

    const handle = () => {
      localStorage.setItem('Name', name);
      localStorage.setItem('Password', pwd);
   };
   
   const remove = () => {
      localStorage.removeItem('Name');
      localStorage.removeItem('Password');
   };


   return (
      <div className="App">
         
      <h1>Name of the user:</h1>
         
         <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
         <h1>Password of the user:</h1>
         <input type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)}/>
         
         <div> <button onClick={handle}>Done</button> </div>
         
         {localStorage.getItem('Name') &&
         (<div> Name: <p>{localStorage.getItem('Name')}</p> </div>)} {localStorage.getItem('Password') &&
         (<div> Password: <p>{localStorage.getItem('Password')}</p> </div>)}
         
         <div> <button onClick={remove}>Remove</button> </div>

      </div>
   );
};
export default App; /*/