const title = "admin-template";

export function getPageTitle(pageTitle: string | unknown) {
  return pageTitle ? `${pageTitle}` : `${title}`;
}
