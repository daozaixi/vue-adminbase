<script setup>
  import { ref, onMounted } from "vue";
  import * as echarts from "echarts";

  const chartRef = ref(null);

  onMounted(() => {
    const chart = echarts.init(chartRef.value);
    const option = {
      title: {
        text: "销售统计",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["销售额", "订单量"],
      },
      xAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: [
        {
          type: "value",
          name: "销售额",
          axisLabel: {
            formatter: "{value} 元",
          },
        },
        {
          type: "value",
          name: "订单量",
          axisLabel: {
            formatter: "{value} 单",
          },
        },
      ],
      series: [
        {
          name: "销售额",
          type: "line",
          data: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: "订单量",
          type: "bar",
          yAxisIndex: 1,
          data: [0, 0, 0, 0, 0, 0, 0],
        },
      ],
    };
    chart.setOption(option);
  });
</script>

<template>
  <div class="container">
    <div class="header">
      <h2 class="title">数据报表</h2>
      <div class="toolbar">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
    </div>

    <el-card class="content-card">
      <div ref="chartRef" style="width: 100%; height: 500px"></div>
    </el-card>
  </div>
</template>

<style scoped>
  .container {
    padding: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .title {
    font-size: 24px;
    color: #303133;
    margin: 0;
  }

  .toolbar {
    display: flex;
    gap: 16px;
  }

  .content-card {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
  }
</style>
