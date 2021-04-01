//window.addEventListener("load", init);
var monthlyData;
var weeklyData;
var daliyData;
var dayTime = 0;
var weekTime = 0;
var monthTime = 0;

function clickMonth() {
    var monthly = document.getElementById("month");
    monthly.onclick = showInfo("monthly.csv"); 
}

function clickWeek() {
    var monthly = document.getElementById("week");
    monthly.onclick = showInfo("weekly.csv");  
}

function clickDay() {
    var monthly = document.getElementById("day");
    monthly.onclick = showInfo("daily.csv");  
}

function clickDelete() {
    var deleteButton = document.getElementById("deleteInfo");
    deleteButton.onclick = deleteData();
}

            function showInfo(select){
                /*let odiv=document.createElement("div");
                let textNode0=document.createTextNode("Here is the base d3.js");
                let textNode1=document.createTextNode("hello");
                odiv.appendChild(textNode0);
                odiv.appendChild(textNode1);
                odiv.style.color="blue";
                document.body.appendChild(odiv);*/

                
                var info = document.getElementById("infoTable");
                info.innerHTML = "";
                //select = ;
                var link = "/COMP-4990/data/"+select;
                d3.csv(link, function(error, csvdata) {
                    if (error) 
                    {
                        //document.writeln("Here");
                        console.log(error);
                    }
                    else
                    {
                        //document.writeln("There");
                        console.log(csvdata);
                    }
                    
                    switch(select.length)
                    {
                        case 11:
                            monthlyData = csvdata;
                            //document.write(monthlyData.length);
                            monthTime++;
                            //document.write("month");
                            break;
                        case 10:
                            weeklyData = csvdata;
                            weekTime++;
                            //document.write("week");
                            break;
                        case 9:
                            daliyData = csvdata;
                            dayTime++;
                            //document.write("day");
                            break;
                    }
                    var show = link.split("/");
                    document.getElementById("test").innerHTML = show[3];
                    var tableBase = document.getElementById("infoTable");
                    var table = "<table>";
                    for(var i=0; i<csvdata.length; i++)//i<1; i++)
                    {
                        var id = csvdata[i].user_id;
                        var time = csvdata[i].time;
                        var matrix = csvdata[i].matrix;//"abc123qwe456rty";
                        //var pttr = /\([0-9]\,/;
                        
                        //let odiv=document.createElement("div");
                        table+="<tr>"+
                            "<td id=\""+id+"\">ID: "+id+"</td>"+
                            "<td>Time: "+time+"</td>"+
                            "<td>Word Matrix: "+matrix+"</td>"+
                            "<td><button onclick=\"showGraph(\""+id+"\", "+show[3]+")\">show graph</button></td></tr>";
                        /*let info = document.createTextNode("<tr>"+
                            "<td><a href=\"/COMP-4990/userInfo.html\">ID: "+id+"</a></td>"+
                            "<td>Time: "+time+"</td>"+
                            "<td>Word Matrix: "+matrix+"</td></tr>"
                            );*/
                        //odiv.appendChild(info);
                        //document.body.appendChild(odiv);
                    }
                    table+="</table>";
                    tableBase.innerHTML = table;
                    //let tableTag = document.createTextNode("<table>");
                    //odiv.appendChild(tableTag);
                    /*for(var i=0; i<csvdata.length; i++)//i<1; i++)
                    {
                        var id = csvdata[i].user_id;
                        var time = csvdata[i].time;
                        var matrix = csvdata[i].matrix;//"abc123qwe456rty";
                        //var pttr = /\([0-9]\,/;

                        let odiv=document.createElement("div");
                        let info = document.createTextNode(
                            "<p>ID: "+id+"\t"+
                            "Time: "+time+"\t"+
                            "Word Matrix: "+matrix+"</p>"
                            );
                        /*let info = document.createTextNode("<tr>"+
                            "<td><a href=\"/COMP-4990/userInfo.html\">ID: "+id+"</a></td>"+
                            "<td>Time: "+time+"</td>"+
                            "<td>Word Matrix: "+matrix+"</td></tr>"
                            );*/
                        //odiv.appendChild(info);
                        //document.body.appendChild(odiv);
                    //}*/
                    
                    //let tagFinish = document.createTextNode("</table>");
                    //odiv.appendChild(tagFinish);
                });
                
                //
            }

function showGraph(id, dataLocate) {
    var link = "/COMP-4990/data/"+dataLocate;
    d3.csv(link, function(error, csvdata) {
        
   
        var wordMatrix = data[0].matrix;
        var show = getElementById("test");
    })
    show.innerHTML = "achieve";
}
            
function deleteData() {
    var getDiv = document.getElementById("infoTable");
    getDiv.innerHTML = "";
}