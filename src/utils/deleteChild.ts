import type { JSONType } from '../interfaces/JSONType';
import cloneValue from './cloneValue';

// returns new object for the path given with the leaf reference changed
function deleteChild(parent: JSONType, path: Array<string | number>) {
  const newParent = cloneValue(parent);

  let leaf = newParent;

  for (let i = 0; i < path.length - 1; i += 1) {
    if (leaf === null || typeof leaf !== 'object') {
      leaf = {};
    } else {
      leaf = { ...leaf };
    }

    if (Array.isArray(leaf)) {
      leaf = leaf[+path[i]];
    } else {
      leaf = leaf[path[i]];
    }
  }

  const lastKey = path[path.length - 1];

  if (Array.isArray(leaf)) {
    leaf.splice(+lastKey, 1);
  } else if (typeof leaf === 'object' && leaf !== null) {
    delete leaf[lastKey];
  }

  return newParent;
}

export default deleteChild;
