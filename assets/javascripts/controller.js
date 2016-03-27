angular.module('myApp', [])
  .controller('myController', ['$scope', '$http', function($scope, $http) {
    $scope.title = 'angular title12345';
    window.data = 'test';
    $scope.clickMe = function() {
        window.data = $scope.title;
        alert('hi');
    };
    // $scope.clickMe = function() {
      
    //   $http.get('/json/index').
    //   success(function(data, status, headers, config) {
    //     // this callback will be called asynchronously
    //     // when the response is available
    //     alert(JSON.stringify(config));
    //     $scope.title = config.method;
    //   }).
    //   error(function(data, status, headers, config) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //      $scope.title = config.method;
    //   });
    // };
  }])
  .directive('httpTemplate', ['$compile','$http',function($compile,$http){
    var imageTemplate = '<div class="entry-photo"><h2>&nbsp;</h2><div class="entry-img">{{content}}</div></div>';
  
    return {
        restrict : 'AEC',
        scope: {
            content : '=',
        },
        link : function(scope, element, attrs) {
            element.html(imageTemplate);
            $compile(element.contents())(scope);

            scope.$watch(function(){
                return window.data;
            }, function(){
                console.log(arguments);
            });
        },


    };


  }]);
