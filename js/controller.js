window.addEventListener("load", bindEvents);


function bindEvents(){
    printId();
    totalRecords();
    document.getElementById('add').addEventListener("click",addItem);
    document.getElementById('delete').addEventListener("click",deleteItem)
    document.getElementById('update').addEventListener("click",updateItem)
    document.getElementById('savelocal').addEventListener("click",saveLocal)
    document.getElementById('fetchlocal').addEventListener("click",fatchLocal)
    document.getElementById('sortbyid').addEventListener("click",sortById)
    document.getElementById('sortbyname').addEventListener("click",sortByName)
    document.getElementById('clear').addEventListener("click",Clear)

}

function Clear(){
   if( window.localStorage.clear){
       itemOprations.itemList.myitemlist = localStorage.clear()
     alert("clear sucusses fully");
     printTable()
   }
   else{
       alert("can't clear data...")
   }
}

function sortById(){
    itemOprations.searchById();
    printTable();
}

function sortByName(){
  itemOprations.sortByName();
    printTable();  

}

function saveLocal(){
    if(window.localStorage){
        localStorage.myitemlist = JSON.stringify(itemOprations.itemList);
        alert("data store...");
    }
    else{
        alert("Ur Browser Doesn't Support LocalStorage..");
    }
}

function fatchLocal(){
    if(window.localStorage){
        if(localStorage.myitemlist){
           itemOprations.itemList = JSON.parse(localStorage.myitemlist);
          printTable();
        }
        else{
            alert("Nothing to Load...");
        }

    }
    else{
        alert("Ur Browser Doesn't Support LocalStorage..");
    }

}


function updateItem(){
    itemObjectEdit.id = document.getElementById("itemNo").innerHTML;
    itemObjectEdit.name = document.getElementById("itemName").value;
    itemObjectEdit.desc = document.getElementById("Desc").value;
    itemObjectEdit.date = document.getElementById("itemDate").value;
    itemObjectEdit.color = document.getElementById("itemColor").value;
    itemObjectEdit.branch = document.getElementById("itembranch").value;
     
    printTable();
}


function deleteItem(){
    
    itemOprations.deleteItem();
    printTable();
}


const printId=()=>document.getElementById("itemNo").innerHTML = itemOprations.id;

function totalRecords(){
    document.getElementById("total").innerHTML = itemOprations.itemList.length;
    document.getElementById("marktotal").innerHTML = itemOprations.countMark();
}

function addItem(){
      //var  itemId= document.getElementById("itemNo").value;
      var  ItemName= document.getElementById("itemName").value;
       var itemDesc= document.getElementById("Desc").value;
       var itemDate= document.getElementById("itemDate").value;
       var itemColor= document.getElementById("itemColor").value;
       var itemBranch= document.getElementById("itembranch").value;
        
        itemOprations.addItem( ItemName, itemDesc, itemDate,itemColor, itemBranch );
        var lastObject = itemOprations.itemList[itemOprations.itemList.length-1]
        printRecord(lastObject);

    }
    
    function printIcon(path,cls,fn,id){
        var image=document.createElement("img");
        image.src = path;
        image.className = cls;
        image.setAttribute("item-id",id);
	    image.addEventListener("click",fn);
	    return image;

    }


    function markForDelete(event){
        var tr = event.srcElement.parentNode.parentNode;
        tr.classList.toggle("redrow");
        var id = event.srcElement.getAttribute("item-id");
        itemOprations.markRecordDelete(id);
        // alert("delete call...." +id);
    } 

    var itemObjectEdit;
    function editRecord(event){
        var id = event.srcElement.getAttribute("item-id");
        var index = itemOprations.searchById(id);
        itemObjectEdit = itemOprations.itemList[index];
        document.getElementById("itemNo").innerHTML = itemObjectEdit.id;
        document.getElementById("itemName").value = itemObjectEdit.name;
        document.getElementById("Desc").value = itemObjectEdit.desc;
        document.getElementById("itemDate").value = itemObjectEdit.date;
        document.getElementById("itemColor").value = itemObjectEdit.color;
        document.getElementById("itembranch").value = itemObjectEdit.branch;
      

       //console.log("edit for ready..." );
       // alert("edit record call....");
    } 

    function printTable(){
        document.getElementById("itemtable").innerHTML="";
        itemOprations.itemList.forEach((itemObject)=>printRecord(itemObject));
    }
 


    function printRecord(itemObject){
        printId();
        totalRecords();
        var tbody= document.getElementById("itemtable");
        var tr= tbody.insertRow();
        var index=0;
        for(let key in itemObject){
            if(key=='markForDelete'){
                continue;
            }
        tr.insertCell(index).innerHTML = itemObject[key];
        index++;
     
        }

        var deleteIcon = printIcon('./image/delete.png','imagestyle',markForDelete, itemObject.id);
        var td = tr.insertCell(index);
        td.appendChild(deleteIcon);
        var editIcon = printIcon('./image/edit.png','imagestyle',editRecord, itemObject.id);
        
        td.appendChild(editIcon);
    }