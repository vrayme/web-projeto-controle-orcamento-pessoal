// criando a classe despesa/objeto despesa

class Despesa {
    constructor (ano, mes, dia, tipo, descricao, valor) {  // recebo os paramentros 
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) { // this, faz referencia ao objeto/classe despesa
            if (this [i] == undefined || this [i] == '' || this [i] == null) { // validação dos campos, se estão vazios ou não // this [i] = mostra o conteúdo do atributo
                return false
            }
        }
        return true
    }
}

class Bd { // criação da classe do banco de dados

    constructor () {
       
        let id = localStorage.getItem('id')
        
        if (id === null || id===NaN) {
         localStorage.setItem('id', 0) // chave = id, valor = 0
        }
    }
    
    getProximoId() {
        
        let proximoId = localStorage.getItem('id') // null // get item serve para recuperar o dado que foi inserido
        
        return (parseInt(proximoId) + 1)
        
    }

    gravar (d) {
       // localStorage.setItem ('despesa', JSON.stringify (d)) // pode passar 2 paramentros, 1º identificação do objeto que vamos armazenar = 'despesa', 2º dado que vamos armazenar = 'd' // set item serve para inserir um dando dentro local storage
       
       let id = this.getProximoId() // recebe o proximo a id
       
       localStorage.setItem (id, JSON.stringify (d))
      
       localStorage.setItem ('id', id)
    }

    recuperarTodosRegistros () { // função para recuperar os registro de local storage

        let despesas = Array()
        
        let id = localStorage.getItem ('id')

        for (let i=1; i<=id; i++) { // recuperação atraves do for
            
            let despesa = JSON.parse (localStorage.getItem (i)) //  transformando de json para obj literal // antes pego o conteudo dentro de local storage
            if (despesa === null) { // logica para quando um registro for igual null
                continue  
            }

            //console.log (i, despesa)
            despesa.id = i
            despesas.push (despesa)
        }

        //console.log (despesas)

        return despesas
    }

    pesquisar (despesa) {
        
        let despesasFiltradas = Array ()

        despesasFiltradas = this.recuperarTodosRegistros ()

        console.log (despesa)

        console.log (despesasFiltradas)

        // ano

        if (despesa.ano != '') {
            console.log ('filtro de ano')
            despesasFiltradas = despesasFiltradas.filter (d => d.ano == despesa.ano)
        }

        // mes
        if (despesa.mes != '') {
            console.log ('filtro de mes')
            despesasFiltradas = despesasFiltradas.filter (d => d.mes == despesa.mes)
        }

        // dia

        if (despesa.dia != '') {
            console.log ('filtro de dia')
            despesasFiltradas = despesasFiltradas.filter (d => d.dia == despesa.dia)
        }

        //tipo

        if (despesa.tipo != '') {
            console.log ('filtro de tipo')
            despesasFiltradas = despesasFiltradas.filter (d => d.tipo == despesa.tipo)
        }

        //descrição

        if (despesa.descricao != '') {
            console.log ('filtro de descricao')
            despesasFiltradas = despesasFiltradas.filter (d => d.descricao == despesa.descricao)
        }

        // valor

        if (despesa.valor != '') {
            console.log ('filtro de valor')
            despesasFiltradas = despesasFiltradas.filter (d => d.valor == despesa.valor)
        }

        return despesasFiltradas
    }

    remover(id) {
       
        localStorage.removeItem (id)
    }

    
}

let bd = new Bd ()


// recuperando os valores dos campos

function cadastrarDespesa () { // função de clicar no botão

    let ano = window.document.getElementById ('ano')
    let mes = window.document.getElementById ('mes')
    let dia = window.document.getElementById ('dia')
    let tipo = window.document.getElementById ('tipo')
    let descricao = window.document.getElementById ('descricao')
    let valor = window.document.getElementById ('valor')

// console.log (ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value) // teste para saber se estamos conseguindo recuperar os valores 'values'

    let despesa = new Despesa (ano.value,  // faço a instancia da classe dentro da função de click
    mes.value, 
    dia.value, 
    tipo.value, 
    descricao.value, 
    valor.value)  // os campos que recuperei, passo como paramentro para classe

    // console.log (despesa) // teste para saber se tá criando os objetos

    //bd.gravar (despesa) // chamando a função gravar e passando o objeto despesa como paramentro para a mesma

   if (despesa.validarDados ()) { // se o método retorna true
       
        bd.gravar (despesa)


       window.document.getElementById ('modalTitulo').innerHTML = 'Registro inserido com sucesso!'
       window.document.getElementById ('modalCorDiv').className = 'modal-header text-success'
       window.document.getElementById ('modalConteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
       window.document.getElementById ('modalBotao').innerHTML = 'Voltar'
       window.document.getElementById ('modalBotao').className = 'btn btn-success'

       $('#modalRegistraDespesa').modal ('show')


        // limpando os campos
       
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''


    } else {


        window.document.getElementById ('modalTitulo').innerHTML = 'Erro na inclusão do registro!'
        window.document.getElementById ('modalCorDiv').className = 'modal-header text-danger'
        window.document.getElementById ('modalConteudo').innerHTML = '{Erro na gravação}, verique se todos os campos foram devidamente preenchidos!'
        window.document.getElementById ('modalBotao').innerHTML = 'Voltar e corrigir'
        window.document.getElementById ('modalBotao').className = 'btn btn-danger'

        $('#modalRegistraDespesa').modal ('show')

    } 
    
}

function carregaListaDespesas(despesas = Array (), filtro = false) {

     if (despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros()
     }
     
     //selecionando o elemento html, tbody

     var listaDespesas = window.document.getElementById ('listaDespesas')
     listaDespesas.innerHTML = ''

     // percorrer o array despesas, listando cada despesa de forma dinamica
    
     despesas.forEach (function (d) {
            //criando a linha da tabela (tr) 

            let linha = listaDespesas.insertRow ()


            // criando as colunas 

            linha.insertCell (0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
            
            switch (d.tipo) {
                case '1':
                d.tipo = 'Alimentação'
                break
                case '2':
                d.tipo = 'Educação'
                break
                case '3':
                d.tipo = 'Lazer'
                break
                case '4':
                d.tipo = 'Saúde'
                break
                case '5':
                d.tipo = 'Transporte'
                break
            }
            linha.insertCell (1).innerHTML = d.tipo
            linha.insertCell (2).innerHTML = d.descricao
            linha.insertCell (3).innerHTML = d.valor

            // criando o botão para remover os registro de despesa


            let btn = document.createElement ("button")
            btn.className = 'btn btn-danger'
            btn.innerHTML = '<i class="fas fa-times"></i>'
            btn.id = d.id
            btn.onclick = function () {
                
                let id = d.id
                
                //alert (id)
                
                bd.remover(id)

                window.location.reload ()
            }

            linha.insertCell (4).append (btn)

            console.log (d)
     })
   
}

function pesquisarDespesa () {
    let ano = window.document.getElementById ('ano').value
    let mes = window.document.getElementById ('mes').value
    let dia = window.document.getElementById ('dia').value
    let tipo = window.document.getElementById ('tipo').value
    let descricao = window.document.getElementById ('descricao').value
    let valor = window.document.getElementById ('valor').value


    let despesa = new Despesa (ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar (despesa)


     carregaListaDespesas (despesas, true)
}

