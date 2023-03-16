module.exports = function(eruda) {
  let { evalCss } = eruda.util

  class Plugin extends eruda.Tool {
    constructor() {
      super()
      this.name = 'plugin'
      this._style = evalCss(require('./style.scss'))
    }
    init($el, container) {
      super.init($el, container)
      $el.html('<div class="eruda-tip">Put whatever you want here:)</div>')
    }
    show() {
      super.show()
    }
    hide() {
      super.hide()
    }
    destroy() {
      super.destroy()
      evalCss.remove(this._style)
    }
  }

  return new Plugin()
}
