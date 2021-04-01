//window.addEventListener("load", init);
var monthlyData;
var weeklyData;
var daliyData;
var dayTime = 0;
var weekTime = 0;
var monthTime = 0;

// scroll bar below
var isSyncingLeftScroll = false;
var isSyncingRightScroll = false;
var isSyncingTopScroll = false;
var leftDiv = document.getElementById('left');
var rightDiv = document.getElementById('right');
var topDiv = document.getElementById('top');

leftDiv.onscroll = function() {
	if (!isSyncingLeftScroll) {
  	isSyncingRightScroll = true;
  	rightDiv.scrollTop = this.scrollTop;
  }
  isSyncingLeftScroll = false;
}

rightDiv.onscroll = function() {
	if (!isSyncingRightScroll) {
  	isSyncingLeftScroll = true;
  	leftDiv.scrollTop = this.scrollTop;
  }
  if (!isSyncingRightScroll) {
    isSyncingTopScroll = true;
    topDiv.scrollLeft = this.scrollLeft;
}
  isSyncingRightScroll = false;
}

topDiv.onscroll = function() {
	if (!isSyncingTopScroll) {
  	isSyncingRightScroll = true;
  	rightDiv.scrollLeft = this.scrollLeft;
  }
  isSyncingTopScroll = false;
}
// scroll bar 


function clickMonth() {
    var monthly = document.getElementById("month");
    monthly.onclick = showInfo("monthly.csv"); 
    showGraphmonthly();
}

function clickWeek() {
    var monthly = document.getElementById("week");
    monthly.onclick = showInfo("weekly.csv");  
    showGraphweekly();
}

function clickDay() {
    var monthly = document.getElementById("day");
    monthly.onclick = showInfo("daily.csv");  
    showGraphdaily();
}

function clickMain() {
    var main_button = document.getElementById("main_button");
    main_button.onclick = showInfoMain("mainMatrix.csv");  
    showGraph("mainMatrix.csv");
}

function clickDelete() {
    var deleteButton = document.getElementById("deleteInfo");
    deleteButton.onclick = deleteData();
}

