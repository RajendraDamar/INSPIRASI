declare module 'localforage' {
  const localforage: {
    createInstance?: (opts?: unknown) => unknown;
    getItem(key: string): Promise<unknown>;
    setItem(key: string, value: unknown): Promise<unknown>;
    removeItem(key: string): Promise<void>;
  };
  export default localforage;
}

