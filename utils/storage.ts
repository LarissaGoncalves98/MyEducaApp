import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveScore(game: string, score: number) {
  const date = new Date().toLocaleString();
  const newEntry = { game, score, date };
  const existing = await AsyncStorage.getItem('history');
  const history = existing ? JSON.parse(existing) : [];
  history.push(newEntry);
  await AsyncStorage.setItem('history', JSON.stringify(history));
}

export async function loadScores() {
  const data = await AsyncStorage.getItem('history');
  return data ? JSON.parse(data) : [];
}
