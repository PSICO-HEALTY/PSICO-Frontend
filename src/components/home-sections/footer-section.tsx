import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Breakpoints, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const FOOTER_LINKS = [
  ['Servicios', 'Profesionales', 'Preguntas frecuentes'],
  ['Sobre nosotros', 'Recursos', 'Contáctanos'],
];

export function FooterSection() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const isNarrow = width < Breakpoints.tablet;

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.backgroundElement }]}>
      <View style={[styles.content, isNarrow && styles.contentNarrow]}>
        <View style={styles.brand}>
          <View style={styles.brandNameRow}>
            <Image
              source={require('@/assets/images/tabIcons/logo_navbar.png')}
              style={styles.logo}
              resizeMode="contain"
              accessible={false}
            />
            <ThemedText type="smallBold" style={styles.brandName}>
              Psico Health
            </ThemedText>
          </View>
          <ThemedText style={[styles.copyright, { color: theme.textSecondary }]}>
            RESERVADO PARA PSICO
          </ThemedText>
        </View>

        <View style={[styles.links, isNarrow && styles.linksNarrow]}>
          {FOOTER_LINKS.map((column, index) => (
            <View key={index} style={styles.linkColumn}>
              {column.map((label) => (
                <ThemedText key={label} themeColor="textSecondary" style={styles.link}>
                  {label}
                </ThemedText>
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
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.four,
  },
  contentNarrow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  brand: {
    gap: Spacing.two,
  },
  brandNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  logo: {
    width: 28,
    height: 28,
  },
  brandName: {
    fontSize: 14,
    lineHeight: 20,
  },
  copyright: {
    fontSize: 11,
    letterSpacing: 1,
  },
  links: {
    flexDirection: 'row',
    gap: Spacing.five,
  },
  linksNarrow: {
    width: '100%',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  linkColumn: {
    gap: Spacing.one,
  },
  link: {
    fontSize: 12,
    lineHeight: 18,
  },
});
