angular.module('rp',[]).component('treeMenu', {
    templateUrl: "views/layouts/default/partial/treemenu/tree-menu.html",
    bindings: {
        data: '<'
    },
    controller: ['$http', function ($http) {
        var vm = this;
        vm.$onInit = function () {
            console.log(vm.data);
            $http.get(vm.data)
                .then(function (response) {
                    vm.treeMenuItems = response.data;
                    console.log(vm.treeMenuItems)
                });
        };
        vm.active = function (item) {
            vm.selected = item;
        };

        vm.toggleSubmenu = function (item) {
            if (vm.opened == item) {
                vm.opened = null;
            } else {
                vm.opened = item;
            }
        }
        vm.isSubOpen = function(item) {
            if (vm.opened == item) return true;
            else return false;
        }
        vm.isActiveItem = function(item) {
            return vm.selected ===item;
        }
    }],
    controllerAs:'vm'
});
