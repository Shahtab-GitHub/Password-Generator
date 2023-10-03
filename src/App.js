import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")
  
  //useCallback hook
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number){
      str+="0123456789"
    }
    if(character){
      str+="!@#$%^&*()_+{}~`"
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1) 
      pass+= str.charAt(char)
    }

    setPassword(pass)
  },[length, number, character])

  //useEffect hook
  useEffect(()=>{
    passwordGenerator()
  }, [length, number, character, passwordGenerator])

  //useRef hook
  const passwordRef = useRef(null)

  return (
    <>
      <div className="text-center w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-9 text-black-500 bg-gray-500">
        Password Generator
        <div className="input-group input-group-sm mb-3 py-3">
          <input type="text" className="form-control" aria-label="Sizing example input" readOnly ref = {passwordRef} value={password} aria-describedby="inputGroup-sizing-sm"/>
          <button type="button" onClick = {()=>{passwordRef.current?.select(); navigator.clipboard.writeText(password)}}  className="btn btn-primary btn-sm">Copy</button>
        </div>
        
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-between">
            <input onChange={(e)=>{setLength(e.target.value)}} min = {8} max = {32} type="range" className="form-range" id="customRange1" value={length}/>
            <label htmlFor="customRange1" className="form-label"> Length:{length} </label>
          </div>

          <div className="form-check">
            <input className="form-check-input" onChange={()=>{setNumber((prev) => !prev)}} type="checkbox" value={number} id="flexCheckDefault"/>
            <label className="form-check-label" htmlFor="flexCheckDefault"> Numbers </label>
          </div>

          <div className="form-check">
            <input className="form-check-input" onChange={()=>{setCharacter((prev) => !prev)}} type="checkbox" value={number} id="flexCheckDefault"/>
            <label className="form-check-label" htmlFor="flexCheckDefault"> Characters </label>
          </div>

        </div>

      </div>
    </>
  );
}

export default App;
