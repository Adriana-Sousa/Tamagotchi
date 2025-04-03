 let pet = {
            nome: "Tamagotchi",
            fome: 50,
            felicidade: 50,
            energia: 50,
            nivel: 1,
            pontosEvolucao: 0,
            vivo: true
        };

        function setPetName() {
            const input = document.getElementById("name-input").value.trim();
            if (input) {
                pet.nome = input;
                document.getElementById("pet-name").textContent = pet.nome;
                document.getElementById("message").textContent = `Nome definido como ${pet.nome}!`;
                document.getElementById("name-input").value = "";
            } else {
                document.getElementById("message").textContent = "Por favor, digite um nome!";
            }
        }

        function updateStatus() {
            document.getElementById("fome-value").textContent = pet.fome;
            document.getElementById("felicidade-value").textContent = pet.felicidade;
            document.getElementById("energia-value").textContent = pet.energia;
            document.getElementById("fome-bar").style.width = `${pet.fome}%`;
            document.getElementById("felicidade-bar").style.width = `${pet.felicidade}%`;
            document.getElementById("energia-bar").style.width = `${pet.energia}%`;

            if (pet.fome <= 0 || pet.felicidade <= 0 || pet.energia <= 0) {
                pet.vivo = false;
                document.getElementById("message").textContent = `${pet.nome} não resistiu... Fim de jogo!`;
                document.querySelectorAll("button").forEach(btn => btn.disabled = true);
            }

            document.getElementById("nivel-value").textContent = `${pet.nivel} (${pet.nivel === 1 ? "Bebê" : pet.nivel === 2 ? "Criança" : "Adulto"})`;
        }

        function evoluir() {
            pet.pontosEvolucao += 10;
            if (pet.nivel < 3 && pet.pontosEvolucao >= 30) {
                pet.nivel++;
                pet.pontosEvolucao = 0;
                document.getElementById("message").textContent = `${pet.nome} evoluiu para ${pet.nivel === 2 ? "Criança" : "Adulto"}!`;
            }
        }

        function alimentar() {
            if (pet.fome <= 90) {
                pet.fome += 10;
                pet.felicidade += 5;
                document.getElementById("message").textContent = `${pet.nome} foi alimentado!`;
                evoluir();
            } else {
                document.getElementById("message").textContent = `${pet.nome} está muito cheio!`;
            }
            updateStatus();
        }

        function brincar() {
            if (pet.energia >= 20) {
                pet.felicidade += 15;
                pet.energia -= 10;
                pet.fome -= 5;
                document.getElementById("message").textContent = `${pet.nome} brincou e está feliz!`;
                evoluir();
            } else {
                document.getElementById("message").textContent = `${pet.nome} está muito cansado...`;
            }
            updateStatus();
        }

        function dormir() {
            if (pet.energia <= 90) {
                pet.energia += 20;
                pet.fome -= 5;
                document.getElementById("message").textContent = `${pet.nome} dormiu e recuperou energia!`;
                evoluir();
            } else {
                document.getElementById("message").textContent = `${pet.nome} não está com sono!`;
            }
            updateStatus();
        }

        function passarTempo() {
            if (pet.vivo) {
                pet.fome -= Math.floor(Math.random() * 6) + 5; // 5 a 10
                pet.felicidade -= Math.floor(Math.random() * 6) + 3; // 3 a 8
                pet.energia -= Math.floor(Math.random() * 6) + 5; // 5 a 10
                
                pet.fome = Math.max(0, Math.min(100, pet.fome));
                pet.felicidade = Math.max(0, Math.min(100, pet.felicidade));
                pet.energia = Math.max(0, Math.min(100, pet.energia));
                
                updateStatus();
            }
        }

        // Atualiza automaticamente a cada 3 segundos
        setInterval(passarTempo, 3000);

        // Inicializa o status
        updateStatus();
