import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { quizQuestions } from '@/constants/questions';
import { saveScore } from '../../utils/storage';

const QuizGame = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleAnswer = async (answer: string) => {
    const isCorrect = answer === quizQuestions[current].answer;
    setFeedback(isCorrect ? '✅ Correto!' : '❌ Errado!');
    if (isCorrect) setScore(score + 1);

    setTimeout(async () => {
      setFeedback('');
      const next = current + 1;
      if (next < quizQuestions.length) {
        setCurrent(next);
      } else {
        setShowResult(true);
        await saveScore('Quiz', score + (isCorrect ? 1 : 0));
      }
    }, 1000);
  };

  if (showResult) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Finalizado!</Text>
        <Text style={styles.score}>Pontuação: {score}/{quizQuestions.length}</Text>
      </View>
    );
  }

  const question = quizQuestions[current];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.question}</Text>
      {question.options.map((option) => (
        <TouchableOpacity key={option} style={styles.button} onPress={() => handleAnswer(option)}>
          <Text style={styles.buttonText}>{option}</Text>
        </TouchableOpacity>
      ))}
      {feedback !== '' && <Text style={styles.feedback}>{feedback}</Text>}
    </View>
  );
};

export default QuizGame;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 20 },
  score: { fontSize: 20, marginTop: 10, color: 'green', textAlign: 'center' },
  button: {
    backgroundColor: '#CCC',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonText: { fontSize: 18 },
  feedback: { fontSize: 18, textAlign: 'center', marginTop: 10 },
});
