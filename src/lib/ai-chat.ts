import { BMIRecord } from "@/lib/bmi-storage";

const greetings = [
  "Hello! 👋 I'm your wellness coach. Ask me anything about health, nutrition, or fitness!",
  "Hi there! 🌿 Ready to help you on your wellness journey. What would you like to know?",
];

const responses: Record<string, string[]> = {
  bmi: [
    "BMI (Body Mass Index) is a measure of body fat based on height and weight. A healthy BMI is between 18.5 and 24.9. It's a useful screening tool but doesn't account for muscle mass or body composition. 📊",
    "Your BMI gives a general idea of whether you're at a healthy weight. Categories: Underweight (<18.5), Normal (18.5–24.9), Overweight (25–29.9), Obese (30+). Remember, it's just one metric! 💪",
  ],
  nutrition: [
    "Great nutrition starts with balance! Aim for: 🥗 Half your plate with vegetables, 🍗 a quarter with lean protein, and 🍚 a quarter with whole grains. Don't forget healthy fats like avocado and nuts!",
    "Try to eat the rainbow! 🌈 Different colored fruits and vegetables provide different nutrients. Also, stay hydrated — aim for 8 glasses of water daily. 💧",
    "Meal prep is a game-changer! 🍱 Cook in batches on weekends. Focus on whole foods: lean meats, fish, legumes, whole grains, and plenty of vegetables.",
  ],
  exercise: [
    "The WHO recommends at least 150 minutes of moderate exercise per week. 🏃‍♂️ This could be brisk walking, cycling, or swimming. Start small and build up gradually!",
    "Mix cardio and strength training for best results! 💪 Try: 3 days cardio (walking, running, cycling) + 2 days strength (bodyweight exercises, weights). Don't forget to stretch!",
    "Even 10-minute walks after meals can significantly improve your health! 🚶‍♀️ Movement throughout the day matters more than one intense session.",
  ],
  weight: [
    "For healthy weight loss, aim for 0.5–1 kg per week. Create a modest calorie deficit of 500 calories/day through diet and exercise combined. Don't starve yourself! 🍎",
    "Weight management is about sustainable habits, not quick fixes. Focus on: eating whole foods, regular exercise, good sleep, and stress management. 🌟",
    "To gain weight healthily, increase calorie intake with nutrient-dense foods: nuts, whole grains, lean proteins, healthy oils. Add strength training to build muscle mass. 💪",
  ],
  sleep: [
    "Quality sleep is crucial for health! 😴 Aim for 7-9 hours per night. Tips: Keep a consistent schedule, avoid screens before bed, keep your room cool and dark.",
    "Poor sleep can affect weight, mood, and immunity. Try a bedtime routine: herbal tea, light reading, no caffeine after 2 PM, and limit blue light exposure. 🌙",
  ],
  water: [
    "Hydration is key! 💧 A good rule: drink half your body weight (in kg) × 30ml of water daily. For a 70kg person, that's about 2.1 liters. More if you exercise!",
    "Signs of dehydration: dark urine, headaches, fatigue, dry skin. Carry a water bottle everywhere! Add lemon or cucumber for flavor if plain water is boring. 🍋",
  ],
  stress: [
    "Chronic stress raises cortisol, which can lead to weight gain, poor sleep, and weakened immunity. Try: deep breathing, meditation, nature walks, or journaling. 🧘‍♀️",
    "Managing stress is as important as diet and exercise! Try the 4-7-8 breathing technique: inhale 4 seconds, hold 7, exhale 8. Practice daily for best results. 🌿",
  ],
  calories: [
    "Your daily calorie needs depend on age, sex, weight, height, and activity level. A rough estimate: BMR × activity multiplier. For most adults, 1800-2500 calories/day. 📊",
    "Not all calories are equal! 500 calories from vegetables, lean protein, and whole grains will fuel you much better than 500 calories from processed food. Choose quality! 🥦",
  ],
  default: [
    "That's a great question! 🤔 For personalized health advice, I'd recommend consulting with a healthcare professional. In general, focus on balanced nutrition, regular exercise, good sleep, and stress management.",
    "I'm here to help with general wellness tips! 🌟 Try asking me about: BMI, nutrition, exercise, weight management, sleep, hydration, stress, or calories.",
    "Health is a journey, not a destination! 🌈 Small consistent changes lead to big results. What specific area would you like to improve?",
  ],
};

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getGreeting(): string {
  return getRandomItem(greetings);
}

export function getAIResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("bmi") || lower.includes("body mass")) {
    return getRandomItem(responses.bmi);
  }
  if (lower.includes("nutrition") || lower.includes("diet") || lower.includes("food") || lower.includes("eat")) {
    return getRandomItem(responses.nutrition);
  }
  if (lower.includes("exercise") || lower.includes("workout") || lower.includes("fitness") || lower.includes("gym") || lower.includes("training")) {
    return getRandomItem(responses.exercise);
  }
  if (lower.includes("weight") || lower.includes("lose") || lower.includes("gain") || lower.includes("fat")) {
    return getRandomItem(responses.weight);
  }
  if (lower.includes("sleep") || lower.includes("rest") || lower.includes("insomnia")) {
    return getRandomItem(responses.sleep);
  }
  if (lower.includes("water") || lower.includes("hydrat") || lower.includes("drink")) {
    return getRandomItem(responses.water);
  }
  if (lower.includes("stress") || lower.includes("anxiety") || lower.includes("relax") || lower.includes("meditat")) {
    return getRandomItem(responses.stress);
  }
  if (lower.includes("calorie") || lower.includes("kcal") || lower.includes("energy")) {
    return getRandomItem(responses.calories);
  }

  return getRandomItem(responses.default);
}

export function getBMIAdvice(record: BMIRecord): string {
  const { bmi, category, activityLevel, healthGoal } = record;
  let advice = `Based on your BMI of ${bmi.toFixed(1)} (${category}):\n\n`;

  if (category === "Underweight") {
    advice += "• Increase calorie intake with nutrient-dense foods\n• Add strength training to build muscle\n• Eat more frequently — 5-6 small meals/day\n• Include healthy fats: nuts, avocados, olive oil\n";
  } else if (category === "Normal") {
    advice += "• Great job maintaining a healthy weight! 🎉\n• Continue balanced eating habits\n• Stay active with regular exercise\n• Focus on strength and flexibility\n";
  } else if (category === "Overweight") {
    advice += "• Create a modest calorie deficit (300-500 cal/day)\n• Increase vegetable and protein intake\n• Add 30 min of cardio most days\n• Reduce processed foods and sugary drinks\n";
  } else {
    advice += "• Consult a healthcare professional for personalized guidance\n• Start with gentle exercise like walking\n• Focus on whole, unprocessed foods\n• Consider working with a registered dietitian\n";
  }

  if (healthGoal === "Lose Weight") {
    advice += "\n💡 Weight Loss Tip: Aim for 0.5-1 kg/week loss. Don't skip meals — eat balanced portions.";
  } else if (healthGoal === "Gain Weight") {
    advice += "\n💡 Weight Gain Tip: Focus on calorie-dense healthy foods and progressive strength training.";
  } else {
    advice += "\n💡 Maintenance Tip: Keep tracking your habits and stay consistent with exercise.";
  }

  if (activityLevel === "Sedentary") {
    advice += "\n🏃 Activity: Start with 15-min daily walks and gradually increase.";
  } else if (activityLevel === "Light") {
    advice += "\n🏃 Activity: Try adding 2-3 structured workout sessions per week.";
  }

  return advice;
}
