const fs = jest.genMockFromModule('fs') // 使用 jest mock 一个 fs 模块
const _fs = jest.requireActual('fs') // 引用真正的 fs 模块

Object.assign(fs, _fs) // 拷贝 _fs 的所有方法给 fs

let readMocks = {}

fs.setReadFileMock = (path, error, data) => {
  readMocks[path] = [error, data]
}

fs.readFile = (path, options, callback) => {
  // 如果不存在第三个参数就将第二个参数赋值给第三个参数
  if (callback === undefined) callback = options
  // 判断是否存在 mock 文件，存在就调用 mock 的方法
  if (path in readMocks) {
    callback(...readMocks[path])
  } else {
    _fs.readFile(path, options, callback)
  }
}

let writeMocks = {}

fs.setWriteFileMock = (path, fn) => {
  writeMocks[path] = fn
}

fs.writeFile = (path, data, options, callback) => {
  if (path in writeMocks) {
    writeMocks[path](path, data, options, callback)
  } else {
    _fs.writeFile(path, data, options, callback)
  }
}

fs.clearMocks = () => {
  readMocks = {}
  writeMocks = {}
}

module.exports = fs