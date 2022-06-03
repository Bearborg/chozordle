import classnames from 'classnames'
import { SYMBOL_TYPES, SymbolType } from '../../constants/settings'

type Props = {
  settingName: string
  symbolType: SymbolType
  handleChange: Function
  description?: string
}

export const SettingsLanguageSelector = ({
  settingName,
  symbolType,
  handleChange,
  description,
}: Props) => {
  const languageButton = (symbol: string) => {
    return classnames(
      'w-20 h-8 text-white shrink-0 bg-gray-300 rounded-full p-1 duration-300 ease-in-out cursor-pointer mb-3 language-button',
      {
        'bg-green-400': symbol === symbolType,
        'mawkin-font': symbol === SYMBOL_TYPES.Mawkin,
        'thoha-font text-xl': symbol === SYMBOL_TYPES.Thoha,
        'font-bold': symbol === SYMBOL_TYPES.English,
      }
    )
  }
  const languageButtonText = (symbol: string) => {
    return classnames({
      '-translate-x-1': symbol === SYMBOL_TYPES.Mawkin,
    })
  }

  return (
    <>
      <div className="flex justify-between gap-4 py-3">
        <div className="text-gray-500 dark:text-gray-300 mt-2 text-left">
          <p className="leading-none">{settingName}</p>
          {description && (
            <p className="text-xs mt-1 text-gray-500 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
        <div className="flex-col">
          {Object.keys(SYMBOL_TYPES).map((symbol) => (
            <div key={symbol}>
              <div
                onClick={() => handleChange(symbol)}
                className={languageButton(symbol)}
              >
                <div className={languageButtonText(symbol)}>{symbol}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
