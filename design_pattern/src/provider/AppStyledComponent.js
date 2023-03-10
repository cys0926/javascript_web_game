import React, { useState } from "react";
import "./style.css";
import styled, { ThemeProvider } from "styled-components";

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

export default function AppStyledComponent() {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className={`App theme-${theme}`}>
      <ThemeProvider theme={themes[theme]}>
        <Toggle toggleTheme={toggleTheme} />
        <List />
      </ThemeProvider>
    </div>
  );
}

function Toggle({ toggleTheme }) {
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

const StyledLi = styled.li`
  ${({ theme }) =>
    `background-color: ${theme.background};
    color: ${theme.color};
    `}
`;

function ListItem() {
  return (
    <StyledLi>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </StyledLi>
  );
}
