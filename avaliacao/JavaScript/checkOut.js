function exibirCheckOuts() {
    //CARREGAR OS CAMPOS PREÇO FIXO E PREÇO POR HORA
    var precoPorMinuto = 0
    var precoFixo = 0

    carregamento('http://localhost:5500/JSON/precos.json').then(data => {
        for (let valor of data) {
            document.getElementById('precoFixo').value = valor.precoFixo
            document.getElementById('precoHora').value = valor.precoHora

            precoPorMinuto = valor.precoPorMinuto
            precoFixo = valor.precoFixo
        }
    })

    //CARREGAR OS CADASTROS SALVOS    
    carregamento('http://localhost:5500/JSON/cadastros.json').then(data => {
        let html = '<option value="Vazio">Escolha um cliente</option>'
        for (let cadastros of data) {
            html += `<option value="${cadastros.nome}">${cadastros.nome}</option>`

            document.getElementById('selectCadastro').innerHTML = html
        }

        document.getElementById('selectCadastro').addEventListener('change', function () {

            const nomeSeleciondo = this.value

            const cadastroSelecionado = data.find(cadastros => cadastros.nome === nomeSeleciondo)

            document.getElementById('nomeProp').value = cadastroSelecionado.nome
            document.getElementById('telefone').value = cadastroSelecionado.telefone
            document.getElementById('nomeVeiculo').value = cadastroSelecionado.modelo
            document.getElementById('placaCarro').value = cadastroSelecionado.placa
            document.getElementById('horaEntrada').value = cadastroSelecionado.horaEntrada
            document.getElementById('tipoCad').value = cadastroSelecionado.tipoCad
        })
    })

    document.getElementById('horaSaida').addEventListener('change', function () {

        var horaSaida = new Date(document.getElementById('horaSaida').value)
        var horaEntrada = new Date(document.getElementById('horaEntrada').value)

        var minutosTotais = 0

        if (horaSaida.getDate() === horaEntrada.getDate()) {
            minutosTotais = (horaSaida - horaEntrada) / (1000 * 60)
        } else {
            var inicioDoDiaEntrada = new Date(horaEntrada)
            inicioDoDiaEntrada.setHours(0, 0, 0, 0)

            var fimDoDiaEntrada = new Date(horaEntrada)
            fimDoDiaEntrada.setHours(23, 59, 59, 999)

            minutosTotais += (fimDoDiaEntrada - horaEntrada) / (60000)

            var diasIntermediarios = Math.floor((horaSaida - fimDoDiaEntrada) / (1000 * 60 * 60 * 24))
            minutosTotais += diasIntermediarios * 24 * 60

            var inicioDoDiaSaida = new Date(horaSaida)
            inicioDoDiaSaida.setHours(0, 0, 0, 0)

            minutosTotais += (horaSaida - inicioDoDiaSaida) / (60000)
        }

        var precoTotal = (minutosTotais * precoPorMinuto) + precoFixo

        document.getElementById('precoTotal').value = precoTotal
    })
}

function salvarCheckOut() {

    const obj = {
        nome: document.getElementById('nomeProp').value,
        telefone: document.getElementById('telefone').value,
        modelo: document.getElementById('nomeVeiculo').value,
        tipoCad: document.getElementById('tipoCad').value,
        placa: document.getElementById('placaCarro').value,
        horaEntrada: document.getElementById('horaEntrada').value,
        horaSaida: document.getElementById('horaSaida').value,
        precoFixo: document.getElementById('precoFixo').value,
        precoHora: document.getElementById('precoHora').value,
        precoTotal: document.getElementById('precoTotal').value
    }

    for (let prop in obj) {
        if (!obj[prop]) {
            alert('Por favor preencha todos os campos para emitir o check out')
            return
        }
    }

    var salvandoDados = salvarDados('http://localhost:5500/comprovante', obj)
    
    if (salvandoDados = true) {
        alert('Dados salvos com sucesso !')
    }
}
