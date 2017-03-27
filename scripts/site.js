$(document).ready()
{
    $("#header_menu a").each(function () {
            var name = $(this).attr("aria-data");
            $(this).on("click", function () {
                //$("#container").scrollTop(1000);
                console.log($("#" + name).offset().top);
                //console.log($('#container').scrollTop());
                $('#container').animate({
                    scrollTop: $("#" + name).offset().top-100
                   // "margin-top": "10px"
                }, 1000);
            });
        });
}


var app = angular.module('app', ['textAngular']);

app.controller('MainCtrl', function ($scope,$http,$interval) {

    $scope.init =function(){
      $scope.urlToApi = "api.php";
      $scope.allFetched = 0;
      $scope.fetchTours();
      $scope.fetchStuff("get_about", 'about');
      $scope.fetchStuff("get_dictionary", 'translations');
      $scope.fetchStuff("get_contact", 'contact');
      $scope.fetchStuff("get_languages", 'languages');
    }

    $scope.$watch('allFetched', function() {
      if($scope.allFetched == 4)
      {
        $scope.changeLanguage($scope.languages[0]);
      }
    });

    $scope.showDetails = function(item,tour)
    {
        $scope.showDetailedTour = true;
        $scope.tourDetailsTexts = item;
        $scope.tourDetailsInfo = tour;
        $("#tour-details").css("background-image", "url('content/imgs/uploads/"+tour.Img+"')");

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
