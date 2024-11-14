import AuthProvider from "./components/auth/AuthProvider";
import Routes from "./routes";
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <AuthProvider>
      <MantineProvider theme={theme}>
        <Routes />
      </MantineProvider>
    </AuthProvider>
  );
}

export default App;