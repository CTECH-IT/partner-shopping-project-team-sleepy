(function (window) {
    'use strict';

    const FORM_SELECTOR = '[data-shopping-order="form"]';
    const CHECKLIST_SELECTOR = '[data-shopping-order="checklist"]';
    const SERVER_URL = 'https://saturn.rochesterschools.org:8080/json';

    const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

    var orderedItems = 0;

    let App = window.App;
    let Truck = App.Truck;
    let DataStore = App.DataStore;
    let RemoteDataStore = App.DataStore;
    let FormHandler = App.FormHandler;
    let CheckList = App.CheckList;
    let Validation = App.Validation;

    let remoteDS = new RemoteDataStore(SERVER_URL);

    let myTruck = new Truck('12345', remoteDS);
    window.myTruck = myTruck;

    let checkList = new CheckList(CHECKLIST_SELECTOR);

    let formHandler = new FormHandler(FORM_SELECTOR);

    

    

    formHandler.addSubmitHandler(function (data) {
        console.log(data);
        myTruck.createOrder(data);
        checkList.addRow(checkList, data);
    })

    

    console.log(formHandler);

    function addThumbClickHandler(thumbnail) {
        'use strict';
        thumbnail.addEventListener('click', function(event) {
            event.preventDefault(); //stop browser from following link
            orderedItems+=1;
        });
    }
    
    function getThumbnailsArray() {
        'use strict';
        let thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
        let thumbnailArray = [].slice.call(thumbnails); //convert NodeList to array
        return thumbnailArray;
    }

    function initializeEvents() {
        'use strict';
        let thumbnails = getThumbnailsArray();
        thumbnails.forEach(addThumbClickHandler);
    }
    initializeEvents();

    
    formHandler.addInputHandler(Validation.isCompanyEmail);


})(window);