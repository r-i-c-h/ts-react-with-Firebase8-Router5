import { useTheme } from "../hooks/useTheme"
import modeIcon from "../assets/mode-icon.svg"
import './ThemeSelector.scss'

const themeColors = ['#58249c', '#249c6b', '#b70233']

export default function ThemeSelector() {
  const { changeColor, mode, changeMode } = useTheme()

  const toggleLightDarkThemes = () => {
    const nextMode = mode === 'light' ? 'dark' : 'light'
    changeMode(nextMode)
  }

  return (
    <div className="theme-selector">

      <div className="mode-toggle">
        <img
          className={mode}
          src={modeIcon}
          alt="Light\Dark Color Theme Switch Icon"
          onClick={toggleLightDarkThemes}
        />
      </div>

      <div className="theme-buttons">
        {themeColors.map(color => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
            className={mode}
          />
        ))}
      </div>
    </div>
  )
}