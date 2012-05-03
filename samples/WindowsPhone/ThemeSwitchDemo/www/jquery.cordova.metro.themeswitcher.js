Cordova.addConstructor(function () {

    console.log("Installing jqueryThemeSwitch");

    navigator.plugins.jqueryThemeSwitch = {

        // expects {dark: true/false, accentColor: '#E51400'}
        apply: function (successCallback, errorCallback, theme) {

            if (!errorCallback) errorCallback = function(ex) {
                console.log("jqueryThemeSwitch failed: " + ex.message);
            }

            try {

                var themeSwatch = theme.dark ? 'a' : 'b';

                // based on http://stackoverflow.com/questions/8656801/how-to-change-theme-dynamically-in-jquery-mobile

                $('body')
                    .removeClass('ui-overlay-a ui-overlay-b ui-overlay-c ui-overlay-d ui-overlay-e')
                    .addClass('ui-overlay-' + themeSwatch);

                $('.ui-btn').not('.ui-li-divider')
                    .removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e')
                    .addClass('ui-btn-up-' + themeSwatch)
                    .attr('data-theme', themeSwatch);

                //target the list divider elements, then iterate through them to check if they have a theme set, if a theme is set then do nothing, otherwise change its theme to `b` (this is the jQuery Mobile default for list-dividers)
                $('.ui-li-divider').each(function (index, obj) {
                    if ($(this).parent().attr('data-divider-theme') == 'undefined') {
                        $(this).removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
                            .addClass('ui-bar-b')
                            .attr('data-theme', 'b');
                    }
                })

                $('.ui-slider-switch, .ui-slider')
                    .removeClass('ui-btn-down-a ui-btn-down-b ui-btn-down-c ui-btn-down-d ui-btn-down-e')
                    .addClass('ui-btn-down-' + themeSwatch);

                $('.ui-app-bar')
                    .removeClass('ui-app-bar-a ui-app-bar-b')
                    .addClass('ui-app-bar-' + themeSwatch);

                //reset the header/footer widgets
                $('.ui-header, .ui-footer')
                    .removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
                    .addClass('ui-bar-' + themeSwatch)
                    .attr('data-theme', themeSwatch);

                //reset the page widget
                $('.ui-page-active, .ui-content').removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e')
                    .addClass('ui-body-' + themeSwatch)
                    .attr('data-theme', themeSwatch);

                // toggle button fix
                $('.ui-toggle-button').removeClass('ui-toggle-button-a ui-toggle-button-b').addClass('ui-toggle-button-' + themeSwatch);


                this.enableStylesheet("globalStyleSheet", true);

                $(".ui-btn-active a.ui-link-inherit").globalcss('color', theme.accentColor + ' !important');
                $(".ui-selectmenu-list li[aria-selected='true'] .ui-btn-text a").globalcss('color', theme.accentColor + ' !important');
                $(".ui-li-divider").globalcss('background-color', theme.accentColor + ' !important');
                $("div.ui-slider:not(.ui-disabled):not(.ui-slider-switch)").globalcss('background-color', theme.accentColor + ' !important');
                $("div.ui-slider-switch span.ui-slider-label-a").globalcss('background-color', theme.accentColor + ' !important');
                $(".ui-progress-bg").globalcss('background-color', theme.accentColor + ' !important');
                $(".ui-progress-value").globalcss('background-color', theme.accentColor + ' !important');
            }
            catch (ex) {
                if (errorCallback)
                    errorCallback(ex);
            }

            if (successCallback)
                successCallback();

        },

        applyDeviceTheme: function (successCallback, errorCallback) {

            if (typeof navigator.plugins.phoneTheme === "undefined") {
                if (errorCallback)
                    errorCallback("No phoneTheme plugin installed");
                return;
            }

            if (!errorCallback) errorCallback = function(ex) {
                console.log("jqueryThemeSwitch failed: " + ex.message);
            }

            navigator.plugins.phoneTheme.get(function (res) {
        	
            window.themeId = "System";
            window.accentColor = res.accentColor;
            window.isDark = res.isDark;

                navigator.plugins.jqueryThemeSwitch.apply(successCallback, errorCallback, { dark: res.isDark, accentColor: res.accentColor });
            }, errorCallback, null);
        },

        enableStylesheet: function (name, isEnabled) {

            //find the newly created stylesheet and store reference
            for (var i = 0; i < document.styleSheets.length; i++) {
                if (document.styleSheets[i].title == name) {
                    document.styleSheets[i].disabled = !isEnabled;
                    break;
                }
            }

        }
    };
    // update the page as soon as it is ready
    document.addEventListener("deviceready", function () {
        console.log("jqueryThemeSwitch: device ready, apply current theme");
        navigator.plugins.jqueryThemeSwitch.applyDeviceTheme();

    }, false);
});