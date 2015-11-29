OH = typeof OH !== "undefined" ? OH : {};
OH.games = {
    all: [],
    home: [],
    refresh: function(){
        $.get("https://crossorigin.me/http://oliveohandbal.nl/programma/").then(function(data){
            moment.locale('en');

            OH.games.all = $(data).find(".programmaoverzichtgegevens").map(function(){
                var $td = $(this).find("td");

                return {
                    time: moment($td.eq(0).text() + " " + $td.eq(2).text(), "D MMM HH:mm"),
                    home: $td.eq(1).text() == "thuis",
                    team: $td.eq(3).text(),
                    opponent: $td.eq(4).text()
                };
            });

            OH.games.home = $.grep(OH.games.all, function(wedstrijd, i){
                return wedstrijd.home && wedstrijd.time.isSame(moment(), 'day');
            });

            moment.locale('nl');
        })
    },
    getActive: function(){
        var active = 0;

        for(i = 0; i < OH.games.home.length; i++){
            if(moment().isAfter(OH.games.home[i].time))
                active = i;
        }

        return active;
    }
};