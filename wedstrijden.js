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



var $wedstrijdenTr = $("#wedstrijden").find("tr");

function writeWedstrijden(date){
    $wedstrijdenTr.html("");



    if(!OH.games.home.length)
        $wedstrijdenTr.eq(1).html("<td>Vandaag geen thuiswedstrijden.</td>");

    var actieveWedstrijd = 0;

    for(i = 0; i < OH.games.home.length; i++){
        var timeSplit = OH.games.home[i].time.split(":");
        var hour = parseInt(timeSplit[0]);
        var minute = parseInt(timeSplit[1]);
        console.log(hour, date.getHours());

        if(hour < date.getHours() || (hour == date.getHours() && minute <= date.getMinutes()))
            actieveWedstrijd = i;
    }

    for(var i = -1; i < 2; i++) {
        if (OH.games.home[actieveWedstrijd + i] && OH.games.home[actieveWedstrijd].date == OH.games.home[actieveWedstrijd + i].date)
            $wedstrijdenTr.eq(i+1)
                .append($("<td>").text(OH.games.home[actieveWedstrijd + i].time))
                .append($("<td>").text(OH.games.home[actieveWedstrijd + i].team + " - " + OH.games.home[actieveWedstrijd + i].opponent));
    }

}