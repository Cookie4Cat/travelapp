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

.controller('complainModalCtrl',function($scope,$stateParams,$rootScope,$ionicActionSheet){


  $scope.test=$rootScope.contact;

  //投诉类别选择逻辑
  //伪数据
  $scope.typeList = ['酒店住宿','餐饮服务','旅游景区','其它投诉'];
  $scope.types = [];
  //注意i有可能污染作用域
  for(var i = 0; i < $scope.typeList.length/2; i++){
    $scope.types.push($scope.typeList.slice(i*2,(i+1)*2));
  }
  console.log($scope.types);

  $scope.selectType = function (type) {
    $scope.currentType = type;
  }


  //摄像头
  function cameraSuccess(imageURI) {
    $scope.img = imageURI;
    $scope.$apply();
  }

  function cameraError() {
    $scope.message.push("camera error");
  }

  $scope.selectImg = function() {
    var hideSheet = $ionicActionSheet.show({
      buttons: [{
        text: '相册'
      }, {
        text: '拍照'
      }
      ],
      titleText: '选择图片',
      cancelText: '取消',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        navigator.camera.getPicture(cameraSuccess, cameraError, {
          sourceType: index
        }); //调用系统相册、拍照
      }
    });
  };



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
