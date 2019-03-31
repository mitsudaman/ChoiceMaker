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



--------------------------------------------
■Twitter app 登録

- Application description (required)
Life is a series of choices. Get the ultimate question and inspiration for your users. To make their life better.


- Tell us how this app will be used

1. To identify the user creating the content

2. We will use the image and name of the user registered on Twitter as the creator of the content of this site.


1. I’m using Twitter’s APIs  to use [twitter login] with Firebase.
 and To use identify the user .
2. No I don't intend to analyze Tweets, Twitter users,or their content.
3. No
4. I will post user images and names registered on Twitter as content creators.




--------------------------------------------
■グラフ 色
                // 'rgba(255, 99, 132, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)'


                created_date
2019年3月26日 0:00:00 UTC+9
del_flg
true
option1
"毎月20万円もらえる（一生）"
option2
"その場で1億円もらえる"
option3
"a"
option4
"a"
photo_url
"https://pbs.twimg.com/profile_images/823908950760226816/cFThd_SR.jpg"
question
"どっちがいい？"
type
1
user_name
"ミツダマ@500円プログラマー"