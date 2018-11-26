var todoApp = angular.module("todoApp", ['ngResource']);

todoApp.controller("ToDoCtrl", function (
    $scope, 
    $resource, 
    TodoService) {
    $scope.todo = {};

    $scope.incompleteCount = function () {
        var count = 0;
        angular.forEach($scope.todo.items, function (item) {
            if (!item.done) {
                count++;
            }
        });
        return count;
    }

    $scope.warningLevel = function () {
        return $scope.incompleteCount() < 2 ? "label-success" : "label-warning";
    }

    $scope.addNewItem = function (actionText) {
        $scope.todo.items.push({
            action: actionText,
            done: false
        });
    };

    $scope.init = function(){
        TodoService.queryAll({},function (result) {
            if(result){
                console.log(result.data);
                $scope.todo = result.data;
            }
          })
    };
    // 初始化方法
    $scope.$watch('$viewContentLoaded', function() {
        $scope.init();
        console.log("初始化完成.....");
    });
});

todoApp.factory('TodoService', ['$resource', function ($resource) {
    return $resource('/weiLogin/queryAll', 
    {}, 
    {queryAll: {method: 'GET',isArray: false, cache: false}}
);
}]);