angular.module('Kiosk').service('Slideshow', function Slideshow($rootScope, $timeout) {

    var self = this;
    self.slide = -1;

    function setProgressBarTransitionTime(milliseconds){
        self.progressBar.find(".md-bar2").css('transition-duration', (milliseconds-100)+'ms')
    }

    function nextSlide(){
        // Get slides
        var slides = angular.element(self.slideSelector);

        // If not loaded yet
        if(!slides.length){
            $timeout(nextSlide, 100);
            return;
        }

        // If only one slide
        if(slides.length == 1){
            self.slide = 0;
            angular.element("main").animate({scrollLeft:0}, 1000, "linear", nextSlide);
            $rootScope.$apply(function(){
                setProgressBarTransitionTime(1000);
                $rootScope.slideshowProgress = 0;
            });
            return;
        }

        // Next slide
        self.slide++;
        if(self.slide >= slides.length){
            self.slide = 0;
        }
        var slide = slides.eq(self.slide);
        console.log("[SLIDES] Scrolling to slide nr", self.slide)

        // Scroll to right slide
        setProgressBarTransitionTime(1000);
        $rootScope.slideshowProgress = self.slide / (slides.length) * 100;
        angular.element("main").animate({scrollLeft: slide.width() * self.slide}, 1000, "linear", function(){

            var nextSlideDelay = slide.data('time') || self.defaultSlideTime;

            // Next slide in x seconds
            $timeout(nextSlide, nextSlideDelay);

            // Update progressbar
            $rootScope.$apply(function(){
                setProgressBarTransitionTime(nextSlideDelay);
                $rootScope.slideshowProgress = (self.slide+1) / slides.length * 100;
            });

            console.log("[SLIDES] Next slide in",nextSlideDelay,"milliseconds");
        });


    }

    return function(slideSelector, defaultSlideTime, progressBar){
        self.slideSelector = slideSelector;
        self.defaultSlideTime = defaultSlideTime;
        self.progressBar = progressBar;
        nextSlide();
    };

});