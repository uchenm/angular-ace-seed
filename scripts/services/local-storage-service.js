(function(){
    "use strict";
    angular.module('LocalStorage', [{
        name:'LocalStorageModule',
        files:['components/angular-local-storage/dist/angular-local-storage.js']
    }]);

    angular.module('LocalStorage')
        .config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('rp')
            .setStorageType('localStorage')
            .setNotify(true, true);
        })
        .factory('userStorage', function() {
            //var storageKey = 'user_info';
            return {
                store : function(storageKey,data) {
                    return localStorage.setItem(storageKey, data);
                },
                retrieve : function(storageKey) {
                    return localStorage.getItem(storageKey);
                },
                clear : function(storageKey) {
                    return localStorage.removeItem(storageKey);
                }
            };
        });

}).call(this);