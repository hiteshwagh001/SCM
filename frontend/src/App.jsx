import Layout from './components/Layout/Layout';
import './App.css';
import useThemeInitializer from './components/hooks/useThemeInitializer';


function App() {
  useThemeInitializer();
  return (
    <Layout />
  );
}

export default App;