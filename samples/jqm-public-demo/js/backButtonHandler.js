Cordova.addConstructor(function () {

    console.log("Installing back button handler");

    var prevPage = document.referrer;

    if (prevPage !== "") return;

    var startPage = window.location.href;

    console.log("start page is " + startPage);

    document.addEventListener("deviceready", function () {

        $(document).bind("pagechange", function (e, data) {
            console.log("current page is " + window.location.href);

            if (window.location.href == startPage) {
                document.removeEventListener("backbutton", onBackKeyDown, false);
            } else {
                document.addEventListener("backbutton", onBackKeyDown, false);
            }
        });        

    }, false);

    function onBackKeyDown() {

        //document.removeEventListener("backbutton", onBackKeyDown, false);
        //window.location.href = prevPage;

        // this does not work for some situations
        history.back();
    }
});