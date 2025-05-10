const singletonInstances = new WeakMap<Function, any>()

export function singleton<T extends { new (...args: any[]): {} }>(
  constructor: T,
): T {
  return class extends constructor {
    constructor(...args: any[]) {
      const existing = singletonInstances.get(constructor)
      if (existing) return existing
      super(...args)
      singletonInstances.set(constructor, this)
    }
  }
}
