
interface Key {
  name: string;
  friends: string[];
}
type Arguments = Key[];

function connectionsListToGraph(connections: Arguments) {
  const Graph: { [name: string]: string[] } = {};
  for (let { name, friends } of connections) {
    Graph[name] = friends;
  }
  return Graph;
}

export const findConnection = (
  source: string,
  target: string,
  connections: Arguments
) => {
  const Graph = connectionsListToGraph(connections);
  const result: string[][] = [];

  const DFSfuction = (
    source: string,
    target: string,
    path = [source],
    visited = {} as any
  ) => {
    if (!visited[source]) {
      visited[source] = true;

      if (source === target || Graph[source] === undefined) {
        result.shift();
      } else {
        for (let friend of Graph[source]) {
          if (friend === target) {
            result.push(path.concat(target));
            break;
          } else {
            DFSfuction(friend, target, path.concat(friend), visited);
          }
        }
      }
    }
  };
  DFSfuction(source, target);
  return result;
};
