var app = angular.module('app', ['textAngular']);


app.controller('MainCtrl', ['$scope','$http','$timeout','textAngularManager','$location', function ($scope,$http,$timeout,textAngularManager,$location) {

    $scope.init =function(){
      $scope.urlToApi = "api.php";
      $scope.fetchDictionary();
      $scope.fetchEditableTours();
      $scope.fetchLanguages();
      $scope.fetchAbout();
      $scope.fetchContact();
      $scope.fetchPictures();


      var urlstring = $location.absUrl();
      if(urlstring.match("success") != undefined)
      {
        $scope.displayUploadPictures = true;
        var parameters = urlstring.split("?")[1].split("&");
        if(parameters[0].substring(8,parameters[0].length) == "true"){
          $scope.UploadSuccessMsg = "Picture has been uploaded";

        }
        else
        {
          $scope.UploadFailedMsg = parameters[1].substring(4,parameters[1].length);
        }
      }
    }

    $scope.fetchEditableTours = function()
    {
      $http({
          method: "GET",
          url: $scope.urlToApi,
          params: {
              action : "get_editable_tours"
          }
      }).then(function(response) {
            $scope.tours= response.data;
        });

    }

    $scope.selectedTour = function(id)
    {
      $http({
          method: "GET",
          url: $scope.urlToApi,
          params: {
              action : "get_selected_tour",
              tourid: id
          }
      }).then(function(response) {
            $scope.selectedTour= response.data;
            $scope.showEditTourSection = true;
        });


    }

    $scope.fetchLanguages = function()
    {
        $http({
            method: "GET",
            url: $scope.urlToApi,
            params: {
                action : "get_languages"
            },
            cache: false
        }).then(function(response) {

              $scope.languages = response.data;

          });
    }

    $scope.fetchDictionary = function()
    {
        $http({
            method: "GET",
            url: $scope.urlToApi,
            params: {
                action : "get_dictionary"
            }
        }).then(function(response) {

              $scope.translations = response.data;
              $scope.translationsWords =_.uniq(_.pluck(response.data, 'KeyName'));

          });
    }

    $scope.fetchAbout = function()
    {
        $http({
            method: "GET",
            url: $scope.urlToApi,
            params: {
                action : "get_about"
            }
        }).then(function(response) {

              $scope.about = response.data;


          });
    }

    $scope.fetchContact = function()
    {
        $http({
            method: "GET",
            url: $scope.urlToApi,
            params: {
                action : "get_contact"
            }
        }).then(function(response) {

              $scope.contact = response.data;


          });
    }

    $scope.fetchPictures = function()
    {
        $http({
            method: "GET",
            url: $scope.urlToApi,
            params: {
                action : "get_pictures"
            }
        }).then(function(response) {

              $scope.uploadedPictures = response.data;


          });
    }

    $scope.editTranslation = function()
    {
      $(".editable-sections").hide();
        $("#translation").show();
    }

    $scope.changeTranslationItem = function(item)
    {

      $http({
          method: "GET",
          url: $scope.urlToApi,
          params: {
              action : "update_translation",
              id: item.Id,
              value : item.Value
          }
      }).then(function(response) {

              item.changestate = false;
              $scope.displayMsg = true;
             $timeout(function() { $scope.displayMsg = false;},5000);
        });
    }

    $scope.editTours = function()
    {
      $scope.showEditTourSection = false;
      $(".editable-sections").hide();
      $("#edit-tour").show();

    }
    $scope.uploadPictures = function()
    {
          $(".editable-sections").hide();
            $("#upload-pictures").show();
    }

    $scope.editText = function(type)
    {
      $(".editable-sections").hide();
      $("#text-editor").show();


        switch(type){
            case "About":
                $scope.changeEditLanguage("1", $scope.about);
                $scope.list = $scope.about;
           break;
           case "Contact":
           $scope.changeEditLanguage("1", $scope.contact);
           $scope.list = $scope.contact;
           break;
        }
    }

    $scope.saveTour = function()
    {

        var tour = $scope.selectedTour[0];
        $http({
            method: "GET",
            url: $scope.urlToApi,
            params: {
                action : "save_tour",
                id: tour.TourId,
                duration: tour.Duration,
                price: tour.Price,
                img: tour.Img
            }
        }).then(function(response) {

              $.each($scope.selectedTour, function(index,item) {
                $http({
                    method: "GET",
                    url: $scope.urlToApi,
                    params: {
                        action : "save_tour_text",
                        id: item.Id,
                        title: item.Title,
                        longdescription: item.LongDescription,
                        shortdescription: item.ShortDescription
                    }
                }).then(function(response) {
                        $( "body" ).scrollTop( 0 );
                        $scope.displayMsg = true;
                        $timeout(function() { $scope.displayMsg = false;},5000);
                });


              });
          });


    }

    $scope.changeEditLanguage = function(languageid,list)
    {
      $scope.itemToEdit =  _.findWhere(list, {LanguageId : languageid});
      $scope.itemToEdit.Language = _.findWhere($scope.languages, {Id : languageid});
       $scope.textToEdit = $scope.itemToEdit.Text;
    }

    $scope.updateItemToEdit = function()
    {
        switch($scope.sectiontoedit) {
          case "About":
            var parameters = {
                action : "update_about_item",
                id: $scope.itemToEdit.Id,
                value : $scope.textToEdit
            }
            var item = _.findWhere($scope.about, {Id: $scope.itemToEdit.Id});
            item.Text = $scope.textToEdit;
          break;
          case "Contact":
            var parameters = {
                action : "update_contact_item",
                id: $scope.itemToEdit.Id,
                value : $scope.textToEdit
            }
            var item = _.findWhere($scope.contact, {Id: $scope.itemToEdit.Id});
            item.Text = $scope.textToEdit;
          break;
        }

         $scope.displayMsg = true;

        $http({
            method: "GET",
            url: $scope.urlToApi,
            params: parameters
        }).then(function(response) {
                $timeout(function() { $scope.displayMsg = false;},5000);

          });
    }

    $scope.wysiwygeditor = function($scope, textAngularManager) {
            $scope.version = textAngularManager.getVersion();
            $scope.versionNumber = $scope.version.substring(1);
            $scope.disabled = false;
        }
}]);
