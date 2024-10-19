import { Suspense } from "react";
import TraineeList from "@/components/TraineeList";
import AttendanceTable from "@/components/AttendanceTable";
import MonthlyAttendanceGraph from "@/components/MonthlyAttendanceGraph";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Suspense fallback={<div>Loading trainees...</div>}>
        <TraineeList />
      </Suspense>
      <Suspense fallback={<div>Loading attendance...</div>}>
        <AttendanceTable />
      </Suspense>
      <Suspense fallback={<div>Loading analytics...</div>}>
        <MonthlyAttendanceGraph />
      </Suspense>
    </div>
  );
}