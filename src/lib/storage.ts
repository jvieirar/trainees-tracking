const TRAINEES_KEY = 'trainees';
const ATTENDANCES_KEY = 'attendances';

export type Trainee = {
  id: string;
  name: string;
  packagesRemaining: number;
  sessionsRemaining: number;
};

export type Attendance = {
  id: string;
  traineeId: string;
  date: string;
  sessionsUsed: number;
};

export function getTrainees(): Trainee[] {
  if (typeof window === 'undefined') return [];
  const storedTrainees = localStorage.getItem(TRAINEES_KEY);
  return storedTrainees ? JSON.parse(storedTrainees) : [];
}

export function saveTrainees(trainees: Trainee[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TRAINEES_KEY, JSON.stringify(trainees));
}

export function getAttendances(): Attendance[] {
  if (typeof window === 'undefined') return [];
  const storedAttendances = localStorage.getItem(ATTENDANCES_KEY);
  return storedAttendances ? JSON.parse(storedAttendances) : [];
}

export function saveAttendances(attendances: Attendance[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ATTENDANCES_KEY, JSON.stringify(attendances));
}