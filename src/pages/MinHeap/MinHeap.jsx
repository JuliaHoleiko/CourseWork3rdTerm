import React from 'react'
import Canvas from '../../components/Canvas/Canvas'
import styles from "./MinHeap.module.css";
import { Formik, Form, Field, UseField, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';

export default function MinHeap() {
  
  return (
    <div>
      <h2 className={styles.header}>Min Heap</h2>
      <Canvas/>
    </div>

  )
}
