module.exports = function (eruda) 
{
    class Plugin extends eruda.Tool {
        constructor() {
            super();
            this.name = 'plugin';   
        }
        init($el, container) 
        {
            super.init($el, container);
        }
        show() 
        {
            super.show();
        }
        hide()
        {
            super.hide();
        }
        destroy() 
        {
            super.destroy();
        }
    };

    return new Plugin();
};