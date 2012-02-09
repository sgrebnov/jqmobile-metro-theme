/*
 * "progress bar" plugin
 */
(function( $, undefined ) {
    $.widget( "mobile.progressbar", $.mobile.widget, {

        _create: function(){

            var self = this,
                $progressBar = this.element,
                $progressBg = $("<div class='ui-progress-bg' />").appendTo($progressBar),
                $progressValue = $("<div class='ui-progress-value' />").appendTo($progressBar),
                max = !isNaN(parseFloat($progressBar.attr("max")))?parseFloat($progressBar.attr("max")):100,
                min = !isNaN(parseFloat($progressBar.attr("min")))?parseFloat($progressBar.attr("min")):0;

            $progressBar.addClass( "ui-progress-bar");
            self.value($progressBar.attr("value")||0);

            if($progressBar.attr('indeterminate')=='true'){
                $progressBar.addClass('ui-progress-bar-indeterminate');
            }
        },

        value : function(newValue){

            var $progressBar = this.element;
            if(!newValue){
                return $progressBar.attr("value");
            }
            var newValue = parseFloat(newValue);
            if(isNaN(newValue)){
                return;
            }
            var max = parseFloat($progressBar.attr("max")),
                min = parseFloat($progressBar.attr("min"));

            if( newValue < min ){
                newValue = min;
            }
            if( newValue > max){
                newValue = max;
            }

            $progressBar.attr("value",parseFloat(newValue));
            var width = newValue*100/max;
            $progressBar.children(".ui-progress-value").width(width+'%');
        }

    });

    //auto self-init widgets
    $( document ).bind( "pagecreate create", function( e ){
        $( ":jqmData(role='progress-bar')", e.target ).progressbar();
    });

})( jQuery );