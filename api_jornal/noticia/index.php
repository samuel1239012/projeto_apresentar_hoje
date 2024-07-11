<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST, PUT");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    $method = $_SERVER["REQUEST_METHOD"];
    include("../connection/connection.php");
    include("../valida_token.php");


    if ($method == "GET") {
        if (isset($_GET["search"])) {
            $search = $_GET["search"];
            try {
                $sql = "SELECT noticia.pk_id, palavra_chave, texto, titulo, sub_titulo, data_postagem, imagem, fk_generos,
                        generos.tipo_genero
                        FROM noticia
                        JOIN generos ON noticia.fk_generos = generos.pk_id
                        WHERE titulo LIKE :search
                        OR palavra_chave LIKE :search
                        OR texto LIKE :search
                        OR sub_titulo LIKE :search
                        ";
                $stmt = $conn->prepare($sql);
                $stmt->bindValue(":search", "%$search%", PDO::PARAM_STR);
                $stmt->execute();
                $dados = $stmt->fetchAll(PDO::FETCH_OBJ);
                $result["noticia"] = $dados;
                $result["status"] = "success";
                http_response_code(200);
            } catch (PDOException $ex) {
                $result = ["status" => "fail", "error" => $ex->getMessage()];
                http_response_code(500); // Internal Server Error
            }
        } else if (isset($_GET["fk_genero"])) {
            $fk_genero = $_GET["fk_genero"];
            try {
                $sql = "SELECT noticia.pk_id, palavra_chave, texto, titulo, sub_titulo, data_postagem, imagem, fk_generos,
                generos.tipo_genero
                FROM noticia
                JOIN generos ON noticia.fk_generos = generos.pk_id
                        WHERE fk_generos = :fk_genero
                        ";
                $stmt = $conn->prepare($sql);
                $stmt->bindValue(":fk_genero", $fk_genero);
                $stmt->execute();
                $dados = $stmt->fetchAll(PDO::FETCH_OBJ);
                $result["noticia"] = $dados;
                $result["status"] = "success";
                http_response_code(200);
            } catch (PDOException $ex) {
                $result = ["status" => "fail", "error" => $ex->getMessage()];
                http_response_code(500); // Internal Server Error
            }
        }
        else if (isset($_GET["id"])) {
            try {
                if (empty($_GET["id"]) || !is_numeric($_GET["id"])) {
                    throw new ErrorException("Valor inválido", 1);
                }

                $fk_cliente = "";
                if (!empty($_GET["fk_cliente"]) || is_numeric($_GET["fk_cliente"])) {
                    $fk_cliente = $_GET["fk_cliente"];
                }

                $id = $_GET["id"];

                if(empty($fk_cliente)) {
                    $sql = "SELECT pk_id, palavra_chave, texto, titulo, sub_titulo, data_postagem, imagem, fk_generos
                            FROM noticia
                            WHERE pk_id = :id";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(":id", $id);
                    $stmt->execute();
                } else {
                    $sql = "SELECT noticia.pk_id, palavra_chave, texto, titulo, sub_titulo, data_postagem, imagem, fk_generos,
                            favoritos.pk_id pk_favorito
                            FROM noticia
                            LEFT JOIN favoritos ON noticia.pk_id = favoritos.fk_noticia AND favoritos.fk_clientes = :fk_cliente
                            WHERE noticia.pk_id = :id";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(":fk_cliente", $fk_cliente);
                    $stmt->bindParam(":id", $id);
                    $stmt->execute();
                }

                $dado = $stmt->fetch(PDO::FETCH_OBJ);
                $result['noticia'] = $dado;
                $result["status"] = "success";
                http_response_code(200);
            } catch (PDOException $ex) {
                $result = ["status" => "fail", "error" => $ex->getMessage()];
                http_response_code(500); // Internal Server Error
            } catch (Exception $ex) {
                $result = ["status" => "fail", "error" => $ex->getMessage()];
                http_response_code(400); // Bad Request
            }
        }
        else {
            try {
                $sql = "SELECT noticia.pk_id, palavra_chave, texto, titulo, sub_titulo, data_postagem, imagem, fk_generos,
                generos.tipo_genero
                FROM noticia
                JOIN generos ON noticia.fk_generos = generos.pk_id";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $dados = $stmt->fetchAll(PDO::FETCH_OBJ);
                $result["noticia"] = $dados;
                $result["status"] = "success";
                http_response_code(200);
            } catch (PDOException $ex) {
                $result = ["status" => "fail", "error" => $ex->getMessage()];
                http_response_code(500); // Internal Server Error
            }
        }
        $conn = null;
        echo json_encode($result);
    }

    
    if($method=="POST"){
       
        // recupera dados do corpo (body) de uma requisão POST
        $dados = file_get_contents("php://input");

        // decodifica JSON, sem opção TRUE
        $dados = json_decode($dados); // isso retorna um OBJETO

        // função trim retira espaços que estão sobrando
      
       
        $palavra_chave = trim($dados->palavra_chave); // acessa valor de um OBJETO
        $texto= trim($dados->texto); // acessa valor de um OBJETO
        $titulo= trim($dados->titulo); // acessa valor de um OBJETO
        $sub_titulo = trim($dados->sub_titulo); // acessa valor de um OBJETO
        $imagem = trim($dados->imagem); // acessa valor de um OBJETO
        $fk_generos = trim($dados->fk_generos); // acessa valor de um OBJETO
        
        try {
            

            if(empty($dados->palavra_chave) ){
                // está vazio  : ERRO
                throw new ErrorException("Valor da palavra_chave é inválido", 1);
            }
            
            if(empty($dados->texto) ){
                // está vazio  : ERRO
                throw new ErrorException("Valor do texto é inválido", 1);
            }

            if(empty($dados->titulo) ){
                // está vazio  : ERRO
                throw new ErrorException("Valor do titulo é inválido", 1);
            }

            if(empty($dados->sub_titulo) ){
                // está vazio  : ERRO
                throw new ErrorException("Valor do sub_titulo é inválido", 1);
            }
            if(empty($dados->imagem) ){
                // está vazio  : ERRO
                throw new ErrorException("Valor da imagem é inválido", 1);
            }
            if(empty($dados->fk_generos) ){
                // está vazio  : ERRO
                throw new ErrorException("Valor do Genero é inválido", 1);
            }
            
            $sql = "INSERT INTO noticia(palavra_chave, texto, titulo, sub_titulo, data_postagem, imagem, fk_generos) 
                    VALUES (:palavra_chave, :texto, :titulo, :sub_titulo, now(), :imagem, :fk_generos)";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":palavra_chave", $palavra_chave);
            $stmt->bindParam(":texto", $texto);
            $stmt->bindParam(":titulo", $titulo);
            $stmt->bindParam(":sub_titulo", $sub_titulo);
            $stmt->bindParam(":imagem", $imagem);
            $stmt->bindParam(":fk_generos", $fk_generos);
            $stmt->execute();

            $result = array("status"=>"success");




        } catch (PDOException $ex) {
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
    if($method=="PUT"){
        
        // recupera dados do corpo (body) de uma requisão PUT
        $dados = file_get_contents("php://input");

        // decodifica JSON, sem opção TRUE
        $dados = json_decode($dados); // isso retorna um OBJETO    
        
        try {

            if(empty($dados->id) ){
                // está vazio  : ERRO
                throw new ErrorException("ID é um campo obrigatório", 1);
            }

            if(empty($dados->palavra_chave) ){
                // está vazio  : ERRO
                throw new ErrorException("palavra_chave é um campo obrigatório", 1);
            }
            
            if(empty($dados->texto) ){
                // está vazio  : ERRO
                throw new ErrorException("texto é um campo obrigatório", 1);
            }

            if(empty($dados->titulo) ){
                // está vazio  : ERRO
                throw new ErrorException("titulo é um campo obrigatório", 1);
            }

            if(empty($dados->sub_titulo) ){
                // está vazio  : ERRO
                throw new ErrorException("sub_titulo é um campo obrigatório", 1);
            }

            if(empty($dados->fk_generos) ){
                // está vazio  : ERRO
                throw new ErrorException("Generos é um campo obrigatório", 1);
            }
            // if(empty($dados->imagem) ){
            //     // está vazio  : ERRO
            //     throw new ErrorException("imagem é um campo obrigatório", 1);
            // }
         
           // função trim retira espaços que estão sobrando
        
           $id = trim($dados->id); // acessa valor de um OBJETO
           $palavra_chave = trim($dados->palavra_chave);
           $texto = trim($dados->texto);
           $titulo = trim($dados->titulo);
           $sub_titulo = trim($dados->sub_titulo);
           $imagem = trim($dados->imagem);
           $fk_generos = trim($dados->fk_generos);

           
                    if (!empty($imagem)){
                        $sql = "UPDATE noticia SET palavra_chave=:palavra_chave, texto=:texto, 
                    titulo=:titulo, sub_titulo=:sub_titulo, data_postagem=now(), imagem=:imagem, fk_generos=:fk_generos 
                    WHERE pk_id=:id";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(":titulo", $titulo);
                        $stmt->bindParam(":id", $id);
                        $stmt->bindParam(":palavra_chave", $palavra_chave);
                        $stmt->bindParam(":texto", $texto);
                        $stmt->bindParam(":sub_titulo", $sub_titulo);
                        $stmt->bindParam(":imagem", $imagem);
                        $stmt->bindParam(":fk_generos", $fk_generos);
                        $stmt->execute();
                    }else{
                        $sql = "UPDATE noticia SET palavra_chave=:palavra_chave, texto=:texto, 
                        titulo=:titulo, sub_titulo=:sub_titulo, data_postagem=now(), fk_generos=:fk_generos
                    WHERE pk_id=:id";

                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(":titulo", $titulo);
                    $stmt->bindParam(":id", $id);
                    $stmt->bindParam(":palavra_chave", $palavra_chave);
                    $stmt->bindParam(":texto", $texto);
                    $stmt->bindParam(":sub_titulo", $sub_titulo);
                    $stmt->bindParam(":fk_generos", $fk_generos);
                    $stmt->execute();
                    }
          

            $result = array("status"=>"success");

        } catch (PDOException $ex) {
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
   if($method=="DELETE"){
    try{

        if(empty($_GET["id"]) || !is_numeric($_GET["id"])){
            // está vazio ou não é numérico : ERRO
            throw new ErrorException("Valor inválido", 1);
        }
        $id = $_GET["id"];

        $sql= "DELETE FROM noticia
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