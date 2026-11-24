import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function JoinSection() {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <ThemedText type="title" style={styles.heading}>
        Empieza a cuidar de ti.
      </ThemedText>
      <View style={styles.button}>
        <Button label="Únete a PSICO" />
      </View>
      <View style={[styles.divider, { backgroundColor: theme.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.six,
    paddingBottom: Spacing.six,
    gap: Spacing.five,
  },
  heading: {
    fontSize: 30,
    lineHeight: 38,
    textAlign: 'center',
  },
  button: {
    minWidth: 160,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});