function getList(select) {
    var link = "/COMP-4990-1/data/"+select;
    d3.csv(link, function(error, csvdata) {
        if (error) 
        {
            console.log(error);
        }
        else
        {
            
            console.log(csvdata);
        }

        var userList = new linkedList();
        for(var i=0; i<csvdata.length; i++)
        {
            if(userList.find(csvdata[i].user_id) != -1)
            {
                continue;
            }
            else
            {
                userList.insert(csvdata[i].user_id);
            }
        }

        return userList.toString();
    });
}

            function showInfo(select){

                
                var info = document.getElementById("infoTable");
                info.innerHTML = "";
                //select = ;
                var link = "/COMP-4990-1/data/"+select;
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
                    var name = show[3].split(".");
                    //document.getElementById("test").innerHTML = show[3];
                    var tableBase = document.getElementById("infoTable");
                    var table = "<table>";
                    //var line = 0;
                    //var check="";
                    for(var i=0; i<csvdata.length; i++)
                    {
                        var id = csvdata[i].user_id;
                        var time = csvdata[i].time;
                        var matrix = csvdata[i].matrix;

                        var wordMatrix = "";
                        var numMatrix = "";
                        
                        //document.getElementById("left").innerHTML = "here";
                        //check+=i+" ";
                        for(var j=1; j<matrix.split("'").length; j+=2)
                        {
                            wordMatrix+=matrix.split("'")[j]+" ";
                        }
                        wordMatrix = wordMatrix.split(" ");
                        for(var j=0; j<matrix.split(",").length; j+=2)
                        {
                            numMatrix+=matrix.split(",")[j].split("(")[1]+" ";
                        }
                        numMatrix = numMatrix.split(" ");

                        var output = "";
                        for(var j=0; j<wordMatrix.length-1; j++)
                        {
                            output+=wordMatrix[j]+" , ";
                        }
                        table+="<tr>"+
                            "<td id=\""+id+"\">ID: "+id+"</td>"+
                            "<td>Time: "+time+"</td>"+
                            "<td>["+output+"]</td>"+
                            "<td><button onclick=\"showGraph"+name[0]+"()\">show graph</button></td></tr>";
                        //line++;
                    }
                    //document.getElementById("left").innerHTML = check;
                    table+="</table>";
                    tableBase.innerHTML = table;
                });
                
                //
            }

            function showInfoMain(select){

                
                var info = document.getElementById("infoTable");
                info.innerHTML = "";
                //select = ;
                var link = "/COMP-4990-1/data/"+select;
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
                    
                    var show = link.split("/");
                    var name = show[3].split(".");
                    //document.getElementById("test").innerHTML = show[3];
                    var tableBase = document.getElementById("infoTable");
                    var table = "<table>";
                    //var line = 0;
                    //var check="";
                    for(var i=0; i<csvdata.length; i++)
                    {
                        var id = csvdata[i].user_id;
                        var matrix = csvdata[i].matrix;

                        var wordMatrix = "";
                        
                        //document.getElementById("left").innerHTML = "here";
                        //check+=i+" ";
                        for(var j=1; j<matrix.split("'").length; j+=2)
                        {
                            wordMatrix+=matrix.split("'")[j]+" ";
                        }
                        wordMatrix = wordMatrix.split(" ");


                        var output = "";
                        for(var j=0; j<wordMatrix.length-1; j++)
                        {
                            output+=wordMatrix[j]+" , ";
                        }
                        table+="<tr>"+
                            "<td id=\""+id+"\">ID: "+id+"</td>"+
                            "<td>["+output+"]</td>"+
                            "<td><button onclick=\"showGraph"+name[0]+"("+id+")\">show graph</button></td></tr>";
                        //line++;
                    }
                    //document.getElementById("left").innerHTML = check;
                    table+="</table>";
                    tableBase.innerHTML = table;
                });
                
                //
            }
            
function showGraphmonthly(id) {
    showGraph("monthly.csv");
    personalGraph(id);
}

function showGraphweekly(id) {
    showGraph("weekly.csv");
    personalGraph(id);
}

function showGraphdaily(id) {
    showGraph("daily.csv");
    personalGraph(id);
}

function showGraphmainMatrix(id) {
    showGraph("mainMatrix.csv");
    personalGraph(id);
}

