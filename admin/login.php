<html>
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:700|Roboto|Open+Sans:300" rel="stylesheet">
      <link href="content/site.css" rel="stylesheet">
      <script type="text/javascript" src="scripts/jquery-1.10.2.min.js"></script>
      <script type="text/javascript" src="https://code.angularjs.org/1.2.21/angular.js"></script>
      <title>Guía de Cracovia</title>
  </head>

   <body>
      <section>
            <h2>Login</h2>
              <?php if (isset($_GET["error"])) { echo "<p>".$_GET['error']."</p>";} ?>

               <form action = "login_check.php" method = "post">
                 <table>
                   <tr>
                     <td>UserName:</td>
                     <td><input type = "text" name = "username" class = "box"/></td>
                   </tr>
                   <tr>
                     <td>Password:</td>
                     <td><input type = "password" name = "password" class = "box"/></td>
                   </tr>
                   <tr>
                     <td colspan="2">
                       <input type = "submit" value = " Submit "/>
                     </td>
                   </tr>
               </form>
      </section>
   </body>
</html>
