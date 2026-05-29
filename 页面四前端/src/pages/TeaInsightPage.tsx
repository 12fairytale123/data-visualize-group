import { useEffect, useState } from "react"

import TeaBarChart from "../components/TeaBarChart"
import TeaWordCloud from "../components/TeaWordCloud"

import { wordCloudData } from "../data/mockTeaData"

type GroupType =
  | "Z世代"
  | "新中产"
  | "银发族"

const borderColor = "border-[#867018]"

export default function TeaInsightPage() {

  const [selectedGroup, setSelectedGroup] =
    useState<GroupType>("Z世代")
  const [barData, setBarData] = useState<any[]>([])
  useEffect(() => {

  async function load() {

    // 后续后端接入时替换 fetch 即可
    // const res = await fetch("/api/tea/bar")
    // const data = await res.json()

    const mock = [
      {
        group: "Z世代",
        green: 20,
        black: 30,
        oolong: 25,
        fruit: 15,
        flower: 10,
      },
      {
        group: "新中产",
        green: 25,
        black: 20,
        oolong: 30,
        fruit: 10,
        flower: 15,
      },
      {
        group: "银发族",
        green: 40,
        black: 25,
        oolong: 20,
        fruit: 5,
        flower: 10,
      },
    ]

    setBarData(mock)
  }

  load()

}, [])
  return (
    <div className="
      min-h-screen
      bg-[#f6f1e7]
      p-10
    ">

      {/* ================= 标题区域 ================= */}
      <div className="mb-10">

        <div className="flex items-center gap-3 mb-6">

          <div className={`px-4 py-2 border ${borderColor}
            rounded-full text-[11px] tracking-[0.25em]
            uppercase bg-[#fcfaf7] text-[#5f5a52]`}>
            Data Story
          </div>

          <div className={`px-4 py-2 border ${borderColor}
            rounded-full text-[11px] tracking-[0.25em]
            uppercase bg-[#fcfaf7] text-[#5f5a52]`}>
            Tea Market 2025
          </div>

          <div className={`px-4 py-2 border ${borderColor}
            rounded-full text-[11px] tracking-[0.25em]
            uppercase bg-[#fcfaf7] text-[#5f5a52]`}>
            Consumer Insight
          </div>

        </div>

        <h1 className="
          text-[30px]
          font-semibold
          leading-tight
          tracking-tight
          text-[#1f1f1f]
        ">
          中国茶叶多维数据可视化：
          <span className="text-[#4f6b58] ml-3">
            人群与市场洞察
          </span>
        </h1>

        <p className="
          mt-5 text-[#6b6b6b]
          text-lg tracking-wide
          font-semibold
        ">
          China Tea Multidimensional Visualization:
          Profiles & Market Insights
        </p>

        <div className="w-full h-[1px] bg-[#867018] mt-7" />
      </div>

      {/* ================= 当前状态 ================= */}
      <div className="mb-6 text-sm text-[#6b6b6b]">
        当前分析人群：
        <span className="font-semibold text-[#4f6b58] ml-2">
          {selectedGroup}
        </span>
      </div>

      {/* ================= 图表区域（已彻底修复） ================= */}
      <div className="grid grid-cols-12 gap-8 items-start mb-10">

        {/* ================= 左侧 BarChart ================= */}
        <div className="col-span-7">
    <div className="h-[520px]">
      <TeaBarChart
  data={barData}
  onSelectGroup={setSelectedGroup}
  activeGroup={selectedGroup}
/>
    </div>
  </div>

        {/* ================= 右侧 WordCloud ================= */}
          <div className="col-span-5">
    <div className="h-[520px]">
      <TeaWordCloud
        title={`${selectedGroup}茶叶关注词云`}
        words={wordCloudData[selectedGroup]}
      />
    </div>
  </div>

</div>

      {/* ================= 市场洞察模块 ================= */}
      <div className={`
        bg-[#f8f4ee]
        border ${borderColor}
        rounded-[28px]
        p-8
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
      `}>

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-semibold text-[#2d2d2d]">
            市场洞察摘要
          </h2>

          <div className="text-xs tracking-[0.2em] uppercase text-[#7b7b7b]">
            Tea Consumer Behavior Report
          </div>

        </div>

        <div className="grid grid-cols-12 gap-8 text-[15px] leading-8">

          {/* 左 */}
          <div className="col-span-7 space-y-4">

            <div className={`bg-[#eef5ea] rounded-2xl p-6 border ${borderColor}`}>
              <p className="font-semibold text-[#4f6b58]">
                Z世代消费趋势
              </p>
              <p className="mt-3 text-[#5f5f5f]">
                年轻消费者更关注包装颜值、社交传播与冷泡果香体验。
              </p>
            </div>

            <div className={`bg-[#f6efe5] rounded-2xl p-6 border ${borderColor}`}>
              <p className="font-semibold text-[#7a5a3a]">
                新中产偏好
              </p>
              <p className="mt-3 text-[#5f5f5f]">
                更关注品质与文化属性，乌龙茶与白茶消费提升。
              </p>
            </div>

          </div>

          {/* 右 */}
          <div className="col-span-5 space-y-4">

            <div className={`bg-[#edf2f7] rounded-2xl p-6 border ${borderColor}`}>
              <p className="font-semibold text-[#425a70]">
                银发族偏好
              </p>
              <p className="mt-3 text-[#5f5f5f]">
                偏好传统绿茶与养生属性，对“耐泡”更敏感。
              </p>
            </div>

            <div className={`bg-[#f8ecec] rounded-2xl p-6 border ${borderColor}`}>
              <p className="font-semibold text-[#9c4d4d]">
                市场负面反馈
              </p>
              <p className="mt-3 text-[#5f5f5f]">
                香精感、价格偏高与包装复杂化问题突出。
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}