function showGraph(select) {
    var link = "/COMP-4990-1/data/"+select;//monthly.csv";
    d3.csv(link, function(error, csvdata) {
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log(csvdata);
        }
        
        var wordMatrix = "";//csvdata[0].matrix;
        var numberMatrix = "";
        for(var i=0; i<csvdata.length; i++)
        {
            for(var j=0; j<csvdata[i].matrix.split(",").length; j+=2)
            {
                numberMatrix+=csvdata[i].matrix.split(",")[j].split("(")[1]+" ";
            }
            numberMatrix+="\n";
        }
        //numberMatrix = numberMatrix.split("\n");
        //var show = document.getElementById("test");
        //show.innerHTML = numberMatrix;
        //show.innerHTML = csvdata[0].matrix.split("'")[3];

        for(var i=0; i<csvdata.length; i++)
        {
            for(var j=1; j<csvdata[i].matrix.split("'").length; j+=2)
            {
                wordMatrix+=csvdata[i].matrix.split("'")[j]+" ";
            }
            wordMatrix+="\n";
        }
        //show.innerHTML = wordMatrix.split("\n");

        /*if(wordMatrix.split(" ")[0] == "black")
        {
            show.innerHTML = "achieve";
        }
        else
        {
            show.innerHTML = wordMatrix.split(" ")[0];
        }*/

        var numList = new linkedList();
        var wordList = new linkedList();
        //numList.insert(1);
        //numList.insert(2);
        //numList.display();

        /*if(numList.find(2) == numList.getValue(2))
        {
            document.getElementById("test").innerHTML = "achieve";
        }
        else
        {
            document.getElementById("test").innerHTML = numList.find(2)+" "+numList.getValue(2);
        }*/

        /*var wordList = "";
        var numList = "";*/
        for(var i=0; i<wordMatrix.split("\n").length; i++)
        {
            for(var j=0; j<wordMatrix.split("\n")[i].split(" ").length; j++)
            {
               if(wordList.find(wordMatrix.split("\n")[i].split(" ")[j]) == -1)
               {
                    wordList.insert(wordMatrix.split("\n")[i].split(" ")[j]);
                    numList.insert(parseInt(numberMatrix.split("\n")[i].split(" ")[j]));
               }
               else
               {
                    var value = numList.getValue(wordList.find(wordMatrix.split("\n")[i].split(" ")[j]));
                    value+=parseInt(numberMatrix.split("\n")[i].split(" ")[j]);
                    numList.setValue(wordList.find(wordMatrix.split("\n")[i].split(" ")[j]), value);
               }
            }
        }//
        //wordList.display();
        //numList.display();
        //document.getElementById("left").innerHTML = wordList.getSize()+" "+numList.getSize();
        /*
        var output = "";
        for(var i=1; i<wordList.getSize(); i++)
        {
            output+=wordList.getValue(i)+": "+numList.getValue(i)+"\n";
        }
        
        document.getElementById("left").innerHTML = output;
        */
        var userList = new linkedList();
        var userLocate = new linkedList();
        for(var i=0; i<csvdata.length; i++)
        {
            if(userList.find(csvdata[i].user_id) != -1)
            {
                var locate = userLocate.getValue(userList.find(csvdata[i].user_id)).split(" ");
                var length = parseInt(locate[1])+1;
                locate = locate[0]+" "+length;
                userLocate.setValue(userList.find(csvdata[i].user_id), locate);
            }
            else
            {
                userList.insert(csvdata[i].user_id);
                userLocate.insert(i+" "+1);
            }
        }
    
        var output = "";
        for(var i=1; i<userList.getSize(); i++)
        {
            output+=userList.getValue(i)+": "+userLocate.getValue(i)+"\n";
        }
        
        //document.getElementById("left").innerHTML = output;
        /*document.getElementById("right").innerHTML = "<div id=\"table\"></div>";
        let grid = new Grid({
            container:document.getElementById("table")[0],// 必须项
            colCount:5,
            rowCount:5,
            width:600,
            height:600,
        });*/
        /*var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        
        var svg = d3.select("#left").append("svg")
            .attr("width", width + margin.left + margin.right)*/

        document.getElementById("right").innerHTML = "<canvas id=\"wordInfo\" width=\"29500\" height=\"3500\" style=\"border:1px solid #000000;margin-left: 0;\"></canvas>";
        
        //document.getElementById("left").innerHTML = userList.getSize();
        
        var userWords = new linkedList();
        for(var i=1; i<userList.getSize(); i++)
        {
            var words = new linkedList();
            for(var j=0; j<wordList.getSize(); j++)
            {
                words.insert("0");
            }
            //document.getElementById("left").innerHTML = userLocate.getValue(i);
            for(var j=0; j<parseInt(userLocate.getValue(i).split(" ")[1]); j++)
            {
                for(var k=0; k<wordMatrix.split("\n")[parseInt(userLocate.getValue(i).split(" ")[0])+j].split(" ").length; k++)
                {
                    words.setValue(wordList.find(wordMatrix.split("\n")[parseInt(userLocate.getValue(i).split(" ")[0])+j].split(" ")[k]), 1);
                }
            }
            userWords.insert(words.toString());
        }
        
        var canvasMap = document.getElementById("wordInfo");
        var ctx = canvasMap.getContext("2d");
        ctx.font= "18px Arial";
        //document.getElementById("left").innerHTML = userWords.toString();
        var blackLocate = canvasMap.getContext("2d");
        blackLocate.fillStyle = "#000000";
        for(var i=0; i<wordList.getSize(); i++)
        {
            //ctx.strokeText(wordList.getValue(i), 110*(i+1)+25, 30, 100);//44*(i+1)+8, 20, 24);
        }
        for(var i=0; i<userList.getSize(); i++)
        {
            
            //ctx.strokeText(userList.getValue(i),50, 90+60*i, 110);//20, 38+24*i, 44);
            for(var j=0; j<userWords.getValue(i).split(" ").length; j++)
            {
                if(parseInt(userWords.getValue(i).split(" ")[j]) == 1)
                {
                    blackLocate.fillRect(110*(j+2)-220, 60*(i+1), 100, 57);//(44*(j+2), 24*(i+1), 40, 20);
                }
            }
        }
        
        document.getElementById("left").innerHTML = "<canvas id=\"idInfo\" width=\"300\" height=\"3500\" style=\"border:1px solid #000000;margin-left: 0;\"></canvas>";
        var idMap = document.getElementById("idInfo");
        var ctz = idMap.getContext("2d");
        var info = 0;
        for(var i=0; i<userList.getSize(); i++)
        {
            info++;
            ctz.strokeText(userList.getValue(i), 50, 90+60*i, 110);//20, 38+24*i, 44);
        }
   

        document.getElementById("top").innerHTML = "<canvas id=\"wordInfo\" width=\"29500\" height=\"120\" style=\"border:1px solid #000000;margin-left: 0;\"></canvas>";
        var idMap = document.getElementById("wordInfo");
        var wtz = idMap.getContext("2d");
        var info = 0;
        for(var i=0; i<wordList.getSize(); i++)
        {
            wtz.strokeText(wordList.getValue(i), 110*(i+1)+25,100, 100);//20, 38+24*i, 44);
        }
    });
}
            
