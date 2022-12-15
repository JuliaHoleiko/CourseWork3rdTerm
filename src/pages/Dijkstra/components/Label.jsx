import React from 'react'
import { Group, Circle,Text } from 'react-konva'
import { useDispatch } from 'react-redux';
import { useSelector
 } from 'react-redux';
import { addToVertices } from '../../../data/reducer';
import { v4 as uuidv4 } from 'uuid';

export default function Label(props) {
    const dispatch = useDispatch();
  const vertices = useSelector((state) => state.items.vertices);
  
    const item = props.item;
   
  return (
   <>
    
         {vertices.map((item) => (
           
             <Text
             key={uuidv4()}
              text={item.id}
              x={item.x - 15}
              y={item.y - 7}
              fontSize={20}
              fill="white"
              width={30}
              height={15}
              align={"center"}
              verticalAlign={"middle"}
            />
             
             ))}
           
           
   
    </>
  )
}
