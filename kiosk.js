var kiosk = angular.module('Kiosk', ['ngMaterial']);

kiosk.controller('KioskController', function($interval, Slideshow, GamesInfo, CanteenInfo){
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
    }, 1000);

});