import { isDevMode } from "@/utils/is";
import VConsole from "vconsole";

export function setupVconsole() {
  if (isDevMode()) {
    new VConsole();
  }
}
