/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' }
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    // здесь был плагин для переменных среды окружения,
    // но с TS они работают очень плохо

    // добавляем плагин для sass, опционально (можете использовать чистый CSS)
    '@snowpack/plugin-sass',
    [
      '@snowpack/plugin-typescript',
      {
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {})
      }
    ]
  ],
  // оптимизация сборки для продакшна
  optimize: {
    bundle: true,
    minify: true,
    treeshake: true,
    // компиляция TS в JS двухлетней давности
    target: 'es2019'
  },
  // удаление директории со старой сборкой перед созданием новой сборки
  // может негативно сказаться на производительности в больших проектах
  buildOptions: {
    clean: true
  }
}
