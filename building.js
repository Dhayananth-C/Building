import { LightningElement } from 'lwc';
import OBJECT_NAME from '@salesforce/schema/Building__c';
import Name from'@salesforce/schema/Building__c.Name';
import 	Address from'@salesforce/schema/Building__c.Address__c';
import Nooffloor from '@salesforce/schema/Building__c.Number_of_floor__c';


import OBJECT_FLAT from '@salesforce/schema/Flat__c';
import FLAT_NUMBER from '@salesforce/schema/Flat__c.Name';
import BUILDING from '@salesforce/schema/Flat__c.Building__c';
import FLAT_STATUS from '@salesforce/schema/Flat__c.Flat_Status__c';
import FLOOR from '@salesforce/schema/Flat__c.Floor__c';
import RENT from '@salesforce/schema/Flat__c.Rent__c';

import insertBuilding from '@salesforce/apex/BuildingClass.saveBuilding';
import insertFlat from '@salesforce/apex/BuildingClass.saveFlats';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class Building extends LightningElement {

    object=OBJECT_NAME;
    Field ={
        Name: Name,
        Address: Address,
        Nooffloor : Nooffloor,
    }
    objectFlat= OBJECT_FLAT;
    FlatField= {
        fnum :FLAT_NUMBER,
        building : BUILDING,
        fstatus : FLAT_STATUS,
        floor : FLOOR,
        rent : RENT,
    }


    displayBuild;
    displayFlats;
    buildingName;
    buildingAddress;
    buildingnooffloor;

    flatNumber;
    flatBuilding;
    flatStatus;
    flatFloor;
    flatRent;



    HandleAddBuilding(){
        this.displayBuild=true;
    }
    handleAddFlats(){
        this.displayFlats=true;
    }
    handleCancelBuilding(){
        this.displayBuild=false;
          
    }
   
    handleCancelFlats(){
        this.displayFlats=false;
    }

    handleChangeBuild(event)
    {
        const {name,value} =event.target;
        if(name=='Name'){
            this.buildingName=value;
        }
        if(name=='address'){
            this.buildingAddress=value;
        }
        if(name=='nooffloor'){
            this.buildingnooffloor=value;
        }
    }
    handleSaveBuilding(){

        insertBuilding({Name : this.buildingName,address :this.buildingAddress,Nooffloor :this.buildingnooffloor})
        .then(response=>{
            let myevent = new ShowToastEvent({
                title :"success",
                message : "record saved success fully" ,
                variant : "success" })
                this.dispatchEvent(myevent);



            this.displayBuild=false;
        })
        .catch(error=>{
            let myevent = new ShowToastEvent({
                title :"Failure",
                message : "record Not saved" ,
                variant : "Failure" })
                this.dispatchEvent(myevent);

        })
        
    }
    handleChangeFlat(event){
        const {name,value} = event.target;
        if(name=='fname'){
            this.flatNumber=value;
        }
        if(name=='building'){
            this.flatBuilding=value;
        }
        if(name=='fstatus'){
            this.flatStatus=value;
        }
        if(name=='floor'){
            this.flatFloor=value;
        }
        if(name=='rent'){
            this.flatRent=value;
        }  
    
    }

    handleSaveFlats(){
        insertFlat({fNumber : this.flatNumber,Building :this.flatBuilding,status :this.flatStatus,floor :this.flatFloor,rent :this.flatRent})
        .then(response=>{
            let myevent = new ShowToastEvent({
                title :"success",
                message : "Flat record saved success fully" ,
                variant : "success" })
                this.dispatchEvent(myevent);



                this.displayFlats=false;
        })
        .catch(error=>{
            console.log(error)
            let myevent = new ShowToastEvent({
                title :"Failure",
                message : "record Not saved" ,
                variant : "Failure" })
                this.dispatchEvent(myevent);

        })
       
    }

}