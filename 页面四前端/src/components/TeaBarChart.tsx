import { useState } from "react"
import ReactECharts from "echarts-for-react"

type GroupType =
  | "Z世代"
  | "新中产"
  | "银发族"

interface TeaPreferenceItem {
  group: GroupType
  green: number
  black: number
  oolong: number
  fruit: number
  flower: number
}

interface Props {
  data: TeaPreferenceItem[]
  onSelectGroup: (group: GroupType) => void
  activeGroup: GroupType
}

export default function TeaBarChart({
  data,
  onSelectGroup,
}: Props) {

  // 当前高亮系列
  const [activeSeries, setActiveSeries] =
    useState<string | null>(null)

  // 当前 legend 筛选
  const [legendFilter, setLegendFilter] =
    useState<string | null>(null)

  const safeData = data ?? []

  const groups = safeData.map((item) => item.group)

  // 透明度
  const getOpacity = (seriesName: string) => {

    if (!activeSeries) return 1

    return activeSeries === seriesName
      ? 1
      : 0.18
  }

  // 描边
  const getBorderColor = (seriesName: string) => {

    return activeSeries === seriesName
      ? "#222"
      : "transparent"
  }

  const getBorderWidth = (seriesName: string) => {

    return activeSeries === seriesName
      ? 2
      : 0
  }

  // 是否显示系列
  const shouldShowSeries = (seriesName: string) => {

    if (!legendFilter) return true

    return legendFilter === seriesName
  }

  const allSeries = [

    {
      name: "绿茶",
      color: "#9DBE8A",
      data: safeData.map((i) => i.green),
    },

    {
      name: "红茶",
      color: "#C97B63",
      data: safeData.map((i) => i.black),
    },

    {
      name: "乌龙茶",
      color: "#7E9BCF",
      data: safeData.map((i) => i.oolong),
    },

    {
      name: "果茶",
      color: "#E7B87F",
      data: safeData.map((i) => i.fruit),
    },

    {
      name: "花茶",
      color: "#D9B8C4",
      data: safeData.map((i) => i.flower),
    },
  ]

  const option = {

    backgroundColor: "transparent",

    tooltip: {
      trigger: "axis",

      axisPointer: {
        type: "shadow",
      },
    },

      legend: {
    bottom: 0,
    left: "center",
  },


    grid: {
      containLabel: true,
      left: "8%",
      right: "5%",
      top: "10%",
      bottom: "12%",
    },

    xAxis: {
      type: "category",

      data: groups,

      axisLabel: {
        rotate: 0,
        interval: 0,
      },
    },

    yAxis: {
      type: "value",

      name: "偏好度 (%)",

      nameLocation: "middle",

      nameGap: 45,
    },

    series: allSeries

      .filter((s) => shouldShowSeries(s.name))

      .map((s) => ({

        name: s.name,

        type: "bar",

        stack: legendFilter
          ? undefined
          : "total",

        data: s.data,

        itemStyle: {

          color: s.color,

          opacity: getOpacity(s.name),

          borderColor: getBorderColor(s.name),

          borderWidth: getBorderWidth(s.name),
        },

        emphasis: {
          focus: "series",
        },

        barWidth: legendFilter
          ? "40%"
          : "60%",
      })),
  }

  return (

    <div className="
      h-full
      w-full
      bg-[#faf7f2]
      rounded-[18px]
      overflow-hidden
      border border-[#355b45]
      shadow-[0_8px_28px_rgba(0,0,0,0.10)]
      flex flex-col
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-4
        px-6
        pt-6
      ">
        茶叶品类偏好分析
      </h2>

      <div className="flex-1">

        <ReactECharts

          option={option}

          style={{
            height: "100%",
            width: "100%",
          }}

          onEvents={{

  click: (params: any) => {

    // ================= 点击 legend =================

    if (params.componentType === "legend") {

      const clickedLegend = params.name

      setLegendFilter((prev) =>

        prev === clickedLegend
          ? null
          : clickedLegend
      )

      // 清除柱状图高亮
      setActiveSeries(null)

      return
    }

    // ================= 点击柱子 =================

    if (params.componentType === "series") {

      onSelectGroup(params.name as GroupType)

      setActiveSeries((prev) =>

        prev === params.seriesName
          ? null
          : params.seriesName
      )
    }
  },

  // ================= 点击空白恢复 =================

  "zr:click": (params: any) => {

    if (!params.target) {

      setActiveSeries(null)

      setLegendFilter(null)
    }
  },
}}
        />

      </div>

    </div>
  )
}