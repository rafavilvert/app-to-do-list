// Implementar array de excluidos ====================================================

// Funcionar adicionar itens na lista
var btnAdd = document.querySelector("#btn-add")
var inputListaTarefa = document.querySelector("#inputListaTarefa")
var adicionarItem = document.querySelector("#adicionarItem")
var btnSalvar = document.querySelector("#btn-salvar")

var listaDeItens = JSON.parse(localStorage.getItem("lista_tarefas")) || []
var itemChecked = JSON.parse(localStorage.getItem("item_checked")) || []
//var createElement = document.createElement("li")



btnAdd.addEventListener("click", function(event) {
    adicionarTarefa()
})

carregarLista()

// Carregar lista quando fechar ou atualizar o browser
function carregarLista() {
    adicionarItem.innerHTML = ''
    for (item of listaDeItens) {
        var createElement = document.createElement("li")
        var posicao = listaDeItens.indexOf(item)
        createElement.innerHTML = `${item}`
            + `<button type="button" class="btn-delete" onclick="excluir(${posicao})">`
            + `<img src="images/btn-fechar.png" alt="botão fechar"></button>`
            + `<input type="checkbox" class="check" onclick="riscar(${posicao})" ${itemChecked[posicao]} >`

        createElement.value = item
        createElement.className = itemChecked[posicao]
        adicionarItem.appendChild(createElement)
    }
}

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

