class PageConfig {
  home = '/';
  about = '/pages/about';
  contact = '/pages/contact';
  cart = '/cart';
  products = '/products';
  collections = '/collections';

  authCallback = '/auth/callback';
  authLogout = '/auth/logout';
  profile = '/profile';

  policies = (handle: string) => `/policies/${handle}`;
  product = (handle: string) => `/products/${handle}`;
  collection = (handle: string) => `/collections/${handle}`;
}

export const pageConfig = new PageConfig();
