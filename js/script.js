// Funcionar adicionar itens na lista
var btnAdd = document.querySelector("#btn-add")
var inputListaTarefa = document.querySelector("#inputListaTarefa")
var adicionarItem = document.querySelector("#adicionarItem")
var btnSalvar = document.querySelector("#btn-salvar")

var listaDeItens = JSON.parse(localStorage.getItem("lista_tarefas")) || []
var itemChecked = JSON.parse(localStorage.getItem("item_checked")) || []


// Botão adicionar tarefas
btnAdd.addEventListener("click", function (event) {
    adicionarTarefa()
})

// Carrega a lista salva no LocalStorage
carregarLista()

// Carregar lista quando fechar ou atualizar o browser
function carregarLista() {
    adicionarItem.innerHTML = ''
    for (item of listaDeItens) {
        var createElement = document.createElement("li")
        var posicao = listaDeItens.indexOf(item)
        createElement.innerHTML = `${item}`
            + `<div><button type="button" class="btn-delete" onclick="excluir(${posicao})">`
            + `<img src="images/trash-icon.png" alt="botão fechar"></button>`
            + `<input type="checkbox" id="inputCheckbox" class="check" onclick="riscar(${posicao})" ${itemChecked[posicao]} ><div>`

        createElement.value = item
        createElement.className = itemChecked[posicao]
        adicionarItem.appendChild(createElement)
    }
}

// Verifica se o checkbox está checked e faz o line-through no conteúdo
function riscar(pos) {
    var createElement = document.createElement("li")
    createElement.innerHTML = ''
    if (itemChecked[pos] == 'checked') {
        itemChecked[pos] = 'check'
    } else if (itemChecked[pos] == 'check') {
        itemChecked[pos] = 'checked'
    }
    carregarLista()
    salvarLista()
}

// Adiciona novas tarefas digitadas pelo usuário
function adicionarTarefa() {
    var inputText = document.getElementById("inputListaTarefa")
    for (let i = 0; i < listaDeItens.length; i++) {
        if (listaDeItens[i] == inputText.value) {
            alert("TAREFA JÁ EXISTENTE")
            var erro = "erro"
            break
        } else {
            erro = "ok"
        }
    }

    if (inputText.value != '' && erro !== "erro") {
        listaDeItens.push(inputListaTarefa.value)
        itemChecked.push('check')
        inputListaTarefa.value = ''
        inputListaTarefa.focus()
        carregarLista()
        salvarLista()
    } else {
        alert("Digite uma nova tarefa: ")
        inputListaTarefa.value = ''
        inputListaTarefa.focus()
    }
}

// Deletar tarefas
function excluir(pos) {
    var confirmarExclusao = false

    while (confirmarExclusao == false) {
        confirmarExclusao = confirm("Tem certeza que deseja excluir essa tarefa? ")

        if (confirmarExclusao == true) {
            var createElement = document.createElement("li")
            createElement.innerHTML = ''
            listaDeItens.splice(pos, 1)
            itemChecked.splice(pos, 1)
            carregarLista()
            salvarLista()
            alert("Tarefa excluida com sucesso!")

        } else {
            alert("Tarefa não deletada")
            confirmarExclusao = true

        }
    }

}

// Salvar lista no LocalStorage
function salvarLista() {
    localStorage.setItem("lista_tarefas", JSON.stringify(listaDeItens))
    localStorage.setItem("item_checked", JSON.stringify(itemChecked))
}
