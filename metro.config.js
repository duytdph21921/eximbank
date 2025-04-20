/* eslint-disable import/no-extraneous-dependencies */
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

module.exports = mergeConfig(defaultConfig, {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
  // cấu hình tại đây để chạy module local
  // watchFolders: [
  //   // path.resolve(__dirname, 'src/screens/modules/account'),
  //   // path.resolve(__dirname, 'src/screens/modules/lms'),
  //   path.resolve(__dirname, 'src/screens/modules/test'),
  // ],
});
