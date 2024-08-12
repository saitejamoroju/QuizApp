 import React, { useRef, useState } from 'react'
 import './Quiz.css'
 import { data } from '../assets/data';
 const Quiz = () => {
    let [index,setIndex]=useState(0);
    let [question,setQuestion]=useState(data[index]);
    let [lock,setLock]=useState(false);
    let [score,setScore]=useState(0)
    let [result,setResult]=useState(false);
    let opt1=useRef(null)
    let opt2=useRef(null)
    let opt3=useRef(null)
    let opt4=useRef(null)
    let optArray=[opt1,opt2,opt3,opt4];
    const checkAns=(e,ans)=>{
       if(!lock){
        if(question.ans===ans){
            e.target.classList.add("correct")
            setScore(score+1)
            setLock(true)
        }else{
            e.target.classList.add("wrong")
            setLock(true)
            optArray[question.ans-1].current.classList.add("correct")
        }
       }
    }

    const next=()=>{
        if(lock){{
            if(index==data.length-1){
                setResult(true)
                return 0;
            }
        }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            optArray.map((option)=>{
                option.current.classList.remove("wrong")
                option.current.classList.remove("correct")
                return null
            })
        }
    }
    const reset=()=>{
       setResult(false)
       setIndex(0)
       setQuestion(data[0])
       setScore(0)
       setLock(false)
    }
   return (
    <div className="container">
        <h1>Quiz App</h1>
        <hr />
        {result? <></>:<>
            <h2>{index+1}. {question.question}</h2>
            <ul>
                <li ref={opt1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
                <li ref={opt2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
                <li ref={opt3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
                <li ref={opt4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
            </ul>
            <button onClick={next}>Next</button>
        <div className="index">{index+1} of {data.length} Questions</div>
        </>}
       {!result?<></>:<> <h2>You Scored {score} out of {data.length}</h2>
       <button onClick={reset}>Reset</button></>}
    </div>     
)
 }
 
 export default Quiz