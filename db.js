const homedir = require('os').homedir();
const home = process.env.HOME || homedir // 由于有的用户 Home 目录不同，所以优先使用用户设置的 Home 目录
const p = require('path')
const dbPath = p.join(home, '.todo')

const fs = require('fs');

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject)=>{
      // flag 参数详见：https://devdocs.io/node/fs#fs_file_system_flags
      fs.readFile(path, { flag: 'a+' }, (error, data)=>{
        if (error) return reject(error)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch(listError) {
          list = []
        }
        resolve(list)
      })
    })
  },
  
  write(list, path = dbPath) {
    return new Promise((resolve, reject)=>{
      const string = JSON.stringify(list)
      // \n 让数据最后一行预留换行
      fs.writeFile(path, string + '\n', (error)=>{
        if (error) return reject(error)
        resolve()
      })
    })
  }
}

module.exports = db