import { ScrollView } from 'react-native';

import { FirstSection } from '@/components/home-sections/first-section';
import { FooterSection } from '@/components/home-sections/footer-section';
import { HeroSection } from '@/components/home-sections/hero-section';
import { JoinSection } from '@/components/home-sections/join-section';
import { DailyWellnessSection } from '@/components/home-sections/daily-wellness-section';

export default function HomeScreen() {
  return (
    <ScrollView>
      <HeroSection />
      <FirstSection />
      <DailyWellnessSection />
      <JoinSection />
      <FooterSection />
    </ScrollView>
  );
}
