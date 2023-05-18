export type ResponseModule = {
  id: number;
  attributes: {
    name: string;
    complexity: number;
    intro?: string;
    content?: string;
  };
};

export type ResponseTheme = {
  id: number;
  attributes: {
    secondary: {
      id: number;
      light: string;
      main: string;
      dark: string;
    };
    primary: {
      id: number;
      light: string;
      main: string;
      dark: string;
    };
  };
};

export type IColor = {
  light: string;
  main: string;
  dark: string;
};

export type IModule = {
  id: number;
  name: string;
  complexity: number;
  intro?: string;
  content?: string;
  theme?: {
    secondary: IColor;
    primary: IColor;
  };
};
