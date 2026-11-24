import { DarkTheme, DefaultTheme, Slot, ThemeProvider } from 'expo-router';
import { useColorScheme, View } from 'react-native';

import { Navbar } from '@/components/navbar';
import { Colors } from '@/constants/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1, backgroundColor: Colors[isDark ? 'dark' : 'light'].background }}>
        <Navbar />
        <Slot />
      </View>
    </ThemeProvider>
  );
}
