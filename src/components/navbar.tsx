import { Link } from 'expo-router';
import {
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  type PressableStateCallbackType,
} from 'react-native';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ROUTES } from '@/constants/routes';
import { Breakpoints, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

// Tipo de estado de Pressable con `hovered` (solo web)
type PressState = PressableStateCallbackType & { hovered?: boolean };

// Tabs del navbar (sin radio, solo se iluminan en hover)
const NAV_LINKS = [
  { label: 'Profesionales', href: ROUTES.professionals },
  { label: 'Planes', href: ROUTES.plans },
  { label: 'Contáctanos', href: ROUTES.contact },
];

// Barra superior: logo a la izquierda; links + "Ingresar" a la derecha
export function Navbar() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  // En pantallas angostas se ocultan los links y quedan solo el logo y "Ingresar"
  const showLinks = width >= Breakpoints.tablet;

  return (
    <View
      style={[styles.bar, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
      <View style={styles.inner}>
        <Link href={ROUTES.home} asChild>
          <Pressable accessibilityRole="link" accessibilityLabel="Psico Health, inicio">
            <View style={styles.brand}>
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
          </Pressable>
        </Link>

        <View style={styles.links}>
          {showLinks &&
            NAV_LINKS.map((item) => <NavLink key={item.label} label={item.label} href={item.href} />)}
          {/* "Ingresar": el único botón del navbar con forma de píldora */}
          <Button label="Ingresar" href={ROUTES.login} />
        </View>
      </View>
    </View>
  );
}

// Link de texto sin fondo ni radio: al pasar el mouse el texto se ilumina
function NavLink({ label, href }: (typeof NAV_LINKS)[number]) {
  const theme = useTheme();

  return (
    <Link href={href} asChild>
      <Pressable accessibilityRole="link">
        {({ hovered }: PressState) => (
          <ThemedText
            type="small"
            themeColor={hovered ? 'text' : 'textSecondary'}
            // textShadow es solo web (los estilos nativos no lo aceptan como string), por eso el cast
            style={hovered && ({ textShadow: `0 0 8px ${theme.linkGlow}` } as object)}>
            {label}
          </ThemedText>
        )}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  // Barra de ancho completo con línea inferior
  bar: {
    width: '100%',
    borderBottomWidth: 1,
  },
  // Contenido centrado con ancho máximo: logo a la izquierda, links a la derecha
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingVertical: Spacing.one + Spacing.half,
    paddingHorizontal: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Tamaño del logo (cambiar width/height para agrandarlo o reducirlo)
  logo: {
    width: 28,
    height: 28,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  brandName: {
    fontSize: 14,
    lineHeight: 20,
  },
  // Grupo de links + botón "Ingresar"
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
  },
});
