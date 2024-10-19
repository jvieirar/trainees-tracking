"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useGlobalState } from "@/hooks/useGlobalState";

export default function TraineeList() {
  const { trainees, updateTrainees } = useGlobalState();
  const [filter, setFilter] = useState("");
  const [newTrainee, setNewTrainee] = useState({ name: "", packagesRemaining: 0 });

  const filteredTrainees = trainees.filter(
    (trainee) =>
      trainee.name.toLowerCase().includes(filter.toLowerCase()) &&
      (trainee.packagesRemaining > 0 || trainee.sessionsRemaining > 0)
  );

  const handleAddTrainee = () => {
    const updatedTrainees = [
      ...trainees,
      {
        id: Date.now().toString(),
        name: newTrainee.name,
        packagesRemaining: newTrainee.packagesRemaining,
        sessionsRemaining: newTrainee.packagesRemaining * 5,
      },
    ];
    updateTrainees(updatedTrainees);
    setNewTrainee({ name: "", packagesRemaining: 0 });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trainees</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Filter trainees..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Trainee</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Trainee</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newTrainee.name}
                    onChange={(e) => setNewTrainee({ ...newTrainee, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="packages" className="text-right">
                    Packages
                  </Label>
                  <Input
                    id="packages"
                    type="number"
                    value={newTrainee.packagesRemaining}
                    onChange={(e) => setNewTrainee({ ...newTrainee, packagesRemaining: parseInt(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={handleAddTrainee}>Add Trainee</Button>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Packages Remaining</TableHead>
              <TableHead>Sessions Remaining</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrainees.map((trainee) => (
              <TableRow key={trainee.id}>
                <TableCell>{trainee.name}</TableCell>
                <TableCell>{trainee.packagesRemaining}</TableCell>
                <TableCell>{trainee.sessionsRemaining}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}