async function exibirCadastros() {

    try {
        var cadastros = await carregamento('http://localhost:5500/JSON/cadastros.json')
        var tipos = await carregamento('http://localhost:5500/JSON/tiposVeiculo.json')

        let html = '<option value="Vazio">Escolha o cliente</option>'
        for (let cadastro of cadastros) {
            html += `<option value="${cadastro.nome}">${cadastro.nome}</option>`

            document.getElementById('selectCadastro').innerHTML = html
        }

        document.getElementById('selectCadastro').addEventListener('change', function () {

            const nomeSeleciondo = this.value

            const cadastroSelecionado = cadastros.find(cadastro => cadastro.nome === nomeSeleciondo)

            document.getElementById('nomeProp').value = cadastroSelecionado.nome
            document.getElementById('telefone').value = cadastroSelecionado.telefone
            document.getElementById('nomeVeiculo').value = cadastroSelecionado.modelo
            document.getElementById('placaCarro').value = cadastroSelecionado.placa
            document.getElementById('horaEntrada').value = formatarData(cadastroSelecionado.horaEntrada)
            document.getElementById('tipoCad').value = cadastroSelecionado.tipoCad
        })

        document.getElementById('buttonExcluir').addEventListener('click', async function () {

            var nomeProp = document.getElementById('nomeProp').value
            var telefone = document.getElementById('telefone').value
            var modelo = document.getElementById('nomeVeiculo').value
            var horaEntrada = document.getElementById('horaEntrada').value
            var tipoCad = document.getElementById('tipoCad').value
            var placa = document.getElementById('placaCarro').value

            if (!nomeProp || !telefone || !modelo || !tipoCad || !placa || !horaEntrada) {
                alert('Por favor, selecione um cadastro')
                return
            }

            const objPlaca = {
                placa: placa
            }

            try {

                var excluindoDados = await excluirDados('http://localhost:5500/excluirDados', objPlaca)

                if (excluindoDados = true) {
                    await editarQuant(tipos)
                }
                else{
                    alert('Não foi possível remover o cadastro')
                    return
                }

            } catch (erro) {
                console.error("Erro: " + erro)
            }
        })
    } catch (error) {
        console.error('Erro ao processar o formulário:', error)
    }

    async function editarQuant(tipos) {

        let tipoCadSelect = document.getElementById('tipoCad').value

        const tiposSelect = tipos.find(tipo => tipo.tipo === tipoCadSelect)

        let id = tiposSelect.id
        let tipo = tiposSelect.tipo
        let quantVagas = tiposSelect.quantVagas
        let quantDisponivel = tiposSelect.quantDisponivel
        quantDisponivel++

        const objectTipo = {
            id: id,
            tipo: tipo,
            quantVagas: quantVagas,
            quantDisponivel: quantDisponivel
        }
        await editarDados('http://localhost:5500/tipoVeiculo', objectTipo)
    }
}