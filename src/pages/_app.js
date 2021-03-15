import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/globalStyle';
import theme from '../styles/theme';

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Breaking Bad Chars</title>
    </Head>

    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  </>
);

export default MyApp;
