<?php 

$json = file_get_contents('php://input');
$data = json_decode($json);

Class API {
    public static function instance() {
        static $instance = null;

        if ($instance === null) {
            $instance = new API();
        }

        return $instance;
    }

    private function __construct() {
        $hostname = 'localhost';
        $username = 'u20548096';
        $password = 'MTPYGC3TOZX2EXRMSG4GG6N7QLIRS5K7';

        $connection = new mysqli($hostname, $username, $password);

        if($connection->connect_error) {
            die ("connection failure " . $connection->connect_error);
        }
        else {
            $connection->select_db('cars');
            echo "Connection success";
        }
    }

    private function __destruct() {
        //disconnect from db
    }

    public function isUsernameValid($username) {

    }

    public function getCars() {

    }

    function response($success, $message = "", $data = "") {
        header("HTTP/1.1 200 OK");
        header("Content-Type: application/json");

        echo json_encode([
            "success" => $success,
            "message" => $message,
            "data" => $data,
        ]);
    }
}

$api = API::instance();


?>