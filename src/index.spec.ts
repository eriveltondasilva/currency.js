import { greet } from './index.ts'

test('greet function', () => {
  expect(greet('World')).toBe('Hello, World!')
})
