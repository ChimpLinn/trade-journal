'use client'

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartPoint } from '@/types/trade'

interface EquityChartProps {
  data: ChartPoint[]
  height?: number
}

export function EquityChart({ data, height = 200 }: EquityChartProps) {
  if (data.length === 0) {
    return (
      <div
        className="flex items-center justify-center rounded-xl bg-[var(--surface)] text-sm text-[var(--secondary-label)] ring-1 ring-[var(--separator)]"
        style={{ height }}
      >
        暂无曲线数据
      </div>
    )
  }

  return (
    <div
      className="rounded-xl bg-[var(--surface)] p-3 ring-1 ring-[var(--separator)]"
      style={{ height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <XAxis
            dataKey="index"
            tick={{ fontSize: 11, fill: '#8E8E93' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#8E8E93' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
            formatter={(value) => [`${value}R`, '累计']}
            labelFormatter={(label) => `第 ${label} 笔`}
          />
          <Line
            type="monotone"
            dataKey="pnl"
            stroke="var(--primary)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: 'var(--primary)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
