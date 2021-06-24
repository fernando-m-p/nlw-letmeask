import { SwitchDivTheme } from "../styles/Button.style";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import Switch from "react-switch";

type ThemeSwitchProps = {
  toogleTheme: () => void;
};

export default function ThemeSwitch(props: ThemeSwitchProps) {
  const { title, colors } = useContext(ThemeContext);

  return (
    <SwitchDivTheme>
      <Switch
        checked={title === "dark"}
        onChange={props.toogleTheme}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        offColor={colors.purple}
        offHandleColor={colors.purple}
        onColor={colors.linkprimary}
        onHandleColor={colors.linkprimary}
      />
    </SwitchDivTheme>
  );
}
