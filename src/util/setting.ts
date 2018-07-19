export async function loadSetting() {

  // TODO: load from locale storage

  return new Proxy({}, {
    get() { return 1},
    set(_, key: string, value: string | number | boolean) { return true }
  })
}
