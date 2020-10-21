export const executeSequentially = async <Result extends Array<any>>(
  promises: Array<() => Promise<any>>
): Promise<Result> => {
  const values: any[] = [];

  for (const promise of promises) {
    values.push(await promise());
  }

  return values as Result;
};
