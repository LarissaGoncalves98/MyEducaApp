import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { loadScores } from '../utils/storage';

type HistoryEntry = {
  game: string;
  score: number;
  date: string;
};

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    loadScores().then(setHistory);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Histórico de Pontuações</Text>
      {history.length === 0 && <Text>Nenhum jogo salvo ainda.</Text>}
      {history.map((item, index) => (
        <Text key={`${item.game}-${item.date}`} style={styles.item}>
          🕹 {item.game} - 🧮 {item.score} pontos - 📅 {item.date}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'left',
  },
});
