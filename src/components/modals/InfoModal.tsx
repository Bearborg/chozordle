import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the word in 6 tries. After each guess, the color of the tiles will
        change to show how close your guess was to the word.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="H"
          status="correct"
        />
        <Cell value="A" />
        <Cell value="D" />
        <Cell value="A" />
        <Cell value="R" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter H is in the word and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="O" />
        <Cell value="L" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="M"
          status="present"
        />
        <Cell value="E" />
        <Cell value="N" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter M is in the word but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="G" />
        <Cell value="E" />
        <Cell value="L" />
        <Cell isRevealing={true} isCompleted={true} value="S" status="absent" />
        <Cell value="U" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter S is not in the word in any spot.
      </p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        This is an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/Bearborg/chozordle"
          className="underline font-bold"
        >
          check out the code here
        </a>.
      </p>
      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        If you want to learn more about Chozo, check out the <a
          href="https://twitter.com/ChozoCourse"
          className="underline font-bold"
        >
          Chozo Course
        </a>!
      </p>
    </BaseModal>
  )
}
