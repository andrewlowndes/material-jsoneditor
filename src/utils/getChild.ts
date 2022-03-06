import type { JSONType } from '../interfaces/JSONType';

function getChild(parent: JSONType, path: Array<string | number>) {
  let childObj = parent;

  for (let i = 0; i < path.length; i += 1) {
    const field = path[i];

    if (typeof childObj !== 'object') {
      throw new Error(`Could not get child ${field} of ${childObj}`);
    }

    if (Array.isArray(childObj)) {
      childObj = childObj[+field];
    } else {
      childObj = childObj?.[field] ?? null;
    }
  }

  return childObj;
}

export default getChild;
