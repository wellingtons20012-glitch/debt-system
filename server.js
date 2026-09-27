<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Cobrança</title>
    <!-- Ícones do FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #f4f6f9;
            color: #333;
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
        }

        /* TELA DE LOGIN (BLOQUEIO INICIAL OBRIGATÓRIO) */
        #login-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: #0f172a;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }

        .login-card {
            background: #1e293b;
            padding: 2.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            text-align: center;
            width: 100%;
            max-width: 380px;
            color: #ffffff;
            cursor: default;
        }

        .login-card h2 {
            font-size: 1.4rem;
            margin-bottom: 0.5rem;
            color: #ffffff;
            user-select: none;
        }

        .login-card p {
            font-size: 0.9rem;
            color: #94a3b8;
            margin-bottom: 1.5rem;
            user-select: none;
        }

        .login-card input {
            width: 100%;
            padding: 12px 15px;
            border-radius: 6px;
            border: 1px solid #334155;
            background-color: #0f172a;
            color: #ffffff;
            font-size: 1rem;
            margin-bottom: 1rem;
            text-align: center;
            letter-spacing: 2px;
        }

        .login-card input:focus {
            outline: none;
            border-color: #3b82f6;
        }

        .login-card button {
            width: 100%;
            padding: 12px;
            background-color: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s;
        }

        .login-card button:hover {
            background-color: #2563eb;
        }

        .login-error {
            color: #ef4444;
            font-size: 0.85rem;
            margin-top: 10px;
            display: none;
        }

        /* CONTAINER PRINCIPAL (Oculto até autenticar) */
        #main-app-container {
            display: none;
            flex-direction: column;
            height: 100vh;
            width: 100vw;
        }

        header {
            background-color: #0f172a;
            color: #ffffff;
            padding: 0.8rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            z-index: 100;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .menu-toggle {
            background: none;
            border: none;
            color: #ffffff;
            font-size: 1.2rem;
            cursor: pointer;
            display: none;
        }

        header h1 {
            font-size: 1.2rem;
            white-space: nowrap;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .user-info span {
            font-size: 0.9rem;
            color: #94a3b8;
        }

        .app-container {
            display: flex;
            flex: 1;
            height: calc(100vh - 60px);
            position: relative;
            overflow: hidden;
        }

        aside.sidebar {
            width: 280px;
            background-color: #1e293b;
            color: #ecf0f1;
            display: flex;
            flex-direction: column;
            transition: transform 0.3s ease;
            overflow-y: auto;
            flex-shrink: 0;
            z-index: 99;
        }

        .sidebar-menu {
            list-style: none;
            padding-top: 0.5rem;
        }

        .sidebar-menu li a {
            display: flex;
            align-items: center;
            padding: 12px 20px;
            color: #94a3b8;
            text-decoration: none;
            font-size: 0.9rem;
            transition: background 0.2s, color 0.2s;
            border-left: 4px solid transparent;
            cursor: pointer;
        }

        .sidebar-menu li a:hover,
        .sidebar-menu li a.active {
            background-color: #334155;
            color: #ffffff;
            border-left-color: #3b82f6;
        }

        .sidebar-menu li a i {
            margin-right: 12px;
            width: 20px;
            text-align: center;
        }

        .submenu {
            list-style: none;
            background-color: #0f172a;
            display: none;
            max-height: 250px;
            overflow-y: auto;
        }

        .submenu::-webkit-scrollbar {
            width: 6px;
        }

        .submenu::-webkit-scrollbar-track {
            background: #0f172a;
        }

        .submenu::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 3px;
        }

        .submenu.open {
            display: block;
        }

        .submenu li a {
            padding: 10px 20px 10px 40px;
            font-size: 0.82rem;
            color: #64748b;
            border-left: 4px solid transparent;
            word-break: break-word;
        }

        .submenu li a:hover,
        .submenu li a.active {
            color: #ffffff;
            background-color: #1e293b;
            border-left-color: #60a5fa;
        }

        .has-submenu .arrow {
            margin-left: auto;
            transition: transform 0.3s;
            font-size: 0.8rem;
        }

        .has-submenu.open .arrow {
            transform: rotate(180deg);
        }

        main.conteudo {
            flex: 1;
            padding: 1.5rem;
            overflow-y: auto;
            background-color: #f8fafc;
            width: 100%;
        }

        .card {
            background: #ffffff;
            padding: 1.2rem;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            margin-top: 1rem;
            overflow-x: auto;
        }

        .card h4 {
            color: #1e293b;
            font-size: 1rem;
            border-bottom: 2px solid #f1f5f9;
            padding-bottom: 8px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .tabela-cobranca {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1rem;
            min-width: 500px;
        }

        .tabela-cobranca th, .tabela-cobranca td {
            padding: 10px 12px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
            font-size: 0.9rem;
        }

        .tabela-cobranca th {
            background-color: #f1f5f9;
            color: #475569;
            font-size: 0.8rem;
            text-transform: uppercase;
        }

        .tabela-cobranca tfoot tr td {
            font-weight: bold;
            background-color: #f8fafc;
            color: #0f172a;
        }

        .status-badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: bold;
            display: inline-block;
            user-select: none;
        }

        .badge-pendente {
            background-color: #fee2e2;
            color: #dc2626;
        }

        .badge-pago {
            background-color: #dcfce7;
            color: #16a34a;
        }

        .btn {
            background-color: #3b82f6;
            color: white;
            border: none;
            padding: 8px 14px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: bold;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: background 0.2s;
            text-decoration: none;
        }

        .btn:hover {
            background-color: #2563eb;
        }

        .btn-danger {
            background-color: #ef4444;
        }

        .btn-danger:hover {
            background-color: #dc2626;
        }

        .btn-success {
            background-color: #10b981;
        }

        .btn-success:hover {
            background-color: #059669;
        }

        .btn-warning {
            background-color: #f59e0b;
            color: white;
        }

        .btn-warning:hover {
            background-color: #d97706;
        }

        .acoes-topo {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            flex-wrap: wrap;
            gap: 10px;
        }

        .view-section {
            display: none;
        }

        .view-section.active {
            display: block;
        }

        .form-group {
            margin-bottom: 12px;
        }

        .form-group label {
            display: block;
            font-size: 0.85rem;
            font-weight: 600;
            color: #475569;
            margin-bottom: 4px;
        }

        .form-group input, .form-group select {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            font-size: 0.9rem;
        }

        /* MODAL PIX */
        #modal-pix {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.6);
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }

        .pix-card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            max-width: 450px;
            width: 90%;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            max-height: 90vh;
            overflow-y: auto;
        }

        .pix-card h3 {
            margin-bottom: 10px;
            color: #0f172a;
        }

        .pix-card img {
            width: 180px;
            height: 180px;
            margin: 10px 0;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 5px;
        }

        .pix-card textarea {
            width: 100%;
            height: 60px;
            font-size: 0.8rem;
            padding: 8px;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            resize: none;
            background: #f8fafc;
            margin-bottom: 10px;
        }

        /* MODAL MINI TELA DE TRAVA / ATRASO DE JUROS */
        #modal-aviso-atraso {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(15, 23, 42, 0.85);
            justify-content: center;
            align-items: center;
            z-index: 15000;
        }

        .atraso-card {
            background: #ffffff;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            max-width: 420px;
            width: 90%;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
            border-top: 6px solid #ef4444;
        }

        .atraso-card i {
            font-size: 3rem;
            color: #ef4444;
            margin-bottom: 15px;
        }

        .atraso-card h3 {
            color: #0f172a;
            font-size: 1.3rem;
            margin-bottom: 10px;
        }

        .atraso-card p {
            color: #64748b;
            font-size: 0.95rem;
            margin-bottom: 20px;
            line-height: 1.5;
        }

        .contador-dias-box {
            background: #ffeeec;
            border: 1px solid #fecaca;
            color: #dc2626;
            padding: 12px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1.1rem;
            margin-bottom: 20px;
        }

        footer {
            background-color: #0f172a;
            color: #64748b;
            text-align: center;
            padding: 0.4rem;
            font-size: 0.75rem;
            height: 30px;
        }

        @media (max-width: 768px) {
            .menu-toggle {
                display: block;
            }

            aside.sidebar {
                position: absolute;
                height: calc(100vh - 60px);
                transform: translateX(-100%);
            }

            aside.sidebar.mobile-open {
                transform: translateX(0);
            }

            main.conteudo {
                padding: 1rem;
            }
        }
    </style>
