import classnames from 'classnames'
import { importStats, exportStats } from '../../lib/localStorage'

type Props = {
  settingName: string
  isHighContrast: boolean
}

export const SettingsImportExport = ({
  settingName,
  isHighContrast,
}: Props) => {
  const importExportButton = () => {
    return classnames(
      'w-20 h-8 text-white font-bold shrink-0 bg-gray-300 rounded-full p-1 duration-300 ease-in-out cursor-pointer mb-3 language-button',
      {
        'bg-green-400': !isHighContrast,
        'bg-orange-400': isHighContrast,
      }
    )
  }

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const body = await event.target?.files?.item(0)?.text()
    importStats(body)
  }

  return (
    <>
      <div>
        <div className="flex justify-between gap-4 py-3">
          <div className="text-gray-500 dark:text-gray-300 mt-2 text-left">
            <p className="leading-none">{settingName}</p>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <label className={importExportButton()}>
              <input type="file" className="hidden" onChange={handleChange} />
              Import
            </label>
            <a
              className={importExportButton()}
              href={'data:application/json;charset=utf-8,' + exportStats()}
              download="chozordle-stats.json"
            >
              Export
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
