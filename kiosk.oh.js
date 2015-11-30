angular.module('Kiosk').service('GamesInfo', function($rootScope, $http){
    function refresh(){
        console.log("[GAMES] Refreshing..");
        $http.get("https://crossorigin.me/http://oliveohandbal.nl/programma/").then(function(response){
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

        $rootScope.games.active = $rootScope.games[0].time.isSame(moment(), 'day') ? 0 : false;

        for(i = 0; i < $rootScope.games.length; i++){
            if(moment().isAfter($rootScope.games[i].time)) {
                $rootScope.games.active = i;
            }
        }

        console.log('[GAMES] Active: ' + $rootScope.games.active);
    }

    return {
        refresh: refresh,
        update: update
    }
})
.service('CanteenInfo', function($rootScope, $http){
    function refresh() {
            console.log("[CANTEEN] Refreshing..");
            $http.get("https://crossorigin.me/http://oliveohandbal.nl/programma/kantinedienst/").then(function (response) {
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
            if(moment().add(12, 'day').subtract(7, 'hour').isBetween($rootScope.canteen[i].startTime, $rootScope.canteen[i].endTime)){
                $rootScope.canteen.active.push(i);
            }
        }

        console.log("[CANTEEN] Active:", $rootScope.canteen.active);
    }

    return {
        refresh: refresh,
        update: update
    }
});