var app = angular.module('app', ['textAngular']);


app.controller('MainCtrl', function ($scope,$http,$timeout,textAngularManager) {

    $scope.init =function(){
      $scope.urlToApi = "api.php";
      $scope.fetchDictionary();
      $scope.fetchTours();
      $scope.fetchLanguages();
      $scope.fetchAbout();
      $scope.fetchContact();
    }

    $scope.fetchTours = function()
    {
        $http({
            method: "GET",
            url:   $scope.urlToApi,
            params: {
                action : "get_tours"
            }
        }).then(function(response) {
              $scope.tours = response.data;
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
              console.log($scope.about);

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

    $scope.editTranslation = function()
    {
        $scope.displayTranslation = true;
          $scope.displayTextEditorSection = false;
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

    $scope.editText = function(type)
    {
        $scope.sectiontoedit = type;
        $scope.displayTextEditorSection = true;
        $scope.displayTranslation = false;

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
});
