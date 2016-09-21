angular.module('starter.controllers', ['ionic.rating'])

  //静态变量，后端API前缀
  .constant('baseUrl','http://localhost:8088/v1/com/traveller/')
  .constant('resourceUrl','http://localhost:8088/')
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

    $scope.isntClick=true;
    $scope.isClick=false;
    $scope.styleClick=function(){
     if ($scope.isntClick==true){
       $scope.isntClick=false;
       $scope.isClick=true;
     }else if($scope.isntClick==false){
       $scope.isntClick=true;
       $scope.isClick=false;
     }
    }
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

  .controller('complainModalCtrl', function ($ionicPopup, baseUrl, $http, $scope, $stateParams, $rootScope, $ionicActionSheet) {


    //获取投诉类别
    $http.get(baseUrl + "complaints/types")
      .success(function (resp) {
        $scope.typeList = resp;
        $scope.types = [];
        for (var i = 0; i < $scope.typeList.length / 2; i++) {
          $scope.types.push($scope.typeList.slice(i * 2, (i + 1) * 2));
        }
      }).error(function (resp) {
      alert("数据加载失败");
    });
    //选择投诉类别
    $scope.selectType = function (type) {
      $scope.currentType = type;
    };

    //如果重新提交
    $scope.$on('modal.shown', function() {
      if($rootScope.submitState == 'resubmit'){
        $http.get(baseUrl + 'complaints/' + $rootScope.resubmitComId)
          .success(function (resp) {
            $scope.complaint = resp;
            for(i in $scope.typeList){
              if($scope.typeList[i]['typeId'] == resp.type){
                $scope.currentType = $scope.typeList[i];
              }
            }
          });
      }
    });
    $scope.complaint = {};
    //点击提交按钮
    $scope.submitComplaint = function () {
      if($rootScope.submitState == 'create'){
        $scope.complaint.replyComId = 0;
        $scope.complaint.userId = 1; //伪数据
        create();
      }else if($rootScope.submitState == 'resubmit'){
        $scope.complaint.replyComId = 0;
        $scope.complaint.userId = 1;
        resubmit();
      }else if($rootScope.submitState == 'reply'){
        $scope.complaint.replyComId = $rootScope.replyComId;
        $scope.complaint.userId = 1;
        reply();
      }
    };

    //创建
    function create() {
      //数据处理失败返回
      if(!handleData()) return;
      //提交到服务器
      submit(baseUrl + 'complaints', $scope.complaint);
    }

    //重新提交
    function resubmit() {
      if(!handleData()) return;
      submit(baseUrl + 'complaints/' + $scope.complaint.id, $scope.complaint);
    }

    //回复
    function reply() {
      if(!handleData()) return;
      submit(baseUrl + 'complaints/' + $scope.complaint.replyComId + '/reply', $scope.complaint);
    }

    //提交数据到服务器
    function submit(url,complaint) {
      $http.post(url,complaint)
        .success(function (resp) {
          if(resp.id){
            for(i in $scope.images){
              upload($scope.images[i],resp.id);
            }
          }
          $scope.showInfoPopup("提交成功！");
          $scope.modal.hide();
        });
    }

    //处理数据
    function handleData() {
      if($scope.currentType){
        $scope.complaint.type = $scope.currentType['typeId'];
      }
      //验证字段是否为空
      return true;
    }

    //显示评价成功的信息
    $scope.showInfoPopup = function(info) {
      var alertPopup = $ionicPopup.alert({
        title: info,
        template: ''
      });
    };

    /*----------------图片上传相关-----------------*/

    //图片上传
    function upload(fileURL,comId) {
      var success = function (r) {
        //success
      };
      var fail = function(error) {
        //fail
      };
      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      var ft = new FileTransfer();
      ft.upload(fileURL, encodeURI(baseUrl + 'complaints/' + comId + '/images'), success, fail, options);
    }

    $scope.images = [];

    function cameraSuccess(imageURI) {
      $scope.images.push(imageURI);
      $scope.$apply();
    }

    function cameraError() {
      console.log('选择图片失败');
    }

    //原生选择
    $scope.selectImg = function () {
      var hideSheet = $ionicActionSheet.show({
        buttons: [{
          text: '相册'
        }, {
          text: '拍照'
        }
        ],
        titleText: '选择图片',
        cancelText: '取消',
        cancel: function () {
          // add cancel code..
        },
        buttonClicked: function (index) {
          navigator.camera.getPicture(cameraSuccess, cameraError, {
            sourceType: index
          });
        }
      });
    };

    /*----------------图片上传相关-----------------*/

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

    //获取投诉类型
    $http.get(baseUrl + "complaints/types")
      .success(function (resp) {
        $scope.typeMap = {};
        for(i in resp){
          $scope.typeMap[resp[i].typeId] = resp[i].typeName;
        }
      });

    //获取投诉信息列表
    getComplaints(1);

    //如果模态框关闭，重新获取
    $scope.$on('modal.hidden', function() {
      getComplaints(1);
    });

    //获取投诉信息列表
    function getComplaints(userId) {
      $http.get(baseUrl + userId + '/complaints')
        .success(function (resp) {
          $ionicLoading.hide();
          $scope.complains = resp;
        });
    }

    //重新提交
    $scope.resubmit = function (comId) {
      $rootScope.submitState = "resubmit";
      $rootScope.resubmitComId = comId;
      $scope.modal.show();
    };

    //创建
    $scope.create = function () {
      $rootScope.submitState = "create";
      $scope.modal.show();
    };

  })

  .controller('complainDetailCtrl', function ($rootScope, resourceUrl, baseUrl, $scope, $http, $ionicPopup, $stateParams, $ionicModal, $ionicActionSheet, $timeout) {

    $scope.resourceUrl = resourceUrl;

    //获取路径参数
    var status = $stateParams['status'];
    var comId = $stateParams['comId'];

    //伪数据
     $scope.userId = 1;

    if(status == 'init'){
      $scope.showDropDown = false;
    }else if(status == 'complete'){
      $scope.showDropDown = false;
    }else{
      $scope.showDropDown = false;
    }

    loadData();
    //加载数据
    function loadData() {
      $http.get(baseUrl + 'complaints/' + comId + '/interaction')
        .success(function (resp) {
          console.log(resp);
          $scope.complaints = resp;
          if(resp[resp.length-1].userId == $scope.userId){
            $scope.showDropDown = false;
          }else if(status == 'handling'){
            $scope.showDropDown = true;
          }
        });
    }
    //模态框
    $ionicModal.fromTemplateUrl('complainModal.html', function (modal) {
      $scope.modal = modal;
    }, {
      animation: 'slide-in-up',
      focusFirstInput: true
    });

    //重新加载
    $scope.$on('modal.hidden', function() {
      loadData();
    });

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
            $rootScope.submitState = "reply";
            $rootScope.replyComId = $scope.complaints[$scope.complaints.length-1].id;
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
  })

.controller('hotelCtrl',function($scope){
  $scope.test='hotel';
})
  .controller('canteenCtrl',function($scope){
    $scope.test='canteen';
  })
  .controller('performanceCtrl',function($scope){
    $scope.test='performance';
  })
  .controller('trafficCtrl',function($scope){
    $scope.test='traffic';
  })
  .controller('announcementlCtrl',function($scope){
    $scope.test='announcement';
  })

