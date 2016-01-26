var PROXY = "http://cors.io/?u=";

angular.module('Kiosk').service('GamesInfo', function($rootScope, $http){
    function refresh(){
        console.log("[GAMES] Refreshing..");
        $http.get(PROXY+"http://oliveohandbal.nl/programma/").then(function(response){
            console.log("[GAMES] Response:", response);

            moment.locale('en');

            $rootScope.games = $(response.data).find(".programmaoverzichtgegevens").map(function(){
                var $td = $(this).find("td");

                var time = moment($td.eq(0).text() + " " + $td.eq(2).text(), "D MMM HH:mm");
                if(time.isBefore(moment()) && !time.isSame(moment(), 'day')){
                    time = time.add(1, 'year');
                }

                return {
                    time: time,
                    home: $td.eq(1).text() == "thuis",
                    team: $td.eq(3).text(),
                    opponent: $td.eq(4).text()
                };
            });

            console.log("[GAMES] Refreshed:", $rootScope.games);
            update();
            moment.locale('nl');
        });
    }

    function update(){
        if(!$rootScope.games) return;

        $rootScope.games.home = {

            today: $.grep($rootScope.games, function(game){
                return game.home && game.time.isSame(moment(), 'day');
            }),

            saturday: $.grep($rootScope.games, function(game){
                return game.home && game.time.isSame(moment().day(6), 'day');
            }),

            sunday: $.grep($rootScope.games, function(game){
                return game.home && game.time.isSame(moment().day(7), 'day');
            })

        };

        $rootScope.games.home.now = $rootScope.games.home.today.length ? [$rootScope.games.home.today[0]] : [];

        for(i = 0; i < $rootScope.games.home.today.length; i++){
            if(moment().isAfter($rootScope.games.home.today[i].time)) {
                $rootScope.games.home.now = [$rootScope.games.home.today[i]];
            }
        }

        console.log('[GAMES] Home: ', $rootScope.games.home);
    }

    return {
        refresh: refresh,
        update: update
    }
})
.service('CanteenInfo', function($rootScope, $http){
    function refresh() {
            console.log("[CANTEEN] Refreshing..");
            $http.get(PROXY+"http://oliveohandbal.nl/programma/kantinedienst/").then(function (response) {
                console.log("[CANTEEN] Response:", response);

                moment.locale('en');

                $rootScope.canteen = [];

                $(response.data).find(".programmaoverzichtgegevens").each(function () {
                    var $td = $(this).find("td");

                    if ($td.eq(0).text() != "") {
                        $rootScope.canteen.push({
                            startTime: moment($td.eq(0).text() + " " + $td.eq(1).text(), "D MMM HH:mm"),
                            endTime: moment($td.eq(0).text() + " " + $td.eq(2).text(), "D MMM HH:mm"),
                            people: []
                        });
                    }
                    for (var i = 3; i < 5; i++) {
                        var person = $td.eq(i).text().replace(/\(.*?\)/g, '');
                        if (person != "" && $rootScope.canteen[$rootScope.canteen.length - 1].people.indexOf(person) == -1) {
                            $rootScope.canteen[$rootScope.canteen.length - 1].people.push(person)
                        }
                    }
                });

                console.log("[CANTEEN] Refreshed:", $rootScope.canteen);

                update();

                moment.locale('nl');
            });
        }

    function update(){
        if(!$rootScope.canteen) return;

        $rootScope.canteen.active = [];
        for(var i = 0; i < $rootScope.canteen.length; i++){
            if(moment().isBetween($rootScope.canteen[i].startTime, $rootScope.canteen[i].endTime)){
                $rootScope.canteen.active.push(i);
            }
        }

        console.log("[CANTEEN] Active:", $rootScope.canteen.active);
    }

    return {
        refresh: refresh,
        update: update
    }
})
.service('TrainingInfo', function($rootScope, $http){
    function refresh() {
        console.log("[TRAINING] Refreshing..");
        $http.get(PROXY+"http://oliveohandbal.nl/programma/trainingstijden/").then(function (response) {
            console.log("[TRAINING] Response:", response);

            moment.locale('en');

            $rootScope.training = [];

            var dagen = ["zo", "ma", "di", "wo", "do", "vr", "za"];
            var training = [];

            $(response.data).find(".programmaoverzichtgegevens").each(function () {
                var $td = $(this).find("td");

                for(var a = 0; a < 3; a++){
                    if($td.eq(a).text() != "") training[a] = $td.eq(a).text();
                }

                $rootScope.training.push({
                    startTime: moment(training[1], "HH:mm:ss").day(dagen.indexOf(training[0])),
                    endTime: moment(training[2], "HH:mm:ss").day(dagen.indexOf(training[0])),
                    team: $td.eq(3).text().replace("Olivea", "Oliveo"),
                    teamShort: $td.eq(3).text().replace("Oliveo ", "").replace("Olivea ", ""),
                    place: $td.eq(4).text()
                });
            });

            console.log("[TRAINING] Refreshed:", $rootScope.training);

            update();

            moment.locale('nl');
        });
    }

    function update(){
        if(!$rootScope.training) return;

        $rootScope.training.home = {
            today: $.grep($rootScope.training, function(training){
                return training.place == "Het Nest" && training.startTime.isSame(moment(), 'day');
            }),

            now: $.grep($rootScope.training, function(training){
                return training.place == "Het Nest" && moment().isBetween(training.startTime, training.endTime);
            })
        };


        console.log("[CANTEEN] Home:", $rootScope.training.home);
    }

    return {
        refresh: refresh,
        update: update
    }
});
