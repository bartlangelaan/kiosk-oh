var index;

setInterval(function(){
    $.get("index.html").then(function(newindex){
        if(newindex != index){
            document.location.reload();
        }
    })
}, 2500);

$.get("index.html").then(function(newindex){
    index = newindex;
});