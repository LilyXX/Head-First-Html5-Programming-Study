window.onload = function(){
    var url = "http://localhost/gumball/sales.json";
    var request = new XMLHttpRequest();
    request.open('GET',url);
    request.onload = function(){
        if (request.status == 200) {
            displayLuck(request.responseText);
        }
    };
    request.send(null);
}
function updateSales(responseText){
    var salesDiv = document.getElementById("sales");
    salesDiv.innerHTML = responseText;
}
