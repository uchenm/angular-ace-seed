/**
 * Created by Ming on 2017/3/28.
 */

(function () {
    angular.module('AceApp', ['ngAnimate', 'ngSanitize', 'ui.router', 'oc.lazyLoad']);
    angular.module('AceApp').config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "views/home.html",
                // controller:"HomeCtrl as home",
                // resolve:{
                //     home: function ($ocLazyLoad) {
                //         return $ocLazyLoad.load(
                //             {
                //                 name: "home",
                //                 files: ["scripts/controllers/home-controller.js"]
                //             }
                //         )
                //     }
                // }
            })
            .state("login", {
                url: "/login",
                templateUrl: "views/login/login.html",
                abstract:true
            })
            .state("login.login", {
                url: "/login",
                templateUrl: "views/login/login-box.html",
            })
            .state("login.forget", {
                url: "/forget",
                templateUrl: "views/login/forget-box.html",
            })
            .state("login.signup", {
                url: "/signup",
                templateUrl: "views/login/signup-box.html",
            })
            ;

        $urlRouterProvider.otherwise('/home');
    });
    angular.module('AceApp').config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            events: true
        });
    }]);

    angular.module('AceApp').factory('SettingService', ['$http',function ($http) {
        var vm = angular.extend({});

        vm.ace = {};
        vm.ace.settings = vm.ace.settings || {};

        vm.ace.settings = {
            'is_open': false,
            'navbar': false,
            'sidebar': false,
            'breadcrumbs': false,
            'hover': false,
            'compact': false,
            'highlight': false,
            'rtl': false,
            'skinColor': '#438EB9',
            'skinIndex': 0
        };

        vm.ace.path = {
            'assets': 'assets' //used in page templates when linking to images, etc
        };

        vm.ace.site = {
            brand_text: 'Ace Admin',
            brand_icon: 'fa fa-leaf',
            version: '1.4'
        };

        //sidebar variables
        vm.ace.sidebar = {
            'minimized': false,//used to collapse/expand
            'toggle': false,//used to toggle in/out mobile menu
            'reset': false//used to reset sidebar (for sidebar scrollbars, etc)
        };

        vm.bodySkin = function () {
            var skin = vm.ace.settings.skinIndex;
            // var skin = 2;
            if (skin == 1 || skin == 2) return 'skin-' + skin;
            else if (skin == 3) return 'no-skin skin-3';
            return 'no-skin';
        };

        vm.test = function () {
            console.log("test");
        };


        vm.open = function () {
            console.log("test");
            vm.ace.settings.is_open = !vm.ace.settings.is_open;
            console.log(vm.ace.settings.is_open );

        };
        vm.isOpen = function () {
            return vm.ace.settings.is_open;
        };

        vm.toggleSidebarMimimize = function () {
            vm.ace.sidebar.minimized = !vm.ace.sidebar.minimized;
        };

        return vm;
    }]);

    angular.module('AceApp').controller('SettingsCtrl', function ($scope, $rootScope,SettingService) {
        $scope.settings = SettingService;

        $scope.$watch('settings.ace.settings.compact', function (newValue) {
            if (newValue === true) {
                //if sidebar is compact, it should be in 'hover' mode as well
                $scope.settings.ace.settings.hover = true;
            }
        });

        //viewContentLoading is used in angular/views/index.html to show/hide content and progress bar (spinner icon) when loading new pages
        $rootScope.viewContentLoading = false;
        $rootScope.$on('$stateChangeStart', function(event) {
            //cfpLoadingBar.start();
            $rootScope.viewContentLoading = true;
            //also hide sidebar in mobile view when navigating to a new state
            $scope.settings.ace.sidebar.toggle = false;
        });
        $rootScope.$on('$stateChangeSuccess', function(event){
            //cfpLoadingBar.complete();
            $rootScope.viewContentLoading = false;
        });
        $rootScope.$on('$stateChangeError', function(event, p1, p2, p3){
            //cfpLoadingBar.complete();
            $rootScope.viewContentLoading = false;
        });
    });

})();


