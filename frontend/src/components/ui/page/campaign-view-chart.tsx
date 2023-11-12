'use client'
import * as React from 'react'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

export function ViewChart(props: { data: { name: string; Views: number }[] }) {
  return (
    <LineChart
      width={500}
      height={300}
      data={props.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Views"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  )
}

export function ViewGraph(props: { data: { date: string; Posts: number }[] }) {
  return (
    <LineChart
      width={500}
      height={300}
      data={props.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Posts" // Use 'price' as the dataKey
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
