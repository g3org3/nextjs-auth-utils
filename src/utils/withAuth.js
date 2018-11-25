import redirect from './redirect';
import request from '../services/request';

export default Page => {
  const Auth = (...props) => Page(...props);
  Auth.getInitialProps = async (ctx = {}) => {
    try {
      const { profile } = await request.server.get(ctx, '/auth/me');
      if (typeof Page.getInitialProps === 'function') {
        const pageProps = await Page.getInitialProps(ctx);
        return { ...pageProps, profile };
      }
      return { user: profile };
    } catch ({ message }) {
      console.log('[withAuth:error]', message);
    }
    redirect(ctx, '/login');
    return {};
  };
  return Auth;
};
