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
            name: 'plugin'
        });

        return new Plugin();
    };
}));