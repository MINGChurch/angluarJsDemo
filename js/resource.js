var todoApp = angular.module("todoApp", ['ngResource']);
var reqUrlPrefix = '/:controller/:action';
todoApp.controller("ToDoCtrl", function (
    $scope, 
    $resource, 
    TodoService,
    MallService) {
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
    $scope.delete = function(itemsId){
        TodoService.itemsDelete({id:itemsId},function (result) {
            if(result){
                console.log(result.data);
            }
          });
        MallService.queryOne({productId:2},function(result){
            if(result){
                console.log(result.data);
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
    return $resource('', { controller: 'weiLogin' }, {
        queryAll: { url: reqUrlPrefix, params: { action: 'queryAll' }, method: 'GET', isArray: false, cache: false,headers: {Accept: 'application/json'}},
        itemsDelete: { url: reqUrlPrefix, params: { action: 'deleteById' }, method: 'POST', isArray: false, cache: false,headers: {Accept: 'application/json'}},
    });
}]);

todoApp.factory('MallService', ['$resource', function($resource){
    return $resource('/weiProduct/productDetail/:productId',
        {},
        {
            queryOne: {method: 'POST', headers: {Accept: 'application/json'} }
        }
    );
}]);
