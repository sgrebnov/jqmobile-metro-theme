// Original version: http://jquerymobile.com/test/js/jquery.js


//quick & dirty theme switcher, written to potentially work as a bookmarklet
(function ($) {
    $.themeswitcher = function () {
        if ($('[data-' + $.mobile.ns + '-url=themeswitcher]').length) { return; }
        var themesDir = '../../../../themes/',
			themes = ['Dark', 'Light', 'Original'],
			currentPage = $.mobile.activePage,
			menuPage = $('<div data-' + $.mobile.ns + 'url="themeswitcher" data-' + $.mobile.ns + 'role=\'dialog\' data-' + $.mobile.ns + 'theme=\'a\'>' +
						'<div data-' + $.mobile.ns + 'role=\'header\' data-' + $.mobile.ns + 'theme=\'b\'>' +
							'<div class=\'ui-title\'>Switch Theme:</div>' +
						'</div>' +
						'<div data-' + $.mobile.ns + 'role=\'content\' data-' + $.mobile.ns + 'theme=\'c\'><ul data-' + $.mobile.ns + 'role=\'listview\' data-' + $.mobile.ns + 'inset=\'true\'></ul></div>' +
					'</div>')
					.appendTo($.mobile.pageContainer),
			menu = menuPage.find('ul');

        //menu items	
        $.each(themes, function (i) {
            $('<li><a href="#" data-' + $.mobile.ns + 'rel="back">' + themes[i].charAt(0).toUpperCase() + themes[i].substr(1) + '</a></li>')
				.bind("vclick", function () {
				    //menuPage.dialog( "close" );
				    addTheme(themes[i]);
				    return false;
				})
				.appendTo(menu);
        });

        //remover, adder
        function addTheme(themeId) {

            // TODO - potential issue - only particular styles should be removed
            $('head').children('link').remove();

            var csspath = 'default/jquery.mobile-1.0.css'; // original theme by default
            var theme = 'a';

            if (themeId !== 'Original') {
                csspath = 'metro/jquery.mobile.metro.theme.css';
                if (themeId == 'Dark') {
                    theme = 'a';
                } else if (themeId == 'Light') {
                    theme = 'b';
                }
            }

            $('head').append('<link rel=\'stylesheet\' href=\'' + themesDir + csspath + '\' />');

            // based on http://stackoverflow.com/questions/8656801/how-to-change-theme-dynamically-in-jquery-mobile

            $('.ui-btn').not('.ui-li-divider')
                   .removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e')
                   .addClass('ui-btn-up-' + theme)
                   .attr('data-theme', theme);

            //target the list divider elements, then iterate through them to check if they have a theme set, if a theme is set then do nothing, otherwise change its theme to `b` (this is the jQuery Mobile default for list-dividers)
            $('.ui-li-divider').each(function (index, obj) {
                if ($(this).parent().attr('data-divider-theme') == 'undefined') {
                    $(this).removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
               .addClass('ui-bar-b')
               .attr('data-theme', 'b');
                }
            })

            //reset the header/footer widgets
            $('.ui-header, .ui-footer')
                       .removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
                       .addClass('ui-bar-' + theme)
                       .attr('data-theme', theme);

            //reset the page widget
            $('.ui-page-active, .ui-content').removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e')
                       .addClass('ui-body-' + theme)
                       .attr('data-theme', theme);

        }

        //create page, listview
        menuPage.page();

    };

    $(document).ready(function () {
        var appendEl = $(this).find('#jqm-themeswitcher');
        
		$('<a href="#themeswitcher" data-'+ $.mobile.ns +'rel="dialog" data-'+ $.mobile.ns +'>Switch theme</a>')
						.buttonMarkup({
							'shadow': false,
							'theme': 'a'
						})
						.appendTo(appendEl)
						.wrap('<div class="jqm-themeswitcher">')
						.bind("vclick", function () {
						    $.themeswitcher();
						});
    });


})(jQuery);
