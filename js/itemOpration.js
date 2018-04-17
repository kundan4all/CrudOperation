const itemOprations = {
    itemList:[],
    id:1,
    addItem( name, desc, itemdate, branch, color){
        var itemObject = new Item(this.id, name, desc, itemdate, branch, color);
        this.itemList.push(itemObject);
          this.id++;
    },

    deleteItem(){
        return this.itemList = this.itemList.filter(function(itemObject){
            return itemObject.markForDelete==false;
        });

    },

    sortByName(){
     this.itemList.sort(function(first,second){
     return first.name.localeCompare(second.name);
     });

        
    },
    sortById(){
        this.itemList.sort(function(first,second){
         return first.id-second.id;
        });
    },
  

   searchById(id){
             var index= this.itemList.findIndex(function(itemObject){
                 return itemObject.id == id;
             });
             return index;
   },


   countMark(){
    return this.itemList.filter(function(itemObject){
         return itemObject.markForDelete;
     }).length;
},
   markRecordDelete(id){
       var index = this.searchById(id);
       var itemObject = this.itemList[index];
       itemObject.toggleDelete();
   }
    
}

