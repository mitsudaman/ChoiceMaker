const functions = require('firebase-functions');

exports.bigben = functions.https.onRequest((req, res) => {
  
  const SITEURL = "〇〇〇〇〇"
  const TITLE = "〇〇〇〇〇"
  const DESCRIPTION = "〇〇〇〇〇"
  // const IMAGE = `https://firebasestorage.googleapis.com/v0/b/choicemaker-e052f.appspot.com/o/aaa.jpg?alt=media&token=083bb243-7ac8-42b3-8e3f-cbd7a7f7a1ae`
  const IMAGE = `https://firebasestorage.googleapis.com/v0/b/choicemaker-e052f.appspot.com/o/screenshot-2019-03-23-100556.png?alt=media&token=5da8880a-8e59-44ee-9280-fb4794f25020`

  res.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>
      <meta property="og:title" content="${TITLE}">
      <meta property="og:image" content="${IMAGE}">
      <meta property="og:description" content="${DESCRIPTION}">
      <meta property="og:url" content="${SITEURL}">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="${TITLE}">
      <meta name="twitter:site" content="">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${TITLE}">
      <meta name="twitter:image" content="${IMAGE}">
      <meta name="twitter:description" content="${DESCRIPTION}">
    </head>
    <body>
      ${'BONG '.repeat(3)}
    </body>
  </html>`);
});