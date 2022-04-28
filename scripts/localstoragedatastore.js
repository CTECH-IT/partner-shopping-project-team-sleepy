(function (window) {
    'use strict';
    let App = window.App || {};

    function LocalDataStore() {
        let string = window.localStorage.getItem('data') || "{}";
        this.data = JSON.parse(string);
        window.localStorage.setItem('data', JSON.stringify(this.data));
    }

    LocalDataStore.prototype.add = function (val) {
        let string = window.localStorage.getItem('data') || "{}";
        this.data = JSON.parse(string);
        this.data[val.emailAddress] = val;
        window.localStorage.setItem('data', JSON.stringify(this.data));
    };

    LocalDataStore.prototype.get = function (key) {
        let string = window.localStorage.getItem('data') || "{}";
        this.data = JSON.parse(string);
        return this.data[key];
    };

    LocalDataStore.prototype.getAll = function () {
        let string = window.localStorage.getItem('data') || "{}";
        this.data = JSON.parse(string);
        let result = {};
        for (let order in this.data) {
            console.log(this.data)
            console.log(this.data[order]);
            result[order] = this.data[order];
        }
        return result;
    };

    LocalDataStore.prototype.remove = function(key) {
        let string = window.localStorage.getItem('data') || "{}";
        this.data = JSON.parse(string);
        delete this.data[key];
        window.localStorage.setItem('data', JSON.stringify(this.data));
    }

    App.LocalDataStore = LocalDataStore;
    window.App = App;

})(window);

