import React from 'react'
import styles from "./SelectField.module.css"
export default function SelectField(props) {

const options = props.options;
const selectItem = options.map((shape) => 
<option value={shape.id} key={shape.id} className={styles.option}>{shape.id}</option>)

return (
    <div className={styles.container}>
        <label >{props.text}</label>
        <select name="vertix" className={styles.select}  value={props.inputValue}
        onChange={(e) => props.onInputValueChange(e.target.value)}>
          {selectItem}
        </select>
    </div>
  )
}


