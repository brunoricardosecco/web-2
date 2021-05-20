import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '../hooks/auth';

import GlobalStyle from '../styles/globalStyle';
import theme from '../styles/theme';

const MyApp = ({ Component, pageProps }) => (
  <AuthProvider>
    <Head>
      <title>Breaking Bad Chars</title>
    </Head>

    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
    <ToastContainer />
  </AuthProvider>
);

export default MyApp;
