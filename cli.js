#!/usr/bin/env node
const { program } = require('commander') // v7.2.0
const api = require('./index.js')
const pkg = require('./package.json')

if (process.argv.length === 2) {
  // no param
  void api.showAll()
} else {
  program
    .version(pkg.version, '-v, --version', 'display version information')

  program
    .command('add')
    .description('add a task')
    .action((...args) => {
      const words = args[args.length - 1].args.join(' ') // v7.2.0
      api.add(words).then(
        () => {
          console.log('添加成功')
        },
        () => {
          console.log('添加失败')
        }
      )
    })

  program
    .command('clear')
    .description('clear all task')
    .action(() => {
      api.clear().then(
        () => {
          console.log('清除成功')
        },
        () => {
          console.log('清除失败')
        }
      )
    })

  program.parse(process.argv)
}
