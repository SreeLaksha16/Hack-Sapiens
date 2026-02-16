export interface BMIRecord {
  id: string;
  name: string;
  age: number;
  sex: string;
  heightCm: number;
  weightKg: number;
  bmi: number;
  category: string;
  healthGoal: string;
  activityLevel: string;
  date: string;
  exerciseMinutes?: number;
}

const STORAGE_KEY = "upgraded-lifestyle-bmi-records";

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getRecords(): BMIRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveRecord(record: BMIRecord): void {
  const records = getRecords();
  records.push(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function clearRecords(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getDemoData(): BMIRecord[] {
  return [
    { id: "d1", name: "Alice", age: 22, sex: "Female", heightCm: 165, weightKg: 58, bmi: 21.3, category: "Normal", healthGoal: "Maintain", activityLevel: "Moderate", date: "2025-12-01", exerciseMinutes: 45 },
    { id: "d2", name: "Bob", age: 35, sex: "Male", heightCm: 178, weightKg: 92, bmi: 29.0, category: "Overweight", healthGoal: "Lose Weight", activityLevel: "Sedentary", date: "2025-12-05", exerciseMinutes: 10 },
    { id: "d3", name: "Clara", age: 28, sex: "Female", heightCm: 160, weightKg: 50, bmi: 19.5, category: "Normal", healthGoal: "Maintain", activityLevel: "Active", date: "2025-12-10", exerciseMinutes: 60 },
    { id: "d4", name: "Dave", age: 45, sex: "Male", heightCm: 175, weightKg: 105, bmi: 34.3, category: "Obese", healthGoal: "Lose Weight", activityLevel: "Light", date: "2025-12-15", exerciseMinutes: 20 },
    { id: "d5", name: "Eve", age: 19, sex: "Female", heightCm: 170, weightKg: 48, bmi: 16.6, category: "Underweight", healthGoal: "Gain Weight", activityLevel: "Light", date: "2025-12-20", exerciseMinutes: 30 },
    { id: "d6", name: "Frank", age: 52, sex: "Male", heightCm: 180, weightKg: 82, bmi: 25.3, category: "Overweight", healthGoal: "Lose Weight", activityLevel: "Moderate", date: "2026-01-02", exerciseMinutes: 35 },
    { id: "d7", name: "Grace", age: 31, sex: "Female", heightCm: 162, weightKg: 60, bmi: 22.9, category: "Normal", healthGoal: "Maintain", activityLevel: "Active", date: "2026-01-08", exerciseMinutes: 50 },
    { id: "d8", name: "Henry", age: 41, sex: "Male", heightCm: 172, weightKg: 78, bmi: 26.4, category: "Overweight", healthGoal: "Lose Weight", activityLevel: "Moderate", date: "2026-01-15", exerciseMinutes: 40 },
    { id: "d9", name: "Ivy", age: 16, sex: "Female", heightCm: 155, weightKg: 45, bmi: 18.7, category: "Normal", healthGoal: "Maintain", activityLevel: "Active", date: "2026-01-20", exerciseMinutes: 55 },
    { id: "d10", name: "Jack", age: 55, sex: "Male", heightCm: 168, weightKg: 95, bmi: 33.7, category: "Obese", healthGoal: "Lose Weight", activityLevel: "Sedentary", date: "2026-02-01", exerciseMinutes: 5 },
  ];
}

export function getDataForCharts(): BMIRecord[] {
  const records = getRecords();
  return records.length > 0 ? records : getDemoData();
}

export function getDailyCalories(bmi: number, sex: string, activityLevel: string, healthGoal: string): number {
  let base = sex === "Male" ? 2200 : 1800;
  const activityMultiplier: Record<string, number> = { Sedentary: 1.0, Light: 1.15, Moderate: 1.3, Active: 1.5 };
  base *= activityMultiplier[activityLevel] || 1.0;
  if (healthGoal === "Lose Weight") base -= 400;
  if (healthGoal === "Gain Weight") base += 400;
  return Math.round(base);
}

export function getDailyWaterIntake(weightKg: number): number {
  return Math.round((weightKg * 30) / 1000 * 10) / 10;
}
