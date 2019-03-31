module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '究極の選択メーカー',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '究極の選択メーカー。究極の選択を促し周りの人に刺激を与えましょう' },
      { property: 'og:title', content: '究極の選択メーカー' },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: '究極の選択メーカー。究極の選択を促し周りの人に刺激を与えましょう。' },
      { property: 'og:url', content: 'https://www.choice-maker.site/' },
      { property: 'og:site_name', content: '究極の選択メーカー' },
      { property: 'og:image', content: 'https://www.choice-maker.site/ogp.jpg' },
      { name: 'twitter:site', content: '@mitudama' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
  ],
  modules: [
    'bootstrap-vue/nuxt',
    // '@nuxtjs/pwa',
    // ['@nuxtjs/google-analytics', {
    //   id: ''
    // }]
  ],
}

