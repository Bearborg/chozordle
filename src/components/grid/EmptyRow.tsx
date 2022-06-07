import { solution } from '../../lib/words'
import { Cell } from './Cell'

export const EmptyRow = () => {
  const emptyCells = Array.from(Array(solution.length))
  const style = { gridTemplateColumns: `repeat(${solution.length}, 1fr)` }

  return (
    <div className="grid gap-1" style={style}>
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
