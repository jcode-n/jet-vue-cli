const path = require('path')
const fs = require('fs')

const ejs = require('ejs')

const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`
  const templatePath = path.resolve(__dirname, templatePosition)

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) throw err

      resolve(result)
    })
  })
}

const writeToFile = (path, content) => {

  // 判断 path 是否存在，如果不存在，创建对应的文件夹
  if (fs.existsSync(path)) {
    console.log("the file already exists~")
    return;
  }

  return fs.promises.writeFile(path, content)
}

const createDirSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    // 不存在,判断父亲文件夹是否存在？
    if (createDirSync(path.dirname(dirname))) {
      // 存在父亲文件，就直接新建该文件
      fs.mkdirSync(dirname)
      return true
    }
  }
}

module.exports = {
  compile,
  writeToFile,
  createDirSync
}
