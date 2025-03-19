function criaCalculadora() {
    return {
        // Captura o input onde os números serão exibidos
        display: document.querySelector(".display"),

        // Método que inicia a calculadora chamando a função que lida com os botões
        inicia() {
            this.cliqueBotoes();
            this.pressionaEnter();
            this.bloqueiaTeclado();
        },

        pressionaEnter(){
            this.display.addEventListener("keyup", (e)=>{
                if(e.key === "Enter"){
                    this.realizaConta();
                }
            });
        },

        

        // Método para limpar o display (apagar os números)
        clearDisplay() {
            this.display.value = '';
        },

        apagaUm(){
            this.display.value = this.display.value.slice(0, -1); // tira o ultimo elemento
        },

        realizaConta(){
            let conta = this.display.value.trim();// Remove espaços extras

            try{
                if (!/^[0-9+\-*/(). ]+$/.test(conta)) { //  Verifica se contém apenas caracteres válidos
                    throw new Error("Expressão inválida");
                }

                conta = eval(conta); // resolve a xpressao em uma string

                if (isNaN(conta) || conta === undefined || conta === null) {
                    throw new Error("Conta Inválida");
                }

                
                this.display.value = conta;
            }catch(e){
                alert("Conta Inválida");
                this.clearDisplay();
                return;
            }
        },

        // Método que adiciona o evento de clique nos botões
        cliqueBotoes() {
            document.addEventListener("click", (evento) => { 
                const elemento = evento.target; // Captura o elemento que foi clicado

                // Se o botão clicado tiver a classe "btn-num" (número), adiciona ao display
                if (elemento.classList.contains('btn-num')) { 
                    this.btnParaDisplay(elemento.innerText); //pega o valor do q tá escrito na html e manda como parametro
                }

                // Se o botão clicado tiver a classe "btn-clear" (botão de limpar), limpa o display
                if (elemento.classList.contains("btn-clear")) {
                    this.clearDisplay();
                }

                if(elemento.classList.contains("btn-del")){
                    this.apagaUm();
                }   

                if(elemento.classList.contains("btn-eq")){
                    this.realizaConta();
                }

                this.display.focus();
            });
        },

        // Bloqueia caracteres inválidos no teclado
        bloqueiaTeclado() {
            this.display.addEventListener("keypress", (e) => {
                const char = e.key;
                const caracteresValidos = "0123456789+-*/().";
                
                // Se o caractere não for válido, impede a digitação
                if (!caracteresValidos.includes(char)) { //caracteresValidos.includes(char) retorna true se o caractere estiver na lista.
                    e.preventDefault(); // impede que o caractere seja digitado no campo de entrada.

                }
            });
        },

        // Método para adicionar o valor do botão clicado ao display
        btnParaDisplay(valor) {
            this.display.value += valor;
        }
    };
}

// Criando a calculadora e iniciando seu funcionamento
const calculadora = criaCalculadora();
calculadora.inicia();
