import React, { useRef, useEffect, useState } from "react";
import Button from "../Button";
import styles from "./Canvas.module.css";

const Canvas = (props) => {
  const [nodeList, setNodeList] = useState([]);
  const [node, setNode] = useState("");
  const [nodeToDelete, setNodeToDelete] = useState("");
  const [nodeToFind, setNodeToFind] = useState("");

  const canvasRef = useRef(null);

  const parentNode = (i) => {
    return Math.floor((i - 1) / 2);
  };
  function push(item) {
    let newArr = nodeList;
    let i = nodeList.length;
    newArr.push(item);
    while (i > 0 && parseInt(newArr[parentNode(i)]) > parseInt(newArr[i])) {
      let temp = newArr[parentNode(i)];
      newArr[parentNode(i)] = newArr[i];
      newArr[i] = temp;
      i = parentNode(i);
    }
    return setNodeList(newArr);
  }

  function posy(i) {
    return Math.floor(Math.log2(i + 1)) * 60 + 30;
  }

  function posx(i) {
    const level = Math.floor(Math.log2(i + 1));
    const leaves = Math.pow(2, level);
    const indexInRow = i - leaves + 2;
    const k = indexInRow / (leaves + 1) - 0.5;
    const x = k * 700 + 500;
    return x;
  }

  const draw = (ctx, minHeap) => {
    ctx.strokeStyle = "#84a59d";
    ctx.font = "14px Arial";
    //ctx.lineWidth = 3
    ctx.clearRect(0, 0, 1000, 1000);
    for (let i = 0; i < minHeap.length; i++) {
      ctx.beginPath();
      ctx.moveTo(posx(i), posy(i));
      const j = Math.floor((i + 1) / 2 - 1);
      ctx.lineTo(posx(j), posy(j));
      ctx.stroke();
    }
    for (let i = 0; i < minHeap.length; i++) {
      ctx.beginPath();
      ctx.arc(posx(i), posy(i), 20, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = "#84a59d";
      ctx.fill();
      ctx.fillStyle = "#000000";
      console.log(posx(i), posy(i), minHeap[i]);
      ctx.font = "14px Arial";
      ctx.fillText(minHeap[i], posx(i) - 5, posy(i) + 5);
    }
  };

  const deleteItem = (item) => {
    console.log(item);
    console.log(typeof nodeList[0]);
    let i = nodeList.indexOf(item);
    console.log(i);
    if (i == 0 && nodeList.length == 1) {
      nodeList.pop();
    } else {
      nodeList[i] = nodeList.pop();
      console.log(nodeList[i]);
      while (true) {
        let lowest =
          parseInt(nodeList[(i + 1) * 2]) < parseInt(nodeList[(i + 1) * 2 - 1])
            ? (i + 1) * 2
            : (i + 1) * 2 - 1;
        if (parseInt(nodeList[i]) > parseInt(nodeList[lowest])) {
          let t = nodeList[i];
          nodeList[i] = nodeList[lowest];
          nodeList[lowest] = t;
          i = lowest;
        } else break;
      }
    }
  };

  const deleteAnim = (ctx, x, y, time) => {
    ctx.beginPath();
    ctx.arc(x, y, 19, 0, 2 * Math.PI);
    ctx.fillStyle = "#ed8686";
    ctx.fill();
  };

  function searchEl(el) {
    let pathToEl = [];
    console.log(el);
    for (let i = 0; i < nodeList.length; i++) {
      if (parseInt(nodeList[i]) == parseInt(el)) {
        pathToEl.push(i);
        console.log(parseInt(nodeList[i]) == parseInt(el));
        break;
      } else pathToEl.push(i);
    }
    return pathToEl;
  }

  const renderDel = (el) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let pathToEl = searchEl(el);
    console.log(pathToEl);

    for (let i = 0; i < pathToEl.length; i++) {
      setTimeout(() => {
        deleteAnim(context, posx(i), posy(i), i);
      }, 2000 + i * 700);
      setTimeout(() => {
        draw(context, nodeList);
      }, 2500 + i * 700);
    }
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context, nodeList);
  }, [nodeList, draw]);

  const addNode = () => {
    push(node);
    setNode("");
  };
  const findNode = () => {
    renderDel(nodeToFind);
    setNodeToFind("");
  };
  const deleteNode = () => {
    deleteItem(nodeToDelete);
    setNodeToDelete("");
  };

  return (
    <div className={styles.container_main}>
      <canvas
        id="canvas"
        height="500px"
        width="1000px"
        ref={canvasRef}
        {...props}
      ></canvas>

      <div className={styles.container}>
        <input
          type="number"
          value={node}
          onChange={(e) => setNode(e.target.value)}
          className={styles.input}
        />

        <Button onClick={addNode} text="Add" />
        <br></br>

        <input
          type="number"
          value={nodeToDelete}
          onChange={(e) => setNodeToDelete(e.target.value)}
          className={styles.input}
        />
        <Button
          onClick={() => {
            deleteNode();
          }}
          text="Delete node"
        />
        <input
          type="number"
          value={nodeToFind}
          onChange={(e) => setNodeToFind(e.target.value)}
          className={styles.input}
        />

        <Button
          onClick={() => {
            findNode();
          }}
          text="Search"
        />
      </div>
    </div>
  );
};

export default Canvas;
