import type { JSONType } from '../interfaces/JSONType';

function valueToString(value: JSONType): string {
  let result = '';

  switch (typeof value) {
    case 'number': {
      result = value.toString();
      break;
    }
    case 'string': {
      result = value;
      break;
    }
    case 'boolean': {
      result = value ? 'True' : 'False';
      break;
    }
    default: {
      if (value === null || value === undefined) {
        result = 'None';
        break;
      }

      if (Array.isArray(value)) {
        result = value.map((item) => valueToString(item)).join(', ');
        break;
      }

      result = `(${Object.keys(value)
        .map((key) => `${key}: ${valueToString(value[key])}`)
        .join(', ')})`;
      break;
    }
  }

  // limit the number of chars we print to screen (gets truncated anyway)
  return result.substring(0, 100) || '[Empty]';
}

export default valueToString;
