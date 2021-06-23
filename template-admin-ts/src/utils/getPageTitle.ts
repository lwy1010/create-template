import settings from "@/configs/settings";

const title = settings.title;

export default function getPageTitle(pageTitle: string) {
  return pageTitle ? `${pageTitle} - ${title}` : `${title}`;
}
