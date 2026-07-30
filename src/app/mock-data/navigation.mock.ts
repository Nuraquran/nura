import { NavigationItem } from '../layout/navigation/navigation.model';

export const PRIMARY_NAVIGATION: readonly NavigationItem[] = [
  { label: 'Home', icon: 'home-outline', route: '/home' },
  { label: 'Quran', icon: 'book-outline', route: '/quran' },
  { label: 'Listen', icon: 'headset-outline', route: '/listen' },
  { label: 'Saved', icon: 'bookmark-outline', route: '/bookmarks' },
  { label: 'More', icon: 'ellipsis-horizontal-outline', route: '/more' },
];
