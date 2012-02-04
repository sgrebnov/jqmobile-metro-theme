/*
* "app bar" plugin
*/

(function( $, undefined ) {

    $.widget( "mobile.appbar", $.mobile.widget, {

        _create: function(){

            var $appbar = this.element,
                $appbtns = $appbar.children( "a" ),
                iconpos = $appbtns.filter( ":jqmData(icon)" ).length ?
                    this.options.iconpos : undefined;

            $appbar.addClass( "ui-app-bar" );

            if ( !iconpos ) {
                $appbar.addClass( "ui-app-bar-noicons" );
            }

            $appbtns.buttonMarkup({
                corners:	false,
                shadow:		false,
                iconpos:	'top'
            });

            $appbar.delegate( "a", "vclick", function( event ) {
                $appbtns.not( ".ui-state-persist" ).removeClass( $.mobile.activeBtnClass );
                $( this ).addClass( $.mobile.activeBtnClass );
            });



            $appbar.children('a').wrapAll( "<div class='ui-app-bar-btn-panel'></div>" );
            var buttons = $appbar.find(".ui-app-bar-btn-panel");
            var insideWrapper = $("<div class='ui-app-bar-inside' />").appendTo($appbar);
            var titles = $("<div class='ui-app-bar-titles' />").appendTo(insideWrapper);
            var dots = $("<span class='ui-app-bar-dots'>...</span>").appendTo(buttons);

            $appbar.children('ul').wrapAll( "<div class='ui-app-bar-menu'></div>" );

            var menu = $appbar.find(".ui-app-bar-menu").attr("data-scroll", "y").detach().appendTo(insideWrapper);

            $appbar.open = function(){
                insideWrapper.stop(true, true).slideDown(400, "easeOutQuint")
                    .find(".ui-app-bar-menu li").each(function(index, el){ $(el).css({paddingTop: index * 60}); }).animate({paddingTop:0}, "linear");
            };
            $appbar.close = function(){ insideWrapper.stop(true, true).slideUp(400,"easeOutQuint") };

            var content = $(".ui-content");
            content.click(function(){ $appbar.close(); });

            // add titles
            buttons.find(".ui-btn-text").each(function(index, el){
                titles.append($("<span />").html($(el).html() || ("button " + index)));
            });

            // prevent buttons to propagate click
            buttons.find("a").click(function(ev){ ev.stopPropagation(); });


            $appbar.click(function(){
                if(insideWrapper.is(":visible")) $appbar.close();
                else $appbar.open();
            });

        }
    });

    //auto self-init widgets
    $( document ).bind( "pagecreate create", function( e ){
        $( ":jqmData(role='app-bar')", e.target ).appbar();
    });

})( jQuery );