function writeScript(src){
    document.write('<script src="' + src + '"></script>')
}

writeScript("http://code.jquery.com/jquery-2.1.4.min.js");
writeScript("https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js");
writeScript("https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-animate.min.js");
writeScript("https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-aria.min.js");
writeScript("https://ajax.googleapis.com/ajax/libs/angular_material/1.0.0-rc5/angular-material.min.js");
writeScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js");
writeScript("https://l2.io/ip.js?var=ip");
writeScript("kiosk.js");
writeScript("kiosk.slides.js");
writeScript("kiosk.oh.js");

setInterval(function(){
    
    
        var currPath = document.location.pathname.split('/');
        currPath = currPath[currPath.length-1];

        console.log("current path "+ currPath);
        console.log("moment", moment().isBetween("2016-04-29 20:00", "2016-04-30 09:00"));
        
        cuurtrue = currPath != "index.wandelevenement.html";
        
        if(moment && cuurtrue){
            document.location = "index.wandelevenement.html";
        }
        else if(currPath != "index.html"){
            document.location = "index.html";
        }
    try{
        var module = angular.module("Kiosk");
    }
    catch(error) {
        document.location.reload();
    }
}, 30*1000);
