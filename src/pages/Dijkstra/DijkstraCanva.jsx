import React, { useState } from "react";
import styles from "./DijkstraCanva.module.css"
import { Stage, Layer, Text, Circle, Arrow } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import {
  addToEdges,
  addToVertices,
  changeColorVertix,
  changeColorEdge,
  setFullPath,
  addToPathLen,
  pauseMod,
  addToWalkedPath,
  removeFromWalkedPath,
  setStepBack,
  changeColorVertix1,
  changeColorEdgeBack,
  addToPathLen1,
  setAdjList,
  deleteNode,
  
 
} from "../../data/reducer";
import { v4 as uuidv4 } from 'uuid';
import Button from "../../components/Button";
import SelectField from "../../components/SelectField";
import { useEffect } from "react";
import { getEdgePointsForType } from "./actions/coordinates";
import { EdgeLabel } from "./components/EdgeLabel";
import Edge from "./components/Edge";

import Vertex from "./components/Vertex";
import Label from "./components/Label";
import WeightField from "../../components/WeightField";

import {Link } from "react-router-dom";
import TableList from "./components/TableList";

export default function DijkstraCanva() {
  const [dragMode, setDragMode] = useState(false);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [start, setStart] = useState(0);
  const [weightInput,changeWeight ] = useState("");
  const dispatch = useDispatch();
  const vertices = useSelector((state) => state.items.vertices);
  const edges = useSelector((state) => state.items.edges);
  const pathLen = useSelector((state) => state.items.pathLen);
  const fullPath = useSelector((state) => state.items.fullPath);
  const walked = useSelector((state) => state.items.walked);
  const [showSelect, setShow] = useState(false);
  const [deletedNode, setDeletedNode] = useState("")
  const adjList = useSelector((state)=> state.items.adjList);


  const showSelectField = () => {
    setShow(true);
  }
  const setMode = () => {
    if (dragMode) setDragMode(false);
    else setDragMode(true);
  };
  const pauseAnim = () => {
    dispatch(pauseMod(true));
    console.log(walked);
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const deleteNode1 = () =>{
    dispatch(deleteNode(deletedNode));
  }
  useEffect(() => {
    dispatch(setFullPath(start));
  }, [start]);

  const handleClick = (e) => {
    if (!dragMode) {
      const index = vertices.length;
      const newNode = {
        id: index,
        radius: 30,
        fill: "black",
        x: e.target.getStage().getPointerPosition().x,
        y: e.target.getStage().getPointerPosition().y,
      };
      dispatch(addToVertices(newNode));
      
      console.log(adjList);
    }
  };

  const setEdge = () => {
    if (weightInput > 0){
    const index = edges.length;
    const fromNode = vertices.find((i) => i.id == from);
    const toNode = vertices.find((i) => i.id == to);
    const indexFrom = fromNode.id;
    const indexTo = toNode.id;
    const points = getEdgePointsForType({
      fromX: vertices.find((i) => i.id == indexFrom).x,
      fromY: vertices.find((i) => i.id == indexFrom).y,
      toX: toNode.x,
      toY: toNode.y,
    });
    const newEdge = {
      id: index,
      from: indexFrom,
      to: indexTo,
      fromX: vertices.find((i) => i.id == indexFrom).x,
      fromY: vertices.find((i) => i.id == indexFrom).y,
      toX: toNode.x,
      toY: toNode.y,
      weight: weightInput,
      fill: "black",
      points: points,
    };
    
    dispatch(addToEdges(newEdge));
    dispatch(setAdjList({from: indexFrom, to: indexTo, weight: weightInput}));
    console.log(adjList)}
  };
  const stepBack = () => {

    dispatch(setStepBack(true));
    const length = walked.length;
    const lastItem = walked[length - 1];
    dispatch(removeFromWalkedPath());
    console.log(walked);
    let itemList = [];

    if (lastItem.action == 1) {
      itemList = walked.filter(
        (item) => item.vertex == lastItem.vertex && item.action == 1
      );
      if (itemList.length > 1) {
        const step = itemList[itemList.length - 2];
        dispatch(addToPathLen1({ id: step.vertex, text: step.hint }));
      } else if (itemList.length == 1)
        dispatch(addToPathLen1({ id: itemList[0].vertex, text: "" }));
    } else if (lastItem.action == 2 || lastItem.action == 3) {
      itemList = walked.filter(
        (item) => item.vertex == lastItem.vertex && item.action > 1
      );

      if (itemList.length > 1) {
        const step = itemList[itemList.length - 2];
        dispatch(changeColorVertix1({ id: step.vertex, color: step.color}));
      } else if (itemList.length == 1)
        dispatch(
          changeColorVertix1({ id: itemList[0].vertex, color: "black" })
        );
    } else if (
      lastItem.action == 4 ||
      lastItem.action == 5 ||
      lastItem.action == 6
    ) {
      itemList = walked.filter(
        (item) => item.from == lastItem.from && item.to == lastItem.to
      );

      if (itemList.length > 1) {
        const step = itemList[itemList.length - 2];
        console.log(step.from, step.to);
        dispatch(
          changeColorEdgeBack({ from: step.from, to: step.to, color: step.color })
        );
      } else if (itemList.length == 1)
        dispatch(
          changeColorEdgeBack({
            from: itemList[0].from,
            to: itemList[0].to,
            color: "black",
          })
        );
    }
  };
  const findPath = () => {
    let i = 0;
    const restPath = [];
    if(pauseMod){
      dispatch(pauseMod(false));
    let sizeOfSlice = walked.length;
    for (let i = sizeOfSlice - 1; i < fullPath.length; i++){
      restPath.push(fullPath[i]);
    
      

    }}
    else restPath = fullPath;
  
   console.log(walked);

    restPath.forEach((step) => {
      i++;

      sleep(800 + 400 * i).then(() => {
        if (step.action == 1) {
          dispatch(addToPathLen({ id: step.vertex, text: step.hint }));
          dispatch(addToWalkedPath(step));
        } else if (step.action == 2) {
          dispatch(changeColorVertix({ id: step.vertex, color: step.color }));
          dispatch(addToWalkedPath(step));
        } else if (step.action == 3) {
          dispatch(changeColorVertix({ id: step.vertex, color: step.color }));

          dispatch(addToWalkedPath(step));
        } else if (step.action == 4) {
          dispatch(
            changeColorEdge({ from: step.from, to: step.to, color: step.color })
          );

          dispatch(addToWalkedPath(step));
        } else if (step.action == 5) {
          dispatch(
            changeColorEdge({
              from: step.from,
              to: step.to,
              color: step.color,
            })
          );
          dispatch(addToWalkedPath(step));
        } else if (step.action == 6) {
          dispatch(
            changeColorEdge({
              from: step.from,
              to: step.to,
              color: step.color,
            })
          );
          dispatch(addToWalkedPath(step));
        }
      });
    });
  };

  return (
    <div>
      <Stage
        onMouseDown={handleClick}
        width={window.innerWidth}
        height={window.innerHeight - 400}>
           <Layer>
          <Vertex></Vertex>
          <Label></Label>
          {pathLen.map((item) => (
            <Text
             key={uuidv4()}
              text={item.text}
              x={item.x - 60}
              y={item.y}
              fontSize={40}
              fill="red"
              width={30}
              height={15}
              align={"center"}
              verticalAlign={"middle"}
            />
          ))}
          {edges.map((items) => (
            <Edge  key = {uuidv4()} item={items} />
          ))}
        </Layer>
      </Stage>
      <Link to = "/">
          <Button text="Back"></Button>
        </Link>
    <Button onClick={setMode} text={dragMode ? "Drag off" : "Drag on"}></Button>

    <div className={styles.container}>
      <div className={styles.button_container}>
      <div>
      {showSelect ?
       <div className={styles.container}>
      <SelectField
        options={vertices}
        onInputValueChange={setStart}
        inputValue={start}
        text="Choose start vertex"
      ></SelectField>
      <Button text="Start" onClick={findPath}></Button>
      </div> : <div/>}
      </div>
      <Button text="Start animation" onClick={showSelectField}></Button>
      <Button onClick={pauseAnim} text="Pause"></Button>
      <Button text="Step back" onClick={stepBack}></Button>
      </div>
      <div className={styles.set_edge_container}>
      <SelectField
        options={vertices}
        onInputValueChange={setFrom}
        inputValue={from}
        text="Choose from vertex"
      ></SelectField>
      <SelectField
        options={vertices}
        onInputValueChange={setTo}
        inputValue={to}
        text="Choose to vertex"
      ></SelectField>
      <WeightField className inputValue={weightInput} onInputValueChange={changeWeight} text = "weigth"/>
     
      <Button onClick={setEdge} text="Set edge"></Button>
      <WeightField className inputValue={deletedNode} onInputValueChange={setDeletedNode} text = "node to delete"/>
      <Button onClick={deleteNode1} text="Delete node"></Button>
      </div>
      
     
      

      </div>
      
      <TableList></TableList>

      </div>
    
  );
}
