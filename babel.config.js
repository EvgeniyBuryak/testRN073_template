module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "~": ["./src"],
          icons: ["./src/components/icons"],
          color: ["./src/styles/colors"]
        }
      }
    ],
  ]
};