</head>
<body>

    <!-- TELA DE LOGIN (BLOQUEIO INICIAL OBRIGATÓRIO) -->
    <div id="login-screen">
        <div class="login-card">
            <h2>Sistema de Cobrança</h2>
            <p>Digite sua senha de acesso</p>
            <input type="password" id="input-senha" placeholder="Senha" onkeypress="verificarEnter(event)">
            <button onclick="fazerLogin()">Entrar</button>
            <div id="login-error" class="login-error">Senha incorreta. Tente novamente.</div>
        </div>
    </div>

    <!-- APLICAÇÃO PRINCIPAL (OCULTA ATÉ AUTENTICAR) -->
    <div id="main-app-container">
        <header>
            <div class="header-left">
                <button class="menu-toggle" onclick="toggleSidebar()" id="btn-menu-toggle">
                    <i class="fa-solid fa-bars"></i>
                </button>
                <h1>Sistema de Cobrança</h1>
            </div>
            <div class="user-info">
                <span id="label-usuario-logado">Olá, Gestor</span>
                <button class="btn btn-danger" style="padding: 4px 10px; font-size: 0.8rem;" onclick="sairDoSistema()"><i class="fa-solid fa-right-from-bracket"></i> Sair</button>
            </div>
        </header>

        <div class="app-container">
            
            <aside class="sidebar" id="sidebar">
                <ul class="sidebar-menu">
                    <li id="nav-dashboard-li">
                        <a href="#" onclick="mudarTela('dashboard', this)" class="active">
                            <i class="fa-solid fa-chart-line"></i> Dashboard
                        </a>
                    </li>
                    
                    <!-- Menu Clientes Regulares -->
                    <li class="has-submenu open" id="menu-clientes-container">
                        <a href="#" onclick="toggleSubmenu(event, 'menu-clientes-container')">
                            <i class="fa-solid fa-users"></i> Clientes <i class="fa-solid fa-chevron-down arrow"></i>
                        </a>
                        <ul class="submenu open" id="lista-clientes-sidebar"></ul>
                    </li>

                    <!-- Menu Clientes a Juros -->
                    <li class="has-submenu open" id="menu-juros-container">
                        <a href="#" onclick="toggleSubmenu(event, 'menu-juros-container')">
                            <i class="fa-solid fa-percent"></i> Clientes a Juros <i class="fa-solid fa-chevron-down arrow"></i>
                        </a>
                        <ul class="submenu open" id="lista-juros-sidebar"></ul>
                    </li>

                    <li id="nav-config-li">
                        <a href="#" onclick="mudarTela('configuracoes', this)">
                            <i class="fa-solid fa-gear"></i> Configurações / Backup
                        </a>
                    </li>
                </ul>
            </aside>

            <main class="conteudo" onclick="fecharMenuMobile()">
                
                <!-- TELA: Dashboard -->
                <div id="view-dashboard" class="view-section active">
                    <h2>Dashboard Geral</h2>
                    <div class="card">
                        <h3>Bem-vindo ao Sistema de Cobrança</h3>
                        <p style="margin-top: 10px; color: #64748b;">Selecione um cliente no menu ao lado ou adicione novos clientes abaixo.</p>
                        <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="btn" onclick="modalNovoCliente('normal')"><i class="fa-solid fa-user-plus"></i> Novo Cliente (Normal)</button>
                            <button class="btn btn-success" onclick="modalNovoCliente('juros')"><i class="fa-solid fa-user-plus"></i> Novo Cliente (Juros)</button>
                            
                            <!-- BOTÃO DE SALVAR NA NUVEM (MONGODB ATLAS) - EXCLUSIVO PARA O ADMINISTRADOR -->
                            <button id="btn-salvar-nuvem-geral" class="btn btn-warning" onclick="salvarDadosNaNuvem()" style="display:none;"><i class="fa-solid fa-cloud-arrow-up"></i> Salvar na Nuvem (MongoDB)</button>
                        </div>
                    </div>
                </div>

                <!-- TELA: Planilha do Cliente -->
                <div id="view-cliente" class="view-section">
                    <div class="acoes-topo">
                        <h2 id="titulo-cliente" onclick="registrarTresCliquesIsencao()" style="cursor: pointer;" title="Clique 3 vezes rapidamente para isentar os juros de atraso">Nome do Cliente</h2>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;" id="acoes-gestor-container">
                            <button class="btn btn-success" onclick="modalAdicionarParcela()"><i class="fa-solid fa-plus"></i> Adicionar Linha</button>
                            <button class="btn btn-warning" onclick="salvarSenhaClienteAtual()"><i class="fa-solid fa-key"></i> Salvar / Trocar Senha</button>
                            <button class="btn btn-danger" onclick="excluirClienteAtual()"><i class="fa-solid fa-trash"></i> Excluir Cliente</button>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 12px;">
                        <button class="btn btn-success" onclick="abrirPixMultiplo()"><i class="fa-solid fa-qrcode"></i> Pagar Selecionados via Pix (Multi Pix)</button>
                    </div>

                    <div id="alerta-isencao-container"></div>

                    <div class="card">
                        <div id="conteudo-planilhas"></div>
                    </div>
                </div>

                <!-- TELA: Configurações -->
                <div id="view-configuracoes" class="view-section">
                    <h2>Configurações do Sistema</h2>
                    
                    <!-- Gerenciamento de Chaves Pix -->
                    <div class="card">
                        <h3><i class="fa-solid fa-qrcode"></i> Gerenciar Chaves Pix do Administrador</h3>
                        <p style="margin-top: 5px; color: #64748b; font-size: 0.9rem;">Adicione as chaves Pix que serão disponibilizadas aos clientes na hora do pagamento.</p>
                        
                        <div style="margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 10px; align-items: flex-end;" id="form-nova-chave">
                            <div class="form-group" style="margin:0;">
                                <label>Identificação / Banco</label>
                                <input type="text" id="input-banco-pix" placeholder="Ex: Nubank, Principal...">
                            </div>
                            <div class="form-group" style="margin:0;">
                                <label>Tipo de Chave</label>
                                <select id="select-tipo-chave">
                                    <option value="Chave Aleatória">Chave Aleatória</option>
                                    <option value="CPF/CNPJ">CPF / CNPJ</option>
                                    <option value="E-mail">E-mail</option>
                                    <option value="Telefone">Telefone</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin:0;">
                                <label>Chave Pix</label>
                                <input type="text" id="input-valor-chave" placeholder="Chave Pix exata ou Payload Pix Copia e Cola">
                            </div>
                            <button class="btn btn-success" onclick="adicionarChavePix()"><i class="fa-solid fa-plus"></i> Adicionar</button>
                        </div>

                        <div style="margin-top: 20px;">
                            <table class="tabela-cobranca">
                                <thead>
                                    <tr>
                                        <th>Identificação</th>
                                        <th>Tipo</th>
                                        <th>Chave Pix</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody id="tabela-chaves-pix-corpo">
                                    <!-- Renderizado via JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Gerenciamento de Dados -->
                    <div class="card">
                        <h3><i class="fa-solid fa-database"></i> Gerenciamento de Dados</h3>
                        <p style="margin-top: 10px; color: #64748b;">Se por algum motivo quiser resetar todas as alterações salvas e retornar aos dados originais, clique abaixo.</p>
                        <div style="margin-top: 15px;">
                            <button class="btn btn-danger" onclick="restaurarDadosOriginais()"><i class="fa-solid fa-rotate-left"></i> Restaurar Dados Padrão Originais</button>
                        </div>
                    </div>
                </div>

            </main>
        </div>

        <footer>
            <p>&copy; 2026 - Sistema de Cobrança Web</p>
        </footer>
    </div>

    <!-- MODAL DE PIX -->
    <div id="modal-pix">
        <div class="pix-card">
            <h3>Pague via Pix</h3>
            <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 10px;">Escolha a chave Pix desejada ou escaneie o QR Code:</p>
            
            <div class="form-group" style="text-align: left; margin-bottom: 10px;">
                <label>Chave Pix de Destino:</label>
                <select id="select-escolha-chave-pix" onchange="atualizarQrCodePixAtual()"></select>
            </div>

            <div id="detalhes-cobranca-pix" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; margin-bottom: 12px; text-align: left; font-size: 0.85rem;">
                <!-- Preenchido via JavaScript -->
            </div>

            <img id="img-qrcode-pix" src="" alt="QR Code Pix">
            
            <textarea id="texto-pix-copia" readonly></textarea>
            
            <div style="display: flex; gap: 10px;">
                <button class="btn" style="flex: 1; justify-content: center;" onclick="copiarChavePix()"><i class="fa-solid fa-copy"></i> Copiar Código</button>
                <button class="btn btn-danger" style="flex: 1; justify-content: center;" onclick="fecharModalPix()">Fechar</button>
            </div>
        </div>
    </div>

    <!-- MINI TELA DE TRAVA E CONTAGEM DE ATRASO -->
    <div id="modal-aviso-atraso">
        <div class="atraso-card">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <h3>Pagamento Vencido</h3>
            <p>O seu dia de pagamento estipulado passou e o sistema encontra-se temporariamente travado para esta pendência.</p>
            <div class="contador-dias-box" id="texto-contador-atraso">
                Calculando dias de atraso...
            </div>
            <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 15px;">Efetue o pagamento para liberar o acesso total ao sistema.</p>
            <button class="btn btn-success" style="width: 100%; justify-content: center; padding: 10px;" onclick="abrirPixDoAtraso()"><i class="fa-solid fa-qrcode"></i> Pagar via Pix Agora</button>
        </div>
    </div>

    <script>
        const DATA_ATUAL_SISTEMA = new Date(2026, 8, 25);

        const dadosIniciaisClientes = {
            "RAYANE ESPOSA DE RAFAEL": {
                tipo: "normal",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "CELULAR",
                    itens: [
                        {desc: "CELULAR", parcela: "01° Parcela", data: "16/09/2026", valor: 218.00, status: "Pago"},
                        {desc: "CELULAR", parcela: "02° Parcela", data: "16/10/2026", valor: 218.00, status: "Pago"},
                        {desc: "CELULAR", parcela: "03° Parcela", data: "16/11/2026", valor: 218.00, status: "Pendente"},
                        {desc: "CELULAR", parcela: "04° Parcela", data: "16/12/2026", valor: 218.00, status: "Pendente"},
                        {desc: "CELULAR", parcela: "05° Parcela", data: "16/01/2027", valor: 218.00, status: "Pendente"},
                        {desc: "CELULAR", parcela: "06° Parcela", data: "16/02/2027", valor: 218.00, status: "Pendente"},
                        {desc: "CELULAR", parcela: "07° Parcela", data: "16/03/2027", valor: 218.00, status: "Pendente"},
                        {desc: "CELULAR", parcela: "08° Parcela", data: "16/04/2027", valor: 218.00, status: "Pendente"},
                        {desc: "CELULAR", parcela: "09° Parcela", data: "16/05/2027", valor: 218.00, status: "Pendente"},
                        {desc: "CELULAR", parcela: "10° Parcela", data: "16/06/2027", valor: 218.00, status: "Pendente"}
                    ]
                }]
            },
            "LUZIA AMIGA DE MADRINHA": {
                tipo: "normal",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "EMPRÉSTIMO",
                    itens: [
                        {desc: "EMPRÉSTIMO", parcela: "01° Parcela", data: "20/06/2026", valor: 270.00, status: "Pago"},
                        {desc: "EMPRÉSTIMO", parcela: "02° Parcela", data: "20/07/2026", valor: 270.00, status: "Pago"},
                        {desc: "EMPRÉSTIMO", parcela: "03° Parcela", data: "20/08/2026", valor: 270.00, status: "Pago"},
                        {desc: "EMPRÉSTIMO", parcela: "04° Parcela", data: "20/09/2026", valor: 270.00, status: "Pago"},
                        {desc: "EMPRÉSTIMO", parcela: "05° Parcela", data: "20/10/2026", valor: 270.00, status: "Pendente"},
                        {desc: "EMPRÉSTIMO", parcela: "06° Parcela", data: "20/11/2026", valor: 270.00, status: "Pendente"},
                        {desc: "EMPRÉSTIMO", parcela: "07° Parcela", data: "20/12/2026", valor: 270.00, status: "Pendente"},
                        {desc: "EMPRÉSTIMO", parcela: "08° Parcela", data: "20/01/2027", valor: 270.00, status: "Pendente"},
                        {desc: "EMPRÉSTIMO", parcela: "09° Parcela", data: "20/02/2027", valor: 270.00, status: "Pendente"},
                        {desc: "EMPRÉSTIMO", parcela: "10° Parcela", data: "20/03/2027", valor: 270.00, status: "Pendente"},
                        {desc: "EMPRÉSTIMO", parcela: "11° Parcela", data: "20/04/2027", valor: 270.00, status: "Pendente"},
                        {desc: "EMPRÉSTIMO", parcela: "12° Parcela", data: "20/05/2027", valor: 270.00, status: "Pendente"}
                    ]
                }]
            },
            "CÍCERO IRMÃO": {
                tipo: "normal",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "CELULAR",
                    itens: [
                        {desc: "CELULAR", parcela: "01° Parcela", data: "30/04/2026", valor: 115.00, status: "Pago"},
                        {desc: "CELULAR", parcela: "02° Parcela", data: "30/05/2026", valor: 115.00, status: "Pago"},
                        {desc: "CELULAR", parcela: "03° Parcela", data: "30/06/2026", valor: 115.00, status: "Pago"},
                        {desc: "CELULAR", parcela: "04° Parcela", data: "30/07/2026", valor: 115.00, status: "Pago"},
                        {desc: "CELULAR", parcela: "05° Parcela", data: "30/08/2026", valor: 115.00, status: "Pago"},
                        {desc: "CELULAR", parcela: "06° Parcela", data: "30/09/2026", valor: 115.00, status: "Pendente"},
                        {desc: "CELULAR", parcela: "07° Parcela", data: "30/10/2026", valor: 115.00, status: "Pendente"},
                        {desc: "CELULAR", parcela: "08° Parcela", data: "30/11/2026", valor: 115.00, status: "Pendente"},
                        {desc: "CELULAR", parcela: "09° Parcela", data: "30/12/2026", valor: 115.00, status: "Pendente"},
                        {desc: "CELULAR", parcela: "10° Parcela", data: "30/01/2027", valor: 115.00, status: "Pendente"},
                        {desc: "CELULAR", parcela: "11° Parcela", data: "28/02/2027", valor: 115.00, status: "Pendente"},
                        {desc: "CELULAR", parcela: "12° Parcela", data: "30/03/2027", valor: 115.00, status: "Pendente"}
                    ]
                }]
            },
            "SALVIANO IRMÃO DE SIMONE": {
                tipo: "normal",
                senha: "",
                isentoAtraso: false,
                tabelas: [
                    {
                        titulo: "Quadro 01 - Salviano",
                        itens: [
                            {desc: "EMPRÉSTIMO", parcela: "01° Parcela", data: "06/06/2026", valor: 484.73, status: "Pago"},
                            {desc: "EMPRÉSTIMO", parcela: "02° Parcela", data: "06/07/2026", valor: 484.73, status: "Pago"},
                            {desc: "EMPRÉSTIMO", parcela: "03° Parcela", data: "06/08/2026", valor: 484.73, status: "Pago"},
                            {desc: "EMPRÉSTIMO", parcela: "04° Parcela", data: "06/09/2026", valor: 484.73, status: "Pendente"},
                            {desc: "EMPRÉSTIMO", parcela: "05° Parcela", data: "06/10/2026", valor: 484.73, status: "Pendente"},
                            {desc: "EMPRÉSTIMO", parcela: "06° Parcela", data: "06/11/2026", valor: 484.73, status: "Pendente"},
                            {desc: "EMPRÉSTIMO", parcela: "07° Parcela", data: "07/12/2026", valor: 484.73, status: "Pendente"},
                            {desc: "EMPRÉSTIMO", parcela: "08° Parcela", data: "06/01/2027", valor: 484.73, status: "Pendente"},
                            {desc: "EMPRÉSTIMO", parcela: "09° Parcela", data: "06/02/2027", valor: 484.73, status: "Pendente"},
                            {desc: "EMPRÉSTIMO", parcela: "10° Parcela", data: "06/03/2027", valor: 484.73, status: "Pendente"}
                        ]
                    },
                    {
                        titulo: "Quadro 02 - Empréstimo Crediamigo",
                        itens: [
                            {desc: "CREDIAMIGO", parcela: "01° Parcela", data: "28/09/2026", valor: 388.90, status: "Pendente"},
                            {desc: "CREDIAMIGO", parcela: "02° Parcela", data: "28/10/2026", valor: 388.90, status: "Pendente"},
                            {desc: "CREDIAMIGO", parcela: "03° Parcela", data: "28/11/2026", valor: 388.90, status: "Pendente"},
                            {desc: "CREDIAMIGO", parcela: "04° Parcela", data: "28/12/2026", valor: 388.90, status: "Pendente"},
                            {desc: "CREDIAMIGO", parcela: "05° Parcela", data: "28/01/2027", valor: 388.90, status: "Pendente"},
                            {desc: "CREDIAMIGO", parcela: "06° Parcela", data: "28/02/2027", valor: 388.90, status: "Pendente"},
                            {desc: "CREDIAMIGO", parcela: "07° Parcela", data: "28/03/2027", valor: 388.90, status: "Pendente"},
                            {desc: "CREDIAMIGO", parcela: "08° Parcela", data: "28/04/2027", valor: 388.90, status: "Pendente"},
                            {desc: "CREDIAMIGO", parcela: "09° Parcela", data: "28/05/2027", valor: 388.90, status: "Pendente"}
                        ]
                    },
                    {
                        titulo: "Quadro 03 - Salviano Empréstimo Damião",
                        itens: [
                            {desc: "EMP. DAMIÃO", parcela: "01° Parcela", data: "07/09/2026", valor: 330.00, status: "Pendente"},
                            {desc: "EMP. DAMIÃO", parcela: "02° Parcela", data: "07/10/2026", valor: 330.00, status: "Pendente"},
                            {desc: "EMP. DAMIÃO", parcela: "03° Parcela", data: "07/11/2026", valor: 330.00, status: "Pendente"},
                            {desc: "EMP. DAMIÃO", parcela: "04° Parcela", data: "07/12/2026", valor: 330.00, status: "Pendente"},
                            {desc: "EMP. DAMIÃO", parcela: "05° Parcela", data: "07/01/2027", valor: 330.00, status: "Pendente"},
                            {desc: "EMP. DAMIÃO", parcela: "06° Parcela", data: "07/02/2027", valor: 330.00, status: "Pendente"},
                            {desc: "EMP. DAMIÃO", parcela: "07° Parcela", data: "07/03/2027", valor: 330.00, status: "Pendente"},
                            {desc: "EMP. DAMIÃO", parcela: "08° Parcela", data: "07/04/2027", valor: 330.00, status: "Pendente"},
                            {desc: "EMP. DAMIÃO", parcela: "09° Parcela", data: "07/05/2027", valor: 330.00, status: "Pendente"},
                            {desc: "EMP. DAMIÃO", parcela: "10° Parcela", data: "07/06/2027", valor: 330.00, status: "Pendente"},
                            {desc: "EMP. DAMIÃO", parcela: "11° Parcela", data: "07/07/2027", valor: 330.00, status: "Pendente"},
                            {desc: "EMP. DAMIÃO", parcela: "12° Parcela", data: "07/08/2027", valor: 330.00, status: "Pendente"}
                        ]
                    }
                ]
            },
            "LUIZINHO SERRARIA": {
                tipo: "normal",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "LUIZINHO SERRARIA (65 Parcelas)",
                    itens: Array.from({length: 65}, (_, i) => {
                        let mes = (i + 6) % 12 || 12;
                        let ano = 2026 + Math.floor((i + 5) / 12);
                        return {
                            desc: "EMPRÉSTIMO",
                            parcela: `${String(i+1).padStart(2,'0')}° Parcela`,
                            data: `15/${String(mes).padStart(2,'0')}/${ano}`,
                            valor: 1200.00,
                            status: i < 4 ? "Pago" : "Pendente"
                        };
                    })
                }]
            },
            "CÍCERA DO TEMPERO (REGULAR)": {
                tipo: "normal",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "CÍCERA DO TEMPERO (30 Parcelas)",
                    itens: Array.from({length: 30}, (_, i) => {
                        let mes = (i + 10) % 12 || 12;
                        let ano = 2026 + Math.floor((i + 9) / 12);
                        return {
                            desc: "EMPRÉSTIMO",
                            parcela: `${String(i+1).padStart(2,'0')}° Parcela`,
                            data: `07/${String(mes).padStart(2,'0')}/${ano}`,
                            valor: 450.00,
                            status: "Pendente"
                        };
                    })
                }]
            },
            "TIANA IRMÃ DE SIMONE": {
                tipo: "normal",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "CELULAR",
                    itens: Array.from({length: 15}, (_, i) => {
                        let mes = (i + 5) % 12 || 12;
                        let ano = 2026 + Math.floor((i + 4) / 12);
                        return {
                            desc: "CELULAR",
                            parcela: `${String(i+1).padStart(2,'0')}° Parcela`,
                            data: `27/${String(mes).padStart(2,'0')}/${ano}`,
                            valor: 130.00,
                            status: i < 3 ? "Pago" : "Pendente"
                        };
                    })
                }]
            },
            "TAMIRES IRMÃ DE SIMONE": {
                tipo: "normal",
                senha: "",
                isentoAtraso: false,
                tabelas: [
                    {
                        titulo: "CELULAR",
                        itens: Array.from({length: 15}, (_, i) => {
                            let mes = (i + 5) % 12 || 12;
                            let ano = 2026 + Math.floor((i + 4) / 12);
                            return {
                                desc: "CELULAR",
                                parcela: `${String(i+1).padStart(2,'0')}° Parcela`,
                                data: `07/${String(mes).padStart(2,'0')}/${ano}`,
                                valor: 130.00,
                                status: i < 4 ? "Pago" : "Pendente"
                            };
                        })
                    },
                    {
                        titulo: "CONTROLE DE EMPRÉSTIMO",
                        itens: Array.from({length: 12}, (_, i) => {
                            let mes = (i + 10) % 12 || 12;
                            let ano = 2026 + Math.floor((i + 9) / 12);
                            return {
                                desc: "EMPRÉSTIMO",
                                parcela: `${String(i+1).padStart(2,'0')}° Parcela`,
                                data: `11/${String(mes).padStart(2,'0')}/${ano}`,
                                valor: 394.56,
                                status: "Pendente"
                            };
                        })
                    }
                ]
            },
            "PROFESSOR ALEX BAOLI": {
                tipo: "normal",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "PROFESSOR ALEX BAOLI",
                    itens: Array.from({length: 23}, (_, i) => {
                        let mes = (i + 8) % 12 || 12;
                        let ano = 2026 + Math.floor((i + 7) / 12);
                        let vlr = (i === 22) ? 150.81 : 400.00;
                        return {
                            desc: "MENSALIDADE",
                            parcela: `${String(i+1).padStart(2,'0')}/23`,
                            data: `05/${String(mes).padStart(2,'0')}/${ano}`,
                            valor: vlr,
                            status: i < 2 ? "Pago" : "Pendente"
                        };
                    })
                }]
            },
            "EDINALDO": {
                tipo: "normal",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "EDINALDO (73 Parcelas)",
                    itens: Array.from({length: 73}, (_, i) => {
                        let mes = (i + 6) % 12 || 12;
                        let ano = 2026 + Math.floor((i + 5) / 12);
                        return {
                            desc: "EMPRÉSTIMO",
                            parcela: `${String(i+1).padStart(2,'0')}° Parcela`,
                            data: `20/${String(mes).padStart(2,'0')}/${ano}`,
                            valor: 200.00,
                            status: i < 2 ? "Pago" : "Pendente"
                        };
                    })
                }]
            },
            "CHINTIA RAMOS": {
                tipo: "normal",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "CHINTIA RAMOS (145 Parcelas)",
                    itens: Array.from({length: 145}, (_, i) => {
                        let mes = (i + 7) % 12 || 12;
                        let ano = 2026 + Math.floor((i + 6) / 12);
                        return {
                            desc: "PARCELA",
                            parcela: `${String(i+1).padStart(3,'0')}/145`,
                            data: `30/${String(mes).padStart(2,'0')}/${ano}`,
                            valor: 300.00,
                            status: i < 2 ? "Pago" : "Pendente"
                        };
                    })
                }]
            },
            "EMILLIANE PRIMA DE TELMA": {
                tipo: "normal",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "CELULAR",
                    itens: Array.from({length: 12}, (_, i) => {
                        let mes = (i + 8) % 12 || 12;
                        let ano = 2026 + Math.floor((i + 7) / 12);
                        return {
                            desc: "CELULAR",
                            parcela: `${String(i+1).padStart(2,'0')}° Parcela`,
                            data: `24/${String(mes).padStart(2,'0')}/${ano}`,
                            valor: 200.00,
                            status: i < 2 ? "Pago" : "Pendente"
                        };
                    })
                }]
            },
            "JOSÉ JOAQUIM DA SILVA FILHO": {
                tipo: "normal",
                senha: "",
                isentoAtraso: false,
                tabelas: [
                    {
                        titulo: "GALEGO EMPRÉSTIMO NUBANK SIMONE",
                        itens: [
                            {desc: "EMPRÉSTIMO", parcela: "01° Parcela", data: "05/06/2026", valor: 147.55, status: "Pago"},
                            {desc: "EMPRÉSTIMO", parcela: "02° Parcela", data: "05/07/2026", valor: 147.55, status: "Pago"},
                            {desc: "EMPRÉSTIMO", parcela: "03° Parcela", data: "05/08/2026", valor: 147.55, status: "Pago"},
                            {desc: "EMPRÉSTIMO", parcela: "04° Parcela", data: "05/09/2026", valor: 147.55, status: "Pago"},
                            {desc: "EMPRÉSTIMO", parcela: "05° Parcela", data: "05/10/2026", valor: 147.55, status: "Pendente"}
                        ]
                    },
                    {
                        titulo: "GALEGO EMPRÉSTIMO 99",
                        itens: Array.from({length: 12}, (_, i) => {
                            let mes = (i + 4) % 12 || 12;
                            let ano = 2026 + Math.floor((i + 3) / 12);
                            return {
                                desc: "EMPRÉSTIMO",
                                parcela: `${String(i+1).padStart(2,'0')}° Parcela`,
                                data: `08/${String(mes).padStart(2,'0')}/${ano}`,
                                valor: 551.66,
                                status: i < 6 ? "Pago" : "Pendente"
                            };
                        })
                    },
                    {
                        titulo: "GALEGO EMPRÉSTIMO RABEL",
                        itens: Array.from({length: 36}, (_, i) => {
                            let mes = (i + 4) % 12 || 12;
                            let ano = 2024 + Math.floor((i + 3) / 12);
                            return {
                                desc: "EMPRÉSTIMO",
                                parcela: `${String(i+1).padStart(2,'0')}° Parcela`,
                                data: `15/${String(mes).padStart(2,'0')}/${ano}`,
                                valor: 775.11,
                                status: i < 30 ? "Pago" : "Pendente"
                            };
                        })
                    },
                    {
                        titulo: "GALEGO EMPRÉSTIMO PRA WEYNE",
                        itens: Array.from({length: 30}, (_, i) => {
                            let mes = (i + 9) % 12 || 12;
                            let ano = 2024 + Math.floor((i + 8) / 12);
                            return {
                                desc: "EMPRÉSTIMO",
                                parcela: `${String(i+1).padStart(2,'0')}° Parcela`,
                                data: `08/${String(mes).padStart(2,'0')}/${ano}`,
                                valor: 450.00,
                                status: i < 25 ? "Pago" : "Pendente"
                            };
                        })
                    }
                ]
            },
            "ANA PAULA DA SILVA": {
                tipo: "normal",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "ACORDO",
                    itens: [
                        {desc: "ACORDO", parcela: "01° Parcela", data: "10/10/2026", valor: 200.00, status: "Pendente"}
                    ]
                }]
            },
            "MADRINHA": {
                tipo: "normal",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "ACORDO",
                    itens: [
                        {desc: "ACORDO", parcela: "01° Parcela", data: "10/10/2026", valor: 200.00, status: "Pendente"}
                    ]
                }]
            },
            "CICINHA FILHA DE LIA": {
                tipo: "juros",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "EMPRÉSTIMO A JUROS",
                    itens: [
                        {dia: "04/09/2026", principal: 2000.00, taxa: "20%", jurosMensal: 400.00, status: "Pendente"}
                    ]
                }]
            },
            "CARLA AMIGA DE PAULA": {
                tipo: "juros",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "EMPRÉSTIMO A JUROS",
                    itens: [
                        {dia: "04/09/2026", principal: 400.00, taxa: "25%", jurosMensal: 100.00, status: "Pendente"}
                    ]
                }]
            },
            "GALEGO (JUROS)": {
                tipo: "juros",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "EMPRÉSTIMO A JUROS",
                    itens: [
                        {dia: "06/09/2026", principal: 500.00, taxa: "25%", jurosMensal: 125.00, status: "Pendente"}
                    ]
                }]
            },
            "PAULA IRMÃ": {
                tipo: "juros",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "EMPRÉSTIMO A JUROS",
                    itens: [
                        {dia: "21/09/2026", principal: 1000.00, taxa: "20%", jurosMensal: 200.00, status: "Pendente"}
                    ]
                }]
            },
            "CÍCERA DO TEMPERO (JUROS)": {
                tipo: "juros",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "EMPRÉSTIMO A JUROS",
                    itens: [
                        {dia: "07/10/2026", principal: 5000.00, taxa: "12%", jurosMensal: 600.00, status: "Pendente"}
                    ]
                }]
            },
            "MANUELA AMIGA DE CARLA": {
                tipo: "juros",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "EMPRÉSTIMO A JUROS",
                    itens: [
                        {dia: "08/10/2026", principal: 1000.00, taxa: "25%", jurosMensal: 250.00, status: "Pendente"}
                    ]
                }]
            },
            "EMANUEL & TAMIRES": {
                tipo: "juros",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "EMPRÉSTIMO A JUROS",
                    itens: [
                        {dia: "10/10/2026", principal: 500.00, taxa: "30%", jurosMensal: 150.00, status: "Pendente"},
                        {dia: "29/10/2026", principal: 300.00, taxa: "30%", jurosMensal: 90.00, status: "Pendente"}
                    ]
                }]
            },
            "ALINE FILHA DE LIA": {
                tipo: "juros",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "EMPRÉSTIMO A JUROS",
                    itens: [
                        {dia: "10/10/2026", principal: 3000.00, taxa: "20%", jurosMensal: 600.00, status: "Pendente"},
                        {dia: "18/10/2026", principal: 500.00, taxa: "20%", jurosMensal: 100.00, status: "Pendente"}
                    ]
                }]
            },
            "CLAUDIANA FILHA DE LIA": {
                tipo: "juros",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "EMPRÉSTIMO A JUROS",
                    itens: [
                        {dia: "11/10/2026", principal: 150.00, taxa: "20%", jurosMensal: 30.00, status: "Pendente"},
                        {dia: "13/10/2026", principal: 600.00, taxa: "20%", jurosMensal: 120.00, status: "Pendente"},
                        {dia: "20/10/2026", principal: 1000.00, taxa: "20%", jurosMensal: 200.00, status: "Pendente"},
                        {dia: "21/10/2026", principal: 1000.00, taxa: "20%", jurosMensal: 200.00, status: "Pendente"}
                    ]
                }]
            },
            "JAQUELINE FILHA DE LIA": {
                tipo: "juros",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "EMPRÉSTIMO A JUROS",
                    itens: [
                        {dia: "14/10/2026", principal: 1000.00, taxa: "20%", jurosMensal: 200.00, status: "Pendente"}
                    ]
                }]
            },
            "SAMUEL": {
                tipo: "juros",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "EMPRÉSTIMO A JUROS",
                    itens: [
                        {dia: "20/10/2026", principal: 1000.00, taxa: "20%", jurosMensal: 200.00, status: "Pendente"},
                        {dia: "25/10/2026", principal: 1000.00, taxa: "20%", jurosMensal: 200.00, status: "Pendente"}
                    ]
                }]
            },
            "SANDRA AMIGA DE PAULA": {
                tipo: "juros",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "EMPRÉSTIMO A JUROS",
                    itens: [
                        {dia: "23/10/2026", principal: 1100.00, taxa: "27.3%", jurosMensal: 300.30, status: "Pendente"}
                    ]
                }]
            },
            "LUCIMAR": {
                tipo: "juros",
                senha: "",
                isentoAtraso: false,
                tabelas: [{
                    titulo: "EMPRÉSTIMO A JUROS",
                    itens: [
                        {dia: "26/10/2026", principal: 3000.00, taxa: "20%", jurosMensal: 600.00, status: "Pendente"}
                    ]
                }]
            }
        };

        const chavesPixIniciais = [
            { banco: "Francisco Wellington", tipo: "Chave Aleatória", valor: "00020126330014BR.GOV.BCB.PIX0111600793733055204000053039865802BR5925FRANCISCO WELLINGTON DA S6009SAO PAULO622605224O1NoLpWhrjSbiYOPbOCN763042552" }
        ];

        let dbClientes = JSON.parse(localStorage.getItem('sistema_cobranca_db'));
        if (!dbClientes) {
            dbClientes = dadosIniciaisClientes;
            let contadorSenha = 1;
            for (let nome in dbClientes) {
                dbClientes[nome].senha = String(contadorSenha).padStart(2, '0');
                contadorSenha++;
            }
            localStorage.setItem('sistema_cobranca_db', JSON.stringify(dbClientes));
        }

        let dbChavesPix = JSON.parse(localStorage.getItem('sistema_cobranca_pix')) || chavesPixIniciais;

        let clienteAtual = Object.keys(dbClientes)[0];
        let tipoUsuarioLogado = '';

        let itemAtrasoAtualParaPix = null;
        let valorAtualPixGlobal = 0;

        function fazerLogin() {
            const senhaDigitada = document.getElementById('input-senha').value.trim();
            const erroDiv = document.getElementById('login-error');

            if (senhaDigitada === "SRHD..") {
                logarComoGestor();
                return;
            }

            let clienteEncontrado = null;
            for (let nome in dbClientes) {
                if (dbClientes[nome].senha === senhaDigitada) {
                    clienteEncontrado = nome;
                    break;
                }
            }

            if (clienteEncontrado) {
                tipoUsuarioLogado = 'cliente';
                clienteAtual = clienteEncontrado;
                document.getElementById('login-screen').style.display = 'none';
                document.getElementById('main-app-container').style.display = 'flex';
                document.getElementById('label-usuario-logado').innerText = `Cliente: ${clienteEncontrado}`;
                
                document.getElementById('sidebar').style.display = 'none';
                document.getElementById('btn-menu-toggle').style.display = 'none';
                
                abrirCliente(clienteEncontrado);
                verificarTravaAtrasoCliente(clienteEncontrado);

            } else {
                erroDiv.style.display = 'block';
                document.getElementById('input-senha').value = '';
                document.getElementById('input-senha').focus();
            }
        }

        function logarComoGestor() {
            tipoUsuarioLogado = 'gestor';
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('main-app-container').style.display = 'flex';
            document.getElementById('label-usuario-logado').innerText = "Olá, Gestor";
            document.getElementById('sidebar').style.display = 'flex';
            document.getElementById('btn-menu-toggle').style.display = 'block';
            
            // Exibe o botão de salvar na nuvem MongoDB para o Administrador
            document.getElementById('btn-salvar-nuvem-geral').style.display = 'inline-flex';

            inicializarSistemaGestor();
        }

        // FUNÇÃO PARA ENVIAR OS DADOS DIRETAMENTE PARA O BACKEND NO MONGODB ATLAS
        async function salvarDadosNaNuvem() {
            if (tipoUsuarioLogado !== 'gestor') {
                alert("Acesso restrito ao administrador.");
                return;
            }

            try {
                const dadosParaSalvar = {
                    clientes: dbClientes,
                    chavesPix: dbChavesPix
                };

                const resposta = await fetch('/api/salvar-dados-nuvem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dadosParaSalvar)
                });

                const resultado = await resposta.json();

                if (resposta.ok) {
                    alert("Sucesso! Todos os dados foram salvos permanentemente na nuvem (MongoDB Atlas).");
                } else {
                    alert("Erro ao salvar na nuvem: " + (resultado.error || "Erro desconhecido"));
                }
            } catch (erro) {
                console.error("Erro de conexão:", erro);
                alert("Erro de ligação ao servidor.");
            }
        }

        function inicializarSistemaGestor() {
            carregarMenuSidebar();
            renderizarPlanilhaCliente();
        }

        function verificarTravaAtrasoCliente(nomeCliente) {
            let dados = dbClientes[nomeCliente];
            if (!dados || dados.tipo !== 'juros' || dados.isentoAtraso) return;

            let maxDiasAtraso = 0;
            let itemMaisAtrasado = null;
            let tabIdxEncontrada = 0;
            let itemIdxEncontrada = 0;

            dados.tabelas.forEach((tab, tIdx) => {
                tab.itens.forEach((item, iIdx) => {
                    if (item.status === 'Pendente') {
                        let dias = calcularDiasAtraso(item.dia);
                        if (dias > maxDiasAtraso) {
                            maxDiasAtraso = dias;
                            itemMaisAtrasado = item;
                            tabIdxEncontrada = tIdx;
                            itemIdxEncontrada = iIdx;
                        }
                    }
                });
            });

            if (maxDiasAtraso > 0 && itemMaisAtrasado) {
                itemAtrasoAtualParaPix = { tabelaIdx: tabIdxEncontrada, itemIdx: itemIdxEncontrada, modoPrincipal: false };
                document.getElementById('texto-contador-atraso').innerHTML = `⏳ Atrasado há <strong>${maxDiasAtraso}${maxDiasAtraso === 1 ? 'dia' : 'dias'}</strong><br><span style="font-size:0.85rem; font-weight:normal;">Vencimento original: ${itemMaisAtrasado.dia}</span>`;
                document.getElementById('modal-aviso-atraso').style.display = 'flex';
            }
        }

        function abrirPixDoAtraso() {
            if (itemAtrasoAtualParaPix) {
                document.getElementById('modal-aviso-atraso').style.display = 'none';
                abrirPixItem(itemAtrasoAtualParaPix.tabelaIdx, itemAtrasoAtualParaPix.itemIdx, itemAtrasoAtualParaPix.modoPrincipal);
            }
        }

        function sairDoSistema() {
            location.reload();
        }

        function verificarEnter(event) {
            if (event.key === 'Enter') {
                fazerLogin();
            }
        }

        function salvarDB() {
            localStorage.setItem('sistema_cobranca_db', JSON.stringify(dbClientes));
            localStorage.setItem('sistema_cobranca_pix', JSON.stringify(dbChavesPix));
        }

        function carregarMenuSidebar() {
            const listaClientes = document.getElementById('lista-clientes-sidebar');
            const listaJuros = document.getElementById('lista-juros-sidebar');
            
            listaClientes.innerHTML = '';
            listaJuros.innerHTML = '';
            
            for (let nome in dbClientes) {
                const li = document.createElement('li');
                li.innerHTML = `<a href="#" onclick="abrirCliente('${nome}', this)">${nome}</a>`;
                
                if (dbClientes[nome].tipo === 'juros') {
                    listaJuros.appendChild(li);
                } else {
                    listaClientes.appendChild(li);
                }
            }
        }

        function renderizarTabelaChavesPix() {
            const tbody = document.getElementById('tabela-chaves-pix-corpo');
            tbody.innerHTML = '';

            if (dbChavesPix.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #94a3b8;">Nenhuma chave Pix cadastrada.</td></tr>`;
                return;
            }

            dbChavesPix.forEach((pix, index) => {
                tbody.innerHTML += `
                    <tr>
                        <td>${pix.banco}</td>
                        <td>${pix.tipo}</td>
                        <td><code style="word-break: break-all;">${pix.valor}</code></td>
                        <td>
                            <button class="btn btn-danger" style="padding: 2px 6px; font-size: 0.75rem;" onclick="removerChavePix(${index})"><i class="fa-solid fa-trash"></i> Excluir</button>
                        </td>
                    </tr>
                `;
            });
        }

        function adicionarChavePix() {
            let banco = document.getElementById('input-banco-pix').value.trim();
            let tipo = document.getElementById('select-tipo-chave').value;
            let valor = document.getElementById('input-valor-chave').value.trim();

            if (!banco || !valor) {
                alert("Por favor, preencha a identificação e a chave Pix.");
                return;
            }

            dbChavesPix.push({ banco, tipo, valor });
            salvarDB();
            renderizarTabelaChavesPix();

            document.getElementById('input-banco-pix').value = '';
            document.getElementById('input-valor-chave').value = '';
        }

        function removerChavePix(index) {
            if (confirm("Deseja realmente remover esta chave Pix?")) {
                dbChavesPix.splice(index, 1);
                salvarDB();
                renderizarTabelaChavesPix();
            }
        }

        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('mobile-open');
        }

        function fecharMenuMobile() {
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('mobile-open');
            }
        }

        function toggleSubmenu(event, containerId) {
            event.preventDefault();
            const parentLi = document.getElementById(containerId);
            parentLi.classList.toggle('open');
            parentLi.querySelector('.submenu').classList.toggle('open');
        }

        function mudarTela(nomeTela, elementoClicado) {
            document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
            if(elementoClicado) elementoClicado.classList.add('active');

            document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
            document.getElementById('view-' + nomeTela).classList.add('active');
            
            if (nomeTela === 'configuracoes') {
                renderizarTabelaChavesPix();
            }
            fecharMenuMobile();
        }

        function abrirCliente(nomeCliente, elementoClicado) {
            clienteAtual = nomeCliente;
            document.getElementById('titulo-cliente').innerText = nomeCliente;
            renderizarPlanilhaCliente();

            if (tipoUsuarioLogado === 'gestor') {
                document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
                if(elementoClicado) {
                    elementoClicado.classList.add('active');
                } else {
                    document.querySelectorAll('.sidebar-menu a').forEach(a => {
                        if(a.innerText === nomeCliente) a.classList.add('active');
                    });
                }
            }

            document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
            document.getElementById('view-cliente').classList.add('active');
            fecharMenuMobile();
        }

        function calcularDiasAtraso(dataStr) {
            if (!dataStr) return 0;
            const partes = dataStr.split('/');
            if (partes.length !== 3) return 0;
            const dataVenc = new Date(partes[2], partes[1] - 1, partes[0]);
            
            const diffTime = DATA_ATUAL_SISTEMA - dataVenc;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays > 0 ? diffDays : 0;
        }

        function renderizarPlanilhaCliente() {
            const container = document.getElementById('conteudo-planilhas');
            const acoesGestor = document.getElementById('acoes-gestor-container');
            const alertaIsencaoDiv = document.getElementById('alerta-isencao-container');
            const dados = dbClientes[clienteAtual];

            if(!dados) return;

            let ehJuros = dados.tipo === 'juros';

            if (tipoUsuarioLogado === 'gestor' && ehJuros && dados.isentoAtraso) {
                alertaIsencaoDiv.innerHTML = `<div style="background-color: #dcfce7; color: #16a34a; padding: 10px; border-radius: 6px; margin-bottom: 15px; font-size: 0.9rem; font-weight: 600;">✨ Isenção de atraso ativa: Este cliente está pagando apenas o valor regular sem multas por dias em atraso.</div>`;
            } else {
                alertaIsencaoDiv.innerHTML = ``;
            }

            if (tipoUsuarioLogado === 'cliente') {
                acoesGestor.style.display = 'none';
            } else {
                acoesGestor.style.display = 'flex';
            }

            let html = tipoUsuarioLogado === 'gestor' ? `<p style="color: #64748b; font-size: 0.9rem; margin-bottom: 15px;">💡 Dica: Você pode <strong>clicar em cima</strong> de qualquer valor, data ou descrição para editá-los diretamente. Senha atual do cliente: <strong>${dados.senha || '(Nenhuma)'}</strong></p>` : ``;

            dados.tabelas.forEach((tab, indexTabela) => {
                let totalJurosMensal = 0;

                if (ehJuros) {
                    html += `
                        <h4>${tab.titulo} ${tipoUsuarioLogado === 'gestor' ? `<button class="btn btn-danger" style="padding: 2px 6px; font-size: 0.75rem;" onclick="excluirTabela(${indexTabela})"><i class="fa-solid fa-trash"></i> Excluir Quadro</button>` : ''}</h4>
                        <table class="tabela-cobranca">
                            <thead>
                                <tr>
                                    <th style="width: 30px;"><input type="checkbox" onchange="selecionarTodosQuadro(this, ${indexTabela})" title="Selecionar Todos"></th>
                                    <th>1. Vencimento</th>
                                    <th>2. Nome do Cliente</th>
                                    <th>3. Valor Principal</th>
                                    <th>4. Taxa de Juros</th>
                                    <th>5. Juros Mensal / Ajustado</th>
                                    <th>6. Status</th>
                                    <th>Gerar Pix</th>
                                    ${tipoUsuarioLogado === 'gestor' ? '<th>Ação</th>' : ''}
                                </tr>
                            </thead>
                            <tbody>
                    `;

                    tab.itens.forEach((item, indexItem) => {
                        let jurosBase = Number(item.jurosMensal || 0);
                        let valorCobrado = jurosBase;
                        let infoAtrasoStr = "";

                        if (!dados.isentoAtraso && item.status === 'Pendente') {
                            let diasAtraso = calcularDiasAtraso(item.dia);
                            if (diasAtraso > 0) {
                                let diaria = jurosBase / 30;
                                let valorAcrescimo = diaria * diasAtraso;
                                valorCobrado = jurosBase + valorAcrescimo;
                                infoAtrasoStr = ` <span style="color: #dc2626; font-size: 0.75rem; display: block;">(${diasAtraso}d atraso: +R$ ${valorAcrescimo.toFixed(2)})</span>`;
                            }
                        }

                        totalJurosMensal += valorCobrado;
                        let badgeClass = item.status === 'Pago' ? 'badge-pago' : 'badge-pendente';

                        if (tipoUsuarioLogado === 'gestor') {
                            html += `
                                <tr>
                                    <td><input type="checkbox" class="chk-item-pix" data-tabela="${indexTabela}" data-item="${indexItem}"></td>
                                    <td contenteditable="true" onblur="atualizarDadoJuros(${indexTabela}, ${indexItem}, 'dia', this)">${item.dia || ''}</td>
                                    <td>${clienteAtual}</td>
                                    <td contenteditable="true" onblur="atualizarDadoJuros(${indexTabela}, ${indexItem}, 'principal', this)">R$ ${Number(item.principal || 0).toFixed(2).replace('.', ',')}</td>
                                    <td contenteditable="true" onblur="atualizarDadoJuros(${indexTabela}, ${indexItem}, 'taxa', this)">${item.taxa || ''}</td>
                                    <td contenteditable="true" onblur="atualizarDadoJuros(${indexTabela}, ${indexItem}, 'jurosMensal', this)">R$ ${valorCobrado.toFixed(2).replace('.', ',')}${infoAtrasoStr}</td>
                                    <td><span class="status-badge ${badgeClass}" style="cursor: pointer;" onclick="alternarStatusJuros(${indexTabela}, ${indexItem})">${item.status}</span></td>
                                    <td>
                                        <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                                            <button class="btn btn-success" style="padding: 4px 8px; font-size: 0.75rem;" onclick="abrirPixItem(${indexTabela}, ${indexItem}, false)" title="Pagar Juros"><i class="fa-solid fa-qrcode"></i> Juros</button>
                                            <button class="btn btn-warning" style="padding: 4px 8px; font-size: 0.75rem;" onclick="abrirPixItem(${indexTabela}, ${indexItem}, true)" title="Pagar Principal + Juros do Mês"><i class="fa-solid fa-qrcode"></i> Principal</button>
                                        </div>
                                    </td>
                                    <td><button class="btn btn-danger" style="padding: 2px 6px; font-size: 0.75rem;" onclick="excluirItem(${indexTabela}, ${indexItem})">X</button></td>
                                </tr>
                            `;
                        } else {
                            html += `
                                <tr>
                                    <td><input type="checkbox" class="chk-item-pix" data-tabela="${indexTabela}" data-item="${indexItem}"></td>
                                    <td>${item.dia || ''}</td>
                                    <td>${clienteAtual}</td>
                                    <td>R$ ${Number(item.principal || 0).toFixed(2).replace('.', ',')}</td>
                                    <td>${item.taxa || ''}</td>
                                    <td>R$ ${valorCobrado.toFixed(2).replace('.', ',')}${infoAtrasoStr}</td>
                                    <td><span class="status-badge ${badgeClass}">${item.status}</span></td>
                                    <td>
                                        <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                                            <button class="btn btn-success" style="padding: 4px 8px; font-size: 0.75rem;" onclick="abrirPixItem(${indexTabela}, ${indexItem}, false)" title="Pagar Juros"><i class="fa-solid fa-qrcode"></i> Juros</button>
                                            <button class="btn btn-warning" style="padding: 4px 8px; font-size: 0.75rem;" onclick="abrirPixItem(${indexTabela}, ${indexItem}, true)" title="Pagar Principal + Juros do Mês"><i class="fa-solid fa-qrcode"></i> Principal</button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }
                    });

                    html += `
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="5">TOTAL A PAGAR (COM ATRASO)</td>
                                    <td colspan="${tipoUsuarioLogado === 'gestor' ? '4' : '3'}">R$ ${totalJurosMensal.toFixed(2).replace('.', ',')}</td>
                                </tr>
                            </tfoot>
                        </table>
                    `;

                } else {
                    let totalGeral = 0;
                    html += `
                        <h4>${tab.titulo} ${tipoUsuarioLogado === 'gestor' ? `<button class="btn btn-danger" style="padding: 2px 6px; font-size: 0.75rem;" onclick="excluirTabela(${indexTabela})"><i class="fa-solid fa-trash"></i> Excluir Quadro</button>` : ''}</h4>
                        <table class="tabela-cobranca">
                            <thead>
                                <tr>
                                    <th style="width: 30px;"><input type="checkbox" onchange="selecionarTodosQuadro(this, ${indexTabela})" title="Selecionar Todos"></th>
                                    <th>Descrição</th>
                                    <th>Detalhe / Parcela</th>
                                    <th>Vencimento</th>
                                    <th>Valor (R$)</th>
                                    <th>Status</th>
                                    <th>Gerar Pix</th>
                                    ${tipoUsuarioLogado === 'gestor' ? '<th>Ação</th>' : ''}
                                </tr>
                            </thead>
                            <tbody>
                    `;

                    tab.itens.forEach((item, indexItem) => {
                        totalGeral += Number(item.valor || 0);
                        let badgeClass = item.status === 'Pago' ? 'badge-pago' : 'badge-pendente';

                        if (tipoUsuarioLogado === 'gestor') {
                            html += `
                                <tr>
                                    <td><input type="checkbox" class="chk-item-pix" data-tabela="${indexTabela}" data-item="${indexItem}"></td>
                                    <td contenteditable="true" onblur="atualizarDado(${indexTabela}, ${indexItem}, 'desc', this)">${item.desc || ''}</td>
                                    <td contenteditable="true" onblur="atualizarDado(${indexTabela}, ${indexItem}, 'parcela', this)">${item.parcela || ''}</td>
                                    <td contenteditable="true" onblur="atualizarDado(${indexTabela}, ${indexItem}, 'data', this)">${item.data || ''}</td>
                                    <td contenteditable="true" onblur="atualizarDado(${indexTabela}, ${indexItem}, 'valor', this)">R$ ${Number(item.valor || 0).toFixed(2).replace('.', ',')}</td>
                                    <td><span class="status-badge ${badgeClass}" style="cursor: pointer;" onclick="alternarStatus(${indexTabela}, ${indexItem})">${item.status}</span></td>
                                    <td><button class="btn btn-success" style="padding: 4px 8px; font-size: 0.75rem;" onclick="abrirPixItem(${indexTabela}, ${indexItem}, false)"><i class="fa-solid fa-qrcode"></i> Pix</button></td>
                                    <td><button class="btn btn-danger" style="padding: 2px 6px; font-size: 0.75rem;" onclick="excluirItem(${indexTabela}, ${indexItem})">X</button></td>
                                </tr>
                            `;
                        } else {
                            html += `
                                <tr>
                                    <td><input type="checkbox" class="chk-item-pix" data-tabela="${indexTabela}" data-item="${indexItem}"></td>
                                    <td>${item.desc || ''}</td>
                                    <td>${item.parcela || ''}</td>
                                    <td>${item.data || ''}</td>
                                    <td>R$ ${Number(item.valor || 0).toFixed(2).replace('.', ',')}</td>
                                    <td><span class="status-badge ${badgeClass}">${item.status}</span></td>
                                    <td><button class="btn btn-success" style="padding: 4px 8px; font-size: 0.75rem;" onclick="abrirPixItem(${indexTabela}, ${indexItem}, false)"><i class="fa-solid fa-qrcode"></i> Pix</button></td>
                                </tr>
                            `;
                        }
                    });

                    html += `
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="4">TOTAL</td>
                                    <td colspan="${tipoUsuarioLogado === 'gestor' ? '4' : '3'}">R$ ${totalGeral.toFixed(2).replace('.', ',')}</td>
                                </tr>
                            </tfoot>
                        </table>
                    `;
                }
            });

            container.innerHTML = html;
        }

        function atualizarDado(tabelaIdx, itemIdx, campo, elemento) {
            let val = elemento.innerText.replace('R$', '').trim();
            if (campo === 'valor') val = parseFloat(val.replace('.', '').replace(',', '.')) || 0;
            dbClientes[clienteAtual].tabelas[tabelaIdx].itens[itemIdx][campo] = val;
            salvarDB();
            renderizarPlanilhaCliente();
        }

        function atualizarDadoJuros(tabelaIdx, itemIdx, campo, elemento) {
            let val = elemento.innerText.replace('R$', '').trim();
            if (campo === 'principal' || campo === 'jurosMensal') val = parseFloat(val.replace('.', '').replace(',', '.')) || 0;
            dbClientes[clienteAtual].tabelas[tabelaIdx].itens[itemIdx][campo] = val;
            salvarDB();
            renderizarPlanilhaCliente();
        }

        function alternarStatus(tabelaIdx, itemIdx) {
            let st = dbClientes[clienteAtual].tabelas[tabelaIdx].itens[itemIdx].status;
            dbClientes[clienteAtual].tabelas[tabelaIdx].itens[itemIdx].status = (st === 'Pago' ? 'Pendente' : 'Pago');
            salvarDB();
            renderizarPlanilhaCliente();
        }

        function alternarStatusJuros(tabelaIdx, itemIdx) {
            let st = dbClientes[clienteAtual].tabelas[tabelaIdx].itens[itemIdx].status;
            dbClientes[clienteAtual].tabelas[tabelaIdx].itens[itemIdx].status = (st === 'Pago' ? 'Pendente' : 'Pago');
            salvarDB();
            renderizarPlanilhaCliente();
        }

        function excluirItem(tabelaIdx, itemIdx) {
            if (confirm("Deseja excluir este item?")) {
                dbClientes[clienteAtual].tabelas[tabelaIdx].itens.splice(itemIdx, 1);
                salvarDB();
                renderizarPlanilhaCliente();
            }
        }

        function excluirTabela(tabelaIdx) {
            if (confirm("Deseja excluir todo este quadro?")) {
                dbClientes[clienteAtual].tabelas.splice(tabelaIdx, 1);
                salvarDB();
                renderizarPlanilhaCliente();
            }
        }

        function selecionarTodosQuadro(masterCheckbox, tabelaIdx) {
            const checkboxes = document.querySelectorAll(`.chk-item-pix[data-tabela="${tabelaIdx}"]`);
            checkboxes.forEach(chk => {
                chk.checked = masterCheckbox.checked;
            });
        }

        function salvarSenhaClienteAtual() {
            if (tipoUsuarioLogado !== 'gestor') return;
            if (!clienteAtual || !dbClientes[clienteAtual]) {
                alert("Nenhum cliente selecionado.");
                return;
            }

            let senhaAtual = dbClientes[clienteAtual].senha || "";
            let novaSenha = prompt(`[${clienteAtual}]\nDigite a nova senha de acesso desejada:`, senhaAtual);
            
            if (novaSenha !== null) {
                novaSenha = novaSenha.trim();
                if (novaSenha.length > 0) {
                    dbClientes[clienteAtual].senha = novaSenha;
                    salvarDB();
                    alert(`Senha salva com sucesso!\nCliente: ${clienteAtual}\nNova Senha: ${novaSenha}`);
                    renderizarPlanilhaCliente();
                } else {
                    alert("A senha não pode ficar em branco.");
                }
            }
        }

        function modalNovoCliente(tipo) {
            let nome = prompt(`Digite o Nome do Novo Cliente (${tipo.toUpperCase()}):`);
            if (nome) {
                nome = nome.trim().toUpperCase();
                if (dbClientes[nome]) {
                    alert("Este cliente já está cadastrado.");
                    return;
                }
                
                let novaSenha = String(Object.keys(dbClientes).length + 1).padStart(2, '0');
                
                if (tipo === 'juros') {
                    dbClientes[nome] = {
                        tipo: "juros",
                        senha: novaSenha,
                        isentoAtraso: false,
                        tabelas: [{
                            titulo: "EMPRÉSTIMO A JUROS",
                            itens: [{dia: "10/10/2026", principal: 1000.00, taxa: "20%", jurosMensal: 200.00, status: "Pendente"}]
                        }]
                    };
                } else {
                    dbClientes[nome] = {
                        tipo: "normal",
                        senha: novaSenha,
                        isentoAtraso: false,
                        tabelas: [{
                            titulo: "COMPRAS",
                            itens: [{desc: "PRODUTO", parcela: "01° Parcela", data: "10/10/2026", valor: 100.00, status: "Pendente"}]
                        }]
                    };
                }
                salvarDB();
                carregarMenuSidebar();
                abrirCliente(nome);
                alert(`Cliente cadastrado! Senha atribuída: ${novaSenha}`);
            }
        }

        function modalAdicionarParcela() {
            if (!clienteAtual || !dbClientes[clienteAtual]) return;

            let dados = dbClientes[clienteAtual];
            if (dados.tabelas.length === 0) {
                dados.tabelas.push({ titulo: "NOVO QUADRO", itens: [] });
            }

            if (dados.tipo === 'juros') {
                dados.tabelas[0].itens.push({
                    dia: "10/10/2026",
                    principal: 500.00,
                    taxa: "20%",
                    jurosMensal: 100.00,
                    status: "Pendente"
                });
            } else {
                dados.tabelas[0].itens.push({
                    desc: "NOVO ITEM",
                    parcela: "01° Parcela",
                    data: "10/10/2026",
                    valor: 100.00,
                    status: "Pendente"
                });
            }

            salvarDB();
            renderizarPlanilhaCliente();
        }

        function excluirClienteAtual() {
            if (confirm(`Tem certeza que deseja excluir completamente o cliente [${clienteAtual}]?`)) {
                delete dbClientes[clienteAtual];
                salvarDB();
                carregarMenuSidebar();
                clienteAtual = Object.keys(dbClientes)[0];
                if (clienteAtual) {
                    abrirCliente(clienteAtual);
                } else {
                    location.reload();
                }
            }
        }

        function restaurarDadosOriginais() {
            if (confirm("Atenção: Isso irá apagar todas as edições manuais e restaurar os dados iniciais do sistema. Continuar?")) {
                localStorage.removeItem('sistema_cobranca_db');
                localStorage.removeItem('sistema_cobranca_pix');
                location.reload();
            }
        }

        function crc16(str) {
            let crc = 0xFFFF;
            for (let c = 0; c < str.length; c++) {
                crc ^= str.charCodeAt(c) << 8;
                for (let i = 0; i < 8; i++) {
                    if ((crc & 0x8000) !== 0) {
                        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
                    } else {
                        crc = (crc << 1) & 0xFFFF;
                    }
                }
            }
            return crc.toString(16).toUpperCase().padStart(4, '0');
        }

        function formatarCampoPix(id, valor) {
            const len = valor.length.toString().padStart(2, '0');
            return `${id}${len}${valor}`;
        }

        function gerarPayloadPixDinamico(chave, valor, nomeRecebedor = "FRANCISCO WELLINGTON DA S", cidade = "SAO PAULO") {
            const strValor = valor.toFixed(2);
            
            if (chave.startsWith("000201")) {
                let payloadSemCRC = chave;
                if (chave.includes("6304")) {
                    payloadSemCRC = chave.split("6304")[0];
                }
                
                payloadSemCRC = payloadSemCRC.replace(/54\d{2}[\d\.]+/g, '');

                const tagValor = formatarCampoPix("54", strValor);

                if (payloadSemCRC.includes("53986")) {
                    payloadSemCRC = payloadSemCRC.replace("53986", "53986" + tagValor);
                } else {
                    payloadSemCRC += tagValor;
                }

                payloadSemCRC += "6304";
                return payloadSemCRC + crc16(payloadSemCRC);
            }

            const merchantAccount = formatarCampoPix("00", "BR.GOV.BCB.PIX") + formatarCampoPix("01", chave);
            const payload = 
                formatarCampoPix("00", "01") +
                formatarCampoPix("26", merchantAccount) +
                formatarCampoPix("52", "0000") +
                formatarCampoPix("53", "986") +
                formatarCampoPix("54", strValor) +
                formatarCampoPix("58", "BR") +
                formatarCampoPix("59", nomeRecebedor.substring(0, 25)) +
                formatarCampoPix("60", cidade.substring(0, 15)) +
                formatarCampoPix("62", formatarCampoPix("05", "***")) +
                "6304";

            return payload + crc16(payload);
        }

        function preencherSelectChavesPix() {
            const select = document.getElementById('select-escolha-chave-pix');
            select.innerHTML = '';
            dbChavesPix.forEach((pix, idx) => {
                select.innerHTML += `<option value="${idx}">${pix.banco} (${pix.tipo})</option>`;
            });
        }

        function abrirPixItem(tabelaIdx, itemIdx, pagarPrincipal = false) {
            let dados = dbClientes[clienteAtual];
            let item = dados.tabelas[tabelaIdx].itens[itemIdx];
            let valorCalculado = 0;
            let descricaoDetalhe = "";

            if (dados.tipo === 'juros') {
                let principal = Number(item.principal || 0);
                let jurosBase = Number(item.jurosMensal || 0);
                
                if (pagarPrincipal) {
                    let jurosAcrescimo = 0;
                    if (!dados.isentoAtraso && item.status === 'Pendente') {
                        let diasAtraso = calcularDiasAtraso(item.dia);
                        if (diasAtraso > 0) {
                            jurosAcrescimo = (jurosBase / 30) * diasAtraso;
                        }
                    }
                    valorCalculado = principal + jurosBase + jurosAcrescimo;
                    descricaoDetalhe = `Quitação do Principal (R$ ${principal.toFixed(2)}) + Juros do Mês (R$ ${jurosBase.toFixed(2)}) - Venc: ${item.dia}`;
                } else {
                    valorCalculado = jurosBase;
                    if (!dados.isentoAtraso && item.status === 'Pendente') {
                        let diasAtraso = calcularDiasAtraso(item.dia);
                        if (diasAtraso > 0) {
                            valorCalculado += (jurosBase / 30) * diasAtraso;
                        }
                    }
                    descricaoDetalhe = `Empréstimo a Juros - Vencimento: ${item.dia}`;
                }
            } else {
                valorCalculado = Number(item.valor || 0);
                descricaoDetalhe = `${item.desc || 'Item'} (${item.parcela || ''}) - Vencimento: ${item.data || ''}`;
            }

            valorAtualPixGlobal = valorCalculado;
            preencherSelectChavesPix();

            document.getElementById('detalhes-cobranca-pix').innerHTML = `
                <strong>Cliente:</strong> ${clienteAtual}<br>
                <strong>Detalhe:</strong> ${descricaoDetalhe}<br>
                <strong>Valor Total:</strong> <span style="color: #16a34a; font-weight: bold;">R$ ${valorCalculado.toFixed(2).replace('.', ',')}</span>
            `;

            atualizarQrCodePixAtual();
            document.getElementById('modal-pix').style.display = 'flex';
        }

        function abrirPixMultiplo() {
            const checkboxes = document.querySelectorAll('.chk-item-pix:checked');
            if (checkboxes.length === 0) {
                alert("Selecione pelo menos um item/parcela nas caixas de seleção ao lado para pagar via Multi Pix.");
                return;
            }

            let dados = dbClientes[clienteAtual];
            let valorTotalMulti = 0;
            let itensDescricaoLista = [];

            checkboxes.forEach(chk => {
                let tIdx = parseInt(chk.getAttribute('data-tabela'));
                let iIdx = parseInt(chk.getAttribute('data-item'));
                let item = dados.tabelas[tIdx].itens[iIdx];

                if (dados.tipo === 'juros') {
                    let jurosBase = Number(item.jurosMensal || 0);
                    let valItem = jurosBase;
                    if (!dados.isentoAtraso && item.status === 'Pendente') {
                        let diasAtraso = calcularDiasAtraso(item.dia);
                        if (diasAtraso > 0) {
                            valItem += (jurosBase / 30) * diasAtraso;
                        }
                    }
                    valorTotalMulti += valItem;
                    itensDescricaoLista.push(`Juros (${item.dia})`);
                } else {
                    valorTotalMulti += Number(item.valor || 0);
                    itensDescricaoLista.push(`${item.desc} (${item.parcela})`);
                }
            });

            valorAtualPixGlobal = valorTotalMulti;
            preencherSelectChavesPix();

            document.getElementById('detalhes-cobranca-pix').innerHTML = `
                <strong>Cliente:</strong> ${clienteAtual}<br>
                <strong>Itens Selecionados (${checkboxes.length}):</strong> ${itensDescricaoLista.join(', ')}<br>
                <strong>Valor Total Combinado:</strong> <span style="color: #16a34a; font-weight: bold;">R$ ${valorTotalMulti.toFixed(2).replace('.', ',')}</span>
            `;

            atualizarQrCodePixAtual();
            document.getElementById('modal-pix').style.display = 'flex';
        }

        function atualizarQrCodePixAtual() {
            const select = document.getElementById('select-escolha-chave-pix');
            const idxChave = select.value !== "" ? parseInt(select.value) : 0;
            const chaveObj = dbChavesPix[idxChave] || dbChavesPix[0];

            if (!chaveObj) return;

            const payloadPix = gerarPayloadPixDinamico(chaveObj.valor, valorAtualPixGlobal);
            
            document.getElementById('texto-pix-copia').value = payloadPix;
            document.getElementById('img-qrcode-pix').src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(payloadPix)}`;
        }

        function copiarChavePix() {
            const textarea = document.getElementById('texto-pix-copia');
            textarea.select();
            textarea.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(textarea.value).then(() => {
                alert("Código Pix Copia e Cola copiado com sucesso!");
            }).catch(() => {
                alert("Erro ao copiar. Selecione e copie manualmente.");
            });
        }

        function fecharModalPix() {
            document.getElementById('modal-pix').style.display = 'none';
        }
    </script>
</body>
</html>
