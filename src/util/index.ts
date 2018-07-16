export function warn(info: string) {
  console.warn(info)
}

export function log(info: string) {
  console.log(info)
}


export function intersectArr<T>(a: T[], b: T[]) {
  const setB = new Set<T>(b)
  return a.filter((x) => setB.has(x))
}

export function minusArr<T>(a: T[], b: T[]) {
  const setB = new Set<T>(b)
  return a.filter((x) => ! setB.has(x))
}
