'use client'
import * as React from 'react'

import { PieChart, Pie, Cell } from 'recharts'
import randomColor from 'randomcolor'

export function CollectibleChart(props: { data: ChartData }) {
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    innerRadius,
    outerRadius,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    value,
    index,
  }: {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    value: number
    index: number
  }) => {
    const radius = outerRadius * 1.5
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180))
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180))

    return (
      <text x={x} y={y} fill="white" textAnchor="middle">
        {props.data[index].name + ' ' + props.data[index].value}
      </text>
    )
  }

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={props.data}
        cx="50%"
        cy="50%"
        label={renderCustomLabel}
        labelLine={true}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        nameKey="name"
      >
        {props.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={randomColor()} />
        ))}
      </Pie>
    </PieChart>
  )
}
