module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    // ['@babel/plugin-transform-private-methods', { loose: true }],
    // ['@babel/plugin-transform-class-properties', { loose: true }],
    // ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@common': './src/common',
        },
      },
    ],
  ],
};