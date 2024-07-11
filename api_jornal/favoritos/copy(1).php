<?php
 
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST, PUT");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
    $method = $_SERVER["REQUEST_METHOD"];
    include("../connection/connection.php");
    include("../valida_token.php");

 
    if($method == "GET"){
        //echo "GET";
 
        if (!isset($_GET["id"])){
 
            // listar todos os registros
            try {
               
                $sql = "SELECT pk_id, fk_noticia, fk_clientes, clientes.nome, noticia.titulo, noticia.imagem
                        FROM favoritos
                        JOIN noticia ON favoritos.fk_noticia = noticia.pk_id;
                        JOIN clientes ON favoritos.fk_clientes = clientes.pk_id";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
 
                $dados = $stmt->fetchall(PDO::FETCH_OBJ);
 
                $result["favoritos"]=$dados;
                $result["status"] = "success";
 
                http_response_code(200);
 
            } catch (PDOException $ex) {
                // echo "error: ". $ex->getMEssage();
                $result =["status"=> "fail", "error"=> $ex->getMEssage()];
                http_response_code(200);
            }finally{
                $conn = null;
                echo json_encode($result);
            }

        } elseif (!isset($_GET["pk_clientes"])){

            $pk_clientes = $_GET["pk_clientes"];
 
            // listar todos os registros
            try {
               
                $sql = "SELECT pk_id, fk_noticia, fk_clientes, clientes.nome, noticia.titulo, noticia.imagem
                        FROM favoritos
                        JOIN noticia ON favoritos.fk_noticia = noticia.pk_id;
                        JOIN clientes ON favoritos.fk_clientes = clientes.pk_id
                        WHERE clientes.pk_id=:pk_clientes";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':pk_clientes',$pk_clientes);
                $stmt->execute();
 
                $dados = $stmt->fetchall(PDO::FETCH_OBJ);
 
                $result["favoritos"]=$dados;
                $result["status"] = "success";
 
                http_response_code(200);
 
            } catch (PDOException $ex) {
                // echo "error: ". $ex->getMEssage();
                $result =["status"=> "fail", "error"=> $ex->getMEssage()];
                http_response_code(200);
            }finally{
                $conn = null;
                echo json_encode($result);
            }

        } else{
            // listar um registro
            try{
 
                if(empty($_GET["id"]) || !is_numeric($_GET["id"])){
                    // está vazio ou não é numérico : ERRO
                    throw new ErrorException("Valor inválido", 1);
                }
                $id = $_GET["id"];
 
                $sql= "SELECT pk_id, fk_noticia, fk_clientes, clientes.nome, noticia.titulo, noticia.imagem
                        FROM favoritos
                        JOIN noticia ON favoritos.fk_noticia = noticia.pk_id
                        JOIN clientes ON favoritos.fk_clientes = clientes.pk_id
                        WHERE pk_id=:id";
               
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(":id", $id);
                $stmt->execute();
 
                $dado = $stmt->fetch(PDO::FETCH_OBJ);
                $result['favoritos'] = $dado;
                $result["status"] = "success";
 
            }catch(PDOException $ex){
                $result =["status"=> "fail", "error"=> $ex->getMEssage()];
                http_response_code(200);
            }catch(Exception $ex){
                $result =["status"=> "fail", "error"=> $ex->getMEssage()];
                http_response_code(200);
            }finally{
                $conn = null;
                echo json_encode($result);
            }
           
        }
 
       
    }
    if($method=="POST"){
       
        // recupera dados do corpo (body) de uma requisão POST
        $dados = file_get_contents("php://input");
 
        // decodifica JSON, sem opção TRUE
        $dados = json_decode($dados); // isso retorna um OBJETO
 
        // função trim retira espaços que estão sobrando
     
       
        $fk_noticia = trim($dados->fk_noticia); // acessa valor de um OBJETO
        $fk_clientes = trim($dados->fk_clientes); // acessa valor de um OBJETO
       
        try {
           
 
            if(empty($dados->fk_noticia) ){
                // está vazio  : ERRO
                throw new ErrorException("Valor da fk_noticia é inválido", 1);
            }
            if(empty($dados->fk_clientes) ){
                // está vazio  : ERRO
                throw new ErrorException("Valor da fk_clientes é inválido", 1);
            }
           
           
            $sql = "INSERT INTO favoritos(fk_noticia, fk_clientes)
                    VALUES (:fk_noticia, :fk_clientes)";
 
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":fk_noticia", $fk_noticia);
            $stmt->bindParam(":fk_clientes", $fk_clientes);
            $stmt->execute();
 
            $result = array("status"=>"success");
 
 
 
 
        } catch (PDOException $ex) {

            $erro = $ex-> errorInfo[1];
            if($erro == 1062){
                $result =["status"=> "fail", "error"=> "Erro de Inserção: Genero Duplicado"];
            }else{
                $result =["status"=> "fail", "error"=> $ex->getMEssage()];
            }

            http_response_code(200);
        }catch(Exception $ex){
            $result =["status"=> "fail", "error"=> $ex->getMEssage()];
            http_response_code(200);
        }finally{
            $conn = null;
            echo json_encode($result);
        }
 
 
 
    }

   if($method=="DELETE"){
    try{
 
        if(empty($_GET["id"]) || !is_numeric($_GET["id"])){
            // está vazio ou não é numérico : ERRO
            throw new ErrorException("Valor inválido", 1);
        }
        $id = $_GET["id"];
 
        $sql= "DELETE FROM favoritos
                WHERE pk_id=:id";
       
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":id", $id);
        $stmt->execute();
 
   
        $result["status"] = "success";
 
    }catch(PDOException $ex){
        $result =["status"=> "fail", "error"=> $ex->getMEssage()];
        http_response_code(200);
    }catch(Exception $ex){
        $result =["status"=> "fail", "error"=> $ex->getMEssage()];
        http_response_code(200);
    }finally{
        $conn = null;
        echo json_encode($result);
    }
 
 
 
}
 
?>