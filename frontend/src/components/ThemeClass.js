import { useSelector } from 'react-redux';

const useThemeClass = () => {
  const theme = useSelector((state) => state.theme.theme);

  const themeClass = theme === 'light'
  ? 'bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] text-lightText '
  : 'bg-gradient-to-r from-slate-800 to-slate-900 text-darkText';


  return themeClass;
};

export default useThemeClass;