export default function (eruda) 
{
    class Plugin extends eruda.Tool {
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