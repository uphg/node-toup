// const { program } = require('commander'); // v7.1.0 
const program = require('commander'); // v3.0.2

const api = require('./index.js')

// program
//   .option('-x, --xxx <args...>', 'why to x')
program.version('0.0.2')

program
  .command('add')
  .description('add a task')
  .action((...args) => {
    // const words = args[args.length - 1].args.join(' ') // v7.1.0 
    const words = args.slice(0, -1).join(' ') // v3.0.2
    api.add(words).then(()=>{ console.log('添加成功') }, ()=>{ console.log('添加失败') })
  });

program
  .command('clear')
  .description('clear all task')
  .action(() => {
    api.clear().then(()=>{ console.log('清除成功') }, ()=>{ console.log('清除失败') })
  });

program.parse(process.argv);

if (process.argv.length === 2) {
  // 用户没有添加参数
  api.showAll()
}

