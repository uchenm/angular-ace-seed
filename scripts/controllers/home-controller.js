/**
 * Created by Ming on 2017/3/30.
 */
(function () {
    angular.module('home',[
        {
            name:'settingsService',
            files:['scripts/services/settings-service.js']
        }
    ]).controller('HomeCtrl',function ($scope,$rootScope,SettingService) {
        $scope.settings=SettingService;

    });
})();