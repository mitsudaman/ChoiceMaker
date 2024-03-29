const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();


exports.m = functions.https.onRequest((req, res) => {

  const [ , , doc_id] = req.path.split('/')
  var questionRef = db.collection('questions').doc(doc_id);
  var getDoc = questionRef.get()
      .then(doc => {
        if (!doc.exists) {
          return;
        } else {
          const docData = doc.data();
          const html = createHtml(docData.ogp_full_path,doc_id)
          res.set('Cache-Control', 'public, max-age=600, s-maxage=600')
          res.status(200).end(html)
          return;
        }
      })
      .catch(err => {
        // console.log('Error getting document', err);
      });
});
const createHtml = (ogp_full_path,doc_id) => {
  const SITEURL = "https://www.choice-maker.site/"
  const TITLE = `究極の選択メーカー`
  const DESCRIPTION = '究極の選択メーカー。究極の選択を促し周りの人に刺激を与えましょう。'
  const IMAGE = `https://firebasestorage.googleapis.com/v0/b/choicemaker-e052f.appspot.com/o/${ogp_full_path}.jpg?alt=media`


  return `<!doctype html>
    <head>
      <title>${TITLE}</title>
      <meta property="og:title" content="${TITLE}">
      <meta property="og:image" content="${IMAGE}">
      <meta property="og:description" content="${DESCRIPTION}">
      <meta property="og:url" content="${SITEURL}">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="${TITLE}">
      <meta name="twitter:site" content="@mitudama">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${TITLE}">
      <meta name="twitter:image" content="${IMAGE}">
      <meta name="twitter:description" content="${DESCRIPTION}">
    </head>
    <body>
      <script type="text/javascript">window.location="/read/?d=${doc_id}";</script>
    </body>
  </html>`
}