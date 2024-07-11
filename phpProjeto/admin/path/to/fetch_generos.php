<?php
include ("connection.php");

try {
    $query = "SELECT id, tipo_genero FROM generos";
    $stmt = $conn->prepare($query);
    $stmt->execute();

    $generos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $generos;
} catch (PDOException $ex) {
    echo "Erro na obtenção dos gêneros: " . $ex->getMessage();
    return [];
}
?>