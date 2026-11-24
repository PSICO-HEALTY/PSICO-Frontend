import { SymbolView } from 'expo-symbols';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ROUTES } from '@/constants/routes';
import { Breakpoints, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

// Textos de confianza con check debajo de los botones
const TRUST_ITEMS = ['Profesionales verificados', 'Atención confidencial'];

// Sección principal: texto y botones a la izquierda, imagen y tarjeta a la derecha
export function HeroSection() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  // En pantallas angostas las dos columnas se apilan
  const isWide = width >= Breakpoints.tablet;

  return (
    <View style={[styles.container, isWide && styles.containerWide]}>
      <View style={styles.column}>
        {/* Badge de marca */}
        <View style={[styles.badge, { backgroundColor: theme.accentSoft }]}>
          <SymbolView
            name={{ ios: 'heart.fill', android: 'favorite', web: 'favorite' }}
            tintColor={theme.accentSoftText}
            size={14}
          />
          <ThemedText type="small" style={[styles.badgeText, { color: theme.accentSoftText }]}>
            Psico Health · Cultiva tu bienestar
          </ThemedText>
        </View>

        <ThemedText type="title" style={isWide ? styles.titleWide : styles.title}>
          Ayuda a tu{'\n'}salud mental
        </ThemedText>

        <ThemedText themeColor="textSecondary" style={styles.description}>
          En Psico Health encontrarás un espacio pensado para tu bienestar integral. Conecta con
          profesionales en un entorno cálido y humano.
        </ThemedText>

        <View style={styles.actions}>
          <Button label="Afiliarse" href={ROUTES.affiliate} />
          <Button label="Encontrar un profesional" href={ROUTES.professionals} variant="outline" />
        </View>

        {/* Checks de confianza */}
        <View style={styles.trust}>
          {TRUST_ITEMS.map((item) => (
            <View key={item} style={styles.trustItem}>
              <SymbolView
                name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                tintColor={theme.accent}
                size={16}
              />
              <ThemedText type="small" themeColor="textSecondary">
                {item}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.column}>
        {/* Imagen principal del hero sobre un fondo tintado */}
        <View
          style={[styles.imageFrame, { backgroundColor: theme.heroImage }]}>
          <Image
            source={require('../../assets/hero-section.png')}
            style={styles.heroImage}
            resizeMode="contain"
            accessibilityLabel="Conversación de apoyo en un espacio profesional"
          />
        </View>

        {/* Tarjeta flotante sobre la esquina de la imagen */}
        <View
          style={[
            styles.statCard,
            isWide ? styles.statCardWide : styles.statCardNarrow,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}>
          <SymbolView
            name={{ ios: 'person.2.fill', android: 'group', web: 'group' }}
            tintColor="#E57373"
            size={24}
          />
          <View>
            <ThemedText type="smallBold">+500 pacientes</ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.statCaption}>
              fueron atendidos
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.five,
  },
  containerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    gap: Spacing.three,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.one + Spacing.half,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 36,
    lineHeight: 40,
  },
  titleWide: {
    fontSize: 42,
    lineHeight: 46,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 520,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  trust: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: Spacing.four,
    rowGap: Spacing.two,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  imageFrame: {
    width: '100%',
    aspectRatio: 516 / 418,
    borderRadius: 28,
    padding: Spacing.two,
    overflow: 'hidden',
    shadowColor: '#18243b',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  statCard: {
    position: 'absolute',
    bottom: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 14,
    borderWidth: 1,
  },
  statCardWide: {
    left: Spacing.four,
  },
  statCardNarrow: {
    left: Spacing.three,
  },
  statCaption: {
    fontSize: 12,
    lineHeight: 16,
  },
});
