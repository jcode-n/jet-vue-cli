const program = require('commander')

const helpOptions = () => {
  // 增加自己的 options
  program.option('-j, --jet', 'a jet-vue cli')
  program.option('-d, --dest <dest>', 'a destination folder, 例如： -d /src/components')
  program.option('-f, --framework <framework>', 'your framework, 例如： -f element-ui')

  program.on('--help', function () {
    console.log('')
    console.log('Other:')
    console.log(' other options~')
  })
}

module.exports = helpOptions
