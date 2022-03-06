import type { JSONType } from '../interfaces/JSONType';
import cloneValue from './cloneValue';

// returns new object for each parent for the path given with the leaf reference changed
function setChild(parent: JSONType, path: Array<string | number>, value: JSONType) {
  let leaf = parent;

  for (let i = 0; i < path.length; i += 1) {
    const part = path[i];

    if (typeof leaf !== 'object' || leaf === null) {
      break;
    }

    if (Array.isArray(leaf)) {
      leaf = leaf[+part];
    } else {
      leaf = leaf[part];
    }
  }

  if (leaf === value) {
    return parent;
  }

  if (!path.length) {
    return value;
  }

  const newParent = cloneValue(parent);

  leaf = newParent;

  for (let i = 0; i < path.length - 1; i += 1) {
    if (typeof leaf !== 'object' || leaf === null) {
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

  if (typeof leaf !== 'object' || leaf === null) {
    leaf = {};
  }

  const lastKey = path[path.length - 1];

  if (Array.isArray(leaf)) {
    leaf[+lastKey] = value;
  } else {
    leaf[lastKey] = value;
  }

  return newParent;
}

export default setChild;
