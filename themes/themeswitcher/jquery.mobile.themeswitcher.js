// Original version: http://jquerymobile.com/test/js/jquery.js


//quick & dirty theme switcher, written to potentially work as a bookmarklet
(function ($) {
    $.themesDir = '../../../../themes/';

    $.themeswitcher = function () {
        if ($('[data-' + $.mobile.ns + '-url=themeswitcher]').length) { return; }

        $.getPhoneTheme();

        var currentPage = $.mobile.activePage,
			menuPage = $('<div data-' + $.mobile.ns + 'url="themeswitcher" data-' + $.mobile.ns + 'role=\'dialog\' data-' + $.mobile.ns + 'theme=\'a\'>' +
						'<div data-' + $.mobile.ns + 'role=\'header\' data-' + $.mobile.ns + 'theme=\'a\'>' +
							'<div class=\'ui-title\'>Switch Theme:</div>' +
						'</div>' +
						'<div data-' + $.mobile.ns + 'role=\'content\' data-' + $.mobile.ns + 'theme=\'a\'><ul data-' + $.mobile.ns + 'role=\'listview\' data-' + $.mobile.ns + 'inset=\'true\'></ul></div>' +
					'</div>')
					.appendTo($.mobile.pageContainer),
			menu = menuPage.find('ul');

        var themes = ['Dark', 'Light', 'Original'];

        // we are running on phone gap and have spcial plugin to determine the color scheme
        if(typeof navigator.plugins.phoneTheme !== "undefined") {
            themes = ['System', 'Dark', 'Light', 'Original'];
        }

        //menu items	
        $.each(themes, function (i) {
            $('<li><a href="#" data-' + $.mobile.ns + 'rel="back">' + themes[i].charAt(0).toUpperCase() + themes[i].substr(1) + '</a></li>')
				.bind("vclick", function () {
				    //menuPage.dialog( "close" );
				    window.themeId = themes[i];
                    $.addTheme(window.themeId, true);
				    return false;
				})
				.appendTo(menu);
        });

        //create page, listview
        menuPage.page();

    };

    $.getPhoneTheme = function() {

        // some default values
        window.isDark =  true;
        window.accentColor = "#E51400";

        var success = function (res) {
            window.isDark =  res.isDark;
            window.accentColor = res.accentColor;
        };

        var fail = function (e) {
            alert("unable to get phone theme: " + e);

        };

        if(typeof navigator.plugins.phoneTheme !== "undefined") {

            navigator.plugins.phoneTheme.get(success, fail, null);
        }
    };

    //remover, adder
    $.addTheme = function (themeId, updateCssLink) {

        // TODO - potential issue - only particular styles should be removed
        if(updateCssLink)
            $('head').children('link').remove();

        var csspath = 'default/jquery.mobile.css'; // original theme by default
        var theme = 'a';

        if (themeId !== 'Original') {
            csspath = 'metro/jquery.mobile.metro.theme.css';
            if (themeId == 'Dark') {
                theme = 'a';
            } else if (themeId == 'Light') {
                theme = 'b';
            }
        }

        var isSystem = themeId === 'System';

        if (isSystem)
        {
            window.isDark ? theme = 'a': theme = 'b';
        }
        if(updateCssLink)
            $('head').append('<link rel=\'stylesheet\' href=\'' + $.themesDir + csspath + '\' />');

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


        $('body')
            .removeClass('ui-overlay-a ui-overlay-b ui-overlay-c ui-overlay-d ui-overlay-e')
            .addClass('ui-overlay-' + theme);

	    $('.ui-slider-switch, .ui-slider')
		    .removeClass('ui-btn-down-a ui-btn-down-b ui-btn-down-c ui-btn-down-d ui-btn-down-e')
		    .addClass('ui-btn-down-' + theme);

        $('.ui-app-bar')
            .removeClass('ui-app-bar-a ui-app-bar-b')
            .addClass('ui-app-bar-' + theme);

        //reset the header/footer widgets
        $('.ui-header, .ui-footer')
            .removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
            .addClass('ui-bar-' + theme)
            .attr('data-theme', theme);

        //reset the page widget
        $('.ui-page-active, .ui-content').removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e')
            .addClass('ui-body-' + theme)
            .attr('data-theme', theme);

        // toggle button fix
        $('.ui-toggle-button').removeClass('ui-toggle-button-a ui-toggle-button-b').addClass('ui-toggle-button-' + theme);

        // update dialog overlay
        if ($.mobile.activePage) {
            $.mobile.activePage.removeClass('ui-overlay-a ui-overlay-b ui-overlay-c ui-overlay-d ui-overlay-e').addClass('ui-overlay-'+theme);
        }


        if (isSystem)
        {
            var accentColor = window.accentColor;//"#FF0097"; //magenta

            this.enableStylesheet("globalStyleSheet", true);

            $(".ui-btn-active a.ui-link-inherit").globalcss('color', accentColor + ' !important');
            $(".ui-selectmenu-list li[aria-selected='true'] .ui-btn-text a").globalcss('color', accentColor+ ' !important');
            $(".ui-li-divider").globalcss('background-color', accentColor+ ' !important');
            $("div.ui-slider:not(.ui-disabled):not(.ui-slider-switch").globalcss('background-color', accentColor + ' !important');
            $("div.ui-slider-switch span.ui-slider-label-a").globalcss('background-color', accentColor+ ' !important');
            $(".ui-progress-bg").globalcss('background-color', accentColor + ' !important');
            $(".ui-progress-value").globalcss('background-color', accentColor + ' !important');

            // $('style[title="globalStyleSheet"]').removeAttr('disabled');

        }
        else
        {
            $.enableStylesheet("globalStyleSheet", false);
        }

    }

    $.enableStylesheet = function(name, isEnabled) {

        //find the newly created stylesheet and store reference
        for(var i = 0; i < document.styleSheets.length; i++){
            if(document.styleSheets[i].title == name){
                document.styleSheets[i].disabled = !isEnabled;
                break;
            }
        }

    }

    $(document).ready(function () {

        window.themeId = 'Dark'; // default theme

        if(navigator.plugins && typeof navigator.plugins.phoneTheme !== "undefined") {
            window.themeId = 'System';
            //$.getPhoneTheme();
        }

	    $.addTheme(window.themeId, false);

        $(document).bind('pageshow',function(event, ui){
            $.addTheme(window.themeId, false);
        });

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

        // start from selecting the theme
        //$("[href=#themeswitcher]").click();
    });


})(jQuery);