function deleteData() {
    var getDiv = document.getElementById("infoTable");
    getDiv.innerHTML = "";
}

function personalGraph(id) {
    //document.getElementById("testInfo").innerHTML = id;
    var userId = {"userid": id};
    window["sendId"] = userId;
    window.open("/COMP-4990-1/userInfo.html");
}

function linkedList() {
    this.head = new node(""); 
    this.find = find;
    this.insert = insert;
    //this.remove = remove;
    //this.findPrev = findPrev;
    this.display = display;
    this.getValue = getValue;
    this.getSize = getSize;
    this.setValue = setValue;
    this.toString = toString;
}

function node(value) {
    this.value = value;
    this.next = null;
}

function find(value) {
    var currNode = this.head;
    var locate = 0;
    while(currNode.value != value)
    {
        if(currNode.next == null)
        {
            return -1;
        }
        currNode = currNode.next;
        locate++;
    }
    return locate;
}

function display() {
    var currNode = this.head;
    var value = "";
    while(currNode.next != null)
    {
        value+=currNode.next.value+" ";
        currNode = currNode.next;
    }

    document.getElementById("left").innerHTML = value;
}

function toString() {
    var currNode = this.head;
    var values = "";
    while(currNode.next != null)
    {
        values+=currNode.next.value+" ";
        currNode = currNode.next;
    }

    return values;
}

function insert(value) {
    var currNode = this.head;
    while(currNode.next != null)
    {
        currNode = currNode.next;
    }
    var newNode = new node(value);
    newNode.next = currNode.next;
    currNode.next = newNode;
}

function getValue(locate) {
    var currNode = this.head;
    for(var i=0; i<locate; i++)
    {
        currNode = currNode.next;
        if(currNode == null)
        {
            return false;
        }
    }
    return currNode.value;
}

function setValue(locate, value) {
    var currNode = this.head;
    for(var i=0; i<locate; i++)
    {
        currNode = currNode.next;
    }
    currNode.value = value;
}

function getSize() {
    var currNode = this.head;
    var size = 1;
    while(currNode.next != null)
    {
        size++;
        currNode = currNode.next;
    }
    return size;
}
