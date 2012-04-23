Cordova.addConstructor(function () {

    navigator.plugins.phoneTheme = {
        get: function (successCallback, errorCallback, options) {
            if (successCallback && (typeof successCallback !== "function")) {
                console.log("phoneTheme Error: successCallback is not a function");
                return;
            }

            if (errorCallback && (typeof errorCallback !== "function")) {
                console.log("phoneTheme Error: errorCallback is not a function");
                return;
            }

            Cordova.exec(successCallback, errorCallback, "PhoneTheme", "get", options);
        }        
    }
});