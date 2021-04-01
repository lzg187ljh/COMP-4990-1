/*function Node(element) {
    this.element = element;   //当前节点的元素
    this.next = null;         //下一个节点链接
}

function LList () {
    this.head = new Node( 'head' );     //头节点
    this.find = find;                   //查找节点
    this.insert = insert;               //插入节点
    this.remove = remove;               //删除节点
    this.findPrev = findPrev;           //查找前一个节点
    this.display = display;             //显示链表
}

function find ( item ) {
    var currNode = this.head;
    while ( currNode.element != item ){
        currNode = currNode.next;
    }
    return currNode;
}

function insert ( newElement , item ) {
    var newNode = new Node( newElement );
    var currNode = this.find( item );
    newNode.next = currNode.next;
    currNode.next = newNode;
}

function findPrev( item ) {
    var currNode = this.head;
    while ( !( currNode.next == null) && ( currNode.next.element != item )){
        currNode = currNode.next;
    }
    return currNode;
}

function remove ( item ) {
    var prevNode = this.findPrev( item );
    if( !( prevNode.next == null ) ){
        prevNode.next = prevNode.next.next;
    }
}

function display () {
    var currNode = this.head;
    var output = "";
    while ( !(currNode.next == null) ){
        //console.log( currNode.next.element );
        output+=currNode.next.element+" ";
        currNode = currNode.next;
    }
    document.getElementById("test").innerHTML = output;
}

function output() {
    var fruits = new LList();

    fruits.insert('Apple' , 'head');
    fruits.insert('Banana' , 'Apple');
    fruits.insert('Pear' , 'Banana');

    console.log(fruits.display()); 
}
*/

function canvas() {
    document.getElementById("test").innerHTML = "<canvas id=\"testCanvas\" width=\"2000\" height=\"1000\" style=\"border:1px solid #000000;\"></canvas>"
    var canvasMap = document.getElementById("testCanvas");
    var ctx = canvasMap.getContext("2d");
        
    //ctx.font="30px Arial";
    //ctx.strokeText("Hello World",10,50);
    //ctx.strokeText("Hello World",10,150);
    
    var id="1234 234 3456 456 5678 678 7890 890 9012 012";
    id = id.split(" ");
    var value = "1 0 1\n0 1 0\n0 1 0\n1 0 1\n1 0 1\n0 1 0\n1 0 1\n1 0 1\n1 0 1\n0 1 0";
    value = value.split("\n");

    ctx.font="20dp Arial";
    var blackLocate = canvasMap.getContext("2d");
    blackLocate.fillStyle="#FFFFFF";
    var whiteLocate = canvasMap.getContext("2d");
    whiteLocate.fillStyle="#000000";

    //whiteLocate.fillRect(110, 50, 210, 10);
    //blackLocate.fillRect(220, 50, 320, 10);
    var info = "";
    for(var i=0; i<value.length; i++)
    {
        ctx.strokeText(id[i]+id[i+1], 110*(i+1), 15, 100);
    }
    for(var i=0; i<value.length; i++)
    {
        ctx.strokeText(id[i], 50, 90+60*i, 110);
        var line = value[i].split(" ");
        //info+=parseInt(value[i])+" ";
        
        for(var j=0; j<line.length; j++)
        {
            if(parseInt(line[j]) != 0)
            {
                whiteLocate.fillRect(110*(j+1), 60*(i+1), 100, 50);
                info+=parseInt(line[j])+" ";
            }
            else
            {
                //blackLocate.fillRect(110, 60*i, 100, 50);
                info+=parseInt(line[j])+" ";
            }
        }
            
    }
    document.getElementById("name").innerHTML = info;
}

