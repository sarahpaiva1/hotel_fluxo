class Cliente {
    constructor(id, nome, dataNascimento, cpf, email, senha) {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}
class Funcionario {
    constructor(id, nomeUsuario, cpf, email, senha) {
        this.id = id;
        this.nomeUsuario = nomeUsuario;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}
class Quarto {
    constructor(id, nome, quantidadeCamas, precoPorNoite, descricao) {
        this.id = id;
        this.nome = nome;
        this.quantidadeCamas = quantidadeCamas;
        this.precoPorNoite = precoPorNoite;
        this.descricao = descricao;
    }
}
class Reserva {
    constructor(id, idCliente, idQuarto, status, dataEntrada, dataSaida) {
        this.id = id;
        this.idCliente = idCliente;
        this.idQuarto = idQuarto;
        this.status = status;
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
    }
}
class Sistema {
    constructor() {
        this.clientes = [];
        this.funcionarios = [];
        this.quartos = [];
        this.reservas = [];
    }

    adicionarCliente(cliente) {
        this.clientes.push(cliente);
    }

    adicionarFuncionario(funcionario) {
        this.funcionarios.push(funcionario);
    }

    adicionarQuarto(quarto) {
        this.quartos.push(quarto);
    }

    adicionarReserva(reserva) {
        this.reservas.push(reserva);
    }

    
    cadastrarCliente(nome, dataNascimento, cpf, email, senha) {
        const id = this.clientes.length + 1;

        const novoCliente = new Cliente(
            id,
            nome,
            dataNascimento,
            cpf,
            email,
            senha
        );

        this.clientes.push(novoCliente);

        return novoCliente;
    }
    fazerLogin(email, senha) {
        const cliente = this.clientes.find(
             cliente => cliente.email === email && cliente.senha === senha
         );

        if (cliente) {
              return {
                 tipo: "cliente",
                 usuario: cliente
             };
         }

        const funcionario = this.funcionarios.find(
            funcionario =>
                funcionario.email === email &&
                funcionario.senha === senha
         );

        if (funcionario) {
            return {
                tipo: "funcionario",
                usuario: funcionario
             };
        }
        return null;
}
    
    
}


const sistema = new Sistema();


const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({
    input,
    output
});


async function cadastrarClienteTerminal() {

    console.log("\n CADASTRO DE CLIENTE");

    const nome = await rl.question("Nome: ");
    const dataNascimento = await rl.question("Data de nascimento: ");
    const cpf = await rl.question("CPF: ");
    const email = await rl.question("Email: ");
    const senha = await rl.question("Senha: ");

    const cliente = sistema.cadastrarCliente(
        nome,
        dataNascimento,
        cpf,
        email,
        senha
    );

    console.log("\nCliente cadastrado com sucesso!");
    console.log("ID do cliente:", cliente.id);
}
async function fazerLoginTerminal() {

    console.log("\n LOGIN ");

    const email = await rl.question("Email: ");
    const senha = await rl.question("Senha: ");

    const resultado = sistema.fazerLogin(email, senha);

    if (resultado === null) {

        console.log("\nEmail ou senha incorretos.");

    } else {

        console.log("\nLogin realizado com sucesso!");

        if (resultado.tipo === "cliente") {

            console.log(
                "Bem-vindo(a),",
                resultado.usuario.nome
            );

        } else {

            console.log(
                "Bem-vindo(a),",
                resultado.usuario.nomeUsuario
            );
        }
    }
}

async function menuInicial() {

    let executando = true;

    while (executando) {

        console.log("\n HOTEL FLUXO");
        console.log("1 - Fazer Login");
        console.log("2 - Fazer Cadastro");
        console.log("3 - Sair");

        const opcao = await rl.question("\nEscolha uma opção: ");

        if (opcao === "1") {

            console.log("\nLogin será implementado no próximo passo.");

        } else if (opcao === "2") {

            await cadastrarClienteTerminal();

        } else if (opcao === "3") {

            console.log("\nPrograma encerrado.");
            executando = false;

        } else {

            console.log("\nOpção inválida.");
        }
    }

    rl.close();
}


menuInicial();
