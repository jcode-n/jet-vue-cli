const { promisify } = require('util')
const path = require('path')

const download = promisify(require('download-git-repo'))
const open = require('open')

const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/utils')

// 创建项目的 acton
const createProjectAction = async (project) => {
  console.log('jet helps you create your project ~~')
  // 1. clone项目
  await download(vueRepo, project, { clone: true })

  // 2. 执行 npm install
  // windows 下要加 cmd 所以需要判断
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], { cwd: `./${project}` })

  // 3. 运行 npm run serve
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })

  // 4. 打开浏览器
  open('http://localhost:8080')

}

// 添加组件的 action
const addComponentAction = async (name, dest) => {
  // 创建对应的ejs模块
  // 1. 编译ejs模板 result
  const result = await compile('vue-components.ejs', { name, lowerName: name.toLowerCase() })

  // 2. 将 result 写入 .vue 文件中 并 放到对应的文件夹中
  const targetPath = path.resolve(dest, `${name}.vue`)
  writeToFile(targetPath, result)
}

const addPagesAndRouter = async (name, dest) => {
  // 1. 编译 ejs 模板
  const pageResult = await compile('vue-components.ejs', { name, lowerName: name.toLowerCase() })
  const routerResult = await compile('vue-router.ejs', { name, lowerName: name.toLowerCase() })

  // 2. 将 result 写入 .vue 文件中 并 放到对应的文件夹中
  // 判断文件不存在,那么就创建文件
  createDirSync(dest);
  const targetPagePath = path.resolve(dest, `${name}.vue`)
  const targetRouterPath = path.resolve(dest, `router.js`)
  writeToFile(targetPagePath, pageResult)
  writeToFile(targetRouterPath, routerResult)
}

const addStoreAction = async (name, dest) => {
  // 1. 编译 ejs 模板
  const storeResult = await compile('vue-store.ejs', {})
  const typesResult = await compile('vue-types.ejs', {})

  // 2. 将 result 写入 .vue 文件中 并 放到对应的文件夹中
  // 判断文件不存在,那么就创建文件
  createDirSync(dest);
  const storePath = path.resolve(dest, `${name}.js`)
  const typesPath = path.resolve(dest, `types.js`)
  writeToFile(storePath, storeResult)
  writeToFile(typesPath, typesResult)
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPagesAndRouter,
  addStoreAction
}
