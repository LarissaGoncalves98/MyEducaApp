import { Text, StyleSheet, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import CustomButton from '../components/CustomButton';
import { colors } from '../constants/Colors';

export default function Home() {
  return (
    <ImageBackground
     // source={require('../assets/images/bg.png')}
      resizeMode="cover"
      style={styles.container}
    >
      <Text style={styles.title}>MyEducaApp</Text>

      <Link href="/games/WordGame" asChild>
        <CustomButton title="Formar Palavras" />
      </Link>

      <Link href="/games/QuizGame" asChild>
        <CustomButton title="Quiz de Perguntas" />
      </Link>

      <Link href="/games/MemoryGame" asChild>
        <CustomButton title="Jogo da Memória" />
      </Link>

      <Link href="/history" asChild>
        <CustomButton title="Ver Histórico" />
      </Link>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 40,
  },
});
