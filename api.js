/**
 * RESTFul API 시작하기
 * @author Geunhyeok LEE
 */

const db = require('./db')
db.load()

module.exports = router => {
  router.get('/api/posts', (req, res) => {
    const posts = db.data
    res.json(posts)
  })

  router.get('/api/posts/:id', (req, res) => {
    const post = db.select(req.params.id)

    if (post) {
      res.json(post)
    } else {
      res.status(404).end()
    }
  })

  router.post('/api/posts', (req, res) => {
    const inserted = db.insert(req.body.data)

    if (inserted) {
      res.set('Content-Location', '/api/post/' + inserted.id)
      res.status(201).json(inserted).end()
    } else {
      res.status(204).end()
    }
  })

  router.put('/api/posts/:id', (req, res) => {
    const updated = db.update(req.params.id, req.body.data)

    if (updated) {
      res.status(200).end()
    } else {
      res.status(204).end()
    }
  })

  router.delete('/api/posts/:id', (req, res) => {
    db.delete(req.params.id)

    res.status(204).end()
  })
}
