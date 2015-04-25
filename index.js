if (process.version.match(/^v(0\.12\.|[^0])/))
  return

var code = 0
Object.defineProperty(process, 'exitCode', {
  set: function (c) {
    if (typeof c !== 'number')
      throw new TypeError('exitCode must be a number')
    code = c
    setup()
  },
  get: function () {
    return code
  },
  enumerable: true, configurable: true
})

var didSetup = false
function setup () {
  if (didSetup)
    return
  didSetup = true
  process.on('exit', function (c) {
    if (code && !c)
      process.exit(code)
  })
}
