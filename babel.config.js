module.exports = {
  // presets: ['module:@react-native/babel-preset'],
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-transform-private-methods', { loose: true }],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.json'],
        alias: {
          '@': './src',
          '@assets': './src/assets',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@store': './src/store',
          '@theme': './src/theme',
          '@navigations': './src/navigations',
          '@translations': './src/translations',
          '@utils': './src/utils',
          '@services': './src/services',
          '@base': './src/screens/base',
          // Nếu muốn cấu hình chạy local thì phải cấu hình thêm tại đây
          //  'module-account': './src/screens/modules/account',
          //  'module-lms': './src/screens/modules/lms',
          //  'module-test': './src/screens/modules/test',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
