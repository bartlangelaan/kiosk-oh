var kiosk = angular.module('Kiosk', ['ngMaterial']);

kiosk.controller('KioskController', function($interval, Slideshow, GamesInfo, CanteenInfo, TrainingInfo, $http, $rootScope){
    Slideshow(
        "article:not(.ng-hide)",
        30000,
        angular.element('#slideshowProgress'));

    var ran = false;
    var lastCommitSha = false;

    $interval(function(){
        if(!moment().second() == 0 && ran) return;

        $rootScope.time = moment();

        if(moment().minute == 0 || !ran){
            GamesInfo.refresh();
            CanteenInfo.refresh();
            TrainingInfo.refresh();
        }

        GamesInfo.update();
        CanteenInfo.update();
        TrainingInfo.update();

        ran = true;

        if(ip == "90.145.175.91")
            $http.post("https://api.thingspeak.com/update.json", {
                api_key: "A0FTPIBJA1UURYG8",
                field1: 1,
                field2: $rootScope.games ? $rootScope.games.home.now.length : 0,
                field3: $rootScope.training && $rootScope.training.home ? $rootScope.training.home.now.length : 0,
                field4: $rootScope.canteen && $rootScope.canteen.active ? $rootScope.canteen.active.length : 0
            });

        $http.get("https://api.github.com/repos/bartlangelaan/oliveo-handbal-kiosk/commits").then(function(response){
            var commitSha = response.data[0].sha;
            console.log("[GITHUB] Previous commit",lastCommitSha,"vs new commit",commitSha);
            if(!lastCommitSha) lastCommitSha = commitSha;
            else if(lastCommitSha != commitSha) document.location.reload();
        })
    }, 1000);

});