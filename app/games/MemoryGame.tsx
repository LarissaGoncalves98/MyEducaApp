import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { memorySymbols } from '@/constants/memoryData';
import { shuffleArray } from '@/constants/utils';
import { saveScore } from '../../utils/storage';

const MemoryGame = () => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  const shuffledSymbols = shuffleArray([...memorySymbols, ...memorySymbols]);

  const handleCardPress = (symbol: string) => {
    if (selectedCards.length === 2 || selectedCards.includes(symbol)) return;

    const newSelected = [...selectedCards, symbol];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (first === second) {
        setMatchedCards([...matchedCards, first]);
        setFeedback('✅ Parabéns! Você acertou um par!');
      } else {
        setFeedback('❌ Tente novamente');
      }

      setTimeout(() => {
        setSelectedCards([]);
        setFeedback('');

        if (matchedCards.length + 1 === memorySymbols.length) {
          saveScore('Memória', matchedCards.length + 1);
        }
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Memória</Text>
      <View style={styles.grid}>
        {shuffledSymbols.map((symbol, idx) => (
          <TouchableOpacity
            key={`${symbol}-${idx}`}
            style={styles.card}
            onPress={() => handleCardPress(symbol)}
          >
            <Text style={styles.cardText}>
              {selectedCards.includes(symbol) || matchedCards.includes(symbol)
                ? symbol
                : '?'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.feedback}>{feedback}</Text>
    </View>
  );
};

export default MemoryGame;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  card: {
    width: 60,
    height: 60,
    backgroundColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 8,
  },
  cardText: { fontSize: 24 },
  feedback: { fontSize: 18, marginTop: 20 },
});
