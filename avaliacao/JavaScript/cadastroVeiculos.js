async function cadastrosHtml() {
    try {

        //CARREGANDO OS TIPOS DE VEÍCULOS NO SELECT
        var tipos = await carregamento('http://localhost:5500/JSON/tiposVeiculo.json')

        let html = '<option value="Vazio">Escolha o tipo de veículo</option>'
        for (let tipo of tipos) {

            const desabilitarOpcao = tipo.quantDisponivel <= 0 ? 'disabled' : '';
            html += `<option value="${tipo.tipo}"${desabilitarOpcao}>${tipo.tipo}</option>`;

        }

        const selectTipoCad = document.getElementById('selectTipoCad')
        if (selectTipoCad) {
            selectTipoCad.innerHTML = html
        }

        //CARREGANDO A QUANTIDADE DE VAGAS DISPONÍVEIS POR TIPO DE VEÍCULO
        document.getElementById('selectTipoCad').addEventListener('change', function () {

            const tipoSelect = this.value

            const quantSelect = tipos.find(tipo => tipo.tipo === tipoSelect)

            document.getElementById('quantVagas').value = quantSelect.quantVagas
            document.getElementById('quantDisponivel').value = quantSelect.quantDisponivel

        })

        //REALIZAR CADASTRO 
        document.getElementById('buttonCadastrar').addEventListener('click', async function () {

            const nomeProp = document.getElementById('nomeProp').value
            const telefone = document.getElementById('telefone').value
            const modelo = document.getElementById('modelo').value
            const tipoCad = document.getElementById('selectTipoCad').value
            const placa = document.getElementById('placa').value

            if (!nomeProp || !telefone || !modelo || !tipoCad || !placa) {
                alert('Por favor, preencha todos os campos do formulário.')
                return
            }

            const date = new Date()
            const dia = date.getDate().toString().padStart(2, '0')
            const mes = (date.getMonth() + 1).toString().padStart(2, '0')
            const ano = date.getFullYear()
            const hora = date.getHours().toString().padStart(2, '0')
            const minuto = date.getMinutes().toString().padStart(2, '0')
            const horaFormat = `${ano}-${mes}-${dia}T${hora}:${minuto}`

            const obj = {
                nome: nomeProp,
                telefone: telefone,
                modelo: modelo,
                tipoCad: tipoCad,
                placa: placa,
                horaEntrada: horaFormat
            }
            try {

                var salvandoDados = await salvarDados('http://localhost:5500/cadastro', obj)

                if (salvandoDados = true) {
                    await editarQuant(tipos)
                }
            } catch (erro) {
                alert('Não foi possível salvar o cadastro. Tente novamente')
            }
        })
    } catch (error) {
        console.error('Erro ao processar o formulário:', error)
    }

    async function editarQuant(tipos) {

        let tipoCadSelect = document.getElementById('selectTipoCad').value

        const tiposSelect = tipos.find(tipo => tipo.tipo === tipoCadSelect)

        let id = tiposSelect.id
        let tipo = tiposSelect.tipo
        let quantVagas = tiposSelect.quantVagas
        let quantDisponivel = tiposSelect.quantDisponivel
        quantDisponivel--

        const objectTipo = {
            id: id,
            tipo: tipo,
            quantVagas: quantVagas,
            quantDisponivel: quantDisponivel
        }
        await editarDados('http://localhost:5500/tipoVeiculo', objectTipo)
    }
}