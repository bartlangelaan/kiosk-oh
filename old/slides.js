var transition = 800;
var defaultSlideTime = 30000;

var slide = 0;
var $slides = $("article");
var $window = $(window);
var $progressbar = $(".progressbar");

function nextSlide(){
    // Calculate slide
    slide++;
    if(slide > $slides.length){
        slide = 1;
        $progressbar.animate({width: "0%"}, transition);
    }
    var $slide = $slides.eq(slide-1);


    // Scroll to slide
    $("main").animate({scrollLeft: $window.width()*(slide-1)}, transition, function(){
        $progressbar.animate(
            {width: (slide / $slides.length * 100) + "%"},
            $slide.data("time") || defaultSlideTime,
            "linear",
            nextSlide
        );
    });
}
if($slides.length > 1)
    nextSlide();