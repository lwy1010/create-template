import { isDevEnv } from "@/utils";
import VConsole from "vconsole";

// only enabled vconsole on dev environment
if (isDevEnv()) {
  new VConsole();
}
