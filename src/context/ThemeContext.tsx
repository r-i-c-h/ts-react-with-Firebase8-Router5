import { createContext, useReducer } from "react";

interface IThemeState {
  color: string;
  changeColor: (color: string) => void;
}
interface IThemeActions {
  type: string;
  payload: string;
}

const initialState: IThemeState = { color: '#58249c', changeColor: () => { null } };

export const ThemeContext = createContext<IThemeState>(initialState)

const themeReducer = (state: IThemeState, action: IThemeActions) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, color: action.payload }
    default:
      return state;
  }
}

export const ThemeProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  const { color } = state;

  const changeColor = (color: string) => {
    dispatch({ type: 'CHANGE_COLOR', payload: color })
  }

  return (
    <ThemeContext.Provider value={{ color, changeColor }}>
      {children}
    </ThemeContext.Provider>);
};
