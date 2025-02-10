import Layout from './components/Layout/Layout';
import './App.css';
import useThemeInitializer from './components/hooks/useThemeInitializer';
import { ToastContainer } from 'react-toastify';


function App() {
  useThemeInitializer();
  return (
    <>
    <Layout />
    <ToastContainer/>
    </>
  );
}

export default App;