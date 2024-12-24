/** @type {import('next').NextConfig} */
import nextTranslate from 'next-translate-plugin';
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// import nextTranslate from 'next-translate-plugin';

// const nextConfig = {
//   images: {
//     unoptimized: true, // Optional, only needed if you're not optimizing images
//   },
//   i18n: {
//     locales: ['en', 'ar'], // Add all your locales here
//     defaultLocale: 'en', // Default language
//   },
// };

// export default nextConfig ;

// module.exports = nextTranslate({
//   webpack: (config, { isServer, webpack }) => {
//     return config;
//   }
// })




// /** @type {import('next').NextConfig} */
// import nextTranslate from 'next-translate-plugin';

// const nextConfig = {
//   images: {
//     unoptimized: true, // Optional, only needed if you're not optimizing images
//   },
//   i18n: {
//     locales: ['en', 'ar'], // Add all your locales here
//     defaultLocale: 'en', // Default language
//     fallbackLng: 'en', // Add this

//   },
//   webpack: (config, { isServer, webpack }) => {
//     // Custom webpack configurations (if any)
//     return config;
//   },
// };

// export default nextTranslate(nextConfig);



// /** @type {import('next').NextConfig} */
// import nextTranslate from 'next-translate-plugin';

// const nextConfig = {
//   images: {
//         unoptimized: true, // Optional, only needed if you're not optimizing images
//       },
//       i18n: {
//         locales: ['en', 'ar'], // Add all your locales here
//         defaultLocale: 'en', // Default language
//         fallbackLng: 'en', // Add this
    
//       },
// };


// export default  {
//   ...nextConfig,
//   ...nextTranslate(),
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */


// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     unoptimized: true, 
//   },
// };