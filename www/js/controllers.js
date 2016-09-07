angular.module('starter.controllers', [])


  .controller('DashCtrl', function($scope,$ionicModal,$rootScope) {

    $rootScope.isset=function(){
      var msg=sessionStorage.getItem("userName");
      if(!msg){
        return true;
      }else{
        return false;
      }
    }
    $ionicModal.fromTemplateUrl('modal.html', function (modal) {
      $scope.modal = modal;
    }, {
      animation: 'slide-in-up',
      focusFirstInput: true
    })
  })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MineCtrl', function($scope,$ionicModal){

  $ionicModal.fromTemplateUrl('modal.html', function (modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true
  })

  $scope.userid=3;

})

.controller('personalDetailCtrl',function($scope,$stateParams){
  $scope.userid=$stateParams;
  $scope.testinfor="爬爬爬爬";
})

.controller('testinforCtrl',function($scope,$stateParams){
  $scope.test=$stateParams;
})

.controller('ModalCtrl', function ($scope,$rootScope,$http, $ionicPopup) {

})
