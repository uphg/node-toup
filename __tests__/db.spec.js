const db = require('../db.js')
const fs = require('fs')
jest.mock('fs') // 引入 mock 的 fs 模块

describe('db', ()=>{
  afterEach(()=>{
    fs.clearMocks()
  })
  it('can read', async ()=>{
    const data = [{title: 'hi', done: true}]
    fs.setReadFileMock('/xxx', null, JSON.stringify(data))
    const list = await db.read('/xxx')
    expect(list).toStrictEqual(data) // 判断两个对象是否相同
  })
  it('can write', async ()=>{
    let fakeFile
    fs.setWriteFileMock('/yyy', (path, data, callback) => {
      fakeFile = data
      callback(null)
    })
    const list = [{title: '吃苹果', done: true}, {title: '吃香蕉', done: true}]
    await db.write(list, '/yyy')
    expect(fakeFile).toBe(JSON.stringify(list) + '\n')
  })
})
