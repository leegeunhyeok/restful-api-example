/**
 * RESTFul API 시작하기
 * @author Geunhyeok LEE
 */

const fs = require('fs')

module.exports = {
  _file: './data.json',
  data: null,
  load () {
    this.data = require(this._file) || []
    return this.data
  },
  save () {
    fs.writeFileSync(this._file, JSON.stringify(this.data, null, 2))
  },
  select (id) {
    id = parseInt(id)
    return this.data.find(v => v.id === id)
  },
  insert (data) {
    const insertData = {
      id: +new Date(),
      data
    }
    this.data.push(insertData)
    this.save()
    return insertData
  },
  update (id, data) {
    id = parseInt(id)
    const idx = this.data.findIndex(v => v.id === id)
    if (idx !== -1) {
      this.data[idx] = { ...this.data[idx], data }
      this.save()
      return data
    } else {
      return null
    }
  },
  delete (id) {
    id = parseInt(id)
    const idx = this.data.findIndex(v => v.id === id)
    if (idx !== -1) {
      this.data.splice(idx, 1)
      this.save()
      return true
    } else {
      return null
    }
  }
}
