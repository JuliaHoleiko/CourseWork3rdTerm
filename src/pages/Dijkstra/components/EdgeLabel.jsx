import React, { Component, useState } from "react";
import { Stage, Layer, Rect, Text, Circle, Arrow, Group } from "react-konva";

export const EdgeLabel = ({ x, y, text }) => {
    const labelRadius = 15;
    const labelHorizontalPadding = 1, labelVerticalPadding = 5;
    const labelBorderWidth = 0;
    return (
        <Group
       
            x={x - labelRadius - labelHorizontalPadding - labelBorderWidth}
            y={y - labelRadius - labelVerticalPadding - labelBorderWidth}
            width={labelRadius * 2. + 2. * (labelHorizontalPadding + labelBorderWidth)}
            height={labelRadius * 2. + 2. * (labelVerticalPadding + labelBorderWidth)}>
            <Circle
                x={labelRadius + labelHorizontalPadding + labelBorderWidth}
                y={labelRadius + labelVerticalPadding + labelBorderWidth}
                radius={labelRadius}
                fill={'white'}
                stroke={'black'}
                strokeWidth={labelBorderWidth}/>
            <Text
                x={labelBorderWidth + labelHorizontalPadding}
                y={labelBorderWidth + labelVerticalPadding}
                text={text}
                fontSize={20}
                width={labelRadius * 2.}
                height={labelRadius * 2.}
                align={'center'}
                verticalAlign={'middle'}/>
        </Group>
    );
};