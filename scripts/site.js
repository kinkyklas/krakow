var app = angular.module('app', ['textAngular']);

app.controller('MainCtrl', function ($scope,$http,$interval) {

    $scope.init =function(){

      $("#desktop-menu a, #mobile-menu a").each(function () {
              var name = $(this).attr("aria-data");
              $(this).on("click", function () {
                    $scope.showDetailedTour = false;
                  $('html, body').animate({
                      scrollTop: $("#" + name).offset().top - 100
                  }, 1000);
              });
          });

      $scope.urlToApi = "api.php";
      $scope.allFetched = 0;
      $scope.fetchTours();
      $scope.fetchStuff("get_about", 'about');
      $scope.fetchStuff("get_dictionary", 'translations');
      $scope.fetchStuff("get_contact", 'contact');
      $scope.fetchStuff("get_languages", 'languages');
      $scope.fetchStuff("get_about_img", 'aboutImg');
    }

    $scope.$watch('allFetched', function() {
      if($scope.allFetched == 4)
      {
        $scope.changeLanguage($scope.languages[0]);
      }
    });

    $scope.showDetails = function(tour)
    {
        $scope.showDetailedTour = true;
        //$scope.tourDetailsTexts = item;
        $scope.tourDetailsInfo = tour;
        $scope.prevScrollPosition = $('body').scrollTop();
        $('html, body').animate({
            scrollTop: '0px'
        }, 200);


    }

    $scope.backFromDetails = function()
    {

        $scope.showDetailedTour = false;
        $('html, body').animate({
            scrollTop: $scope.prevScrollPosition
        }, 200);

    }

    $scope.filterOnLanguageId = function(item) {
      if(item.LanguageId == $scope.languageId)
      {
        return item.LanguageId;
      }
    };

    $scope.changeLanguage = function (lang)
    {
        $.each($scope.languages, function (index, lang) {
            lang.IsSelected = "0";
        });

        lang.IsSelected = "1";

        $scope.translation = [];
        $.each($scope.translations,function(index,item){
            if(item.Language == lang.Language) {
              $scope.translation[item.KeyName] = item["Value"];
            }

        });
        $scope.languageId = lang.Id;
        $scope.aboutText = _.findWhere($scope.about, {LanguageId: lang.Id}).Text;
        $scope.contactText = _.findWhere($scope.contact, {LanguageId: lang.Id}).Text;


    }

    $scope.fetchStuff = function(action, variable)
    {
        $http({
            method: "GET",
            url: $scope.urlToApi,
            params: {
                action : action
            },
            cache: false
        }).then(function(response) {
              $scope[variable] = response.data;
              $scope.allFetched++;
          });

    }

    $scope.fetchTours = function()
    {
        $http({
            method: "GET",
            url: $scope.urlToApi,
            params: {
                action : "get_tours"
            }
        }).then(function(response) {
              var tours = response.data;
              var uniqTours = _.uniq(tours, function(x){
                  return x.TourId;
              });
              $.each(uniqTours, function(index,item) {
                    item.Languages = [];

                    for(var k = 0;k < tours.length; k++)
                    {
                      if(item.TourId == tours[k].TourId)
                      {
                        item.Languages.push(tours[k]);
                      }
                    }

              });
              $scope.tours = uniqTours;
              return true;
          });

    }

});
