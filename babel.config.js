

module.exports = (api) => {
  api.cache(true);

  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: 'src/',
            rootPathPrefix: '~/',
          },
          {
            rootPathSuffix: "./src/styles/colors",
            rootPathPrefix: 'colors',
          },
          // {
          //   rootPathSuffix: "./src/utils",
          //   rootPathPrefix: 'utils',
          // }
        ]
      }
    ],
    // [
    //   "module-resolver",
    //   // require.resolve('babel-plugin-module-resolver'),
    //   {
    //     // extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
    //     alias: {
    //       '@src': './src',
    //       '@assets': './src/assets',
    //       '@components': './src/Components',
    //     }
    //   }
    // ],
    // 'jest-hoist'
  ];

  // const env = {
  //   production: {
  //     plugins: [
  //       'babel-plugin-root-import',
  //       {
  //         rootPathPrefix: '~/',
  //         rootPathSuffix: 'src/'
  //       }
  //     ]
  //   }
  // };
  // if (process.env("ENV") === "prod") {
  //   plugins.push(env);
  // }

  // const rootImportOpts = {
  //   path: [
  //     {
  //       root: __dirname,
  //       rootPathPrefix: '~',
  //       rootPathSuffix: 'src',
  //     },
  //   ],
  // };

  // const plugins = [
    // ['babel-plugin-root-import', rootImportOpts],
//     [
//       "module-resolver",
//       {
//         root: ["./src"],
//         alias: {
//           "~": ["./src"],
//           icons: ["./src/components/icons"],
//           color: ["./src/styles/colors"]
//         }
//       }
//     ],
//   ];

  return { presets, plugins };
};
