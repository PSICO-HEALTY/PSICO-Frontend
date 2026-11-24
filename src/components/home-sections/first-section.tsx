import { Link, type Href } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View, type PressableStateCallbackType } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ROUTES } from '@/constants/routes';
import { Breakpoints, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

// `hovered` solo existe en web, por eso se agrega al tipo de estado de Pressable
type PressState = PressableStateCallbackType & { hovered?: boolean };

// Datos de cada tarjeta de la sección
type QuickAccessItem = {
  id: string;
  title: string;
  description: string;
  // Texto del link al pie de la tarjeta
  cta: string;
  href: Href;
  // Ícono por plataforma (SF Symbols en iOS, Material en Android y web)
  icon: ComponentProps<typeof SymbolView>['name'];
  // Muestra el badge "Más buscado" y el borde de color
  featured?: boolean;
};

// Tarjetas de la sección "¿Qué necesitas hoy?"
const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  {
    id: 'profesionales',
    title: 'Profesionales',
    description: 'Conoce a nuestro equipo de expertos listos para acompañarte.',
    cta: 'Ver equipo',
    href: ROUTES.professionals,
    icon: { ios: 'person.2.fill', android: 'group', web: 'group' },
    featured: true,
  },
  {
    id: 'servicios',
    title: 'Servicios',
    description: 'Explora especialidades médicas y terapias de bienestar.',
    cta: 'Ver servicios',
    href: ROUTES.services,
    icon: { ios: 'stethoscope', android: 'stethoscope', web: 'stethoscope' },
  },
  {
    id: 'recursos',
    title: 'Recursos',
    description: 'Artículos, guías y consejos para tu cuidado diario.',
    cta: 'Ver recursos',
    href: ROUTES.resources,
    icon: { ios: 'book.fill', android: 'menu_book', web: 'menu_book' },
  },
  {
    id: 'faqs',
    title: 'Preguntas frecuentes',
    description: 'Encuentra respuestas rápidas a tus consultas habituales.',
    cta: 'Ver respuestas',
    href: ROUTES.faqs,
    icon: { ios: 'questionmark.circle.fill', android: 'help', web: 'help' },
  },
];

// Divide la lista en filas de `size` elementos para armar la cuadrícula
function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

// Tarjeta clickeable: ícono, título, descripción y link al pie
function QuickAccessCard({ item }: { item: QuickAccessItem }) {
  const theme = useTheme();

  return (
    <Link href={item.href} asChild>
      <Pressable accessibilityRole="link" style={styles.cardSlot}>
        {({ hovered, pressed }: PressState) => (
          <View
            style={[
              styles.card,
              { backgroundColor: theme.surface, borderColor: theme.border },
              // La tarjeta destacada siempre lleva borde de color; las demás lo toman al hover
              (item.featured || hovered) && { borderColor: theme.accent },
              pressed && styles.cardPressed,
            ]}>
            {/* Badge flotante sobre el borde superior */}
            {item.featured && (
              <View style={[styles.featuredBadge, { backgroundColor: theme.accent }]}>
                <ThemedText type="small" style={styles.featuredText}>
                  Más buscado
                </ThemedText>
              </View>
            )}

            {/* Cuadro con el ícono de la tarjeta */}
            <View style={[styles.iconBox, { backgroundColor: theme.accentSoft }]}>
              <SymbolView name={item.icon} tintColor={theme.accentSoftText} size={28} />
            </View>

            <ThemedText type="smallBold" style={styles.cardTitle}>
              {item.title}
            </ThemedText>
            {/* La descripción ocupa el espacio libre para alinear los links al fondo */}
            <ThemedText themeColor="textSecondary" style={styles.cardDescription}>
              {item.description}
            </ThemedText>

            {/* Link al pie: texto + flecha */}
            <View style={styles.cta}>
              <ThemedText style={{ color: theme.accentSoftText }}>{item.cta}</ThemedText>
              <SymbolView
                name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
                tintColor={theme.accentSoftText}
                size={16}
              />
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  );
}

// Sección "¿Qué necesitas hoy?": accesos rápidos a las áreas principales del sitio
export function FirstSection() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  // 4 columnas en escritorio, 2 en tablet y 1 en celular
  const columns = width >= Breakpoints.desktop ? 4 : width >= Breakpoints.tablet ? 2 : 1;

  return (
    <View style={styles.wrapper}>
      {/* Recuadro con borde que agrupa el encabezado y la cuadrícula */}
      <View style={[styles.panel, { borderColor: theme.border }]}>
        {/* Encabezado de la sección */}
        <View style={styles.header}>
          <ThemedText type="subtitle" style={styles.heading}>
            ¿Qué necesitas hoy?
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.centered}>
            Elige por dónde quieres empezar
          </ThemedText>
        </View>

        {/* Filas de tarjetas: cada fila trae `columns` tarjetas */}
        <View style={styles.grid}>
          {chunk(QUICK_ACCESS_ITEMS, columns).map((row, index) => (
            <View key={index} style={styles.row}>
              {row.map((item) => (
                <QuickAccessCard key={item.id} item={item} />
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedor centrado con ancho máximo, igual que el hero, para alinear ambas secciones
  wrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
    paddingBottom: Spacing.six,
  },
  // Recuadro grande que agrupa el título y las tarjetas
  panel: {
    gap: Spacing.four,
  },
  // Título y subtítulo centrados
  header: {
    gap: Spacing.one,
    alignItems: 'center',
  },
  centered: {
    textAlign: 'center',
  },
  heading: {
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
  },
  // Espacio vertical entre filas de tarjetas
  grid: {
    gap: Spacing.four,
  },
  // Una fila de tarjetas con espacio horizontal entre ellas
  row: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  // Cada tarjeta reparte el ancho de la fila en partes iguales
  cardSlot: {
    flex: 1,
  },
  // Caja visible de la tarjeta: borde redondeado y espacio interno
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    padding: Spacing.three,
    gap: Spacing.two,
    minHeight: 210,
  },
  // Efecto al presionar la tarjeta (táctil)
  cardPressed: {
    opacity: 0.85,
  },
  // Badge "Más buscado" colocado encima del borde superior de la tarjeta
  featuredBadge: {
    position: 'absolute',
    top: -12,
    left: Spacing.four,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
  },
  // Texto del badge: siempre blanco sobre el azul de marca
  featuredText: {
    color: '#ffffff',
  },
  // Cuadro redondeado que contiene el ícono
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.one,
  },
  cardTitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  // flex: 1 ocupa el espacio libre y empuja el link al fondo de la tarjeta
  cardDescription: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: Spacing.two,
  },
  // Link "Ver …" con su flecha en una sola línea
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
});
