var kiosk = angular.module('Kiosk', ['ngMaterial']);

kiosk.controller('KioskController', function(Slideshow){
    Slideshow(
        "article:not(.ng-hide)",
        30000,
        angular.element('#slideshowProgress'));
});