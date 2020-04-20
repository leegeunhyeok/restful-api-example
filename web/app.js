/**
 * RESTFul API 시작하기
 * @author Geunhyeok LEE
 */

!function () {
  const origin = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
  }
  const methods = ['get', 'post', 'put', 'delete']

  methods.forEach(method => {
    axios[method] = (url, data) => {
      return origin[method](url, data).then(res => {
        const requestData = {
          method: method.toUpperCase(),
          status: res.status,
          url,
          data
        }
        console.log(requestData)
        instance.$data.history.push(requestData)
        return res
      })
    }
  })
}()
