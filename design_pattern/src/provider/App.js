import React, { createContext, useContext, useState } from "react";
import "./style.css";

export const ThemeContext = createContext();

const themes = {
  light: {
    background: "#fff",
    color: "#000",
  },
  dark: {
    background: "#171717",
    color: "#fff",
  },
};

export default function App() {
  const [theme, setTheme] = useState("dark");
  const providerValue = {
    theme: themes[theme],
    toggleTheme,
  };

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className={`App theme-${theme}`}>
      <ThemeContext.Provider value={providerValue}>
        <Toggle />
        <List />
      </ThemeContext.Provider>
    </div>
  );
}

function Toggle() {
  const { toggleTheme } = useThemeContext();

  return (
    <label className="switch">
      <input type="checkbox" onClick={toggleTheme} />
      <span className="slider round" />
    </label>
  );
}

function List() {
  return (
    <ul className="list">
      {new Array(10).fill(0).map((x, i) => (
        <ListItem key={i} />
      ))}
    </ul>
  );
}

function ListItem() {
  const { theme } = useThemeContext();

  return (
    <li style={theme}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </li>
  );
}

function useThemeContext() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useThemeContext는 ThemeProvider 내에서 사용해야합니다.");
  }

  return theme;
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const providerValue = {
    theme: themes[theme],
    toggleTheme,
  };

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  );
}
