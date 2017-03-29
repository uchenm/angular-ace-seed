(function () {
    angular.module("aceColor", []);

    angular.module('aceColor').directive('aceColorpicker', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngModel: '=?',
                ngValue: '=?',
                options: '=?',
                colors: '=?',
                addNew: '=?'
            },

            template: '<div uib-dropdown class="dropdown-colorpicker">' +
            '<a href="" uib-dropdown-toggle><span class="btn-colorpicker" ng-style="{\'background-color\': selectedColor}"></span></a>' +
            '<ul uib-dropdown-menu aria-labelledby="colorpicker-dropdown" ng-class="{\'dropdown-menu-right\': options.pull_right, \'dropdown-caret\': options.caret}">' +
            '<li ng-repeat="color in sourceColors">' +
            '<a href="" ng-click="selectColor(color.color)" ng-class="{\'colorpick-btn\': true , \'selected\': color.selected}" ng-style="{\'background-color\': color.color}"></a>' +
            '</li>' +
            '</ul>' +
            '</div>',
            link: function ($scope, element, attributes) {

                $scope.addNew = $scope.addNew || false;//if ngModel is assigned a new value, should we add it to our list or not?
                $scope.sourceColors = {};
                $scope.options = angular.extend({'caret': true}, $scope.options);

                var selectedColor = false;
                $scope.selectedColor = false;

                //list of colors
                //we convert it to an object like {'#FF0000': {color: '#FFFF00', value: 'redValue', selected: false} , ... }
                $scope.$watch('colors', function (newValue) {
                    var isObj = false;
                    var sourceColors = $scope.colors || [];

                    if (angular.isArray(sourceColors)) isObj = false;
                    else if (angular.isObject(sourceColors)) isObj = true;
                    else return;

                    $scope.sourceColors = {};
                    angular.forEach(sourceColors, function (value, index) {
                        if (isObj) {
                            //index is color name, value is some value
                            $scope.sourceColors[index] = {'color': index, 'value': value, 'selected': false};
                        }
                        else {
                            if (angular.isObject(value)) {
                                //value is an object {color: red, value: something}
                                $scope.sourceColors[value.color] = {
                                    'color': value.color,
                                    'value': value.value,
                                    'selected': false
                                };
                            }
                            else {
                                //value is a string (color)
                                $scope.sourceColors[value] = {'color': value, 'value': value, 'selected': false};
                            }
                        }
                    });
                });

                //gets called when a color is selected
                $scope.selectColor = function (color) {
                    $scope.ngModel = color;
                }
                return $scope.$watch('ngModel', function (newValue) {
                    if (!newValue) return;

                    var newColor;
                    if (angular.isObject(newValue) && ('color' in newValue)) newColor = newValue.color;
                    else if (angular.isString(newValue)) newColor = newValue;
                    else return;

                    //if we already have the color
                    if ($scope.sourceColors.hasOwnProperty(newColor)) {
                        if (selectedColor) $scope.sourceColors[selectedColor].selected = false;
                        $scope.sourceColors[newColor].selected = true;
                        selectedColor = newColor;
                    }
                    //if we don't have the new color let's add it
                    else if ($scope.addNew) {
                        if (selectedColor) $scope.sourceColors[selectedColor].selected = false;

                        if (angular.isObject(newValue) && ('color' in newValue)) {
                            $scope.sourceColors[newColor] =
                                {
                                    'color': newColor,
                                    'value': ('value' in newValue) ? newValue.value : newColor,
                                    'selected': true
                                };
                            $scope.ngModel = selectedColor = newColor;//ngModel shouldn't be an object
                        }
                        else if (angular.isString(newValue)) {
                            $scope.sourceColors[newColor] = {'color': newColor, 'value': newColor, 'selected': true};
                            selectedColor = newColor;
                        }
                    }

                    $scope.selectedColor = selectedColor;
                    $scope.ngValue = newValue in $scope.sourceColors ? $scope.sourceColors[newColor].value : '';
                });
            }
        };
    });
})();

