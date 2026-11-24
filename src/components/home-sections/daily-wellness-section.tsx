import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Breakpoints, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const ARTICLES = [
  {
    category: 'Nutrición',
    title: 'Empezar el día con energía',
    description:
      'Descubre opciones de desayunos nutritivos que te aportarán vitalidad para toda la jornada.',
    image: require('../../assets/nutricion.png'),
  },
  {
    category: 'Bienestar',
    title: 'Hábitos de lectura consciente',
    description:
      'Cómo incorporar la lectura en tu rutina como herramienta para la relajación mental.',
    image: require('../../assets/bienestar.png'),
  },
  {
    category: 'Movimiento',
    title: 'Yoga matutino para principiantes',
    description:
      'Una secuencia suave de 15 minutos para despertar tu cuerpo y enfocar tu mente.',
    image: require('../../assets/movimiento.png'),
  },
];

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }
  return rows;
}

export function DailyWellnessSection() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const columns = width >= Breakpoints.desktop ? 3 : width >= Breakpoints.tablet ? 2 : 1;

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.backgroundElement }]}>
      <View style={styles.content}>
        <ThemedText type="subtitle" style={styles.heading}>
          Cuida tu bienestar todos los días.
        </ThemedText>

        <View style={styles.grid}>
          {chunk(ARTICLES, columns).map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((article) => (
                <View
                  key={article.title}
                  style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                  <Image
                    source={article.image}
                    style={styles.image}
                    resizeMode="cover"
                    accessibilityLabel={article.title}
                  />
                  <View style={styles.cardContent}>
                    <ThemedText
                      style={[
                        styles.category,
                        { color: theme.accentSoftText, backgroundColor: theme.accentSoft },
                      ]}>
                      {article.category}
                    </ThemedText>
                    <ThemedText type="smallBold" style={styles.title}>
                      {article.title}
                    </ThemedText>
                    <ThemedText themeColor="textSecondary" style={styles.description}>
                      {article.description}
                    </ThemedText>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingVertical: Spacing.six,
    paddingHorizontal: Spacing.four,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.four,
  },
  heading: {
    fontSize: 24,
    lineHeight: 32,
  },
  grid: {
    gap: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  card: {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#18243b',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 190,
  },
  cardContent: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  category: {
    alignSelf: 'flex-start',
    fontSize: 11,
    lineHeight: 16,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: 6,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
  },
});
