const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// add non-standard file extensions to recognized assets
defaultConfig.resolver.assetExts.push("onnx");
defaultConfig.resolver.assetExts.push("json");
defaultConfig.resolver.assetExts.push("bin");

defaultConfig.transformer = {
  assetPlugins: ["expo-asset/tools/hashAssetFiles"],
};

module.exports = defaultConfig;
