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



app.controller('MainCtrl', function ($scope,$http) {

    $scope.init =function(){
      $scope.urlToApi = "api.php";
      $scope.fetchDictionary();
      $scope.fetchTours();
      $scope.fetchAbout();
      $scope.fetchContact();
      $scope.fetchLanguages();


    }

    $scope.filterOnLanguageId = function(item) {
      console.log(item);
      console.log($scope.languageId);
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
        console.log(lang);
        $scope.aboutText = _.findWhere($scope.about, {LanguageId: lang.Id}).Text;
        $scope.contactText = _.findWhere($scope.contact, {LanguageId: lang.Id}).Text;


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
              console.log(uniqTours);
              $scope.tours = uniqTours;
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
              $scope.changeLanguage(response.data[0]);
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
          });
    }



});




//var oe = unescape("%F6");
//var aa = unescape("%E5");
//var ae = unescape("%E4");
//var ismobile = true;

//$(document).ready()
//{

//    enquire.register("screen and (min-width:900px)", {
//        match: function () {
//            ismobile = false;
//        }

//    });

//    var height = $(window).height();
//    if (height > 300) {
//        $("#start").css("height", height);
//    }

//    google.maps.event.addDomListener(window, 'load', initialize);

//    initfacebookapi();
//    getfacebookfeed();
//    getfacebookevents();
//    getfacebookabout();
//    initiatelinks();
//    getbistroitems();



//}


//function initiatelinks() {

//    $("header ul").each(function () {
//        var name = $(this).attr("aria-data");
//        $(this).on("click", function () {

//            $('html, body').animate({
//                scrollTop: $("#" + name).offset().top - 20
//            }, 1000);

//        });
//    });

//    $("#arrow").on("click", function () {

//        $('html, body').animate({
//            scrollTop: $("#currentevents").offset().top - 20
//        }, 1000);

//    });

//    $("#uparrow").on("click", function () {

//        $('html, body').animate({
//            scrollTop: $("#start").offset().top
//        }, 1000);

//    });
//}


//function getweekno() {
//    Date.prototype.getWeek = function () {
//        var date = new Date(this.getTime());
//        date.setHours(0, 0, 0, 0);
//        // Thursday in current week decides the year.
//        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
//        // January 4 is always in week 1.
//        var week1 = new Date(date.getFullYear(), 0, 4);
//        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
//        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
//                        - 3 + (week1.getDay() + 6) % 7) / 7);
//    }

//    return (new Date()).getWeek();

//}

//function initfacebookapi() {
//    FB.init({
//        appId: 'bakgardensbistro',
//        version: 'v2.6' // or v2.0, v2.1, v2.2, v2.3
//    });

//}

//function getfacebookfeed() {

//    var weekno = getweekno();
//    var matchstring = "vecka "  + weekno;
//    var isMatch = false;
//    $("#lunch_header").text("dagens lunch v." + weekno);

//    FB.api(
//	    "bakgardensbistro/feed?access_token=469653473070587|E__qcd7vXlMdFDqe_-UFad8EYA8",
//	    function (response) {
//	        if (response && !response.error) {

//	            for (var i = 0; i < response.data.length; i++) {
//	                if (response.data[i].message != undefined) {
//	                    if (response.data[i].message.toLowerCase().match(matchstring) && !isMatch) {
//                          isMatch = true;
//                            var menyn = response.data[i].message.split("dag:");
//	                        var menu = response.data[i].message.split("\u000a");

//	                        for (var h = 0; h < menu.length; h++) {
//	                            var row = menu[h].replace("\u2022", "");
//	                            if (row.match("dag:")) {
//	                                $("#lunch_content").append("<h3>" + row + "</h3>");
//	                            }
//	                            else {
//	                                $("#lunch_content").append(row + "<br />");
//	                            }
//	                        }

//	                    }
//	                }
//	            }
//	        }
//	    }
//	);
//}



//function getfacebookabout() {
//    FB.api(
//    "bakgardensbistro/?access_token=469653473070587|E__qcd7vXlMdFDqe_-UFad8EYA8&fields=about,fan_count",
//    function (response) {
//        if (response && !response.error) {

//            var info = response.about.split("\u000a");
//            var nooflikes = response.fan_count;

//            for (var i = 0; i < info.length; i++) {
//                if (info[i] != "")
//                    $("#fbabout").append(info[i] + "<br />");
//            }
//        }
//    });
//}


//function getfacebookevents() {
//    FB.api(
//    "bakgardensbistro/events?access_token=469653473070587|E__qcd7vXlMdFDqe_-UFad8EYA8&fields=photos{images},description,name,start_time&limit=2",
//    function (response) {
//        if (response && !response.error) {

