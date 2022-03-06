import type { JSONType } from '../interfaces/JSONType';

function valueFromType(type: string): JSONType {
  switch (type) {
    case 'number':
      return 0;
    case 'string':
      return '';
    case 'boolean':
      return false;
    case 'array':
      return [];
    case 'object':
      return {};
    default:
      return null;
  }
}

export default valueFromType;
