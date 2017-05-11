export const transitionShort = (...props) => {
  const transitions = props.map(prop => `${prop} 0.25s linear`).join()
  return `transition: ${transitions}`
}
