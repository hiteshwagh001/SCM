
const Helmet = (props) => {
  // const themeClass=useThemeClass()

  document.title = "SCM - " + props.title;
  return <div className=" light dark:bg-gradient-to-r from-slate-800 to-slate-900 dark:text-darkText
    h-screen m-auto"
    >
    {props.children}
  </div>;
};

export default Helmet;
