-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10-Jul-2024 às 18:59
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `projet_jornal`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cadastre-se`
--

CREATE TABLE `cadastre-se` (
  `pk_id` int(11) NOT NULL,
  `e_mail` varchar(220) NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `senha` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `cinema`
--

CREATE TABLE `cinema` (
  `pk_id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `sinopse` varchar(300) NOT NULL,
  `elenco` varchar(50) NOT NULL,
  `imagem` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `pk_id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `whatsapp` varchar(20) NOT NULL,
  `email` varchar(220) NOT NULL,
  `senha` varchar(80) NOT NULL,
  `token` varchar(12) NOT NULL,
  `habilita` tinyint(1) NOT NULL DEFAULT 1,
  `imagem` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`pk_id`, `nome`, `whatsapp`, `email`, `senha`, `token`, `habilita`, `imagem`) VALUES
(3, 'douvlinhas', '12996568721', 'testando@gmail.com', '1234', '', 1, 'assets/img/clientes/MicrosoftTeams-image (5).png'),
(22, 'Arthu', '129987609', 'arthupereira@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '', 1, ''),
(25, 'sam', '12998760984', 'sam@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '', 1, 'assets/img/clientes/MicrosoftTeams-image (5).png'),
(26, 'Glauco', '12907698540', 'glaucosantos@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '', 1, ''),
(27, 'Samuel', '1', 'a', '756bc47cb5215dc3329ca7e1f7be33a2dad68990bb94b76d90aa07f4e44a233a', '', 1, 'assets/img/clientes/MicrosoftTeams-image (5).png'),
(36, 'Primeiro', '12996450245', 'primeiro@gmail.com', '756bc47cb5215dc3329ca7e1f7be33a2dad68990bb94b76d90aa07f4e44a233a', '', 1, 'assets/img/clientes/MicrosoftTeams-image (5).png'),
(37, 'segundo', '12135131368', 'segundo@gmail.com', '756bc47cb5215dc3329ca7e1f7be33a2dad68990bb94b76d90aa07f4e44a233a', '', 1, ''),
(38, 'terceiro', '1299554845', 'terceiro@gmail.com', '', '', 1, 'assets/img/clientes/profile.png'),
(39, 'Igor', '12996457820', 'quarto@gmail.com', '', '', 1, 'assets/img/clientes/MicrosoftTeams-image (5).png');

-- --------------------------------------------------------

--
-- Estrutura da tabela `destaque_home`
--

CREATE TABLE `destaque_home` (
  `pk_id` int(11) NOT NULL,
  `fk_noticia` int(11) NOT NULL,
  `fk_redacao` int(11) NOT NULL,
  `habilita` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `destaque_home`
--

INSERT INTO `destaque_home` (`pk_id`, `fk_noticia`, `fk_redacao`, `habilita`) VALUES
(2, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `favoritos`
--

CREATE TABLE `favoritos` (
  `pk_id` int(11) NOT NULL,
  `fk_noticia` int(11) NOT NULL,
  `fk_clientes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `favoritos`
--

INSERT INTO `favoritos` (`pk_id`, `fk_noticia`, `fk_clientes`) VALUES
(3, 2, 25),
(4, 14, 25),
(6, 15, 25),
(7, 19, 22),
(8, 16, 25),
(29, 2, 25),
(30, 2, 25),
(31, 2, 25);

-- --------------------------------------------------------

--
-- Estrutura da tabela `generos`
--

