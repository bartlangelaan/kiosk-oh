OH = typeof OH !== "undefined" ? OH : {};
OH.canteen = {
    all: [],
    today: [],
    refresh: function(){
        $.get("https://crossorigin.me/http://oliveohandbal.nl/programma/kantinedienst/").then(function(data){
            moment.locale('en');

            $(data).find(".programmaoverzichtgegevens").each(function() {
                var $td = $(this).find("td");

                if($td.eq(0).text() != ""){
                     OH.canteen.all.push({
                        startTime: moment($td.eq(0).text() + " " + $td.eq(1).text(), "D MMM HH:mm"),
                        endTime: moment($td.eq(0).text() + " " + $td.eq(2).text(), "D MMM HH:mm"),
                        people: []
                    });
                }
                for(var i = 3; i < 5; i++){
                    var person = $td.eq(i).text().replace(/\(.*?\)/g, '');
                    if(person != "" && OH.canteen.all[OH.canteen.all.length-1].people.indexOf(person) == -1){
                        OH.canteen.all[OH.canteen.all.length-1].people.push(person)
                    }
                }
            });

            OH.canteen.today = $.grep(OH.canteen.all, function(shift, i){
                return shift.startTime.isSame(moment(), 'day');
            });

            moment.locale('nl');
        })
    }
};