//            responses = response;
//            for (var i = 0; i < response.data.length; i++) {

//                var $div = $('<div></div>');

//                $div.addClass("eventitem");

//                if (response.data[i].photos != undefined) {
//                    $div.append("<div class='eventimg'><img src='" + response.data[i].photos.data[0].images[0].source + "' width='500'/></div>");
//                }
//                var date = response.data[i].start_time.split("T");
//                var time = date[1].split("+");


//                var dateobject = convert_string_to_date(date[0], time[0]);
//                var time_to_event = "";
//                if (dateobject < new Date()) {
//                    time_to_event = "<span class='eventended'>(Har redan " + ae + "gt rum)</span>";
//                }
//                else {
//                    var daysleft = Math.round((dateobject - new Date()) / (1000 * 60 * 60 * 24));

//                    if (daysleft == 0) {
//                        time_to_event = "(Idag)";
//                    }
//                    else {
//                        time_to_event = "(Om " + daysleft +" dagar)";
//                    }
//                }



//                $div.append("<h4>" + response.data[i].name + "</h4>");
//                $div.append("<div> " + date[0] + " " + time[0].substring(0, time[0].length - 3) + " " + time_to_event + "</div>");
//                $div.append("<div>" + response.data[i].description + "</div>");

//                $("#events").append($div);

//            }

//        }
//    });
//}

//function convert_string_to_date(date, time) {

//    var splitted_date = date.split("-");
//    var year = splitted_date[0];
//    var month = splitted_date[1]-1;
//    var day = splitted_date[2];

//    var splitted_time = time.split(":");
//    var hours = splitted_time[0];
//    var minutes = splitted_time[1];

//    var date = new Date(year, month, day,hours,minutes);

//    return date;

//}

///* map */
//function initialize() {

//    var myLatlng = new google.maps.LatLng(57.26670, 16.44797);


//    var mapCanvas = document.getElementById('map-canvas');
//    var mapOptions = {
//        center: myLatlng,
//        scrollwheel: false,
//        zoom: 16,
//        styles: mapstyle,
//        mapTypeId: google.maps.MapTypeId.ROADMAP
//    }

//    var map = new google.maps.Map(mapCanvas, mapOptions);

//    var marker = new google.maps.Marker({
//        position: myLatlng,
//        map: map,
//        title: 'Bakg�rdens bistro'
//    });

//}

///* change header meny */
//jQuery(function ($) {

//    var isblackmenu = false;

//    var padding = "";

//    $(window).scroll(function () {

//        var scrolled = $(window).scrollTop();

//        if (scrolled > 50 && !isblackmenu) {

//            isblackmenu = true;

//            padding = ismobile ? "14px 0px 14px 20px" : "14px 0px 14px 60px";

//            $('header li').animate({
//                padding: padding
//            }, 200);

//            $('header').animate({
//                "background-color": "#000000",
//                "border-bottom-style": "solid",
//                "border-bottom-width": "1px",
//                "border-color": "#757575"
//            }, 200);

//            $("#uparrow").fadeIn();

//        }

//        if (scrolled < 50 && isblackmenu) {

//            isblackmenu = false;

//            padding = ismobile ? "14px 0px 14px 20px" : "30px 0px 30px 60px";

//            $('header li').animate({
//                padding: padding
//            }, 200);

//            $('header').css("border", "0px");
//            $('header').animate({
//                "background-color": "transparent"
//            }, 200);

//            $("#uparrow").fadeOut();

//        }




//    });

//});



//function getbistroitems() {


//    $.ajax({
//        url: "api.php",
//        type: "GET",
//        cache: false,

//        data: { action: "get_bistro" },
//        error: function () { },
//        dataType: 'json',
//        success: function (bistroitems) {


//            for (var i = 0; i < bistroitems.length; i++) {

//                var div = renderitem(bistroitems[i].desc, bistroitems[i].top, bistroitems[i].left, bistroitems[i].type, bistroitems[i].sizevalue);
//                $(".bistro_content").append($(div));
//            }
//        }
//    });


//}

///* render bistro items */
//function renderitem(text, top, left, type, fontsize) {

//    var div = document.createElement("div");

//    $(div).addClass("itemsonbistmenu");
//    $(div).css('top', top);
//    $(div).css('left', left);
//    if (!ismobile) {

//        $(div).css('font-size', fontsize);
//    }


//    if (type == "text") {
//        $(div).text(text);
//    }
//    else {
//        $(div).append('<img src="content/imgs/bistmenu/' + text + '" alt="' + text + '">');
//    }


//    return div;
//}


//var mapstyle = [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40}] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16}] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off"}] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20}] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2}] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20}] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21}] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 17}] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2}] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18}] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16}] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19}] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 17}]}];
