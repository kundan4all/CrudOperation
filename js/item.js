class Item{
    constructor(id, name, desc, itemdate, branch, color){

    
    this.id = id;
    this.name= name;
    this.desc= desc;
    this.itemdate= itemdate;
    this.branch = branch;
    this.color = color;
    this.markForDelete = false;
   }
   toggleDelete(){
       this.markForDelete = ! this.markForDelete;
   }
}