export function bindViewMethod(view: any, method: string) {
  return () => view[method]();
}
