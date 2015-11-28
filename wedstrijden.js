var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

OH = typeof OH !== "undefined" ? OH : {};
OH.games = {
    all: [],
    home: [],
    refresh: function(){
        $.get("https://crossorigin.me/http://oliveohandbal.nl/programma/").then(function(data){
            OH.games.all = $(data).find(".programmaoverzichtgegevens").map(function(){
                var $td = $(this).find("td");

                return {
                    date: $td.eq(0).text(),
                    home: $td.eq(1).text() == "thuis",
                    time: $td.eq(2).text(),
                    team: $td.eq(3).text(),
                    opponent: $td.eq(4).text()
                };
            });

            OH.games.home = $.grep(OH.games.all, function(wedstrijd, i){
                var date = new Date();
                return wedstrijd.home
                    && wedstrijd.date.split(" ")[0] == date.getDate()
                    && wedstrijd.date.split(" ")[1] == monthNames[date.getMonth()];
            });
        })
    }
};