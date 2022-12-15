import React from "react";
import styles from "./TableList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeWeightOfEdge, setAdjList } from "../../../data/reducer";
import { v4 as uuidv4 } from 'uuid';
import Button from "../../../components/Button";
import WeightField from "../../../components/WeightField";
import { useState } from "react";

export default function TableList() {
  const adjList = useSelector((state) => state.items.adjList);
  const [mode, activateMode] = useState(false);
  const dispatch = useDispatch();
  const showWeightChange = () =>{
    if(mode){
      activateMode(false)
    }
    else activateMode(true)
  }
  const [weightInput, setWeightInput] = useState("");
  // const changeWeight = (v1, v2, v3) =>{
  //   dispatch(changeWeightOfEdge({from: v1, to: v2, weight: v3}))
    
  // }


  return(
   <div className={styles.main_container}>
    {adjList.map((item) => (
      <div className={styles.container} key = {uuidv4()}>
        <div className={styles.container_box}>{item.from}</div>
        <div>---{item.weight}---</div>
        <input></input>
        <div className={styles.container_box}>{item.to}</div>
        <Button onClick ={showWeightChange} className={styles.button} text = "change weight"/>
        {mode ? <div className={styles.container}><WeightField inputValue = {weightInput} onInputValueChange={setWeightInput} text = "New weight"></WeightField>
        <Button  text = "confirm" className={styles.button} onClick={()=> dispatch(changeWeightOfEdge({from: item.from, to: item.to, weight: weightInput}))}/></div> : <></>} 
        </div>))}

      

  </div>);
}
