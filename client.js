(function (socket) {

  const msg = {
    elId: 'bs-message',
    get el () { return document.getElementById(this.elId) },
    get styleId () { return this.elId + '-style' },
    get styleEl () { return document.getElementById(this.styleId) }
  }

  socket.on('msg:eslint', results => {
    const newErrors = results.filter(obj => obj.errorCount > 0)

    if (!newErrors.length) {
      removeMsg()
      return
    }
    addStyles()
    addMessage({ title: 'ESLINT ERRORS', body: parseErrors(newErrors) })
  })

  socket.on('msg', data => {
    addStyles()
    addMessage(data)
  })

  function removeMsg () {
    if (msg.el) msg.el.parentNode.removeChild(msg.el)
  }

  function parseErrors (results) {
    const errors = []
    results.forEach(file => {
      errors.push(`<span>${file.filePath}</span>`)
      file.messages.forEach(message => {
        errors.push(`${message.line}:${message.column} - ${message.message}`)
      })
    })
    return errors.join('\n')
  }

  function addStyles () {
    if (msg.styleEl) return
    document.head.innerHTML += `
      <style id="${msg.styleId}">
        #${msg.elId} {
          position: fixed;
          top: 0; bottom: 0; left: 0; right: 0;
          z-index: 99999;
          background: rgba(0,0,0,0.5);
          padding: 1em;
          color: #FFF;
        }
        #${msg.elId} h1 {
          background: #F08;
          text-transform: uppercase;
          padding: .25em;
          font-family: sans-serif;
          font-size: 18px;
        }
        #${msg.elId} pre {
          font-size: 14px;
        }
        #${msg.elId} pre span {
          color: #F08;
          font-weight: 900;
          text-decoration: underline;
          margin: 1em 0;
          text-shadow: 1px 1px 2px #000;
          text-transform: uppercase;
          display: inline-block;
        }
      </style>`
  }

  function addMessage ({ title, body }) {
    removeMsg()
    document.body.innerHTML += `
      <div id="${msg.elId}">
        <h1>${title}</h1>
        <pre>${body}</pre>
      </div>`
  }

})(window.___browserSync___.socket);
