import React from 'react'
import styles from "./WeightField.module.css"

export default function WeightField(props) {
  return (
   
    <form >
         <div className={styles.form}>
        <p >
          {props.text}
        </p>
        <input type="text" name="name" className={`${styles.input} ${props.className}`}  value={props.inputValue}
        onChange={(e) => props.onInputValueChange(e.target.value)}/>
        
        </div>
    </form>
  )
}
