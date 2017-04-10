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
          $sqlstring = "SELECT * FROM tbl_tours ORDER BY id";
          returnJsonData($sqlstring,$conn);
          break;
        case "get_editable_tours":
            $sqlstring = "SELECT * FROM tbl_tours inner join tbl_tours_text on tbl_tours_text.TourId = tbl_tours.Id where tbl_tours_text.LanguageId = 4 order by tbl_tours.Id";
            returnJsonData($sqlstring,$conn);
          break;
        case "get_selected_tour":
          $id = mysqli_real_escape_string($db,$_GET["tourid"]);
            $sqlstring = "SELECT tbl_tours.*, tbl_tours_text.*, tbl_languages.Language, tbl_languages.FlagImg FROM `tbl_tours` inner join tbl_tours_text on tbl_tours_text.TourId = tbl_tours.Id inner join tbl_languages on tbl_tours_text.LanguageId = tbl_languages.Id where tbl_tours.Id = ". $id;
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
        case "update_about_img":
            $id = mysqli_real_escape_string($db,$_GET["id"]);
            $sqlstring = "UPDATE tbl_uploads SET AboutImg = 0";
            updateData($sqlstring,$conn);
            $sqlstring = "UPDATE tbl_uploads SET AboutImg = 1 WHERE Id =".$id;
            updateData($sqlstring,$conn);
            break;
        case "save_tour":
            $id = mysqli_real_escape_string($db,$_GET["id"]);
            $duration= mysqli_real_escape_string($db,$_GET["duration"]);
            $img= mysqli_real_escape_string($db,$_GET["img"]);
            $sqlstring = "UPDATE tbl_tours SET Duration ='".$duration."',Img ='".$img."' WHERE Id =".$id;
            updateData($sqlstring,$conn);
            break;

        case "save_tour_text":
            $id = mysqli_real_escape_string($db,$_GET["id"]);
            $price = mysqli_real_escape_string($db,$_GET["price"]);
            $shortdescription= mysqli_real_escape_string($db,$_GET["shortdescription"]);
            $longdescription = mysqli_real_escape_string($db,$_GET["longdescription"]);
            $title= mysqli_real_escape_string($db,$_GET["title"]);
            $sqlstring = "UPDATE tbl_tours_text SET ShortDescription ='".$shortdescription."',LongDescription ='".$longdescription."',Title ='".$title."', Price = '".$price."' WHERE Id =".$id;
            updateData($sqlstring,$conn);
            break;

        case "insert_tour":
            $sqlstring = "Insert INTO tbl_tours(duration,img) VALUES('0:00','')";
            updateData($sqlstring,$conn);
            $sqlstring = "SELECT * FROM tbl_tours ORDER BY id DESC LIMIT 1";
            returnJsonData($sqlstring,$conn);

            break;
        case "insert_tour_texts":
            $languageid= mysqli_real_escape_string($db,$_GET["languageid"]);
            $tourid = mysqli_real_escape_string($db,$_GET["tourid"]);
            $sqlstring = "Insert INTO tbl_tours_text(ShortDescription, LongDescription,Title,LanguageId,TourId,Price) VALUES('enter short description','enter long description','click to edit new tour',".$languageid.",".$tourid.",'enter price')";
            updateData($sqlstring,$conn);
            $sqlstring = "SELECT * FROM tbl_tours ORDER BY id DESC LIMIT 1";
            returnJsonData($sqlstring,$conn);

            break;
        case "remove_tour":
            $id= mysqli_real_escape_string($db,$_GET["id"]);
            $sqlstring = "DELETE FROM tbl_tours WHERE id = ".$id;
            updateData($sqlstring,$conn);
            $sqlstring = "DELETE FROM tbl_tours_text WHERE tourid = ".$id;
            updateData($sqlstring,$conn);
            break;
        case "remove_picture":
            $target_dir = "../content/imgs/uploads/";
            $filename = $target_dir."".$_GET["filename"];
            $id= mysqli_real_escape_string($db,$_GET["id"]);

            if (!unlink($filename))
            {
                exit(json_encode("Error deleting ".$filename));
            }
          else
            {
              $sqlstring = "DELETE FROM tbl_uploads WHERE Id = ".$id;
              updateData($sqlstring,$conn);
              exit(json_encode("Deleted ".$_GET["filename"]));
            }
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
