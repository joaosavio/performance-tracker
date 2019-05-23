module.exports = {
  all: true,
  'report-dir': './build/reports/tests',
  reporter: ['text', 'text-summary', 'html', 'cobertura'],
  'temp-dir': './build/tests/nyc',
  'check-coverage': true,
  include: [
    'index.js',
    'service/**/*.js',
  ],
};
