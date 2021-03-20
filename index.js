const db = require('./db.js');
const inquirer = require('inquirer');

module.exports.add = async (title)=>{
  // 读取任务
  const list = await db.read()
  // 添加任务
  list.push({ title: title, done: false })
  // 存储任务
  await db.write(list)
}

module.exports.clear = async ()=>{
  await db.write([])
}

module.exports.showAll = showTaskList

// 显示任务列表
async function showTaskList() {
  const list = await db.read()
  const index = await printTasks(list)

  if (index >= 0) {
    askForAction(list, index)
  } else if( index === -2) {
    askForCreateTask(list)
  }
}f

// 打印任务列表
function printTasks(list) {
  return new Promise((resolve, reject)=>{
    inquirer.prompt({
      type: 'list',
      name: 'index',
      message: '请选择你想操作的任务',
      choices: [
        { name: '退出', value: '-1' },
        { name: '创建任务', value: '-2' },
        ...list.map((task, index)=>{
          return {
            name: `${task.done ? '[x]' : '[_]'} ${index + 1} ${task.title}`,
            value: index
          }
        })
      ],
    }).then((answers)=>{
      const index = parseInt(answers.index)
      resolve(index)
    })
  })
  
}

// 操作指定任务
function askForAction(list, index) {
  const actions = { quit, markAsUndone, markAsDone, remove, updateTitle }
  inquirer.prompt({
    type: 'list',
    name: 'action',
    choices: [
      { name: '退出', value: 'quit' },
      { name: '已完成', value: 'markAsDone' },
      { name: '未完成', value: 'markAsUndone' },
      { name: '改标题', value: 'updateTitle' },
      { name: '删除', value: 'remove' },
    ]
  }).then(async (answers2)=>{
    const action = actions[answers2.action]
    action && await action(list, index)
  })
}

// 新建任务
function askForCreateTask(list) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: '输入任务标题',
  }).then(async (answers) => {
    list.push({
      title: answers.title,
      done: false
    })
    await db.write(list)
    showTaskList()
  })
}

// 操作任务*
function quit() {
  showTaskList()
}

async function markAsDone(list, index) {
  list[index].done = true
  await db.write(list)
  showTaskList()
}

async function markAsUndone(list, index) {
  list[index].done = false
  await db.write(list)
  showTaskList()
}

async function updateTitle(list, index) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: '新的标题',
    default: list[index].title
  }).then(async (answers3) => {
    list[index].title = answers3.title
    await db.write(list)
    showTaskList()
  })
}

async function remove(list, index) {
  list.splice(index, 1)
  await db.write(list)
  showTaskList()
}