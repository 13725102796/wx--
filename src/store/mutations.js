export default {
  increment: (state) => {
    const obj = state
    obj.count += 1
  },
  decrement: (state) => {
    const obj = state
    obj.count -= 1
  }
}