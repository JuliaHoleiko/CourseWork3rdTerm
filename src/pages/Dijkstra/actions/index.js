const dijkstra = (start, vertices, adjacencyList) => {
    let visited = {};
    vertices.forEach(vertex => visited[vertex] = false);
    let path = [];
    const distance = {};
    const parents = {};
    vertices.forEach(v => {
        if (v == start) return;
        distance[v] = Number.MAX_SAFE_INTEGER;
        parents[v] = null;
        path.push({ vertex: v, hint: "∞", action: 1 });
    });
    distance[start] = 0;
    path.push({ vertex: start, hint: "0", action: 1});

    for (let i in vertices) {
        let vertex = -1;
        vertices.forEach(j => {
            if (!visited[j] && ((vertex === -1) || (distance[j] < distance[vertex])))
            vertex = j;
        });

        if (distance[vertex] === Number.MAX_SAFE_INTEGER)
            break;

        visited[vertex] = true;
        path.push({ vertex: vertex, action: 2, color: "blue" });
        for (let {name: to, weight} of adjacencyList[vertex]) {
            if (visited[to])
                continue;
            weight = Number(weight);

            path.push({ from: vertex, to: to, weight, action: 4, color: "red" });
            if (distance[vertex] + weight < distance[to]) {
                if (parents[to] !== null) {
                    path.push({ from: parents[to], to,  action: 5, color: "grey" });
                }
                distance[to] = distance[vertex] + weight;
                parents[to] = vertex;
                path.push({ from: vertex, to: to, weight, action: 6, color: "blue"});
                path.push({ vertex: to, hint: distance[to], action: 1});
            } else {
                path.push({ from: vertex, to: to, weight, action: 5, color: "grey" });
            }
        }
        path.push({ vertex: vertex, action: 3, color: "grey" });
    }
    return path;

    
};
export default dijkstra;
