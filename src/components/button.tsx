import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, type PressableStateCallbackType } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ButtonProps = {
  label: string;
  // Si se pasa, el botón navega a esa ruta; si no, usa onPress
  href?: Href;
  onPress?: () => void;
  // primary: relleno azul con texto blanco | outline: solo borde
  variant?: 'primary' | 'outline';
};

// `hovered` solo existe en web, por eso se agrega al tipo de estado de Pressable
type PressState = PressableStateCallbackType & { hovered?: boolean };

// Botón reutilizable con forma de píldora (navbar, hero, futuras pantallas)
export function Button({ label, href, onPress, variant = 'primary' }: ButtonProps) {
  const theme = useTheme();
  const isPrimary = variant === 'primary';

  const button = (
    <Pressable accessibilityRole="button" onPress={onPress}>
      {({ hovered, pressed }: PressState) => (
        <ThemedText
          type="small"
          style={[
            styles.base,
            isPrimary
              ? { backgroundColor: theme.accent, color: '#ffffff' }
              : { borderColor: theme.borderStrong, color: theme.text },
            hovered && !isPrimary && { borderColor: theme.text },
            (hovered || pressed) && isPrimary && styles.primaryActive,
          ]}>
          {label}
        </ThemedText>
      )}
    </Pressable>
  );

  if (!href) return button;

  // asChild hace que el Pressable sea el link, sin envolverlo en otro elemento
  return (
    <Link href={href} asChild>
      {button}
    </Link>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: Spacing.two + Spacing.half,
    paddingHorizontal: Spacing.four,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'transparent',
    overflow: 'hidden',
    textAlign: 'center',
  },
  primaryActive: {
    opacity: 0.85,
  },
});
