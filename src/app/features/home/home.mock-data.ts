import { HomeViewModel } from './home.models';

export const HOME_MOCK_DATA: HomeViewModel = {
  user: {
    name: 'Amina',
    initials: 'AM',
  },
  prayer: {
    name: 'Asr',
    time: '4:32 PM',
    countdown: 'in 1 hr 18 min',
    location: 'Kuala Lumpur, Malaysia',
    hijriDate: '14 Muharram 1448 AH',
  },
  reading: {
    surahNumber: 18,
    surahName: 'Al-Kahf',
    lastAyah: 46,
    totalAyahs: 110,
    juz: 15,
    progress: 42,
  },
  quickActions: [
    { label: 'Read', icon: 'book-outline', route: '/quran' },
    { label: 'Audio', icon: 'headset-outline', route: '/listen' },
    { label: 'Dua', icon: 'heart-outline', route: '/more' },
    { label: 'Bookmarks', icon: 'bookmark-outline', route: '/saved' },
  ],
  dailyVerse: {
    arabic: 'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ',
    translation: 'And He is with you wherever you are.',
    surahName: 'Al-Hadid',
    ayahNumber: 4,
  },
  khatam: {
    percentage: 28,
    completedPages: 168,
    totalPages: 604,
    target: 'Complete in 90 days',
  },
  recentSurahs: [
    {
      number: 36,
      name: 'Ya-Sin',
      arabicName: 'يس',
      totalAyahs: 83,
      lastAyah: 32,
      progress: 39,
    },
    {
      number: 67,
      name: 'Al-Mulk',
      arabicName: 'الملك',
      totalAyahs: 30,
      lastAyah: 18,
      progress: 60,
    },
    {
      number: 55,
      name: 'Ar-Rahman',
      arabicName: 'الرحمن',
      totalAyahs: 78,
      lastAyah: 24,
      progress: 31,
    },
  ],
};
