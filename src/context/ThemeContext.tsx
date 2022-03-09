import { createContext, useReducer } from "react";

interface IAction {
  type: 'CHANGE_COLOR' | 'CHANGE_MODE';
  payload?: string;
}

type ModeString = 'light' | 'dark'
interface IState {
  color: string,
  mode: ModeString;
  changeColor: (color: string) => void;
  changeMode: (mode: string) => void;
}

const initialState: IState = {
  color: '#58249c',
  mode: 'light',
  changeColor: (color) => { },
  changeMode: (mode) => { },
  // I like the below approach more, but it doesn't work with the vite hmr?
  // changeColor: (): void => { throw new Error('changeColor function must be overridden'); },
  // changeMode: (): void => { throw new Error('changeMode function must be overridden'); },
};

export const ThemeContext = createContext<IState>(initialState) // No default per Kent C Dodds? how? d(>_<)b

function themeReducer(state: IState, action: IAction): IState {    //** REDUCER FUNCTION **//
  // The action is an object with properties { type, payload }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, color: action.payload as string }
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload as ModeString }
    default:
      return state;
    // throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const ThemeProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  //* Might* need to memoize this value - http://kcd.im/optimize-context

  const changeColor = (color: string) => {
    dispatch({ type: 'CHANGE_COLOR', payload: color })
  }
  const changeMode = (mode: string) => {
    dispatch({ type: 'CHANGE_MODE', payload: mode })
  }

  // const { color, mode } = state;
  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};