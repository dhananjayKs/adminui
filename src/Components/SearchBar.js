import React, {useState }from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";


export default function SearchBar() {
    let history=useHistory()
    let [state,setState]=useState()
    let dispatch = useDispatch()
    function onChange(event){
        history.push('/1')
        setState(state=event.target.value)
        console.log(state)
        dispatch({
            type:"SEARCH_TERM",
            payload:{
                state,
            }
        })
    }
    return (
        <div className='w-4/5 mx-auto rounded-sm border border-black'>
            <input type="text" placeholder="Search Here" value={state} onChange={onChange} className='w-full text-left h-12  inline-block leading-12'></input>
        </div>
    )
}
