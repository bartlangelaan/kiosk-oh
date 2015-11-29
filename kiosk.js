var kiosk = angular.module('Kiosk', ['ngMaterial']);

kiosk.controller('KioskController', function($scope, $timeout){
    $scope.slide = -1;

    var default_slide_time = 10000;
    function nextSlide(){
        // Get slides
        var slides = angular.element("article:not(.ng-hide)");

        // Next slide
        $scope.slide++;
        if($scope.slide >= slides.length){
            $scope.slide = 0;
        }
        var slide = slides.eq($scope.slide);

        // Only show right slide
        angular.element("main").animate({scrollLeft: slide.width() * $scope.slide}, 1000, "linear");

        // Next slide in x seconds
        $timeout(nextSlide, slide.data('time') || default_slide_time);
    }

    nextSlide();
});