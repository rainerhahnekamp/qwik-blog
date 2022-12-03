export function dateToJson<T extends Record<string, unknown>>(object: T): T {
  const returner: Record<string, unknown> = {};
  for (const prop in object) {
    const value = object[prop];
    if (value instanceof Date) {
      returner[prop] = value.toJSON();
    } else if (isRecord(value)) {
      returner[prop] = dateToJson(value);
    } else if (Array.isArray(value)) {
      returner[prop] = value.map(dateToJson);
    } else {
      returner[prop] = value;
    }
  }
  return returner as T;
}

function isRecord(obj: unknown): obj is Record<string, unknown> {
  return !!(obj && !Array.isArray(obj) && typeof obj === "object");
}
