import ReactECharts from "echarts-for-react"
import "echarts-wordcloud"

interface WordItem {
  name: string
  value: number
  sentiment?: "positive" | "negative" | "neutral"
  weight?: number
}

interface Props {
  title: string
  words: WordItem[]
  onWordClick?: (word: WordItem) => void
}

export default function TeaWordCloud({
  title,
  words,
  onWordClick,
}: Props) {

  const option = {

    backgroundColor: "transparent",

    animationDuration: 800,

    animationEasing: "cubicOut",

    tooltip: {
      show: true,

      backgroundColor: "#fffdf8",

      borderColor: "#355b45",

      borderWidth: 1,

      textStyle: {
        color: "#2d2d2d",
      },

      formatter: (params: any) => {

        const item = params.data as WordItem

        return `
          <div style="padding:4px 8px;">
            <div style="font-weight:700;font-size:15px;">
              ${item.name}
            </div>

            <div style="margin-top:6px;">
              热度值：${item.value}
            </div>

            <div style="margin-top:2px;">
              情绪倾向：
              ${
                item.sentiment === "positive"
                  ? "正向"
                  : item.sentiment === "negative"
                  ? "负向"
                  : "中性"
              }
            </div>
          </div>
        `
      },
    },

    series: [
      {
        type: "wordCloud",

        shape: "circle",

        gridSize: 5,

        sizeRange: [16, 72],

        rotationRange: [-25, 25],

        rotationStep: 5,

        drawOutOfBound: false,

        layoutAnimation: true,

        keepAspect: true,

        textStyle: {

          fontFamily: `"PingFang SC", "Microsoft YaHei", sans-serif`,

          fontWeight: (params: any) => {

            const item = params.data as WordItem

            return item.value > 80
              ? "bold"
              : "normal"
          },

          color: (params: any) => {

            const item = params.data as WordItem

            // 正向
            if (item.sentiment === "positive") {

              const colors = [
                "#2f5d3a",
                "#4f7c5f",
                "#6b8f6b",
              ]

              return colors[
                Math.floor(Math.random() * colors.length)
              ]
            }

            // 负向
            if (item.sentiment === "negative") {

              const colors = [
                "#b94a48",
                "#a63f3d",
                "#c96b67",
              ]

              return colors[
                Math.floor(Math.random() * colors.length)
              ]
            }

            // 中性
            return "#8c7b6a"
          },

          textShadowBlur: 6,

          textShadowColor: "rgba(0,0,0,0.08)",
        },

        emphasis: {

          focus: "self",

          textStyle: {

            shadowBlur: 18,

            shadowColor: "rgba(0,0,0,0.22)",

            fontSize: 24,

            textBorderColor: "#222",

            textBorderWidth: 1,
          },
        },

         data: (words ?? []).map((w) => ({
      name: w.name,
      value: w.value,
      sentiment: w.sentiment,
    })),
      }
    ],
  }

  return (

    <div className="
      h-full
      w-full

      bg-gradient-to-br
      from-[#faf7f2]
      via-[#f8f4ee]
      to-[#f2ece2]

      rounded-[18px]

      border border-[#355b45]

      shadow-[0_8px_28px_rgba(0,0,0,0.10)]

      transition-all
      duration-300

      hover:shadow-[0_12px_36px_rgba(0,0,0,0.14)]

      overflow-hidden

      flex flex-col
    ">

      {/* 顶部标题 */}

      <div className="
        px-6
        pt-6
        pb-3

        border-b border-[#355b45]/15
      ">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="
              text-[22px]
              font-bold
              text-[#2d2d2d]
              tracking-wide
            ">
              {title}
            </h2>

            <p className="
              text-xs
              text-[#7b7b7b]
              mt-2
              tracking-[0.15em]
              uppercase
            ">
              TF-IDF Keyword Analysis
            </p>

          </div>

          {/* 右上角状态标签 */}

          <div className="
            px-3
            py-1.5

            rounded-full

            bg-[#eef5ea]

            border border-[#355b45]/20

            text-[11px]
            tracking-[0.12em]

            text-[#355b45]
          ">
            LIVE DATA
          </div>

        </div>

        {/* 情绪图例 */}

        <div className="
          flex items-center gap-5
          mt-4
          text-xs
        ">

          <div className="flex items-center gap-2">
            <div className="
              w-3 h-3 rounded-full
              bg-[#2f5d3a]
            " />
            <span className="text-[#666]">
              正向评价
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="
              w-3 h-3 rounded-full
              bg-[#b94a48]
            " />
            <span className="text-[#666]">
              负向反馈
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="
              w-3 h-3 rounded-full
              bg-[#8c7b6a]
            " />
            <span className="text-[#666]">
              中性词汇
            </span>
          </div>

        </div>

      </div>

      {/* 图表 */}

      <div className="flex-1 px-2 pb-3">

        <ReactECharts

          option={option}

          style={{
            height: "100%",
            width: "100%",
          }}
          notMerge={true}        // 🔥 强制重绘
  lazyUpdate={false}     // 🔥 立即更新

          onEvents={{
            click: (params: any) => {

              const word = params.data as WordItem

              onWordClick?.(word)
            },
          }}
        />

      </div>

    </div>
  )
}