// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('left');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',

  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

    .state('tab.dashDetail', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/dashDetail.html',
          controller: 'dashDetailCtrl'
        }
      }
    })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })


    .state('tab.chatDetail', {
      url: '/chats/chatDetail',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chatDetail.html',
          controller: 'chatDetailCtrl'
        }
      }
    })
    .state('tab.mine', {
    url: '/mine',
    views: {
      'tab-mine': {
        templateUrl: 'templates/tab-mine.html',
        controller: 'MineCtrl'
      }
    }
  })

    .state('tab.personal-detail', {
      url: '/mine/personalDetail/:userId',
      views: {
        'tab-mine': {
          templateUrl: 'templates/personalDetail.html',
          controller:'personalDetailCtrl'
        }
      }
    })
    .state('tab.complain', {
      url: '/mine/complain/:userId',
      views: {
        'tab-mine': {
          templateUrl: 'templates/complain.html',
          controller:'ComplainCtrl'
        }
      }
    })

    .state('tab.aboutMine',{
      url:'/mine/aboutMine/',
      views:{
        'tab-mine':{
          templateUrl:'templates/aboutMine.html',
          controller:'aboutMineCtrl'
        }
      }
    })
    .state('tab.complainDetail', {
      url: '/mine/complainDetail/:comId/:status',
      views: {
        'tab-mine': {
          templateUrl: 'templates/complainDetail.html',
          controller:'complainDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account/:attractionId',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })

      //.state('funcTab', {
      //  url: '/funcTab',
      //  abstract: true,
      //  templateUrl: 'templates/tab-account.html'
      //})




    .state('tab.hotel', {
      url: '/account/hotel/',
      views: {
        'funcTab-diagnosis': {
          templateUrl: 'templates/account-hotel.html',
          controller:'hotelCtrl'
        }
      }
    })
    .state('tab.canteen', {
      url: '/account/canteen/',
      views: {
        'funcTab-order': {
          templateUrl: 'templates/account-canteen.html',
          controller:'canteenCtrl'
        }
      }
    })
    .state('tab.performance', {
      url: '/account/performance/',
      views: {
        'funcTab-check': {
          templateUrl: 'templates/account-performance.html',
          controller:'performanceCtrl'
        }
      }
    })
    .state('tab.traffic', {
      url: '/account/traffic/',
      views: {
        'funcTab-test': {
          templateUrl: 'templates/account-traffic.html',
          controller:'trafficCtrl'
        }
      }
    })
    .state('tab.announcement', {
      url: '/account/announcement/',
      views: {
        'funcTab-blood': {
          templateUrl: 'templates/account-announcement.html',
          controller:'announcementlCtrl'
        }
      }
    })

  $urlRouterProvider.otherwise('/tab/dash');

});
