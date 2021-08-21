export type JSONObject = { [key: string]: JSONType };

export type JSONArray = Array<JSONType>;

export type JSONType = string | number | null | boolean | JSONArray | JSONObject;
