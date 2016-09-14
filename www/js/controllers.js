angular.module('starter.controllers', ['ionic.rating'])

  //静态变量，后端API前缀
  .constant('baseUrl','http://113.55.77.231:8088/v1/com/traveller/')

  .controller('DashCtrl', function ($scope, $ionicModal, $rootScope) {
    $rootScope.contact = '邓博文';
    $rootScope.isset = function () {
      var msg = sessionStorage.getItem("userName");
      if (!msg) {
        return true;
      } else {
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

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })

  .controller('MineCtrl', function ($scope, $ionicModal) {

    $ionicModal.fromTemplateUrl('modal.html', function (modal) {
      $scope.modal = modal;
    }, {
      animation: 'slide-in-up',
      focusFirstInput: true
    })

    $scope.userid = 3;

  })

  .controller('personalDetailCtrl', function ($scope, $stateParams) {
    $scope.userid = $stateParams;
    $scope.testinfor = "爬爬爬爬";
  })

  .controller('testinforCtrl', function ($scope, $stateParams) {
    $scope.test = $stateParams;
  })

  .controller('ModalCtrl', function ($scope, $rootScope, $http, $ionicPopup) {

  })

  .controller('complainModalCtrl', function ($scope, $stateParams, $rootScope, $ionicActionSheet) {


    $scope.test = $rootScope.contact;

    //投诉类别选择逻辑
    //伪数据
    $scope.typeList = ['酒店住宿', '餐饮服务', '旅游景区', '其它投诉'];
    $scope.types = [];
    //注意i有可能污染作用域
    for (var i = 0; i < $scope.typeList.length / 2; i++) {
      $scope.types.push($scope.typeList.slice(i * 2, (i + 1) * 2));
    }
    console.log($scope.types);

    $scope.selectType = function (type) {
      $scope.currentType = type;
    }
    $scope.items = [];
    $scope.addImage = function () {

      for (i = 1; i <= 5; i++) {
        var img = "img/logo" + i + '.jpg'
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
  .controller('ComplainCtrl', function (baseUrl,$scope, $http, $stateParams, $ionicModal, $ionicLoading, $rootScope) {

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

    $http.get(baseUrl + '1/complaints')
      .success(function (reponse) {
        console.log(reponse);
        $ionicLoading.hide();
        $scope.complains = reponse;
      });


    $scope.lalala = '终于到第三级了'

  })

  .controller('complainDetailCtrl', function (baseUrl, $scope, $http, $ionicPopup, $stateParams, $ionicModal, $ionicActionSheet, $timeout) {

    //模态框
    $ionicModal.fromTemplateUrl('complainModal.html', function (modal) {
      $scope.modal = modal;
    }, {
      animation: 'slide-in-up',
      focusFirstInput: true
    });

    //获取投诉的详细信息
    var comId = $stateParams['comId'];

    //显示评分popup
    $scope.showPopup2 = function () {
      $scope.rating = {};
      $scope.rating.rate = 5;
      $scope.rating.max = 5;

      var myPopup = $ionicPopup.show({
        title: '<p>您好</p><p>请为我们的服务打分</p>',
        template: '<rating ng-model="rating.rate" max="rating.max"  style="font-size: 200%;" class="energized"></rating>',
        scope: $scope,
        buttons: [
          {text: '取消'},
          {
            text: '<b>提交</b>',
            type: 'button-positive',
            onTap: function (e) {
              ratingCom();
            }
          }
        ]
      });
    };
    //提交影片评分到服务器
    var ratingCom = function () {
      $http.post(baseUrl + 'complaints/' + comId + '/stars',{
        star:$scope.rating.rate
      }).success(function (response) {
          if(response.status == 'success'){
            $scope.showAlertSuccess();
          }else{
            $scope.showAlertFailure();
          }
      }).error(function (data) {
          $scope.showAlertFailure();
      });
    };

    //显示评价成功的信息
    $scope.showAlertSuccess = function() {
      var alertPopup = $ionicPopup.alert({
        title: '评价成功',
        template: ''
      });
    };

    //显示评价失败的信息
    $scope.showAlertFailure = function() {
      var alertPopup = $ionicPopup.alert({
        title: '评价失败，请重试',
        template: ''
      });
    };

    //显示底部的弹出按钮
    $scope.show = function () {
      var hideSheet = $ionicActionSheet.show({
        titleText: "<p>操作当前投诉</p>",
        buttons: [
          {text: "<p class='positive'>回复</p>"},
          {text: "<p class='assertive'>评价</p>"}
        ],
        buttonClicked: function (index) {
          if (index == 0) {
            $scope.modal.show();
            hideSheet();
          } else if (index == 1) {
            $scope.showPopup2();
            hideSheet();
          }
        },
        cancelText: "取消",
        cancel: function () {
        }
      })
    }
  });
