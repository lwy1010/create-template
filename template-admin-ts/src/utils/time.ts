import dayjs from 'dayjs';

export function formatTimestamp(timestamp: number) {
  return dayjs(timestamp).format('YYYY/MM/DD');
}
