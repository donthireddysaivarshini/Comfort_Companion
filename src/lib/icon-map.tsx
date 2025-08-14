import { Wind, Waves, Leaf, Music, Coffee, PersonStanding, BookOpen, Pen, Users, Milestone, MessageSquare, Hand, Sun, Heart, Eye, Smile } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type React from 'react';

export const getSuggestionIcon = (suggestion: string): React.ComponentType<LucideProps> | null => {
  const s = suggestion.toLowerCase();
  if (s.includes('breath')) return Wind;
  if (s.includes('water')) return Waves;
  if (s.includes('fresh air') || s.includes('outside')) return Leaf;
  if (s.includes('song') || s.includes('music')) return Music;
  if (s.includes('drink') || s.includes('tea')) return Coffee;
  if (s.includes('stretch')) return PersonStanding;
  if (s.includes('accomplished') || s.includes('grateful')) return BookOpen;
  if (s.includes('priority') || s.includes('task')) return Milestone;
  if (s.includes('break')) return Sun;
  if (s.includes('friend')) return Users;
  if (s.includes('progress') || s.includes('perfection')) return Milestone;
  if (s.includes('cry')) return Waves;
  if (s.includes('blanket')) return Heart;
  if (s.includes('smile')) return Smile;
  if (s.includes('call someone')) return MessageSquare;
  if (s.includes('patient')) return Heart;
  if (s.includes('ground yourself') || s.includes('see')) return Eye;
  if (s.includes('feeling will pass')) return Sun;
  if (s.includes('control')) return Hand;
  if (s.includes('4-7-8')) return Wind;
  if (s.includes('move your body')) return PersonStanding;
  if (s.includes('safe')) return Heart;
  if (s.includes('people-watch')) return Users;
  if (s.includes('send a kind message')) return MessageSquare;
  if (s.includes('creative')) return Pen;
  if (s.includes('visit a place')) return Users;
  if (s.includes('you matter')) return Heart;
  return null;
}
