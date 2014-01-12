var personArr = [];
var finishedArr = [];
var drawLotsText = "";
var returnOrGet = null;

$(document).ready(function(){
  
  bindEvent();
});

function bindEvent()
{
  $("#btnOK").bind("tap", function(e){
    if(!checkInput())
      return;
    $.mobile.changePage("#main");  
    doSetting();
  });  
  
//  $(document).bind("orientationchange", function(e,data){
//    alert(e); 
//  })
   
  $("#msgbox").bind("pagebeforeshow", function(){
     $("#msgText")[0].innerHTML = drawLotsText;
  });
  
  $("#msgbox").bind("pagehide", function(){
    $("#msgText")[0].innerHTML = drawLotsText = "";
  });
   
  $("#btnDrawLots").bind("tap", function(e){
      onDrawLots();
  }) 
  
  $("#btnReturnNumber").bind("tap", function(e){
      returnOrGet = 0;
  })
   
  $("#btnGetNumber").bind("tap", function(e){
      returnOrGet = 1;
  }) 
  
  $("#numberPage").bind("pageshow", function(){
     onShowNumberList();
  }); 
  
  $("#numberPage").bind("pagehide", function(){
     clearNumberList();
  }); 
   
  $(".numberItem").live("tap", function(e){
     doReturnOrGetNumber(e.target.innerHTML);
  })
  
  $("#btnBack").bind("tap", function(e){
     var r = confirm("确实要返回重新抽签吗?");
     if(r)
       $.mobile.changePage("#setting","fade");//$("#main").back(); 
  })
   
}

function clearNumberList()
{
  $("#numberList").empty();
  returnOrGet = null;
}

function doReturnOrGetNumber(num)
{
  if(returnOrGet == null)
    return;
  if(returnOrGet === 0)
  {
    finishedArr.splice(finishedArr.indexOf(num), 1);
    personArr.push(num);
  }  
  else if(returnOrGet == 1)
  {
    personArr.splice(personArr.indexOf(num), 1);
    finishedArr.push(num);    
  }  
  $("#numberPage").dialog("close");  
}

function showNumberList(arrList)
{
  var arr = distinctArr(arrList);
  for(var i = 0; i < arr.length; i++)
  {
    var $item = $('<li><a href="#" class="numberItem">' + arr[i] + "</a></li>");
    $("#numberList").append($item);
  }
  $("#numberList").listview("refresh");
}

function distinctArr(arrList)
{
  var arr = [];
  for(var i = 0; i < arrList.length; i++)  
  {
    var d = arrList[i];
    if(arr.indexOf(arrList[i].toString()) != -1)
      continue;
    arr.push(arrList[i]);
  }
  return arr.sort();
}

function onShowNumberList()
{
  if(returnOrGet === 0)
  {
    showNumberList(finishedArr);
  }  
  else if(returnOrGet == 1)
  {
    showNumberList(personArr); 
  }
}


function doSetting()
{
  personArr = [];
  finishedArr = [];
  var pNumber = parseInt($("#pNumber").val());
  var teamNumber = parseInt($("#teamNumber").val());
  var personInTeam = parseInt(pNumber / teamNumber);
  for(var i = 0; i < teamNumber; i++)
  {
    for(var t = 0; t < personInTeam; t++)
    {
        personArr.push(String.fromCharCode(65 + i));
    }
  }
  //余数
  var num = pNumber % teamNumber;
  if(num != 0)
  {
    for(var j = 0; j < num; j++)
    {
      personArr.push(String.fromCharCode(65 + j));
    }  
  }  
}

function onDrawLots()
{
  if(!personArr.length)
  {
    //alert("抽签完毕!");
    drawLotsText = "抽签完毕!";
    return;
  }
  var num = parseInt(Math.random() * personArr.length);
  var t = personArr[num];
  personArr.splice(num, 1)
  finishedArr.push(t);
  drawLotsText = t;
}

function checkInput(e)
{
  var pNumber = parseInt($("#pNumber").val());
  var teamNumber = parseInt($("#teamNumber").val());
 
  if(!pNumber || !teamNumber || isNaN(pNumber) || isNaN(teamNumber))
  {
    alert("请输入正确的数字!");
    return false;  
  }
  if(pNumber < teamNumber)
  {
    alert("分组数不能大于总人数!");
    return false;  
  }
  
  if(teamNumber > 26)
  {
    alert("组数过多!");
    return false;  
  }
  
  return true;
}

//test
function test1(){
	alert(1);
	alert(2);
}
