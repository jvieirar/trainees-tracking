"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from "date-fns";
import { useGlobalState } from "@/hooks/useGlobalState";

type MonthlyAttendance = {
  month: string;
  attendanceCount: number;
};

export default function MonthlyAttendanceGraph() {
  const { attendances } = useGlobalState();
  const [data, setData] = useState<MonthlyAttendance[]>([]);

  useEffect(() => {
    const now = new Date();
    const sixMonthsAgo = subMonths(now, 5);
    const months = eachMonthOfInterval({ start: sixMonthsAgo, end: now });

    const monthlyData = months.map((month) => {
      const start = startOfMonth(month);
      const end = endOfMonth(month);
      const count = attendances.filter((attendance) => {
        const date = parseISO(attendance.date);
        return date >= start && date <= end;
      }).length;

      return {
        month: format(month, "MMM"),
        attendanceCount: count,
      };
    });

    setData(monthlyData);
  }, [attendances]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="attendanceCount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}