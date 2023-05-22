<?php

$json = file_get_contents('php://input');
$data = json_decode($json);

class API
{
    public static function instance()
    {
        static $instance = null;

        if ($instance === null) {
            $instance = new API();
        }

        return $instance;
    }

    private function __construct()
    {
        $hostname = 'https://wheatley.cs.up.ac.za/';
        $username = 'u20548096';
        $password = 'MTPYGC3TOZX2EXRMSG4GG6N7QLIRS5K7';

        $connection = new mysqli($hostname, $username, $password);

        if ($connection->connect_error) {
            die("connection failure " . $connection->connect_error);
        } else {
            $connection->select_db('cars');
            echo "Connection success";
        }
    }

    private function __destruct()
    {
        $this->connection->close();
    }

    public function isUsernameValid($username)
    {

    }

    public function getRandomBrands($connection)
    {
        $cars = array();

        $query = "SELECT * 
                  FROM brands
                  WHERE id = " . rand(1, 12);

        $result = $connection->query($query);
        if ($result !== false) {
            $cars[] = $result->fetch_assoc();
        }

        $query = "SELECT * 
                  FROM brands
                  WHERE id = " . rand(1, 12);

        $result = $connection->query($query);
        if ($result !== false) {
            $cars[] = $result->fetch_assoc();
        }

        $query = "SELECT * 
                  FROM brands
                  WHERE id = " . rand(1, 12);

        $result = $connection->query($query);
        if ($result !== false) {
            $cars[] = $result->fetch_assoc();
        }

        $query = "SELECT * 
                  FROM brands
                  WHERE id = " . rand(1, 12);

        $result = $connection->query($query);
        if ($result !== false) {
            $cars[] = $result->fetch_assoc();
        }

        $query = "SELECT * 
                  FROM brands
                  WHERE id = " . rand(1, 12);

        $result = $connection->query($query);
        if ($result !== false) {
            $cars[] = $result->fetch_assoc();
        }

        return $cars;
    }

    function handleRequest()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = $_SERVER['REQUEST_URI'];

        if ($method === 'GET' && $uri === '/getRandomBrands') {
            $cars = $this->getRandomBrands($this->connection);

            header('Content-Type: application/json');
            echo json_encode($cars);
            return;
        }

        header('HTTP/1.1 404 Not Found');
        echo '404 Not Found';
    }

    function response($success, $message = "", $data = "")
    {
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
$api->handleRequest();

?>