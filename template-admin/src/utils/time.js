import dayjs from "dayjs";

export function formatTimestamp(timestamp) {
  return dayjs(timestamp).format("YYYY/MM/DD");
}
