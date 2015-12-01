var kiosk = angular.module('Kiosk', ['ngMaterial']);

kiosk.controller('KioskController', function($interval, Slideshow, GamesInfo, CanteenInfo, $http, $rootScope){
    Slideshow(
        "article:not(.ng-hide)",
        30000,
        angular.element('#slideshowProgress'));

    var ran = false;

    $interval(function(){
        if(!moment().second() == 0 && ran) return;
        if(moment().minute == 0 || !ran){
            GamesInfo.refresh();
            CanteenInfo.refresh();
        }

        GamesInfo.update();
        CanteenInfo.update();

        ran = true;

        if(ip == "90.145.175.91")
            $http.post("https://api.thingspeak.com/update.json", {
                api_key: "A0FTPIBJA1UURYG8",
                field1: 1,
                field2: $rootScope.games && $rootScope.games.active ? 1 : 0,
                field3: 0,
                field4: $rootScope.canteen && $rootScope.canteen.active ? $rootScope.canteen.active.length : 0
            });
    }, 1000);

});