var kiosk = angular.module('Kiosk', ['ngMaterial']);

kiosk.controller('KioskController', function(Slideshow){
    Slideshow(1000, angular.element('#slideshowProgress'));
});