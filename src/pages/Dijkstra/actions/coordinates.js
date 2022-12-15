export const getEdgePointsForType = (edge) => {
  const dx = edge.toX - edge.fromX;
  const dy = edge.fromY - edge.toY;
  const angle = Math.atan2(dy, dx);
  const vertexFromOffset = 32;
  const vertexToOffset = 32;
  const angleOffset = 0.25;
  const xFrom = edge.fromX + vertexFromOffset * Math.cos(angle + angleOffset);
  const yFrom = edge.fromY - vertexFromOffset * Math.sin(angle + angleOffset);
  const xTo = edge.toX - vertexToOffset * Math.cos(angle - angleOffset);
  const yTo = edge.toY + vertexToOffset * Math.sin(angle - angleOffset);

  const middlePointHeightCoefficient = 1 / 15;
  const xMiddle =
    (xFrom + xTo) / 2 - (yFrom - yTo) * middlePointHeightCoefficient;
  const yMiddle =
    (yFrom + yTo) / 2 + (xFrom - xTo) * middlePointHeightCoefficient;

  return {
    linePoints: [xFrom, yFrom, xMiddle, yMiddle, xTo, yTo],
    labelPoints: [xMiddle, yMiddle],
  };
};
