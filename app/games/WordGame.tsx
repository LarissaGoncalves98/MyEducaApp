import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { wordList } from '@/constants/word';

const WordGame = () => {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [showHint, setShowHint] = useState(false);

  const current = wordList[index];

  const checkWord = () => {
    if (input.trim().toUpperCase() === current.word.toUpperCase()) {
      setMessage('✅ Você acertou!');
      setTimeout(() => {
        const nextIndex = (index + 1) % wordList.length;
        setIndex(nextIndex);
        setInput('');
        setMessage('');
        setShowHint(false);
      }, 1500);
    } else {
      setMessage('❌ Tente novamente!');
    }
    setInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔤 Palavra Secreta</Text>
      <Text style={styles.category}>Tema: {current.category}</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a palavra"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Verificar" onPress={checkWord} />
      <Button title="Mostrar Dica" onPress={() => setShowHint(true)} />
      {showHint && <Text style={styles.hint}>Dica: {current.hint}</Text>}
      {message !== '' && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

export default WordGame;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 10, textAlign: 'center' },
  category: { fontSize: 18, textAlign: 'center', marginBottom: 10 },
  input: {
    borderColor: '#AAA',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  hint: { fontSize: 16, marginTop: 10, textAlign: 'center', fontStyle: 'italic' },
  message: { fontSize: 18, marginTop: 15, textAlign: 'center' },
});
