module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        // debug: true, // polyfillを確認する時だけ
      },
    ],
  ],
};
