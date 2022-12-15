import React from 'react'
import { Group } from 'react-konva'
import { Arrow } from 'react-konva';
import { EdgeLabel } from './EdgeLabel';



export default function Edge(props) {
  const item = props.item;
  return (
    <Group>
        <Arrow
              key={item.id}
              points={item.points.linePoints}
              pointerLength={20}
              pointerWidth={20}
              fill={item.fill}
              stroke={item.fill}
              strokeWidth={4}
              tension={0.5}
            />
             <EdgeLabel
             key={item.points.labelPoints[0]}
              x={item.points.labelPoints[0]}
              y={item.points.labelPoints[1]}
              text={item.weight}
            />
    </Group>
  )
}