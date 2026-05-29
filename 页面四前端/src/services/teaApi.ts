// src/services/teaApi.ts

import { wordCloudData, teaPreferenceData } from "../data/mockTeaData"

/**
 * =========================
 * 是否使用 mock 数据
 * 后端接入后改成 false
 * =========================
 */
const USE_MOCK = true

/**
 * =========================
 * 类型定义（前后端统一）
 * =========================
 */
export type GroupType = "Z世代" | "新中产" | "银发族"

export interface WordItem {
  name: string
  value: number
  sentiment?: "positive" | "negative" | "neutral"
}

/**
 * =========================
 * 柱状图数据接口
 * =========================
 */
export function fetchBarData() {
  if (USE_MOCK) {
    return Promise.resolve(teaPreferenceData)
  }

  return fetch("/api/tea/bar").then(res => res.json())
}

/**
 * =========================
 * 词云数据接口（核心）
 * =========================
 */
export function fetchWordCloud(group: GroupType): Promise<WordItem[]> {
  if (USE_MOCK) {
    return Promise.resolve(wordCloudData[group] ?? [])
  }

  return fetch(`/api/tea/wordcloud?group=${group}`)
    .then(res => res.json())
}