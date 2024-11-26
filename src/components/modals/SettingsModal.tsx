import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'
import {
  HARD_MODE_DESCRIPTION,
  HIGH_CONTRAST_MODE_DESCRIPTION,
  SYMBOL_TYPE_DESCRIPTION,
} from '../../constants/strings'
import { SettingsLanguageSelector } from './SettingsLanguageSelector'
import { SettingsImportExport } from './SettingsImportExport'
import { SymbolType } from '../../constants/settings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  isHardMode: boolean
  handleHardMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
  isHighContrastMode: boolean
  handleHighContrastMode: Function
  symbolType: SymbolType
  handleSymbolType: Function
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
  symbolType,
  handleSymbolType,
}: Props) => {
  return (
    <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <div className="flex flex-col mt-2 divide-y">
        <SettingsToggle
          settingName="Hard Mode"
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={HARD_MODE_DESCRIPTION}
          isHighContrast={isHighContrastMode}
        />
        <SettingsToggle
          settingName="Dark Mode"
          flag={isDarkMode}
          handleFlag={handleDarkMode}
          isHighContrast={isHighContrastMode}
        />
        <SettingsToggle
          settingName="High Contrast Mode"
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={HIGH_CONTRAST_MODE_DESCRIPTION}
          isHighContrast={isHighContrastMode}
        />
        <SettingsLanguageSelector
          settingName="Language"
          symbolType={symbolType}
          handleChange={handleSymbolType}
          description={SYMBOL_TYPE_DESCRIPTION}
          isHighContrast={isHighContrastMode}
        />
        <SettingsImportExport
          settingName="Manage Data"
          isHighContrast={isHighContrastMode}
        />
      </div>
    </BaseModal>
  )
}
