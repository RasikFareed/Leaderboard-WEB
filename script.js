
var app = angular.module('myApp', []);


/*Ranking Controller(STATIC)*/
app.controller('queryCtrl', function($scope, $http) {
  $scope.results = [];
 $scope.college=[];
  var studentId=(JSON.parse(localStorage.LOGGED_IN_USER));
  $http.get("http://localhost:8080/core-app/student/rank")
    .then(function (response) {
        $scope.orderByField = 'Score';
        $scope.reverseSort = false;
        $scope.results = response.data;
        $scope.college=studentId.collegeName;
        for(i in $scope.results){
          if($scope.results[i].studentId==studentId.studentId){

          $scope.count=++i;
          
        }}
  console.log($scope.count);
    });
   });

app.controller('myCtrl', function($scope, $http) {
  $scope.univ_results = [];
  $http.get("univ_results.json")
    .then(function (response) {
        $scope.orderByField = 'Score';
        $scope.reverseSort = false;
      $scope.univ_results = response.data; 
    });
});

app.controller('myResultCtrl', function($scope, $http) {
  $scope.my_result = [];
  $http.get("http://localhost:8080/core-app/student/rank")
    .then(function (response) {
        var Id=(JSON.parse(localStorage.LOGGED_IN_USER));

     // for (i in response){

     //    if(Id==response.data[i].studentId){ 
              var my_result=[];
              $scope.my_result = response.data[i].studentId; 
   
   //    }
   // } 
   });
});



app.controller('myPoints', function($scope, $http) {
  $scope.myPoints = [];
  $http.get("json/leaderboard.json")
    .then(function (response) {
      $scope.myPoints = response.data[0];
    });
});





app.controller('univCtrl', function($scope,$http) {
    $scope.names =[];

$http.get("http://localhost:8080/core-app/student/rank")
    .then(function (response) {
              $scope.names = response.data;
              console.log(response);
    });

});




/*Ranking Controller(STATIC)-----end*/


app.controller('projectPercentage', function($scope, $http) {
  $scope.projectPercentage = [];
  $http.get("http://localhost:8080/core-app/student/2/project/percentage")
    .then(function (response) {
      //console.log(response);
      $scope.projectPercentage = response.data;
      //console.log($scope.projectPercentage);
    });

});

/*Course Controller*/

app.controller('myCourseCtrl',['$rootScope','$http', function($scope, $http,$rootScope) {
 
$scope.init=function(){
 $scope.course = [];
 var course=localStorage.getItem("CLICKED_COURSE");
 $scope.CLICKED_COURSE= JSON.parse(course);
 console.log(course);
  $http.get("http://localhost:8080/core-app/student/course/"+$scope.CLICKED_COURSE+"/coursedetails" )
    .then(function (response) {
      $scope.course = response.data[0];
     console.log(response);
      });
}
    $scope.getCourseDetails=function(clickedCourse){
      console.log("Clicked "+ clickedCourse);
      $http.get("http://localhost:8080/core-app/student/course/"+clickedCourse+"/coursedetails")
    .then(function (response) {
      $scope.course = response.data[0];
     var CLICKED_COURSE= clickedCourse;
     localStorage.setItem("CLICKED_COURSE", JSON.stringify(clickedCourse));
     window.location="coursedetails.html";
     //  console.log($scope.course);
      });
    }
}]);


app.controller('myCourseActivityCtrl',['$rootScope','$http', function($scope, $http,$rootScope) {
 

 $scope.courseActivity = [];
 var course=localStorage.getItem("CLICKED_COURSE");
 $scope.CLICKED_COURSE= JSON.parse(course);
 console.log(course);
  $http.get("http://localhost:8080/core-app/student/course/"+$scope.CLICKED_COURSE+"/activitydetails")
    .then(function (response) {
      $scope.courseActivity = response.data;
     console.log(response);
      });

}]);
/*Course Controller-----end*/

/*login Controller*/
 app.controller('LoginController', [ '$rootScope', '$scope','$http','$location', function($rootScope, $scope,$http,$location) {
    
    var userStr = localStorage.getItem("LOGGED_IN_USER");
    
    if (userStr == null ){
        $location.path('/');
      }
    else
        {
            $scope.LOGGED_IN_USER= JSON.parse(userStr);

             // Get logged in user details from localStorage and store in scope
        }
    
             $scope.login = function() {
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
     $http({
       method: 'POST',
       url: 'http://localhost:8080/core-app/login',
       data: $.param({
           emailId: $scope.email,
           password: $scope.password
       }),
       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
   }).success(function(response){
      var user = response !=(null || '') ? response : null;
         if( user != null ){            
             $rootScope.LOGGED_IN_USER= user;
            localStorage.setItem("LOGGED_IN_USER", JSON.stringify(user));              
            window.location="main.html";
         }
           else
               {
               $scope.error="Invalid Username or password";
               }
           
       }).error(function(){
           $location.path('/');
       })
       
   };
   $scope.logout = function() {
       $rootScope.LOGGED_IN_USER=null;
       localStorage.clear();
       window.location="index.html";
       
   };
}]);


/*login Controller---end*/