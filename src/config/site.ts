// Основные настройки сайта. Меняйте здесь — изменится на всех страницах.
export const SITE = {
  name: 'Unmuzaj',
  nameAr: 'الأُنْمُوذَجُ',
  motto: 'Barcha arab tili ixlosmandlari uchun', // девиз всегда по-узбекски; перевод — t.meta.mottoTr
  // имя автора на каждом языке интерфейса (должность — t.footer.authorRole)
  author: { ru: 'Отабек Икромбеков', uz: 'Otabek Ikrombekov', en: 'Otabek Ikrombekov' } as Record<'ru' | 'uz' | 'en', string>,
  contacts: {
    email: 'otabek.ikrombek@gmail.com',
    phone: '+998 90 067 31 07',
    phoneHref: 'tel:+998900673107',
    telegram: '@otabek_ikrombek',
    telegramHref: 'https://t.me/otabek_ikrombek',
  },
};

// Публичные данные Supabase (это не секрет: доступ ограничен правилами в базе).
export const SUPABASE_URL: string = import.meta.env.PUBLIC_SUPABASE_URL || 'https://orclqaqvxzczhxfzflau.supabase.co';
export const SUPABASE_ANON_KEY: string =
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yY2xxYXF2eHpjemh4ZnpmbGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4MjA0NTgsImV4cCI6MjEwNzM5NjQ1OH0.XySFR25iMGAi2ufcZ4YHbEVrlPTLlo6qDcDxAx_awfc';
