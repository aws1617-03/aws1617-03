'use strict';

angular.module("groups-app").controller("groupsCtl", function ($scope, $http) {

    function refresh(){
        $http.get("/api/v1/groups").then(function (response){
            $scope.groups = response.data;
        });
    };
    
    $scope.addGroup = function (){
        console.log("Adding group "+$scope.newGroup);
        $http.post("/api/v1/groups",$scope.newGroup).then(function (){
            refresh();
        });
        
    };
    
    $scope.deleteGroup = function(group) {
            $http.delete('/api/v1/groups/' + group.name).then((response) => {
                refresh();
        });
    };
    
   $scope.updateGroup = function() {
            $http.put('/api/v1/groups/' + $scope.group.name, $scope.newGroup).then((response) => {
                
                refresh();
                $('#myModal').modal('hide');
            });
        };

    $scope.openModal = function(group) {
        if (group) {
            $scope.group = group;
            $('#update').removeClass('hidden');
            $('#add').addClass('hidden');
             $scope.newGroup;
        } else {
            $('#update').addClass('hidden');
            $('#add').removeClass('hidden');
            $scope.group = {
                name: 'FuffyBot',
                description: 'defect',
                members: ['Bot', 'Danger']
            };
             $scope.newGroup;
        }
    };
    
    refresh();
});