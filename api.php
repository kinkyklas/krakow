<?php


include('config.php');

if (isset($_GET["action"]))
{

  // Create connection
  $conn = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
  $conn->set_charset("utf8");

  $action = mysqli_real_escape_string($conn,$_GET["action"]);
    $sqlstring = "";
    switch ($action)
    {
      case "get_tours":
          $sqlstring = "SELECT * FROM tbl_tours inner join tbl_tours_text on tbl_tours.id = tbl_tours_text.TourId";
        break;
      case "get_languages":
          $sqlstring = "SELECT * FROM tbl_languages where isenabled = 1";
        break;
      case "get_dictionary":
          $sqlstring = "SELECT * FROM tbl_translations";
        break;
        case "get_about":
            $sqlstring = "SELECT * FROM tbl_about";
          break;
        case "get_contact":
          $sqlstring = "SELECT * FROM tbl_contact";
            break;
        case "get_about_img":
          $sqlstring = "SELECT FileName FROM tbl_uploads Where AboutImg = 1";
            break;
    }

    $items = array();

    $sql = $sqlstring;
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
