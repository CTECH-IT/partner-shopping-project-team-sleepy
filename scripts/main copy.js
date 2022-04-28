(function (window) {
    'use strict';

    const FORM_SELECTOR = '[data-shopping-order="form"]';
    const CHECKLIST_SELECTOR = '[data-shopping-order="checklist"]';
    const SERVER_URL = 'https://saturn.rochesterschools.org:8080/json';

    let App = window.App;
    let Truck = App.Truck;
    let DataStore = App.DataStore;
    let RemoteDataStore = App.RemoteDataStore;
    let LocalDataStore = App.LocalDataStore;
    let CheckList = App.CheckList;

    let remoteDS = new RemoteDataStore(SERVER_URL);
    let localDS = new LocalDataStore();

    let myTruck = new Truck('12345', localDS);
    window.myTruck = myTruck;

    let checkList = new CheckList(CHECKLIST_SELECTOR);
    
    let data = localDS.getAll();

    for (let order in data) {
        checkList.addRow(data[order]);
    }

    

    
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));


})(window);