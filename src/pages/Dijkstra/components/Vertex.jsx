import React from 'react'
import { useEffect } from 'react';
import { Group, Circle,Text } from 'react-konva'
import { useDispatch } from 'react-redux';
import { useSelector
 } from 'react-redux';
import { addToVertices1, addToVertices} from '../../../data/reducer';
import { v4 as uuidv4 } from 'uuid';
export default function Vertex(props) {

   const dispatch = useDispatch();
  const vertices = useSelector((state) => state.items.vertices);
  const item = props.item;
    const handleDragStart = (e) => {
        console.log("popala.0");
      };
      const onDragEnd = (e) => {
        console.log("popala2.0");
        const id = e.target.id();
        const newNode = {
          id: id,
          radius: 30,
          fill: "black",
          x: e.target.x(),
          y: e.target.y(),
        };
        console.log(vertices);
        dispatch(addToVertices1(newNode));
      };
  return (
   <>
         {vertices.map((item) => (
        <Circle
           key={uuidv4()}
             id={item.id}
              name={item.id}
              draggable
              x={item.x}
              y={item.y}
              fill={item.fill}
              radius={item.radius}
              onDragStart={handleDragStart}
            onDragEnd={onDragEnd}
            />
             
             ))}
           
           
   
    </>
  )
}
