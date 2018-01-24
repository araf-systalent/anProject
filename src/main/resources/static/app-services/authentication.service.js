(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            // k
             
            // $timeout(function () {
            //     var response;
            //     if (username !== null && username === password && password==="admin") {
            //         var data="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmxzIjoiW1wic2ltdWxhdGlvblwiLFwic2ltLWFuYWx5c2lzXCIsXCJzdHJhdGVnaWMtYW5hbHlzaXNcIixcInNjZW5hcmlvc1wiXSIsInJvbGVzIjpbIlNURCJdLCJuYW1lIjoiVGVzdCIsIm1lbnUiOiJbe1wic2VxUG9zXCI6MC4wLFwibWVudVRleHRcIjpcIlNpbXVsYXRpb25cIixcIm1lbnVVcmxcIjpcInNpbXVsYXRpb25cIixcImljb25VcmxcIjpcIlwifSx7XCJzZXFQb3NcIjoxLjAsXCJtZW51VGV4dFwiOlwiU2ltdWxhdGlvbiBBbmFseXNpc1wiLFwibWVudVVybFwiOlwic2ltLWFuYWx5c2lzXCIsXCJpY29uVXJsXCI6XCJcIn0se1wic2VxUG9zXCI6Mi4wLFwibWVudVRleHRcIjpcIlN0cmF0ZWdpYyBBbmFseXNpc1wiLFwibWVudVVybFwiOlwic3RyYXRlZ2ljLWFuYWx5c2lzXCIsXCJpY29uVXJsXCI6XCJcIn0se1wic2VxUG9zXCI6My4wLFwibWVudVRleHRcIjpcIlNjZW5hcmlvIEFuYWx5c2lzXCIsXCJtZW51VXJsXCI6XCJzY2VuYXJpb3NcIixcImljb25VcmxcIjpcIlwifV0iLCJ1c2VyIjoidGVzdF91c2VyXzEiLCJpYXQiOjE1MTY2MDYxMDUsInRva2VuIjoiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnliMnhsY3lJNld5SlRWRVFpWFN3aWRYTmxjaUk2SW5SbGMzUmZkWE5sY2w4eElpd2lhV0YwSWpveE5URTJOakEyTVRBMWZRLkVFRFg4UmdvX3Byak5zYkhsdjg5QmVqUjRvSnNabE5KbmFqR2twQ3JWSEkifQ.cNxCjC072lTxu2ei-7uCDYmMhgY41ssdN1HzA-xLy3I";
            //         response = { success: true ,data:data};
            //     } else {
            //         response = { success: false, message: 'Username or password is incorrect' };
            //     }
            //     callback(response);
            // }, 1000);
            
            /* Use this for real authentication
             ----------------------------------------------*/
             //SetLoginAuthCredentials();

            //  var config = {headers: {
            //     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzIjoicGFzc3dvcmQiLCJ1c2VyIjoidGVzdF91c2VyXzEiLCJpYXQiOjE1MTYxNDE1Nzd9.l3CHjafg69xJVVt_VKe31GqvoEOiuBOYHQ4lLJI1Umo'
            //     }
            //   };
            // $http.post('http://ec2-54-70-140-59.us-west-2.compute.amazonaws.com:8080/api/auth',config)
            //     .success(function (response) {
            //         callback(response);
            //     });
            $http({
                url : "http://ec2-54-70-140-59.us-west-2.compute.amazonaws.com:8080/api/auth",
                method : 'POST',
                transformResponse: [function (data) {
                    // Do whatever you want!
                    return {data:data};
                }],
                headers : {
                       Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzIjoicGFzc3dvcmQiLCJ1c2VyIjoidGVzdF91c2VyXzEiLCJpYXQiOjE1MTYxNDE1Nzd9.l3CHjafg69xJVVt_VKe31GqvoEOiuBOYHQ4lLJI1Umo'
                }
              }).then(function(htppResponse){
                //success code
                console.log(response);
                var response = { success: true ,data:htppResponse.data.data};
                callback(response);
            }, function(httpResponse){
                //error code
                console.log("InvalidLogin");
                var response = { success: false, message: 'Username or password is incorrect' };
                callback(response);
            });;

            // $http({
                
            //     url : "http://ec2-54-70-140-59.us-west-2.compute.amazonaws.com:8080/api/auth",
            //     method : 'POST',
            //     responseType: 'text',
            //     headers : {
            //           Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzIjoicGFzc3dvcmQiLCJ1c2VyIjoidGVzdF91c2VyXzEiLCJpYXQiOjE1MTYxNDE1Nzd9.l3CHjafg69xJVVt_VKe31GqvoEOiuBOYHQ4lLJI1Umo'
            //           }
            //     }).then(function(response){
            //         console.log(response);
            //     }, errorCallback);

        }

        function successCallback(htppResponse){
            //success code
            console.log(response);
            var response = { success: true ,data:htppResponse.data};
            htppResponse.callBack(response);
        }
        function errorCallback(httpResponse){
            //error code
            console.log("InvalidLogin");
            var response = { success: false, message: 'Username or password is incorrect' };
            htppResponse.callBack(response);
        }

        function SetLoginAuthCredentials(){
            $http.headers.Authorization='Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzIjoicGFzc3dvcmQiLCJ1c2VyIjoidGVzdF91c2VyXzEiLCJpYXQiOjE1MTYxNDE1Nzd9.l3CHjafg69xJVVt_VKe31GqvoEOiuBOYHQ4lLJI1Umo';
            //$http.defaults.headers.common['Authorization'] = 
            
        }

        function SetCredentials(data){
            var datalist= data.split('.');
           var decodedjsonData= Base64.decode(datalist[1]);
           decodedjsonData = decodedjsonData.replace(/\\"/g, '"');
           decodedjsonData = decodedjsonData.replace(/:"\[/g, ':[');
           decodedjsonData = decodedjsonData.replace(/\]",/g, '],');
           decodedjsonData = decodedjsonData.replace(/ $/g, "");
           decodedjsonData = decodedjsonData.substring(0, decodedjsonData.length - 2); 
            var jsonResult=angular.fromJson(decodedjsonData)    
            $rootScope.globals = {
                authResult: jsonResult,currentUser:jsonResult.user
                    };
                    
                     // set default auth header for http requests
           $http.defaults.headers.common['Authorization'] = 'Bearer '+decodedjsonData.token;

            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
        }

        // function SetCredentials(username, password) {
        //     var authdata = Base64.encode(username + ':' + password);

        //     $rootScope.globals = {
        //         currentUser: {
        //             username: username,
        //             authdata: authdata
        //         }
        //     };

        //     // set default auth header for http requests
        //    // $http.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJTVEQiXSwidXNlciI6InRlc3RfdXNlcl8xIiwiaWF0IjoxNTE2MTQxNjExfQ.OZAv4BqkI8WYLVmoiF0nPOTG7DUDbgWHRRfIMiEsvvQ ';

        //     // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
        //     var cookieExp = new Date();
        //     cookieExp.setDate(cookieExp.getDate() + 7);
        //     $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
        // }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }
    

    // Base64 encoding service used by AuthenticationService
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

})();