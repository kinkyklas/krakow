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
        <a href="#">Tours</a>
      </div>
    </header>

    <div class="operation-success" ng-show="displayMsg">update was successful!</div>

    <section id="translation" ng-show="displayTranslation">

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

    <section id="text-editor" ng-show="displayTextEditorSection">
      <h2>{{sectiontoedit}}</h2>
      <div id="edit-select-language">
          <div>Selected language: <img src="../content/imgs/{{itemToEdit.Language.FlagImg}}"></div>
          <div>change language:</div>
          <div ng-repeat="language in languages" ng-click="changeEditLanguage(language.Id,list)"><img src="../content/imgs/{{language.FlagImg}}"></div>
      </div>
      <div text-angular="text-angular" name="textToEdit" ng-model="textToEdit" ta-disabled='disabled'></div>

      <button ng-click="updateItemToEdit()">save</button>
      <h1>Preview:</h1>
      <div ta-bind ng-model="textToEdit"></div>


    </section>


    <script type="text/javascript" src="../scripts/underscore-min.js"></script>
    <script src='../scripts/textAngular-rangy.min.js'></script>
    <script src='../scripts/textAngular-sanitize.min.js'></script>
    <script src='../scripts/textAngular.min.js'></script>
      <script type="text/javascript" src="scripts/site.js"></script>

 </body>

</html>
