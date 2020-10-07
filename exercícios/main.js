function exibeExercicios(cod) {
    for (var q of document.querySelectorAll('div.container'))
        q.style.display = 'none';
    for (var q of document.querySelectorAll('div.card'))
        q.style.display = 'none';
    document.getElementById(cod).style.display = 'block';
}
function exibeCard(cod) {
    for (var q of document.querySelectorAll('div.card'))
        q.style.display = 'none';
    document.getElementById(cod).style.display = 'block';
}

function answer1() {
    rua = document.cadastro.rua.value;
    numero = document.cadastro.numero.value;
    bairro = document.cadastro.bairro.value;
    cidade = document.cadastro.cidade.value;
    uf = document.cadastro.uf.value;
    msg = "O usuário mora em " + cidade + " / " + uf + ", no bairro " + bairro + ", na rua \"" + rua + "\" com nº " + numero + "."
    alert(msg)
    document.getElementById('q1').style.display = 'block';
    document.getElementById('s1').style.display = 'block';
}

function answer2() {
    var num1 = parseInt(prompt("Digite o primeiro número:"))
    var num2 = parseInt(prompt("Digite o segundo número:"))
    var v = []
    if (num1 % 2 != 0) {
        num1--;
    }
    for (let index = 2; index + num1 < num2; index += 2) {
        v.push(index + num1);
    }
    if (num1 > num2)
        alert("ERRO: O segundo número deve ser maior que o primeiro!")
    else
        alert("Os números pares entre " + num1 + " e " + num2 + " são: " + v)
}


function answer3() {
    var pai = document.querySelector('#s3 div');
    var div = document.createElement('div');
    if (document.querySelectorAll('#s3 div div').length == 12) {
        alert('CHEGA PORRA!');
        pai.innerHTML = '';
        return;
    }
    div.setAttribute('class', 'col-sm-1');
    div.setAttribute('onmouseenter', 'getRandomColor(this)');
    pai.appendChild(div);
    div.style.background = getRandomColor(div)
}

function getRandomColor(e) {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    e.style.background = color;
}

function answer4() {
    var iniciante = document.getElementById('iniciante')
    var intermediario = document.getElementById('intermediario')
    var avancado = document.getElementById('avancado')
    var master = document.getElementById('master')

    if (iniciante.checked == true)
        alert("O usuário está no nível Iniciante")
    else if (intermediario.checked == true)
        alert("O usuário está no nível Intermediário")
    else if (avancado.checked == true)
        alert("O usuário está no nível Avançado")
    else if (master.checked == true)
        alert("O usuário está no nível Jedi Master")
}

var valor = document.getElementById('user')
var lista = document.querySelector('#s5 div ul')
lista.setAttribute('style', 'margin-top:20px;')
var users = []

function render() {
    lista.innerHTML = ""
    for (user of users) {
        var text = document.createTextNode(user)
        var item = document.createElement('li')
        item.appendChild(text)
        lista.appendChild(item)

        var linkElement = document.createElement('a')
        linkElement.setAttribute('style', 'margin-left: 10px;')
        var linkText = document.createTextNode('Excluir')
        linkElement.setAttribute('href', '#')

        var pos = users.indexOf(user);

        linkElement.setAttribute('onclick', 'remove(' + pos + ')')
        linkElement.appendChild(linkText)
        item.appendChild(linkElement)
    }
}


function add() {
    var conteudo = valor.value
    users.push(conteudo)
    render()
    valor.value = ""
}

function remove(pos) {
    users.splice(pos, 1)
    render();
}

//função retorna promisse
    var inputName = document.getElementById("usuario");
    var dataList = document.getElementById("listaRepo");
    const getUserRepo = name => {
        var user = inputName.value;
        if (!user) {
            renderError();
            alert("Preencha o campo");
        }
        renderLoading();
        axios
            .get(`https://api.github.com/users/${user}/repos`)
            .then(response => {
                fillList(response.data);
            })
            .catch(error => {
                alert("Não foi possível efetuar a busca!");
                renderError(error);
            });
    };

    function renderLoading(loading) {
        dataList.innerHTML = "";
        var textElement = document.createTextNode("Carregando...");
        var loadingElement = document.createElement("li");
        loadingElement.appendChild(textElement);
        dataList.appendChild(loadingElement);
    }

    function renderError(loading) {
        dataList.innerHTML = "";
        var user = inputName.value;
        var msgUserEmpty = !user ? "Preencha o usuário" : "Erro ao efetuar busca";

        var textElement = document.createTextNode(msgUserEmpty);
        var errorElement = document.createElement("li");
        errorElement.style.color = "#F00";
        errorElement.appendChild(textElement);
        dataList.appendChild(errorElement);
    }

    const fillList = repositorios => {
        console.log("TCL: repositorios", repositorios);
        dataList.innerHTML = "";

        for (repo of repositorios) {
            const reponame = document.createTextNode(repo.name);
            const repoItem = document.createElement("li");

            repoItem.appendChild(reponame);
            dataList.appendChild(repoItem);
        }
    };

