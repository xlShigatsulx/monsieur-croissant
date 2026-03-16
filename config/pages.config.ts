class PageConfig {
  home = '/'
  about = '/about'
  products = '/products'
  product = (handle: string) => `/products/${handle}`
  collections = '/collections'
  collection = (handle: string) => `/collections/${handle}`
  cart = '/cart'
  search = '/search'
  profile = '/profile'
  authCallback = '/auth/callback'
  authLogout = '/auth/logout'
}

export const pageConfig = new PageConfig()
