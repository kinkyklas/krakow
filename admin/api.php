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
    }

    $conn->close();

}

function updateData($sql, $conn)
{

//    $sql = "Insert into bistro (`desc`, `type`, `top`, `left`, `sizevalue`) values('".$desc."','text','".$top."','".$left."','".$fontsize."')";


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
