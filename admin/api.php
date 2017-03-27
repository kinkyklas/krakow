<?php
  include('session.php');
// Create connection

if (isset($_GET["action"]))
{
    $conn = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
    $conn->set_charset("utf8");

    $action = mysqli_real_escape_string($db,$_GET["action"]);

    switch ($action)
    {
      case "get_tours":
          $sqlstring = "SELECT * FROM tbl_tours";
          returnJsonData($sqlstring,$conn);
        break;
        case "get_editable_tours":
            $sqlstring = "SELECT * FROM tbl_tours inner join tbl_tours_text on tbl_tours_text.TourId = tbl_tours.Id where tbl_tours_text.LanguageId = 4";
            returnJsonData($sqlstring,$conn);
          break;
        case "get_selected_tour":
          $id = mysqli_real_escape_string($db,$_GET["tourid"]);
            $sqlstring = "SELECT * FROM `tbl_tours` inner join tbl_tours_text on tbl_tours_text.TourId = tbl_tours.Id inner join tbl_languages on tbl_tours_text.LanguageId = tbl_languages.Id where tbl_tours.Id = ". $id;
            returnJsonData($sqlstring,$conn);
          break;
      case "get_languages":
          $sqlstring = "SELECT * FROM tbl_languages order by id";
          returnJsonData($sqlstring,$conn);
        break;
      case "get_dictionary":
          $sqlstring = "SELECT * FROM tbl_translations Order by KeyName,LanguageId";
          returnJsonData($sqlstring,$conn);
        break;
        case "get_about":
            $sqlstring = "SELECT * FROM tbl_about";
            returnJsonData($sqlstring,$conn);
          break;
        case "get_contact":
              $sqlstring = "SELECT * FROM tbl_contact";
              returnJsonData($sqlstring,$conn);
            break;
        case "get_pictures":
              $sqlstring = "SELECT * FROM tbl_uploads";
              returnJsonData($sqlstring,$conn);
            break;
        case "update_translation":
            $id = mysqli_real_escape_string($db,$_GET["id"]);
            $value = mysqli_real_escape_string($db,$_GET["value"]);
            $sqlstring = "UPDATE tbl_translations SET Value ='".$value."' WHERE id =".$id;
            updateData($sqlstring,$conn);
            break;
        case "update_about_item":
            $id = mysqli_real_escape_string($db,$_GET["id"]);
            $value = mysqli_real_escape_string($db,$_GET["value"]);
            $sqlstring = "UPDATE tbl_about SET Text ='".$value."' WHERE Id =".$id;
            updateData($sqlstring,$conn);
            break;
        case "update_contact_item":
            $id = mysqli_real_escape_string($db,$_GET["id"]);
            $value = mysqli_real_escape_string($db,$_GET["value"]);
            $sqlstring = "UPDATE tbl_contact SET Text ='".$value."' WHERE Id =".$id;
            updateData($sqlstring,$conn);
            break;
        case "save_tour":
            $id = mysqli_real_escape_string($db,$_GET["id"]);
            $duration= mysqli_real_escape_string($db,$_GET["duration"]);
            $price = mysqli_real_escape_string($db,$_GET["price"]);
            $img= mysqli_real_escape_string($db,$_GET["img"]);
            $sqlstring = "UPDATE tbl_tours SET Price ='".$price."',Duration ='".$duration."',Img ='".$img."' WHERE Id =".$id;
            updateData($sqlstring,$conn);
            break;
        case "save_tour_text":
            $id = mysqli_real_escape_string($db,$_GET["id"]);
            $shortdescription= mysqli_real_escape_string($db,$_GET["shortdescription"]);
            $longdescription = mysqli_real_escape_string($db,$_GET["longdescription"]);
            $title= mysqli_real_escape_string($db,$_GET["title"]);
            $sqlstring = "UPDATE tbl_tours_text SET ShortDescription ='".$shortdescription."',LongDescription ='".$longdescription."',Title ='".$title."' WHERE Id =".$id;
            updateData($sqlstring,$conn);
            break;
    }

    $conn->close();
}

function updateData($sql, $conn)
{
  $result = mysqli_query($conn, $sql);
}

function returnJsonData($sql, $conn)
{
    $items = array();

    $result = mysqli_query($conn, $sql);

    if ($result->num_rows > 0) {
      // output data of each row
      while($row = mysqli_fetch_assoc($result)) {
          $items[] = $row;
      }
    }

    $conn->close();

    exit(json_encode($items));
}


?>
