import { CronJob } from "cron";
import crawler from "@/jobs/crawler";

// 每24小时执行一次
const crawlerJob = new CronJob("0 0 * * *", crawler);

try {
  crawlerJob.start();
} catch (error) {
  console.log(error);
}
