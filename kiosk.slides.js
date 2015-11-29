angular.module('Kiosk').service('Slideshow', function Slideshow($timeout) {

    var self = this;
    self.slide = -1;
    self.default_slide_time = 10000;

    function nextSlide(){
        // Get slides
        var slides = angular.element("article:not(.ng-hide)");

        // Next slide
        self.slide++;
        if(self.slide >= slides.length){
            self.slide = 0;
        }
        var slide = slides.eq(self.slide);

        // Only show right slide
        angular.element("main").animate({scrollLeft: slide.width() * self.slide}, 1000, "linear");

        // Next slide in x seconds
        $timeout(nextSlide, slide.data('time') || self.default_slide_time);
    }

    return function(default_slide_time){
        self.default_slide_time = default_slide_time;
        nextSlide();
    };

});