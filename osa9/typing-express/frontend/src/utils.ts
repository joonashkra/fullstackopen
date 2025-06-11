

export const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};


export function getEnumValues<T extends string, TEnumValue extends string | number> (enumVariable: { [key in T]: TEnumValue }) {
  return Object.values(enumVariable) as Array<T>;
}