<?php
   include('session.php');
?>
<html ng-app="app">

 <head>
   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
   <meta charset="utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link href="https://fonts.googleapis.com/css?family=Open+Sans:700|Roboto|Open+Sans:300" rel="stylesheet">
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
   <link rel='stylesheet' href='../content/font-awesome.css'>
   <link href="content/site.css" rel="stylesheet">
   <link rel="stylesheet" href="../content/textAngular.css" type="text/css">
   <script src="https://use.fontawesome.com/dd392a36d9.js"></script>
   <script type="text/javascript" src="scripts/jquery-1.10.2.min.js"></script>
   <script type="text/javascript" src="https://code.angularjs.org/1.2.21/angular.js"></script>
   <title>Administration</title>
 </head>

 <body ng-controller="MainCtrl" ng-init="init()">
    <header>
      <p><?php echo $login_session; ?> |
      <a href = "logout.php">Sign Out</a></p>
        <div>Change:
        <a href="#" ng-click="editText('Contact')">Contact</a> |
        <a href="#" ng-click="editText('About')">About</a> |
        <a href="#" ng-click="editTranslation()">Translation</a> |
        <a href="#" ng-click="editTours()">Tours</a> |
        <a href="#" ng-click="uploadPictures()">Handle pictures</a>
      </div>
    </header>

    <div class="operation-success" ng-show="displayMsg">update was successful!</div>

    <section id="translation" class="editable-sections">

      <h2>Translation</h2>
      <div id="translation-headers">
        <div></div>
      <div ng-repeat="language in languages">{{language.Language}}</div>
      </div>
      <div class="translation-item" ng-repeat="word in translationsWords">

          <div>{{word}}</div>
          <div ng-repeat="translation in translations | filter: word">
            <span ng-show="!translation.changestate" ng-click="translation.changestate = true">{{translation.Value}}</span>
            <span ng-show="translation.changestate">
              <input type="text" value="{{translation.Value}}" ng-model="translation.Value">
              <a ng-click="changeTranslationItem(translation)"><img src="../content/imgs/save.png"></a>
            </span>
          </div>
      </div>
    </section>

    <section id="text-editor" class="editable-sections">
      <h2>{{sectiontoedit}}</h2>
      <div id="edit-select-language">
          <div>Selected language: <img src="../content/imgs/{{itemToEdit.Language.FlagImg}}"></div>
          <div>change language:</div>
          <div ng-repeat="language in languages" ng-click="changeEditLanguage(language.Id,list)"><img src="../content/imgs/{{language.FlagImg}}"></div>
      </div>
      <div text-angular="text-angular" name="textToEdit" ng-model="textToEdit" ta-disabled='disabled'></div>

      <button ng-click="updateItemToEdit()">save</button>




    </section>

    <section id="edit-tour" class="editable-sections">
        <div ng-show="!showEditTourSection" >
          <h2>Select tour to edit</h2>
          <div ng-repeat="tour in tours" class="edit-tour-repeat-list" ng-class="{'edit-tour-new-added':newTourAdded}">
              <p title="remove tour" ng-click="$parent.removeTour(tour.TourId)">X</p>
              <a href="#" ng-click="$parent.selectTour(tour.TourId)">{{tour.Title}}</a>
          </div>
          <button ng-click="createNewTour()">Create new tour</button>
        </div>
      <div ng-show="showEditTourSection">
        <h2>{{selectedTour[0].Title}}</h2>
        <div id="edit-select-language">
            <div>Selected language: <img src="../content/imgs/{{(languages | filter: {Id : editTourSelectedLanguage})[0].FlagImg}}"></div>
            <div>change language:</div>
            <div ng-repeat="language in languages" ng-click="$parent.editTourSelectedLanguage = language.Id"><img src="../content/imgs/{{language.FlagImg}}"></div>
        </div>

        <div ng-repeat="tour in selectedTour" ng-show="editTourSelectedLanguage == tour.LanguageId">
          <h5>Select title</h5>
          <div class="edit-tour-section-part">
            <input type="text" ng-model="tour.Title"/>
          </div>

          <h5>Select short description</h5>
          <div class="edit-tour-section-part">
              <input type="text" ng-model="tour.ShortDescription"/>
          </div>

          <h5>Select long description</h5>
          <div class="edit-tour-section-part" id="tour-long-description">
            <div text-angular="text-angular" ng-model="tour.LongDescription" ta-disabled='disabled'></div>
          </div>

          <h5>Select price</h5>
          <input type="text" ng-model="tour.Price"/>
        </div>

        <h5>Select Duration</h5>
        <input type="text" ng-model="selectedTour[0].Duration"/>

        <h5>Select picture</h5>
        <div id="edit-tour-selected-picture-section">
          <div ng-repeat="picture in uploadedPictures" ng-class="{'edit-tour-selected-picture': picture.FileName == selectedTour[0].Img}" ng-click=" selectedTour[0].Img = picture.FileName">
              <img src="../content/imgs/uploads/{{picture.FileName}}">
          </div>
        </div>




        <br/><br/>
        <button ng-click="saveTour()">Save tour</button>
      </div>
    </section>

    <section id="upload-pictures" class="editable-sections">

          <div class="operation-success" ng-show="UploadSuccessMsg.length>0">{{UploadSuccessMsg}}</div>
          <div class="operation-failed" ng-show="UploadFailedMsg.length>0">{{UploadFailedMsg}}</div>
          <h2>Upload picture</h2>
          <div id="upload-pictures-form">
            <form action="upload.php" method="post" enctype="multipart/form-data">
              <h3>Select image to upload:</h3>
              <input type="file" name="fileToUpload" id="fileToUpload">
              <input type="submit" value="Upload Image" name="submit">
            </form>
          </div>
          <h3>Gallery</h3>
          <div id="upload-pictures-gallery">
                <div ng-repeat="picture in uploadedPictures">
                  <img src="../content/imgs/uploads/{{picture.FileName}}"><br />
                  {{picture.FileName}}<br/>
                  {{picture.Width}}px*{{picture.Height}}px<br/>
                  <span ng-click="removePicture(picture)">Remove picture</span><br />
                  <span ng-click="useAsAboutImg(picture)" ng-class="{'is-about-img': picture.AboutImg == 1}"> Use as about image</span>
                </div>
          </div>
    </section>


    <pre style="background-color:white;display:none" ng-bind="selectedTour | json"></pre>
    <script type="text/javascript" src="../scripts/underscore-min.js"></script>
    <script src='../scripts/textAngular-rangy.min.js'></script>
    <script src='../scripts/textAngular-sanitize.min.js'></script>
    <script src='../scripts/textAngular.min.js'></script>
      <script type="text/javascript" src="scripts/site.js"></script>

 </body>

</html>
