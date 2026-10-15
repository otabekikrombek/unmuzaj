// Lighthouse CI (.github/workflows/checks.yml): 6 ключевых страниц, 3 прогона, телефон — настройки Lighthouse
// по умолчанию (эмуляция среднего Android, медленный 4G). Пороги — из «Правил Allimni 2.0» (CLAUDE.md, п. 1).
// error — проверка не пройдена, PR красный; warn — предупреждение в отчёте. Нулевая точка — docs/AUDIT_2026-10.md.
// Скорость на серверах GitHub «плавает», поэтому оценка скорости и время — пока предупреждения; вес — строго в size-limit.
const PAGES = ['/', '/words/w100/', '/dictionary/', '/conjugation/', '/quizzes/matn-10/', '/courses/tsu-2-sem1/'];
const median = { aggregationMethod: 'median-run' };

module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: PAGES.map(p => `http://localhost${p}`),
      numberOfRuns: 3,
      settings: { chromeFlags: '--no-sandbox --headless=new' },
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.95, ...median }],
        'categories:best-practices': ['error', { minScore: 0.95, ...median }],
        'categories:seo': ['error', { minScore: 0.95, ...median }],
        // при загрузке — ни одного запроса к чужим доменам
        'resource-summary:third-party:count': ['error', { maxNumericValue: 0, ...median }],
        'categories:performance': ['warn', { minScore: 0.95, ...median }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2000, ...median }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.05, ...median }],
        'total-blocking-time': ['warn', { maxNumericValue: 200, ...median }],
      },
    },
    upload: { target: 'filesystem', outputDir: './.lighthouseci/reports' },
  },
};