CREATE TABLE `generos` (
  `pk_id` int(11) NOT NULL,
  `tipo_genero` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `generos`
--

INSERT INTO `generos` (`pk_id`, `tipo_genero`) VALUES
(3, 'Automobilismo'),
(14, 'Automotivo'),
(11, 'Cultura'),
(5, 'Economia'),
(1, 'Esporte'),
(10, 'Politica'),
(4, 'Tecnologia');

-- --------------------------------------------------------

--
-- Estrutura da tabela `noticia`
--

CREATE TABLE `noticia` (
  `pk_id` int(11) NOT NULL,
  `palavra_chave` varchar(200) NOT NULL,
  `texto` text NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `sub_titulo` varchar(300) NOT NULL,
  `data_postagem` datetime DEFAULT NULL,
  `imagem` varchar(100) NOT NULL,
  `fk_generos` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `noticia`
--

INSERT INTO `noticia` (`pk_id`, `palavra_chave`, `texto`, `titulo`, `sub_titulo`, `data_postagem`, `imagem`, `fk_generos`) VALUES
(2, 'Song', 'Aopaaaaaaaa', 'Os Simpsons', 'Venha conhecer os simpsons', '2024-06-17 14:08:04', 'assets/img/noticia/Sem Título-2.png', '1'),
(14, 'Musica, Arte', 'Gabriel o Jackson (a estrela do pop), Gabriel disse que chegou a fazer faculdade de programação, mas deixou isso der lado e decidiu ser a estrela do POP, ele nos contou que hoje é mais feliz, pois hoje não esquece mais do famoso', 'Gabriel Jackson a estrela do POP', 'Gabriel Jackson e seu sonho de ser a estrela do POP', '2024-06-17 14:07:56', 'assets/img/noticia/MicrosoftTeams-image (3).png', '11'),
(15, 'Animal', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'dsdasdasd', 'sdsadsds', '2024-06-10 14:16:23', 'assets/img/noticia/louro-jose-03.jpg', '11'),
(16, 'Futebol', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Glauco', 'ddasdsadsa', '2024-06-10 14:18:02', 'assets/img/noticia/dca9ecd74ecefe6015a4a2c8f51a9b0f.jpg', '5'),
(17, 'Animal', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Araras', 'ff', '2024-07-05 14:44:32', 'assets/img/noticia/images.jpg', '11'),
(18, 'Basquete', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Jokovic', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable Eng', '2024-06-10 16:45:46', 'assets/img/noticia/olav-tvedt--oVaYMgBMbs-unsplash.jpg', 'Esporte'),
(19, 'Pneu', 'Testando algo que ainda não foi implementado na face da terra!', 'Pneu Musculoso', 'Teste', '2024-06-17 14:09:03', 'assets/img/noticia/imagem (8).png', '3');

-- --------------------------------------------------------

--
-- Estrutura da tabela `redacao`
--

CREATE TABLE `redacao` (
  `pk_id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `salario` float NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cpf` char(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `redacao`
--

INSERT INTO `redacao` (`pk_id`, `nome`, `salario`, `telefone`, `cpf`) VALUES
(1, 'Samuel', 4500, '1299676253015', '12345678912'),
(2, 'victor@gmail.com', 1234, '1', '57107273850');

-- --------------------------------------------------------

--
-- Estrutura da tabela `revisor`
--

CREATE TABLE `revisor` (
  `pk_id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `salario` float NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cpf` char(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `revisor`
--

INSERT INTO `revisor` (`pk_id`, `nome`, `salario`, `telefone`, `cpf`) VALUES
(1, 'victor@gmail.com', 1234, '1333', '57107273850');

-- --------------------------------------------------------

--
-- Estrutura da tabela `token`
--

CREATE TABLE `token` (
  `pk_id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `token` varchar(12) NOT NULL,
  `data_criacao` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `token`
--

INSERT INTO `token` (`pk_id`, `email`, `cpf`, `token`, `data_criacao`) VALUES
(1, 'Da@gmail.com', '12012316578', 'f6a95880e88e', '2024-02-08 13:56:21'),
(6, 'bashsaudhasudh@gmail.com', '42432423432423', '4e692ca25aba', '2024-02-08 14:22:51');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `pk_id` int(11) NOT NULL,
  `e_mail` varchar(220) NOT NULL,
  `senha` varchar(80) NOT NULL,
  `habilita` smallint(6) NOT NULL,
  `recuperar_senha` varchar(30) NOT NULL,
  `cargo` varchar(80) NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `codigo` varchar(6) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`pk_id`, `e_mail`, `senha`, `habilita`, `recuperar_senha`, `cargo`, `cpf`, `codigo`, `nome`) VALUES
(2, 'costasamuca8@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 1, '51a4eeb0', 'ADM', '13580593650', 'a90a9d', 'Samuel'),
(22, 'sdfsdfdfsd@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, '', 'REDACAO', '2', '', 'gdfgfdg'),
(23, 'samuel@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, '', 'REVISOR', '3', '', 'zxcxzczxc'),
(25, 'victor@gmail.com', '1234', 1, '', 'FUNCIONARIO', '142', '', 'eweweq'),
(29, 'igor@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 1, '', 'FUNCIONARIO', '57107273850', '', 'Igor'),
(37, 'arthur@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, '', 'funcionario', '44128713805', '', 'Arthu');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `cadastre-se`
--
ALTER TABLE `cadastre-se`
  ADD PRIMARY KEY (`pk_id`);

--
-- Índices para tabela `cinema`
--
ALTER TABLE `cinema`
  ADD PRIMARY KEY (`pk_id`);

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`pk_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `whatsapp` (`whatsapp`);

--
-- Índices para tabela `destaque_home`
--
ALTER TABLE `destaque_home`
  ADD PRIMARY KEY (`pk_id`);

--
-- Índices para tabela `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`pk_id`);

--
-- Índices para tabela `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`pk_id`),
  ADD UNIQUE KEY `tipo_genero` (`tipo_genero`);

--
-- Índices para tabela `noticia`
--
ALTER TABLE `noticia`
  ADD PRIMARY KEY (`pk_id`);

--
-- Índices para tabela `redacao`
--
ALTER TABLE `redacao`
  ADD PRIMARY KEY (`pk_id`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD UNIQUE KEY `telefone` (`telefone`);

--
-- Índices para tabela `revisor`
--
ALTER TABLE `revisor`
  ADD PRIMARY KEY (`pk_id`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD UNIQUE KEY `telefone` (`telefone`);

--
-- Índices para tabela `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`pk_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD UNIQUE KEY `token` (`token`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`pk_id`),
  ADD UNIQUE KEY `e_mail` (`e_mail`),
  ADD UNIQUE KEY `cpf` (`cpf`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cadastre-se`
--
ALTER TABLE `cadastre-se`
  MODIFY `pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `cinema`
--
ALTER TABLE `cinema`
  MODIFY `pk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de tabela `destaque_home`
--
ALTER TABLE `destaque_home`
  MODIFY `pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de tabela `generos`
--
ALTER TABLE `generos`
  MODIFY `pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `noticia`
--
ALTER TABLE `noticia`
  MODIFY `pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `redacao`
--
ALTER TABLE `redacao`
  MODIFY `pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `revisor`
--
ALTER TABLE `revisor`
  MODIFY `pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `token`
--
ALTER TABLE `token`
  MODIFY `pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
