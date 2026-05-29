export const teaPreferenceData = [

  {
    group: "Z世代",

    green: 20,
    black: 15,
    oolong: 10,
    fruit: 35,
    flower: 18,
  },

  {
    group: "新中产",

    green: 35,
    black: 20,
    oolong: 40,
    fruit: 12,
    flower: 22,
  },

  {
    group: "银发族",

    green: 50,
    black: 18,
    oolong: 15,
    fruit: 5,
    flower: 12,
  },

]

export const wordCloudData = {
  Z世代: [
    { name: "包装颜值", value: 120, type: "positive" },
    { name: "打卡", value: 100, type: "positive" },
    { name: "果香", value: 95, type: "positive" },
    { name: "冷泡", value: 80, type: "positive" },
    { name: "社交", value: 70, type: "positive" },
    { name: "健康", value: 60, type: "positive" },
    { name: "香精味", value: 55, type: "negative" },
    { name: "价格偏高", value: 45, type: "negative" },
  ],

  新中产: [
    { name: "品质", value: 120, type: "positive" },
    { name: "乌龙", value: 90, type: "positive" },
    { name: "茶文化", value: 80, type: "positive" },
    { name: "商务", value: 70, type: "positive" },
    { name: "价格高", value: 50, type: "negative" },
  ],

  银发族: [
    { name: "养生", value: 120, type: "positive" },
    { name: "传统", value: 100, type: "positive" },
    { name: "绿茶", value: 90, type: "positive" },
    { name: "耐泡", value: 80, type: "positive" },
    { name: "包装复杂", value: 40, type: "negative" },
  ],
}