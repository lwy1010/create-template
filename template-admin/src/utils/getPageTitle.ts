const title = "7inch-admin-template";

export default function getPageTitle(pageTitle: string | unknown) {
  return pageTitle ? `${pageTitle} - ${title}` : `${title}`;
}
