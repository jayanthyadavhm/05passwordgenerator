import { useCallback, useState ,useRef,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setlength]=useState(6)
  const[numberAllowed,setnumberAllowed]=useState(false)
  const[charAllowed,setcharAllowed]=useState(false)
  const[password,setpassword]=useState('')
  
  const passwordRef=useRef(null)

  const generatepassword=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){str+="0987654321"}
    if(charAllowed){str+="!@#$%^&*()_+"}
    
    for(let i=0;i<length;i++){
      const num=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(num)
    }
    setpassword(pass)
  },[length,numberAllowed,charAllowed])//dependencies

  const copyPasswordToClipboard=()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select()
  }

  useEffect(()=>{
    generatepassword()
  },[length,charAllowed,numberAllowed])


  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
          <h1 className='text-white text-center my-3'>Password generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            readOnly
            placeholder='password'
            ref={passwordRef}
            ></input>
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copyPasswordToClipboard}>copy</button>  
          </div>
          <div className='flex text-sm gap-x-5'>
            <div className='flex items-center gap-x-1'>
              <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(length)=>setlength(length.target.value)}></input>
              <label className='' htmlFor='length'>length:{length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={numberAllowed}
            onChange={()=>{  
            setnumberAllowed((prev)=>!prev)}}></input>
            <label>numbers</label>
            </div>
            <div className='flex items-center gap-x-1'><input 
            type='checkbox'
            defaultChecked={charAllowed}
            onChange={()=>{
              setcharAllowed((prev)=>!prev)
            }}
            ></input>
            <label>charecters</label>
            </div>
          </div>

    </div>
  )
}

export default App
