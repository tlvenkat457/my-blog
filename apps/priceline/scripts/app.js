console.log('Hi Krishna');

function trip(from,to,depDate,retDateStart,retDateEnd) {
    console.log("Creating a new trip instance");
    this.from =from;
    this.to =to;
    this.depDate = depDate;
    this.retDateStart = retDateStart;
    this.retDateEnd = retDateEnd;
    this.searchPriceLine = function(){
        // var priceLineUrl = "http://www.priceline.com/qp.asp?refclickid=return&ReturnDate=" + returnMonth + "/" + startDate + "/2016&DepartureDate=" + departDate + "/2016&ArrCity=" + toAirPort + "&DepCity=" + fromAirPort + "&triptype=RT&numtickets=1&productid=1&skyscanner_redirectid=dWcg4PBeEeW_cYsG89PgGA";
        var priceLineUrl="";

        while(this.retDateStart <= this.retDateEnd){

            priceLineUrl = "http://www.priceline.com/qp.asp?refclickid=return&ReturnDate=" +this.retDateStart.toLocaleDateString()+ "&DepartureDate=" + this.depDate.toLocaleDateString() + "&ArrCity=" + this.to + "&DepCity=" + this.from + "&triptype=RT&numtickets=1&productid=1&skyscanner_redirectid=dWcg4PBeEeW_cYsG89PgGA";
            var iframeRef = document.createElement("iframe");
            iframeRef.setAttribute("src",priceLineUrl);
            iframeRef.setAttribute("width","70%");
            iframeRef.setAttribute("height","300px");
            document.getElementById("priceLineResult").appendChild(iframeRef);
            console.log(priceLineUrl);

            var newDate = this.retDateStart.setDate(this.retDateStart.getDate() + 1);
            this.retDateStart = new Date(newDate);

            console.log(priceLineUrl);
        }
    }
}
function search(){

    var fromLocation = document.getElementById("from").value;
    var toLocation = document.getElementById("toPlace").value;
    var depDate = new Date(document.getElementById("depDate").value);
    var retDateStart = new Date(document.getElementById("airDateStart").value);
    var retDateEnd = new Date(document.getElementById("airDateEnd").value);


    var fairSearch = new trip(fromLocation,toLocation,depDate,retDateStart,retDateEnd);

    fairSearch.searchPriceLine();
    progressBar()

}

function progressBar(){


    var barBlock = document.getElementById("barBlock");
    var processBlock = document.getElementById("progressBlock");

    barBlock.style.position = "absolute";
    barBlock.style.width = "0%";
    barBlock.style.height = "100%";
    barBlock.style.backgroundColor = "chartreuse";

    processBlock.style.position = "relative";
    processBlock.style.width = "100%";
    processBlock.style.height = "10px";
    processBlock.style.backgroundColor = "black";

    var width = 0;
    setInterval(function(){
        if(width>=100){
            clearInterval();
        }
        else {
            width++;
            barBlock.style.width = width+"%";
        }
    },100);
}
