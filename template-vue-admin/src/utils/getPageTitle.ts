const title = "7inch-admin-template";

export function getPageTitle(pageTitle: string | unknown) {
  return pageTitle ? `${pageTitle}` : `${title}`;
}
