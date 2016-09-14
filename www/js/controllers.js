angular.module('starter.controllers', ['ionic.rating'])


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
  $scope.items=[];
  $scope.addImage=function(){

    for (i=1;i<=5;i++){
      var img="img/logo"+i+'.jpg'
      $scope.items.push(img)
    }
    console.log($scope.items)
 }

  //摄像头
  //function cameraSuccess(imageURI) {
  //  $scope.img = imageURI;
  //  $scope.$apply();
  //}
  //
  //function cameraError() {
  //  $scope.message.push("camera error");
  //}
  //
  //$scope.selectImg = function() {
  //  var hideSheet = $ionicActionSheet.show({
  //    buttons: [{
  //      text: '相册'
  //    }, {
  //      text: '拍照'
  //    }
  //    ],
  //    titleText: '选择图片',
  //    cancelText: '取消',
  //    cancel: function() {
  //      // add cancel code..
  //    },
  //    buttonClicked: function(index) {
  //      navigator.camera.getPicture(cameraSuccess, cameraError, {
  //        sourceType: index
  //      }); //调用系统相册、拍照
  //    }
  //  });
  //};



})
.controller('ComplainCtrl',function($scope,$http,$stateParams,$ionicModal,$ionicLoading,$rootScope){

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  //模态框
  $ionicModal.fromTemplateUrl('complainModal.html', function (modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true
  });

  $http.get('http://113.55.16.160:8088/v1/com/traveller/1/complaints')
    .success(function (reponse) {
      console.log(reponse);
      $ionicLoading.hide();
      $scope.complains = reponse;
    });



  $scope.lalala='终于到第三级了'

})

.controller('complainDetailCtrl',function($scope,$ionicPopup,$ionicModal,$ionicActionSheet,$timeout){
  $scope.contact='一来一回的投诉细节对话';

  $scope.showPopup = function() {
    // 自定义弹
    $scope.order={
      comment:""
    };
    var myPopup = $ionicPopup.show({
      title: '<p>您好</p><p>请反馈你的投诉</p>',
      template: '<textarea type="text" ng-model="order.comment" style="height: 100px;">',
      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>提交</b>',
          type: 'button-positive',
          //onTap: function(e) {
          //  $http.post("http://115.28.33.158:8088/chef/service/order/"+oid,$scope.order)
          //    .success(function(data,stastus,headers,config){
          //      if(data==1){
          //        console.log('success')
          //        $rootScope.reload();
          //      }else {
          //        console.log('error')
          //      }
          //    })
          //    .error(function(data){
          //      console.log('error')
          //    })
          //}
        },
      ]
    });
  };


  $scope.showPopup2 = function() {

    $scope.rating = {};
    $scope.rating.rate = 3;
    $scope.rating.max = 5;

    var myPopup = $ionicPopup.show({
      title: '<p>您好</p><p>请为我们的服务打分</p>',
      template: '<rating ng-model="rating.rate" max="rating.max"  style="font-size: 200%;" class="energized"></rating>',
      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>提交</b>',
          type: 'button-positive',
          //onTap: function(e) {
          //  $http.post("http://115.28.33.158:8088/chef/service/order/"+oid,$scope.order)
          //    .success(function(data,stastus,headers,config){
          //      if(data==1){
          //        console.log('success')
          //        $rootScope.reload();
          //      }else {
          //        console.log('error')
          //      }
          //    })
          //    .error(function(data){
          //      console.log('error')
          //    })
          //}
        },
      ]
    });
  };

  $scope.show = function() {
   var hideSheet=$ionicActionSheet.show({
     titleText:"<p>操作当前投诉</p>",
     buttons:[
       {text:"<p class='positive'>回复</p>"},
       {text:"<p class='assertive'>评分</p>"}
     ],
     buttonClicked:function(index){
        if(index==0){
          $scope.showPopup();
        }else if(index==1){
          $scope.showPopup2();
        }
     },
     cancelText:"取消",
     cancel:function(){

     }
   })


   }
});
