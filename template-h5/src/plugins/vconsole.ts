import { isDevEnv } from "@/utils";
import VConsole from "vconsole";

if (isDevEnv()) {
  new VConsole();
}
