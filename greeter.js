angular.module('component', []).controller('componentCtrl', function ($scope, $element, $attrs) {
        var ctrl = this;
        ctrl.heros = [{
            name: 'fqy',
            location: 'hs'
        }, {
            name: 'lhc',
            location: 'hs'
        }, {
            name: 'ryy',
            location: 'ry'
        }, {
            name: 'tbg',
            location: 'hs'
        }];
        ctrl.updateHero = function (hero, prop, value) {
            hero[prop] = value;
        }
        ctrl.deleteHero = function (hero) {
            var idx = ctrl.heros.indexOf(hero);
            if (idx >= 0) {
                ctrl.heros.splice(idx, 1);
            }

        }
        ctrl.addHero = function (name, location) {
            ctrl.heros.push({
                name: name,
                location: location
            })
        }
        console.log(ctrl);
    })
    .controller('componentCtrl2', function () {
        var ctrl = this;
        ctrl.delete = function () {
            ctrl.onDelete({
                hero: ctrl.hero
            });
        }
        ctrl.update = function (prop, value) {
            ctrl.onUpdate({
                hero: ctrl.hero,
                prop: prop,
                value: value
            })
        }
        console.log(ctrl);
    })
    .controller('componentCtrl3', function () {
        var ctrl = this;
        ctrl.add = function () {
            ctrl.onUpdate({
                name: ctrl.name,
                location: ctrl.location
            })
        }
        console.log(ctrl);
    })
    .controller('componentCtrl4', function ($scope, $element, $attrs) {
        var ctrl = this;
        ctrl.editMode = false;

        ctrl.handleModeChange = function () {
            if (ctrl.editMode) {
                ctrl.onUpdate({
                    value: ctrl.fieldValue
                });
                ctrl.fieldValueCopy = ctrl.fieldValue;
            }
            ctrl.editMode = !ctrl.editMode;
        };

        ctrl.reset = function () {
            ctrl.fieldValue = ctrl.fieldValueCopy;
        };

        ctrl.$onInit = function () {
            // Make a copy of the initial value to be able to reset it later
            ctrl.fieldValueCopy = ctrl.fieldValue;

            // Set a default fieldType
            if (!ctrl.fieldType) {
                ctrl.fieldType = 'text';
            }
        };
        console.log(ctrl);
    })
    .component('component', {
        templateUrl: 'heroList.html',
        controller: 'componentCtrl',
    })
    .component('component2', {
        templateUrl: 'heroDetail.html',
        controller: 'componentCtrl2',
        bindings: {
            hero: '=',
            onDelete: '&',
            onUpdate: '&'
        }
    })
    .component('component3', {
        templateUrl: 'heroAdd.html',
        controller: 'componentCtrl3',
        bindings: {
            hero: '=',
            name: '@?',
            location: '@?',
            onUpdate: '&'
        }
    })
    .component('component4', {
        templateUrl: 'heroEdit.html',
        controller: 'componentCtrl4',
        bindings: {
            fieldValue: '<',
            fieldType: '@?',
            onUpdate: '&'
        }
    });