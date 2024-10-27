// Learn more https://docs.expo.io/guides/customizing-metro
// need this file so it can understand our firebase
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs');

module.exports = config;
