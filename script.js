var app = angular.module('app', []);

app.controller('ctrl', function($scope) {
    
});

app.directive('colorChanger', function() {

  var linkFunc = function($scope, $elem, attrs) {
		$scope.changeColor = function() {
      $scope.child.changeColor($scope.color);
    };
  };

  var controllerFunc = ['$scope', function($scope) {
    // add referance to child
    this.add = function(child) {
      $scope.child = child;
    };
  }];
    
  var templateFunc = function($tElem, tAttrs) {
    var html = '';
    
    html += '<div><div>';
      html += '<button ng-click="changeColor();">Click here to change color</button>';
    html += '</div>';
    // content goes here
    html += '<div ng-transclude></div></div>';
 
    return html;
  };

  return {
    restrict: 'E',
    transclude: true,
    replace : true,
    scope: {
      color: '@'
    },
    controller: controllerFunc,
    template: templateFunc,
    link: linkFunc
  };   
});

app.directive('content', function() {
  var linkFunc = function($scope, $elem, attrs, colorChangerCtrl) {
    
    var addContentToParent = function() {
      colorChangerCtrl.add($scope); 
    };

    $scope.changeColor = function(color) {
      $elem.css('color', color);
    };

    ;(function init() {
      addContentToParent();
    })();
  };

  var templateFunc = function($tElem, tAttrs) {
    return '<div>This is the content. it\'s color will change...</div>';
  };

  return {
    restrict: 'E',
    replace : true,
    scope: {},
    template: templateFunc,
    link: linkFunc,
    // inject the parent controller
    require: '^colorChanger', 
  };   
});