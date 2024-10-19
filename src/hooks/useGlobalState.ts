import { useState, useEffect } from 'react';
import { getTrainees, saveTrainees, getAttendances, saveAttendances, Trainee, Attendance } from '@/lib/storage';

export function useGlobalState() {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);

  useEffect(() => {
    setTrainees(getTrainees());
    setAttendances(getAttendances());
  }, []);

  const updateTrainees = (newTrainees: Trainee[]) => {
    setTrainees(newTrainees);
    saveTrainees(newTrainees);
  };

  const updateAttendances = (newAttendances: Attendance[]) => {
    setAttendances(newAttendances);
    saveAttendances(newAttendances);
  };

  return {
    trainees,
    attendances,
    updateTrainees,
    updateAttendances,
  };
}