angular.module('starter.controllers', ['ionic.rating'])

  .directive('hideTabs', function ($rootScope) {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        scope.$on('$ionicView.beforeEnter', function () {
          scope.$watch(attributes.hideTabs, function (value) {
            $rootScope.hideTabs = value;
          });
        });

        scope.$on('$ionicView.beforeLeave', function () {
          $rootScope.hideTabs = false;
        });
      }
    };
  })



  //静态变量，后端API前缀
  .constant('baseUrl1', 'http://localhost:8088/v1/')
  .constant('resourceUrl', 'http://localhost:8088/')
  .constant('baseUrl','http://localhost:8088/v1/com/traveller/')
  .controller('DashCtrl', function (Pager, baseUrl1, resourceUrl,$scope, $http, $ionicModal, $rootScope, $state, $ionicViewSwitcher) {

    init();
    function init() {
      $scope.baseImgUrl = resourceUrl;
      $scope.scenicList = [];
      getScenicList(1);
      $scope.currentPage = 1;
      $scope.canGetS = true;
    }

    $rootScope.goAccount = function (id) {
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('tab.account', {"attractionId": id});
    };

    function getScenicList(page) {
      $http.get(baseUrl1 + 'scenic/traveler/scenic' + Pager.pageParams(page,1))
        .success(function (resp) {
          if(resp.length == 0){
            $scope.canGetS = false;
          }
          $scope.scenicList = $scope.scenicList.concat(resp);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (resp) {
          alert('数据加载出错');
      })
    }

    $scope.loadMore = function () {
      if($scope.canGetS){
        $scope.currentPage++;
        getScenicList($scope.currentPage);
      }
    };


    $scope.isntClick = true;
    $scope.isClick = false;
    $scope.styleClick = function () {
      if ($scope.isntClick == true) {
        $scope.isntClick = false;
        $scope.isClick = true;
      } else if ($scope.isntClick == false) {
        $scope.isntClick = true;
        $scope.isClick = false;
      }
    };

    $scope.dashDetail = function (s) {
      $rootScope.currentScenic = s;
      $state.go('tab.dashDetail');
    }
  })


  .controller('dashDetailCtrl', function ($scope, resourceUrl,$rootScope) {
    $scope.baseImgUrl = resourceUrl;
    $scope.scenic = $rootScope.currentScenic;
  })

  .controller('ChatsCtrl', function ($scope, $state,$http, baseUrl,Pager,resourceUrl,$rootScope) {
    init();

    function init() {
      $scope.articles = [];
      getArticles(1);
      $scope.baseImgUrl = resourceUrl;
    }
    function getArticles(page) {
      $http.get(baseUrl1 + 'article/traveler/articles' + Pager.pageParams(page,4))
        .success(function (resp) {
          $scope.articles = $scope.articles.concat(resp['articles']);
        });
    }

    $scope.goDetail = function (article) {
      $rootScope.currentArticle = article;
      $state.go('tab.chatDetail');
    }
  })
  .controller('AccountCtrl', function ($scope, $stateParams, $http, $state, $rootScope,resourceUrl,baseUrl1,Pager) {
    $scope.attractionId = $stateParams.attractionId;

    $scope.items = [
      {name: '酒店'},
      {name: '演出'},
      {name: '餐饮'},
      {name: '路况'},
      {name: '公告'}
    ];
    $scope.checkClick = [];
    $scope.notCheck = [];

    $scope.check = function ($index) {
      for (i = 0; i < 5; i++) {
        if (i == $index) {
          $scope.checkClick[i] = false;
          $scope.notCheck[i] = true;
        } else {
          $scope.checkClick[i] = true;
          $scope.notCheck[i] = false;
        }
      }
      $scope.showInfo = $rootScope.currentScenic == undefined;
      init();
    };
    $scope.check($scope.attractionId);
    $scope.settings = {
      enableFriends: true
    };

    init();

    function init() {
      $scope.hotels = [];
      $scope.emergencies = [];
      $scope.performances = [];
      $scope.canteens = [];
      getHotels(1);
      getAnnouncements(1);
      getPerformances(1);
      getCanteens(1);
      $scope.currentPageH = 1;
      $scope.currentPageP = 1;
      $scope.currentPageA = 1;
      $scope.currentPageC = 1;
      $scope.canGetH = true;
      $scope.baseImgUrl = resourceUrl;
    }

    function getHotels(page) {
      var sid = getSid();
      $http.get(baseUrl1 + 'hotel/traveler/scenic/' + sid
        + '/hotels' + Pager.pageParams(page,2))
        .success(function (resp) {
          if(resp.length == 0){
            $scope.canGetH = false;
          }
          $scope.hotels = $scope.hotels.concat(resp);
          $scope.$broadcast('scroll.infiniteScrollComplete');
          console.log('get hotel' + page);
          console.log($scope.hotels);
        })
    }
    $scope.loadMoreHotel = function () {
      if($scope.canGetH){
        $scope.currentPageH++;
        getHotels($scope.currentPageH);
      }
    };

    $scope.loadMorePerformances = function () {
      $scope.currentPageP++;
      getPerformances($scope.currentPageP)
    };

    $scope.loadMoreAnnouncements = function () {
      $scope.currentPageA++;
      getAnnouncements($scope.currentPageA);
    };

    $scope.loadMoreCanteens = function () {
      $scope.currentPageC++;
      getCanteens($scope.currentPageC);
    };

    function getSid() {
      if($rootScope.currentScenic == undefined){
        return 0;
      }else{
        return $rootScope.currentScenic['sid'];
      }
    }

    function getAnnouncements(page){
      var sid = getSid();
      $http.get(baseUrl1 + 'emgy/traveler/scenic/' + sid + '/emergencies' + Pager.pageParams(page,4))
          .success(function (resp) {
            $scope.emergencies = $scope.emergencies.concat(resp);
            $scope.$broadcast('scroll.infiniteScrollComplete');
          });
    }

    function getPerformances(page) {
      var sid = getSid();
      $http.get(baseUrl1 + 'ent/traveler/scenic/' + sid + '/performances' + Pager.pageParams(page,2))
        .success(function (resp) {
          $scope.performances = $scope.performances.concat(resp);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    }

    function getCanteens(page) {
      var sid = getSid();
      $http.get(baseUrl1 + 'cant/traveler/scenic/' + sid + '/canteens' + Pager.pageParams(page,2))
        .success(function (resp) {
          $scope.canteens = $scope.canteens.concat(resp);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    }
  })

  .controller('MineCtrl', function ($scope, $ionicModal, $rootScope) {

    $ionicModal.fromTemplateUrl('modal.html', function (modal) {
      $scope.modal = modal;
    }, {
      animation: 'slide-in-up',
      focusFirstInput: true
    });


    $scope.$on('modal.hidden',function () {
      $scope.user = $rootScope.currentUser;
    });

    $scope.logout = function () {
      $rootScope.currentUser = null;
      $scope.user = null;
    }


  })

  .controller('personalDetailCtrl', function ($scope, $stateParams) {
  })
  .controller('aboutMineCtrl', function ($scope, $stateParams) {
  })
  .controller('testinforCtrl', function ($scope, $stateParams) {
  })

  .controller('ModalCtrl', function ($scope, $rootScope, $http, baseUrl1) {
    $scope.userInfo = {};
    $rootScope.currentUser = null;
    $scope.login = function () {
      $http.post(baseUrl1 + 'user/traveler/users/login',$scope.userInfo)
        .success(function (resp) {
          //登陆失败
          if(resp == ""){
            alert('账号或密码错误')
          }else{
            $rootScope.currentUser = resp;
            $scope.modal.hide();
          }
        })
    }
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
    $scope.$on('modal.shown', function () {
      $scope.showType = $rootScope.submitState != 'reply';
      if($rootScope.submitState == 'create'){
        $scope.complaint = {};
      }
      if ($rootScope.submitState == 'resubmit') {
        $http.get(baseUrl + 'complaints/' + $rootScope.resubmitComId)
          .success(function (resp) {
            $scope.complaint = resp;
            for (i in $scope.typeList) {
              if ($scope.typeList[i]['typeId'] == resp.type) {
                $scope.currentType = $scope.typeList[i];
              }
            }
          });
      }
    });
    $scope.complaint = {};
    $scope.complaint['userId'] = $rootScope.currentUser?$rootScope.currentUser['id']:0;
    //点击提交按钮
    $scope.submitComplaint = function () {
      if ($rootScope.submitState == 'create') {
        $scope.complaint.replyComId = 0;
        create();
      } else if ($rootScope.submitState == 'resubmit') {
        $scope.complaint.replyComId = 0;
        resubmit();
      } else if ($rootScope.submitState == 'reply') {
        $scope.complaint.replyComId = $rootScope.replyComId;
        reply();
      }
    };

    //创建
    function create() {
      //数据处理失败返回
      if (!handleData()) return;
      //提交到服务器
      submit(baseUrl + 'complaints', $scope.complaint);
    }

    //重新提交
    function resubmit() {
      if (!handleData()) return;
      submit(baseUrl + 'complaints/' + $scope.complaint.id, $scope.complaint);
    }

    //回复
    function reply() {
      if (!handleData()) return;
      submit(baseUrl + 'complaints/' + $scope.complaint.replyComId + '/reply', $scope.complaint);
    }

    //提交数据到服务器
    function submit(url, complaint) {
      $http.post(url, complaint)
        .success(function (resp) {
          if (resp.id) {
            for (i in $scope.images) {
              upload($scope.images[i], resp.id);
            }
          }
          $scope.showInfoPopup("提交成功！");
          $scope.modal.hide();
        });
    }

    //处理数据
    function handleData() {
      if ($scope.currentType) {
        $scope.complaint.type = $scope.currentType['typeId'];
      }
      //验证字段是否为空
      return true;
    }

    //显示评价成功的信息
    $scope.showInfoPopup = function (info) {
      var alertPopup = $ionicPopup.alert({
        title: info,
        template: ''
      });
    };

    /*----------------图片上传相关-----------------*/

    //图片上传
    function upload(fileURL, comId) {
      var success = function (r) {
        //success
      };
      var fail = function (error) {
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
  .controller('ComplainCtrl', function (Pager,baseUrl, $scope, $http, $stateParams, $ionicModal, $ionicLoading, $rootScope) {

    $scope.userId = $rootScope.currentUser?$rootScope.currentUser['id']:0;
    $scope.showInfo = !$rootScope.currentUser;

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
        for (i in resp) {
          $scope.typeMap[resp[i].typeId] = resp[i].typeName;
        }
      });

    //获取投诉信息列表
    getComplaints($scope.userId);

    //如果模态框关闭，重新获取
    $scope.$on('modal.hidden', function () {
      getComplaints($scope.userId);
    });

    //获取投诉信息列表
    function getComplaints(userId) {
      $http.get(baseUrl + userId + '/complaints' + Pager.pageParams(1,10))
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
    $scope.userId = $rootScope.currentUser?$rootScope.currentUser['id']:0;

    if (status == 'init') {
      $scope.showDropDown = false;
    } else if (status == 'complete') {
      $scope.showDropDown = false;
    } else {
      $scope.showDropDown = false;
    }

    loadData();
    //加载数据
    function loadData() {
      $http.get(baseUrl + 'complaints/' + comId + '/interaction')
        .success(function (resp) {
          console.log(resp);
          $scope.complaints = resp;
          if (resp[resp.length - 1].userId == $scope.userId) {
            $scope.showDropDown = false;
          } else if (status == 'handling') {
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
    $scope.$on('modal.hidden', function () {
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
      $http.post(baseUrl + 'complaints/' + comId + '/stars', {
        star: $scope.rating.rate
      }).success(function (response) {
        if (response.status == 'success') {
          $scope.showAlertSuccess();
        } else {
          $scope.showAlertFailure();
        }
      }).error(function (data) {
        $scope.showAlertFailure();
      });
    };

    //显示评价成功的信息
    $scope.showAlertSuccess = function () {
      var alertPopup = $ionicPopup.alert({
        title: '评价成功',
        template: ''
      });
    };

    //显示评价失败的信息
    $scope.showAlertFailure = function () {
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
            $rootScope.replyComId = $scope.complaints[$scope.complaints.length - 1].id;
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

  .controller('hotelCtrl', function ($scope) {

  })
  .controller('canteenCtrl', function ($scope) {

  })
  .controller('performanceCtrl', function ($scope) {

  })
  .controller('trafficCtrl', function ($scope) {

  })
  .controller('announcementlCtrl', function ($scope) {
    $scope.tests = [
      {
        name: 'announcementlCtrl'
      }, {
        name: 'announcementlCtrl'
      }, {
        name: 'announcementlCtrl'
      }
    ]
  })

  .controller('chatDetailCtrl', function (resourceUrl,$scope, $rootScope) {

    $scope.article = $rootScope.currentArticle;
    $scope.baseImgUrl = resourceUrl;

    $scope.isTrue = false;
    $scope.likeNum = 88;

    $scope.check = function () {
      $scope.isTrue = !$scope.isTrue;
      if ($scope.isTrue == true) {
        $scope.likeNum++;
      } else if ($scope.isTrue == false) {
        $scope.likeNum--;
      }
    };
  });


