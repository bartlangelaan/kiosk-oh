var wedstrijden = [];
var thuisprogramma = [];
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function updateWedstrijden(){
    $.get("https://crossorigin.me/http://oliveohandbal.nl/programma/").then(function(data){
        wedstrijden = $(data).find(".programmaoverzichtgegevens").map(function(){
            var $td = $(this).find("td");

            return {
                date: $td.eq(0).text(),
                home: $td.eq(1).text() == "thuis",
                time: $td.eq(2).text(),
                team: $td.eq(3).text(),
                opponent: $td.eq(4).text()
            };
        });
        console.log("Wedstrijdprogramma: ", wedstrijden);

        thuisprogramma = $.grep(wedstrijden, function(wedstrijd, i){
            var date = new Date();
            return wedstrijd.home
                && wedstrijd.date.split(" ")[0] == date.getDate()
                && wedstrijd.date.split(" ")[1] == monthNames[date.getMonth()];
        });
        console.log("Thuisprogramma: ", thuisprogramma);
    })
}
updateWedstrijden();
setInterval(updateWedstrijden, 10*60*1000);


var $wedstrijdenTr = $("#wedstrijden").find("tr");

function writeWedstrijden(date){
    $wedstrijdenTr.html("");



    if(!thuisprogramma.length)
        $wedstrijdenTr.eq(1).html("<td>Vandaag geen thuiswedstrijden.</td>");

    var actieveWedstrijd = 0;

    for(i = 0; i < thuisprogramma.length; i++){
        var timeSplit = thuisprogramma[i].time.split(":");
        var hour = parseInt(timeSplit[0]);
        var minute = parseInt(timeSplit[1]);
        console.log(hour, date.getHours());

        if(hour < date.getHours() || (hour == date.getHours() && minute <= date.getMinutes()))
            actieveWedstrijd = i;
    }

    for(var i = -1; i < 2; i++) {
        if (thuisprogramma[actieveWedstrijd + i] && thuisprogramma[actieveWedstrijd].date == thuisprogramma[actieveWedstrijd + i].date)
            $wedstrijdenTr.eq(i+1)
                .append($("<td>").text(thuisprogramma[actieveWedstrijd + i].time))
                .append($("<td>").text(thuisprogramma[actieveWedstrijd + i].team + " - " + thuisprogramma[actieveWedstrijd + i].opponent));
    }

}