function getId() {
    var receive = window.opener["sendId"];

    var id = receive["userid"];
    document.getElementById("userId").innerHTML = id;
    return id;
}

function monthlyGraph() {
    graph("monthly.csv");
}

function weeklyGraph() {
    graph("weekly.csv");
}

function dailyGraph() {
    graph("daily.csv");
}

function graph(select) {
    var link = "/COMP-4990-1/data/"+select;
    d3.csv(link, function(error, csvdata){
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log(csvdata);
        }

        var userId = getId();
        var dataSet = d3.csv.format(csvdata);
        var wordMatrix = "";//csvdata[0].matrix;
        var numberMatrix = "";
        var len = 0;
        var check = "";
        var timeList = "";
        for(var i=0; i<csvdata.length; i++)
        {
            //check+=parseInt(csvdata[i].user_id) +" "+ parseInt(userId)+"\n";
            if(parseInt(csvdata[i].user_id) == parseInt(userId))
            {
                check+=i;
                for(var j=1; j<csvdata[i].matrix.split("'").length; j+=2)
                {
                    wordMatrix+=csvdata[i].matrix.split("'")[j]+" ";
                }
                wordMatrix+="?";
                for(var j=0; j<csvdata[i].matrix.split(",").length; j+=2)
                {
                    numberMatrix+=csvdata[i].matrix.split(",")[j].split("(")[1]+" ";
                }
                numberMatrix+="?";
                timeList+=csvdata[i].time+" ";
                len++;
            }
        }
        //document.getElementById("testOutput").innerHTML = check;
        wordMatrix = wordMatrix.split("?");
        numberMatrix = numberMatrix.split("?");
        timeList = timeList.split(" ");
        console.log(timeList);
        var table = "<table>";
        for(var i=0; i<wordMatrix.length-1; i++)
        {
            table+="<tr>"+
                "<td>Date: "+timeList[i]+"</td>"+
                "<td>Matrix:["+wordMatrix[i]+"]</td></tr>";
        }
        table+="</table>";
        document.getElementById("userId").innerHTML = userId;
        document.getElementById("section2").innerHTML = table;
        //for(var i=0; i<)
        //document.getElementById("testOutput").innerHTML = wordMatrix+":::"+numberMatrix;//len+" "+parseInt(csvdata[20].user_id)+" "+parseInt(userId);//wordMatrix.split("\n").length;
        var wordList = new linkedList();
        var numList = new linkedList();
        for(var i=0; i<wordMatrix.length; i++)
        {
            for(var j=0; j<wordMatrix[i].split(" ").length; j++)
            {
               if(wordList.find(wordMatrix[i].split(" ")[j]) == -1)
               {
                    wordList.insert(wordMatrix[i].split(" ")[j]);
                    //numList.insert(parseInt(numberMatrix[i].split(" ")[j]));
               }
               /*else
               {
                    var value = numList.getValue(wordList.find(wordMatrix[i].split(" ")[j]));
                    //value+=parseInt(numberMatrix[i].split(" ")[j]);
                    //numList.setValue(wordList.find(wordMatrix[i].split(" ")[j]), value);
               }*/
            }
        }
        var timeMatrix = "";
        for(var i=0; i<wordMatrix.length; i++)
        {
            var line = new linkedList();
            for(var n=0; n<wordMatrix[i].split(" ").length; n++)
            {
                line.insert(wordMatrix[i].split(" ")[n]);
            }
            var m=0;
            for(var n=0; n<wordList.getSize(); n++)
            {
                if(line.find(wordList.getValue(n))!=-1)
                {
                    timeMatrix+=numberMatrix[i].split(" ")[m]+" ";
                    m++;
                }
                else
                {
                    timeMatrix+=0+" ";
                }
            }
            timeMatrix+="\n";
        }
        timeMatrix = timeMatrix.split("\n");
        console.log(timeMatrix);
        //document.getElementById("testOutput").innerHTML =wordMatrix[1];//]+":::"+wordList.toString()+":::"+timeMatrix;

        /*function words(time, num) {
            this.time = time;
            this.num = num;
        }
        var word_num = [];
        for(var i=0; i<timeList.length; i++)
        {
            word_num.align = words("aaa", i);//timeList[i], timeMatrix.split("\n").split(" ")[i]);
        }
        //function monthlist()
        document.getElementById("testOutput").innerHTML = {"a": 1};
        var database = [];
        for(var i=0; i<wordMatrix.length; i++)
        {

        }*/
        function word_obj(word, obj) {
            this.word = word;
            this.obj = obj;
        }

        function time_num(time, num) {
            this.time = time;
            this.num = num;
        }

        var database = [];
        var check = "";
        for(var i=1; i<wordList.getSize(); i++)//生成总数组
        {
            check+=i+" ";
            var month = [];
            for(var j=0; j<timeList.length; j++)//生成月份-次数数组
            {
                month[j] = new time_num(timeList[j], timeMatrix[j].split(" ")[i]);
            }
            database[i] = new word_obj(wordList.getValue(i), month);
        }
        console.log(database);
        var width = 700+timeList.length*100;
        var height = 700+wordList.getSize()*50;
        document.getElementById("chart").innerHTML = "<canvas id=\"graph\" width=\""+width+"\" height=\""+height+"\" style=\"border:1px solid #000000;margin-left: 0;\"></canvas>";
        var canvasMap = document.getElementById("graph");
        var ctx = canvasMap.getContext("2d");
        ctx.moveTo(400, 100);
        ctx.lineTo(400, width-200);
        ctx.moveTo(400, 100);
        ctx.lineTo(height-200, 100);
        ctx.stroke();
        for(var i=0; i<timeList.length; i++)
        {
            ctx.fillText(timeList[i], 450+100*i, 50, 100);
        }
        var colorBase = 999999;
        var locate = [];
        for(var i=0; i<timeList.length; i++)
        {
            locate[i] = 100;
        }
        //var chek = "";
        var tag = 100;
        for(var i=0; i<wordList.getSize(); i++)
        {
            ctx.fillText(wordList.getValue(i), 100, 100+i*20, 100);
        }
        for(var i=1; i<wordList.getSize()-1; i++)
        {
            
            colorBase-=colorBase/wordList.getSize();
            //chek+=colorBase+" ";
            ctx.fillStyle = "#"+parseInt(colorBase);
            for(var j=0; j<timeList.length; j++)
            {
                if(timeMatrix[j].split(" ")[i] == 0)
                {
                    ctx.fillStyle = "#FFFFFF";
                }
                else
                {
                    ctx.fillStyle = "#"+parseInt(colorBase);
                }
                ctx.fillRect(450+100*j, locate[j], 75, 50);
                locate[j]+=50;
            }
            ctx.fillStyle = "#"+parseInt(colorBase);
            ctx.fillRect(200, 110+i*20, 10, 10);
        }
        //document.getElementById("testOutput").innerHTML = chek;

        //console.log(locate);
        /*var stack = d3.layout.stack()
                    .values(function(d) {return d.word;})
                    .x(function(d) {return d.time;})
                    .y(function(d) {return d.num});
        var data = stack(database);

        var width = 700;
        var height = 500;
        var svg = d3.select('#chart')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);

        var padding = {
            top: 50,
            right: 100,
            bottom: 50,
            left: 50
        }

        var charts = svg.append('g')
                        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')');

        var colors = d3.scale.category10();
        var maxProfit = d3.max(data[data.length - 1].sales, function(d) {
            return d.y0 + d.y;
        });
        var xScale = d3.scale.ordinal().domain([2005, 2006, 2007, 2008, 2009]).rangeBands([0, width - padding.left - padding.right], 0.3);
        var yScale = d3.scale.linear().domain([0, maxProfit]).range([0, height - padding.top - padding.bottom]);

        var stack = charts.selectAll('.stakc')
                    .data(data)
                    .enter()
                    .append('g')
                    .classed('stack', true)
                    .attr('fill', function(d, i) {
                        return colors(i);
                    });
                    var xAxis = d3.svg.axis().scale(xScale);
                    var yAxis = d3.svg.axis().scale(yScale.range([height - padding.top - padding.bottom, 0])).orient('left');
                    charts.append('g')
                        .classed('x axis', true)
                        .attr('transform', 'translate(0,' + (height - padding.top - padding.bottom) + ')')
                        .call(xAxis)
                    
                    charts.append('g')
                        .classed('y axis', true)
                        .call(yAxis);
                        stack.append('circle')
                        .attr('cx', function(d) {
                            return width - padding.left - padding.right * 0.9
                        })
                        .attr('cy', function(d, i) {
                            return i * 50
                        })
                        .attr('r', 5)
                    
                    stack.append('text')
                        .attr('x', function(d) {
                            return width - padding.left - padding.right * 0.8
                        })
                        .attr('y', function(d, i) {
                            return i * 50
                        })
                        .attr('dy', 5)
                        .text(function(d) {
                            return d.name;
                        })*/
    });
    //
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
