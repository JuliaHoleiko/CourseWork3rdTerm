import React from "react";
import styles from "./Home.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dijkstra from "../Dijkstra/Dijkstra";
import MinHeap from "../MinHeap/MinHeap";
import Button from "../../components/Button";

export default function Home() {
  return (
    <div className={styles.container_main}>
      <div className={styles.container}>
        <div className={styles.container_nav}>
          <div className={styles.container_task}>
            <p>Dijkstra’s Algorithm</p>
          </div>
          <div className={styles.container_button}>
          <Link to="/dijkstra">
            <Button text="Start"/>
          </Link>
          </div>
        </div>
        <div className={styles.container_nav}>
        <div className={styles.container_task}>
          <p>Minheep</p>
        </div>
        <div className={styles.container_button}>
        <Link to="/minheap">
          <Button text="Start" />
        </Link>
        </div>
      </div>
      </div>

      <div className={styles.text}>Internet of things</div>
      <div className={styles.text}>Holeiko Yuliia</div>
    </div>
  );
}
