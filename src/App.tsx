import { Route, BrowserRouter, Switch } from "react-router-dom";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { ListRooms } from "./pages/ListRooms";
import { Room } from "./pages/Room";
import light from "./styles/themes/light";
import dark from "./styles/themes/dark";

import { AuthContextProvider } from "./contexts/AuthContext";
import ThemeSwitch from "./components/ThemeSwitch";
import usePersistState from "./hooks/usePersistState";
import { AdminRoom } from "./pages/AdminRoom";

function App() {
  const [theme, setTheme] = usePersistState<DefaultTheme>("theme", light);

  const toogleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <ThemeProvider theme={theme}>
      <ThemeSwitch toogleTheme={toogleTheme} />
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" exact component={NewRoom} />
            <Route path="/admin/rooms/list" exact component={ListRooms} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
