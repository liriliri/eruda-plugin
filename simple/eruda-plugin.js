(function(root, factory)
{
    if (typeof define === 'function' && define.amd)
    {
        define([], factory);
    } else if (typeof module === 'object' && module.exports)
    {
        module.exports = factory();
    } else { root.erudaPlugin = factory(); }
}(this, function ()
{
    return function (eruda) 
    {
        var Tool = eruda.Tool;

        var Plugin = Tool.extend({
            name: 'plugin',
            init: function () 
            {
                this.callSuper(Tool, 'init', arguments);
            },
            show: function () 
            {
                this.callSuper(Tool, 'show', arguments);
            },
            hide: function () 
            {
                this.callSuper(Tool, 'hide', arguments);
            },
            destroy: function () 
            {
                this.callSuper(Tool, 'destroy', arguments);
            }
        });

        return new Plugin();
    };
}));