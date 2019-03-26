■設定
docker-compose build
docker-compose up -d
docker-compose exec nuxt sh




--------------------------------------------
■konva
https://github.com/konvajs/vue-konva/issues/18

yarn add vue-konva konva

import Vue from 'vue';
import VueKonva from 'vue-konva'

Vue.use(VueKonva)


  plugins: [{ src: '~/plugins/konva', ssr: false }]
