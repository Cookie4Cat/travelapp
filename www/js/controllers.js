angular.module('starter.controllers', [])


  .controller('DashCtrl', function($scope,$ionicModal,$rootScope) {
    $rootScope.contact='邓博文';
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

.controller('complainModalCtrl',function($scope,$stateParams,$rootScope){
  $scope.test=$rootScope.contact;
  $scope.isDeal1=false;
  $scope.isDeal2=false;
  $scope.isDeal3=false;
  $scope.isDeal4=false;
  $scope.isntDeal1=false;
  $scope.isntDeal2=false;
  $scope.isntDeal3=false;
  $scope.isntDeal4=false;

  $scope.choose=function(number){
    console.log(number);
    if (number==1){
      $scope.isDeal1=true;
      $scope.isDeal2=false;
      $scope.isDeal3=false;
      $scope.isDeal4=false;
      $scope.isntDeal1=false;
      $scope.isntDeal2=true;
      $scope.isntDeal3=true;
      $scope.isntDeal4=true;
    }else if(number==2){
      $scope.isDeal1=false;
      $scope.isDeal2=true;
      $scope.isDeal3=false;
      $scope.isDeal4=false;
      $scope.isntDeal1=true;
      $scope.isntDeal2=false;
      $scope.isntDeal3=true;
      $scope.isntDeal4=true;
    }else if(number==3){
      $scope.isDeal1=false;
      $scope.isDeal2=false;
      $scope.isDeal3=true;
      $scope.isDeal4=false;
      $scope.isntDeal1=true;
      $scope.isntDeal2=true;
      $scope.isntDeal3=false;
      $scope.isntDeal4=true;
    }else if(number==4){
      $scope.isDeal1=false;
      $scope.isDeal2=false;
      $scope.isDeal3=false;
      $scope.isDeal4=true;
      $scope.isntDeal1=true;
      $scope.isntDeal2=true;
      $scope.isntDeal3=true;
      $scope.isntDeal4=false;
    }



  }

})
.controller('ComplainCtrl',function($scope,$stateParams,$ionicModal,$rootScope){

  $ionicModal.fromTemplateUrl('complainModal.html', function (modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true
  })

 $scope.lalala='终于到第三级了'

})
