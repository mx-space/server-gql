/*
 * @Author: Innei
 * @Date: 2020-05-11 13:53:31
 * @LastEditTime: 2020-10-01 13:43:44
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/utils/time.ts
 * @Coding with Love
 */

import dayjs from 'dayjs'

export const getTodayEarly = (today: Date) =>
  dayjs(today)
    .set('hour', 0)
    .set('minute', 0)
    .set('millisecond', 0)
    .toDate()

export const getWeekStart = (today: Date) =>
  dayjs(today)
    .set('day', 0)
    .set('hour', 0)
    .set('millisecond', 0)
    .set('minute', 0)
    .toDate()

export const getMonthStart = (today: Date) =>
  dayjs(today)
    .set('date', 1)
    .set('hour', 0)
    .set('minute', 0)
    .set('millisecond', 0)
    .toDate()

export function getMonthLength(month: number, year: number) {
  return new Date(year, month, 0).getDate()
}
