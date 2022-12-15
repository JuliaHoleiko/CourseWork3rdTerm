import { createSlice } from "@reduxjs/toolkit";
import dijkstra from "../pages/Dijkstra/actions";
import { getEdgePointsForType } from "../pages/Dijkstra/actions/coordinates";

const itemSlice = createSlice({
  name: "items",
  initialState: {
    vertices: [],
    edges: [],
    pauseMod: false,
    fullPath: [],
    pathLen: [],
    walked: [],
    stepBack: false,
    adjList: [],
  },
  reducers: {
   
    setAdjList: (state, action) => {
      state.adjList.push({
        from: action.payload.from,
        to: action.payload.to,
        weight: action.payload.weight,
      });
    
    },
    pauseMod: (state, action) => {
      state.pauseMod = action.payload;
    },
    setStepBack: (state, action) => {
      state.stepBack = action.payload;
    },
    addToWalkedPath: (state, action) => {
      if (!state.pauseMod) {
        state.walked.push(action.payload);
        console.log(state.walked);
      }
    },
    removeFromWalkedPath: (state, action) => {
      state.walked.pop();
    },

    addToPathLen: (state, action) => {
      if (!state.pauseMod) {
        let vertex = state.vertices.find(
          (item) => item.id == action.payload.id
        );
        let x = vertex.x;
        let y = vertex.y;
        console.log(vertex.id);

        let foundItem = state.pathLen.find(
          (item) => item.id == action.payload.id
        );

        if (foundItem === undefined) {
          state.pathLen.push({
            id: action.payload.id,
            x,
            y,
            text: action.payload.text,
          });
        } else {
          state.pathLen = state.pathLen.filter(
            (item) => item.id != action.payload.id
          );
          state.pathLen.push({
            id: action.payload.id,
            x,
            y,
            text: action.payload.text,
          });
        }
      }
    },
    addToPathLen1: (state, action) => {
      if (state.stepBack) {
        let vertex = state.vertices.find(
          (item) => item.id == action.payload.id
        );
        let x = vertex.x;
        let y = vertex.y;
        let foundItem = state.pathLen.find(
          (item) => item.id == action.payload.id
        );
        if (foundItem === undefined) {
          state.pathLen.push({
            id: action.payload.id,
            x,
            y,
            text: action.payload.text,
          });
        } else {
          state.pathLen = state.pathLen.filter(
            (item) => item.id != action.payload.id
          );
          state.pathLen.push({
            id: action.payload.id,
            x,
            y,
            text: action.payload.text,
          });
        }
      }
    },
    changeColorEdge: (state, action) => {
      if (!state.pauseMod) {
        let foundItem = state.edges.find(
          (item) => item.from == action.payload.from && item.to == action.payload.to);
        foundItem.fill = action.payload.color;
        state.edges = state.edges.filter((item) => item.id != foundItem.id);
        state.edges.push(foundItem);
      }
    },
    changeColorEdgeBack: (state, action) => {
      let foundItem = state.edges.find(
        (item) =>
          item.from == action.payload.from && item.to == action.payload.to
      );
      foundItem.fill = action.payload.color;
      state.edges = state.edges.filter((item) => item.id != foundItem.id);
      state.edges.push(foundItem);
    },
    deleteNode: (state, action) =>{
        
       state.edges = state.edges.filter((item) => ((item.from != action.payload)));
       state.edges = state.edges.filter((item) => ((item.to != action.payload)));
       state.vertices = state.vertices.filter((item)=> item.id != action.payload)

    },
    changeWeightOfEdge:(state, action) =>{
        let foundItem = state.edges.find(
            (item) =>
              item.from == action.payload.from || item.to == action.payload.from
          );
          console.log(foundItem.id)
          foundItem.weight = action.payload.weight;
          state.edges = state.edges.filter((item) => item.id != foundItem.id);
          state.edges.push(foundItem);



    },
    changeColorVertix: (state, action) => {
      if (!state.pauseMod) {
        let foundItem = state.vertices.find(
          (item) => item.id == action.payload.id
        );
        foundItem.fill = action.payload.color;
        console.log(foundItem);
        state.vertices = state.vertices.filter(
          (item) => item.id != action.payload.id
        );
        state.vertices.push(foundItem);
      }
    },
    changeColorVertix1: (state, action) => {
      if (state.stepBack) {
        let foundItem = state.vertices.find(
          (item) => item.id == action.payload.id
        );
        foundItem.fill = action.payload.color;
        console.log(foundItem);
        state.vertices = state.vertices.filter(
          (item) => item.id != action.payload.id
        );
        state.vertices.push(foundItem);
      }
    },
    addToVertices: (state, action) => {
      let foundItem = state.vertices.find(
        (item) => item.id == action.payload.id
      );
      if (foundItem === undefined) {
        state.vertices.push(action.payload);
      } else {
        state.vertices = state.vertices.filter(
          (item) => item.id != action.payload.id
        );
        state.vertices.push(action.payload);
      }
    },
    addToVertices1: (state, action) => {
      let foundItem = state.vertices.find(
        (item) => item.id == action.payload.id
      );
      if (foundItem === undefined) {
        state.vertices.push(action.payload);
      } else {
        state.vertices = state.vertices.filter(
          (item) => item.id != action.payload.id
        );
        state.vertices.push(action.payload);
        let edgeList = [];
        state.edges.forEach((edge) => {
          if (edge.from == action.payload.id) {
            const points = getEdgePointsForType({
              fromX: action.payload.x,
              fromY: action.payload.y,
              toX: edge.toX,
              toY: edge.toY,
            });
            edge.points = points;
            edgeList.push(edge);
          } else if (edge.to == action.payload.id) {
            const points = getEdgePointsForType({
              fromX: edge.fromX,
              fromY: edge.fromY,
              toX: action.payload.x,
              toY: action.payload.y,
            });
            edge.points = points;
            edgeList.push(edge);
          } else edgeList.push(edge);
        });
        state.edges = edgeList;
      }
    },
    addToEdges: (state, action) => {
      let foundItem = state.edges.find(
        (item) =>
          item.from == action.payload.from && item.to == action.payload.to
      );
      if (foundItem === undefined) {
        state.edges.push(action.payload);
      }
    },
    setFullPath: (state, action) => {
      state.fullPath = [];
      const vertices = state.vertices.map((item) => item.id);
      const edges = state.edges;
      const adjacencyList = {};
      vertices.forEach((vertex) => (adjacencyList[vertex] = [] ));
      edges.forEach((edge) => {
        adjacencyList[edge.from].push({ name: edge.to, weight: edge.weight });
      });
      for (let [, verticesList] of Object.entries(adjacencyList))
        verticesList = verticesList.sort((a, b) => a.name - b.name);

      const res = dijkstra(action.payload, vertices, adjacencyList);
      res.forEach((step) => state.fullPath.push(step));
    },
  },
});

export const {
  addToVertices,
  addToEdges,
  setFullPath,
  changeColorVertix,
  changeColorEdge,
  addToPathLen,
  pauseMod,
  addToWalkedPath,
  removeFromWalkedPath,
  changeColorVertix1,
  changeColorEdgeBack,
  addToPathLen1,
  addToVertices1,
  setStepBack,
  setAdjList,
  deleteNode,
  changeWeightOfEdge,
} = itemSlice.actions;
export default itemSlice.reducer;
