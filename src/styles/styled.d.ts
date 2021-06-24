import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;
    colors: {
      background: string;
      text: string;
      textWhite: string;
      purple: string;
      lightGray: string;
      red: string;
      shadow: string;
      buttonlink: string;
      linkprimary: string;
    };
  }
}
