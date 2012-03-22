Cordova.addConstructor(function () {

    console.log("Installing back button handler");

    var prevPage = document.referrer;

    if (prevPage == "") return;

    console.log("prev page is " + prevPage);

    document.addEventListener("deviceready", function () {

       document.addEventListener("backbutton", onBackKeyDown, false);

    }, false);

    function onBackKeyDown() {
        document.removeEventListener("backbutton", onBackKeyDown, false);
        window.location.href = prevPage;

        // this does not work for some situations
        // history.back();
    }
});