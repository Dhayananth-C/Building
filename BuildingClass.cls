/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 11-14-2024
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class BuildingClass {
    
    @AuraEnabled
    public static string saveBuilding(string Name,string address,integer Nooffloor){
        
        Building__c obj = new Building__c();
        obj.Name = Name;
        obj.Address__c =address;
        obj.Number_of_floor__c = Nooffloor;
        insert obj;
        return obj.id;
        
    }

    @AuraEnabled
    public static string saveFlats(string fNumber,string Building,string status,integer floor, integer rent){
        Flat__c flat= new Flat__c();
        flat.Name =fNumber;
        flat.Building__c = Building;
        flat.Flat_Status__c = status;
        flat.Floor__c = floor;
        flat.Rent__c = rent;

        insert flat;
        return flat.id;

    }
    @AuraEnabled(cacheable=true)
public static List<Contract> searchRecordByTenant(String BuildingName, String ContactName) {
    

    
    String query = 'SELECT Id, ContractNumber, Building__r.Name, Tenant__r.Name,Flat__c FROM Contract  ';

    
    if (String.isNotEmpty(BuildingName)) {
        query += ' where Building__r.Name LIKE :BuildingNames';
    }


    if (String.isNotEmpty(ContactName)&&String.isNotEmpty(BuildingName)) {
        query += ' AND Tenant__r.Name LIKE :ContactNames';
    }else if(String.isNotEmpty(ContactName)){
        query += ' where Tenant__r.Name LIKE :ContactNames';
    }

   
    String BuildingNames = '%' + BuildingName + '%';
    String ContactNames = '%' + ContactName + '%';

  
    return Database.query(query);


}

}