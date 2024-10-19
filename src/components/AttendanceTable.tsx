"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { useGlobalState } from "@/hooks/useGlobalState";

export default function AttendanceTable() {
  const { trainees, attendances, updateTrainees, updateAttendances } = useGlobalState();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newAttendance, setNewAttendance] = useState({ traineeId: "", sessionsUsed: 1 });

  const filteredAttendances = attendances.filter(
    (attendance) => attendance.date === format(selectedDate!, "yyyy-MM-dd")
  );

  const handleAddAttendance = () => {
    const trainee = trainees.find((t) => t.id === newAttendance.traineeId);
    if (!trainee) return;

    const updatedAttendances = [
      ...attendances,
      {
        id: Date.now().toString(),
        traineeId: newAttendance.traineeId,
        date: format(selectedDate!, "yyyy-MM-dd"),
        sessionsUsed: newAttendance.sessionsUsed,
      },
    ];
    updateAttendances(updatedAttendances);

    const updatedTrainees = trainees.map((t) =>
      t.id === trainee.id
        ? {
            ...t,
            sessionsRemaining: t.sessionsRemaining - newAttendance.sessionsUsed,
            packagesRemaining: Math.floor((t.sessionsRemaining - newAttendance.sessionsUsed) / 5),
          }
        : t
    );
    updateTrainees(updatedTrainees);

    setNewAttendance({ traineeId: "", sessionsUsed: 1 });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Attendance</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Attendance</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="trainee" className="text-right">
                    Trainee
                  </Label>
                  <Select
                    onValueChange={(value) => setNewAttendance({ ...newAttendance, traineeId: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select trainee" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainees.map((trainee) => (
                        <SelectItem key={trainee.id} value={trainee.id}>
                          {trainee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sessions" className="text-right">
                    Sessions Used
                  </Label>
                  <Select
                    onValueChange={(value) => setNewAttendance({ ...newAttendance, sessionsUsed: parseInt(value) })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select sessions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddAttendance}>Add Attendance</Button>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trainee Name</TableHead>
              <TableHead>Sessions Used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendances.map((attendance) => {
              const trainee = trainees.find((t) => t.id === attendance.traineeId);
              return (
                <TableRow key={attendance.id}>
                  <TableCell>{trainee?.name || "Unknown"}</TableCell>
                  <TableCell>{attendance.sessionsUsed}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}