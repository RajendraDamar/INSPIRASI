declare module 'uuid' {
  export function v4(): string;
  export const v1: () => string;
  export default { v4 };
}
