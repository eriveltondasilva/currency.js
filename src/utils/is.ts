export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

export function isNill(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true
  }

  if (typeof value === 'string') {
    return value.trim().length === 0
  }

  if (Array.isArray(value)) {
    return value.length === 0
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }

  return false
}

// isEmpty(null);               // true
// isEmpty("");                 // true
// isEmpty([]);                 // true
// isEmpty({});                 // true
// isEmpty(new Map());          // true
// isEmpty(new Set());          // true
// isEmpty("teste");            // false
// isEmpty([1, 2]);             // false
// isEmpty({ nome: "João" });   // false
