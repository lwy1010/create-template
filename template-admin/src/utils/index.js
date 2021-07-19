export function filterHiddenRoute(routes) {
  const routeList = [];
  routes.forEach((route) => {
    if (!route.meta?.hidden) {
      if (route?.children) {
        route.children = filterHiddenRoute(route.children);
      }
      routeList.push(route);
    }
  });
  return routeList;
}

export function findRouteItemByPath(routes, path) {
  let routeList = [];
  for (let i = 0; i < routes.length; i++) {
    const item = routes[i];
    if (item.path === path) {
      routeList = [item];
      break;
    } else {
      if (item?.children) {
        const children = findRouteItemByPath(item.children, path);
        if (children.length) {
          routeList = [item, ...children];
          break;
        }
      }
    }
  }
  return routeList;
}
