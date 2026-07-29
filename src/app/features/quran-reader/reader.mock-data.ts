import { SurahReaderData } from './reader.models';

export const READER_MOCK_DATA: SurahReaderData = {
  number: 18,
  name: 'Al-Kahf',
  arabicName: 'الكهف',
  totalAyahs: 110,
  revelationPlace: 'Makkah',
  ayahs: [
    {
      id: 18001,
      number: 1,
      arabic:
        'ٱلْحَمْدُ لِلَّهِ ٱلَّذِىٓ أَنزَلَ عَلَىٰ عَبْدِهِ ٱلْكِتَـٰبَ وَلَمْ يَجْعَل لَّهُۥ عِوَجَا',
      translation:
        'All praise belongs to Allah, who revealed the Book to His servant and placed no crookedness in it.',
    },
    {
      id: 18002,
      number: 2,
      arabic:
        'قَيِّمًۭا لِّيُنذِرَ بَأْسًۭا شَدِيدًۭا مِّن لَّدُنْهُ وَيُبَشِّرَ ٱلْمُؤْمِنِينَ ٱلَّذِينَ يَعْمَلُونَ ٱلصَّـٰلِحَـٰتِ',
      translation:
        'It is perfectly upright, warning of a severe consequence and giving good news to believers who do good.',
    },
    {
      id: 18003,
      number: 3,
      arabic: 'مَّـٰكِثِينَ فِيهِ أَبَدًۭا',
      translation: 'They will remain in that reward forever.',
    },
    {
      id: 18004,
      number: 4,
      arabic: 'وَيُنذِرَ ٱلَّذِينَ قَالُوا۟ ٱتَّخَذَ ٱللَّهُ وَلَدًۭا',
      translation:
        'And it warns those who claim that Allah has taken offspring.',
    },
    {
      id: 18005,
      number: 5,
      arabic:
        'مَّا لَهُم بِهِۦ مِنْ عِلْمٍۢ وَلَا لِـَٔابَآئِهِمْ ۚ كَبُرَتْ كَلِمَةًۭ تَخْرُجُ مِنْ أَفْوَٰهِهِمْ',
      translation:
        'They have no knowledge of this, nor did their forefathers. It is a grave claim that comes from their mouths.',
    },
  ],
};
