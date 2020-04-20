function getPosts () {
  return axios.get('/api/posts')
}

function getPost (id) {
  return axios.get('/api/posts/' + id)
}

function addPost (data) {
  return axios.post('/api/posts', { data })
}

function deletePost (id) {
  return axios.delete('/api/posts/' + id)
}

function updatePost (id, data) {
  return axios.put('/api/posts/' + id, { data })
}

//========== 기본 기능 코드 ==========//
window.onload = () => {
  window.instance = new Vue({
    el: '#app',
    data () {
      return {
        prevPost: '',
        editingItemIndex: -1,
        message: '',
        posts: [],
        history: []
      }
    },
    computed: {
      currentPost () {
        return this.posts[this.editingItemIndex]
      }
    },
    created () {
      getPosts().then(res => {
        this.posts = res.data || []
      })
    },
    methods: {
      addPost () {
        if (!this.message) {
          return
        }

        addPost(this.message).then(res => {
          this.message = ''
          this.posts.push(res.data)
        }).catch(e => {
          alert(e.message)
        })
      },
      doUpdate (idx) {
        this.prevPost = this.posts[idx].data
        this.editingItemIndex = idx
        this.$nextTick(() => {
          this.$refs['input_' + idx][0].focus()
        })
      },
      updatePost () {
        const target = this.currentPost
        updatePost(target.id, target.data).then(res => {
          this.editingItemIndex = -1
        }).catch(e => {
          alert(e.message)
        })
      },
      cancelEdit (idx) {
        this.posts[idx].data = this.prevPost
        this.editingItemIndex = -1
        this.prevPost = ''
      },
      deletePost (idx) {
        const target = this.posts[idx]
        this.editingItemIndex = -1
        deletePost(target.id).then(res => {
          this.posts.splice(idx, 1)
        }).catch(e => {
          alert(e.message)
        })
      }
    }
  })
}
