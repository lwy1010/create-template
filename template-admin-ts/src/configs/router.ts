import router from '@/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import getPageTitle from '@/utils/getPageTitle';
import { readToken } from '@/utils/cookies';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start();

  // determine whether the user has logged in by token
  if (readToken()) {
    if (to.path === '/login') {
      // redirect to the home page if user is login
      next({ path: '/' });
      NProgress.done();
    } else {
      next();
      NProgress.done();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // go directly if page in the whitelist
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next({ path: '/login' });
      NProgress.done();
    }
  }
});

router.afterEach((to) => {
  // finish progress bar
  NProgress.done();
  // set page title
  document.title = getPageTitle(to.meta.title as string);
});
