;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.erudaPlugin = factory()
  }
})(this, function () {
  return function (eruda) {
    var Tool = eruda.Tool,
      util = eruda.util

    var Plugin = Tool.extend({
      name: 'plugin',
      init: function ($el) {
        this.callSuper(Tool, 'init', arguments)
        this._style = util.evalCss(
          [
            '.eruda-dev-tools .eruda-tools .eruda-plugin {padding: 10px;}',
            '.eruda-tip {padding: 10px; background: #fff; color: #263238;}',
          ].join('.eruda-dev-tools .eruda-tools .eruda-plugin ')
        )
        $el.html('<div class="eruda-tip">Put whatever you want here:)</div>')
      },
      show: function () {
        this.callSuper(Tool, 'show', arguments)
      },
      hide: function () {
        this.callSuper(Tool, 'hide', arguments)
      },
      destroy: function () {
        this.callSuper(Tool, 'destroy', arguments)
        util.evalCss.remove(this._style)
      },
    })

    return new Plugin()
  }
})
