import App, { AppProps, AppContext } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';

// Redux.
import wrapper from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
   <Component {...pageProps} />
  );
}


// Create Initial Props.
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps: any = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default wrapper.withRedux(MyApp);
