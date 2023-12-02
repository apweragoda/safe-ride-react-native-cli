// const config = {
//   resolver: {
//     sourceExts: ['js', 'ts', 'tsx', 'svg'],
//   },
// };
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

module.exports = config;
