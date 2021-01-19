const autoprefixer = require('autoprefixer');


// module.exports = {
//     plugins: [
//         [
//             "postcss-preset-env",
//             {
//                 postcssOptions: {
//                     parser: "postcss-js",
//                     plugins: [
//                         [
//                             // "autoprefixer",
//                             autoprefixer()
//                         ],
//                     ],
//                     sourceMap: true
//                 },
//                 execute: true,
//             },
//         ],
//     ],
// };

module.exports = {
    plugins: [autoprefixer]
};