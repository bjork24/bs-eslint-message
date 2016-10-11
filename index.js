module.exports = {
  plugin: function () {},
  'plugin:name': 'Eslint Message Emitter',
  hooks: {
    'client:js': require('fs').readFileSync(__dirname + '/client.js', 'utf8')
  }
}
