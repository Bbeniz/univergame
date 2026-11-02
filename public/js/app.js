class UnivergameApp {
    constructor() {
        this.state = {
            pseudo: localStorage.getItem('univergame_pseudo') || '',
            level: parseInt(localStorage.getItem('univergame_level') || '1'),
            xp: parseInt(localStorage.getItem('univergame_xp') || '0'),
            gamesPlayed: parseInt(localStorage.getItem('univergame_games_played') || '0'),
            highScoreTotal: parseInt(localStorage.getItem('univergame_highscore') || '0')
        };
        this.activeGameId = null;
        this.init();
    }

    init() {
        window.addEventListener('DOMContentLoaded', () => {
            if (!this.state.pseudo) {
                document.getElementById('onboardingModal').style.display = 'flex';
            } else {
                this.updateUI();
            }
            this.initMusicRoom();
        });
    }

    updateUI() {
        const pseudo = this.state.pseudo || 'Explorateur';
        document.getElementById('headerPseudo').textContent = pseudo;
        document.getElementById('dashPseudo').textContent = pseudo;
        document.getElementById('dashLevel').textContent = this.state.level;
        document.getElementById('dashXp').textContent = this.state.xp;
        document.getElementById('editPseudoInput').value = this.state.pseudo;
        document.getElementById('profileStatsText').textContent = 
            `Parties jouées : ${this.state.gamesPlayed} | Meilleur score global : ${this.state.highScoreTotal}`;
        
        const xpNeeded = this.state.level * 100;
        const xpPercent = Math.min(100, (this.state.xp / xpNeeded) * 100);
        document.getElementById('xpBar').style.width = xpPercent + '%';
    }

    completeOnboarding() {
        const input = document.getElementById('onboardingPseudo').value.trim();
        if (!input) {
            alert('Veuillez entrer un pseudonyme valide.');
            return;
        }
        this.state.pseudo = input;
        localStorage.setItem('univergame_pseudo', input);
        document.getElementById('onboardingModal').style.display = 'none';
        this.updateUI();

        // NOVA welcome message
        setTimeout(() => {
            this.openNovaModal();
            const box = document.getElementById('novaDialogueBox');
            box.innerHTML += `<br><br><strong>NOVA :</strong> Salut ${input} ! Bienvenue dans UNIVERGAME ! Je suis ton guide personnel. Tout est 100% gratuit, sans abonnement. Prêt à explorer ton univers ?`;
            box.scrollTop = box.scrollHeight;
        }, 500);
    }

    switchView(viewName) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.bottom-nav .nav-item').forEach(n => n.classList.remove('active'));

        const targetView = document.getElementById(`view-${viewName}`);
        if (targetView) targetView.classList.add('active');

        // Highlight nav item
        event && event.currentTarget && event.currentTarget.classList.add('active');
        if (viewName === 'games') {
            this.closeActiveGame();
        }
    }

    saveProfile() {
        const newPseudo = document.getElementById('editPseudoInput').value.trim();
        if (!newPseudo) {
            alert('Le pseudonyme ne peut pas être vide.');
            return;
        }
        this.state.pseudo = newPseudo;
        localStorage.setItem('univergame_pseudo', newPseudo);
        this.updateUI();
        alert('Profil mis à jour avec succès !');
    }

    openNovaModal() {
        document.getElementById('novaModal').style.display = 'flex';
    }

    closeNovaModal() {
        document.getElementById('novaModal').style.display = 'none';
    }

    sendNovaMessage() {
        const inputField = document.getElementById('novaUserInput');
        const text = inputField.value.trim();
        if (!text) return;

        const box = document.getElementById('novaDialogueBox');
        box.innerHTML += `<br><br><strong>${this.state.pseudo} :</strong> ${text}`;
        inputField.value = '';

        // Preset local responses from NOVA
        setTimeout(() => {
            let reply = "C'est une excellente question ! Explore les 9 jeux de l'Arène, relève les missions quotidiennes et écoute ta musique dans la Music Room.";
            const lower = text.toLowerCase();
            if (lower.includes('bonjour') || lower.includes('salut')) {
                reply = `Salut ${this.state.pseudo} ! Comment se passe ton exploration ?`;
            } else if (lower.includes('jeu') || lower.includes('jouer')) {
                reply = "Tu as 9 jeux disponibles dans l'onglet Jeux : Réflexes, Mémoire, Quiz, Snake, 2048, Morpion, Pierre-Feuille-Ciseaux, Nombre Mystère et Dactylographie !";
            } else if (lower.includes('gratuit') || lower.includes('payer')) {
                reply = "Oui ! UNIVERGAME est 100% gratuit, sans pub intrusive et sans abonnement.";
            }
            box.innerHTML += `<br><br><strong>NOVA :</strong> ${reply}`;
            box.scrollTop = box.scrollHeight;
        }, 600);
    }

    // Music Room Handling
    initMusicRoom() {
        const fileInput = document.getElementById('audioFileInput');
        const player = document.getElementById('audioPlayer');
        const playlistList = document.getElementById('playlistList');

        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                playlistList.innerHTML = '';
                Array.from(files).forEach((file, index) => {
                    const li = document.createElement('li');
                    li.style.padding = '0.4rem 0';
                    li.style.cursor = 'pointer';
                    li.style.color = 'var(--neon-cyan)';
                    li.innerHTML = `<i class="fa-solid fa-play"></i> ${file.name}`;
                    li.onclick = () => {
                        const fileURL = URL.createObjectURL(file);
                        player.src = fileURL;
                        player.style.display = 'block';
                        player.play();
                    };
                    playlistList.appendChild(li);
                });
            }
        });
    }

    // Game Engine Dispatcher
    openGame(gameId) {
        this.activeGameId = gameId;
        document.getElementById('gamesHubContainer').style.display = 'none';
        document.getElementById('activeGameContainer').style.display = 'block';

        const engine = document.getElementById('gameEngine');
        engine.innerHTML = `<h3>Chargement du jeu...</h3>`;

        // NOVA tutorial greeting
        const r = this.getGameRules(gameId);
        setTimeout(() => {
            this.renderGame(gameId, engine);
            // Non-intrusive tutorial notice via NOVA
            console.log(`NOVA Guide: ${r.name} - ${r.rule}`);
        }, 200);
    }

    getGameRules(gameId) {
        const rules = {
            reflex: { name: "Défi Réflexes", rule: "Attends que la boîte devienne verte, puis clique le plus rapidement possible. Attention aux faux départs !" },
            memory: { name: "Bataille de Mémoire", rule: "Retrouve toutes les paires d'emojis cachées sous les cartes en les retournant deux par deux." },
            quiz: { name: "Arène des Quiz", rule: "Réponds correctement aux questions de culture geek, tech et dev proposées." },
            snake: { name: "Serpent Néon", rule: "Mange les bonus pour faire grandir ton serpent sans toucher les bords ni ta propre queue." },
            game2048: { name: "Fusion 2048", rule: "Combine les blocs numérotés identiques pour faire progresser ton score." },
            tictactoe: { name: "Morpion", rule: "Aligne 3 symboles (X ou O) horizontalement, verticalement ou en diagonale pour gagner." },
            rps: { name: "Pierre-Feuille-Ciseaux", rule: "Affronte l'ordinateur en choisissant Pierre, Feuille ou Ciseaux." },
            mystery: { name: "Nombre Mystère", rule: "Devine le nombre secret choisi par NOVA entre 1 et 100 grâce aux indices." },
            typing: { name: "Course de Dactylographie", rule: "Recopie la phrase exacte affichée le plus rapidement possible pour tester ta vitesse WPM." }
        };
        return rules[gameId] || { name: "Jeu", rule: "Amuse-toi et réalise le meilleur score !" };
    }

    showGameRules() {
        if (!this.activeGameId) return;
        const r = this.getGameRules(this.activeGameId);
        alert(`🤖 NOVA - Règles de [${r.name}] :\n\n${r.rule}`);
    }

    closeActiveGame() {
        this.activeGameId = null;
        document.getElementById('activeGameContainer').style.display = 'none';
        document.getElementById('gamesHubContainer').style.display = 'block';
    }

    renderGame(gameId, container) {
        switch(gameId) {
            case 'reflex':
                this.renderReflexGame(container);
                break;
            case 'memory':
                this.renderMemoryGame(container);
                break;
            case 'quiz':
                this.renderQuizGame(container);
                break;
            case 'snake':
                this.renderSnakeGame(container);
                break;
            case 'game2048':
                this.render2048Game(container);
                break;
            case 'tictactoe':
                this.renderTicTacToeGame(container);
                break;
            case 'rps':
                this.renderRpsGame(container);
                break;
            case 'mystery':
                this.renderMysteryGame(container);
                break;
            case 'typing':
                this.renderTypingGame(container);
                break;
            default:
                container.innerHTML = `<p>Jeu en cours de développement.</p>`;
        }
    }

    addXpAndRecord(score) {
        this.state.gamesPlayed++;
        this.state.xp += Math.floor(score / 2) + 10;
        if (score > this.state.highScoreTotal) {
            this.state.highScoreTotal = score;
        }
        const xpNeeded = this.state.level * 100;
        if (this.state.xp >= xpNeeded) {
            this.state.level++;
            alert(`Niveau supérieur ! Tu es maintenant niveau ${this.state.level} !`);
        }
        localStorage.setItem('univergame_level', this.state.level);
        localStorage.setItem('univergame_xp', this.state.xp);
        localStorage.setItem('univergame_games_played', this.state.gamesPlayed);
        localStorage.setItem('univergame_highscore', this.state.highScoreTotal);
        this.updateUI();
    }

    // 1. Défi Réflexes
    renderReflexGame(container) {
        container.innerHTML = `
            <h3 style="color: var(--neon-cyan);">Défi Réflexes</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">Clique dès que l'écran devient vert !</p>
            <div id="reflexBox" style="width: 100%; height: 200px; background: #333; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer; user-select: none; margin-bottom: 1rem;">
                Clique pour démarrer
            </div>
            <p id="reflexResult" style="font-size: 1.1rem; font-weight: bold;"></p>
        `;
        const box = document.getElementById('reflexBox');
        let startTime, timeout, playing = false;

        box.onclick = () => {
            if (!playing) {
                playing = true;
                box.style.background = '#e63946';
                box.textContent = 'Attends le vert...';
                document.getElementById('reflexResult').textContent = '';
                const delay = 1500 + Math.random() * 2500;
                timeout = setTimeout(() => {
                    box.style.background = '#2a9d8f';
                    box.textContent = 'CLIQUE MAINTENANT !';
                    startTime = performance.now();
                }, delay);
            } else if (startTime) {
                const reactionTime = Math.round(performance.now() - startTime);
                box.style.background = '#333';
                box.textContent = 'Clique pour rejouer';
                document.getElementById('reflexResult').textContent = `Temps de réaction : ${reactionTime} ms`;
                playing = false;
                startTime = null;
                this.addXpAndRecord(Math.max(0, 1000 - reactionTime));
            } else {
                clearTimeout(timeout);
                box.style.background = '#333';
                box.textContent = 'Trop tôt ! Clique pour recommencer';
                playing = false;
            }
        };
    }

    // 2. Bataille de Mémoire
    renderMemoryGame(container) {
        container.innerHTML = `
            <h3 style="color: var(--neon-cyan);">Bataille de Mémoire</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">Trouve toutes les paires de cartes.</p>
            <div id="memoryGrid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.8rem; max-width: 360px; margin: 0 auto 1rem auto;"></div>
            <p id="memoryStatus" style="font-weight: bold;"></p>
            <button class="btn" style="width: auto; margin: 0.5rem auto 0 auto;" onclick="app.renderMemoryGame(document.getElementById('gameEngine'))">Nouvelle Partie</button>
        `;
        const emojis = ['🚀', '🛸', '⭐', '🪐', '🚀', '🛸', '⭐', '🪐'];
        const shuffled = emojis.sort(() => Math.random() - 0.5);
        const grid = document.getElementById('memoryGrid');
        let firstCard = null, lock = false, matches = 0, attempts = 0;

        shuffled.forEach((emoji, idx) => {
            const card = document.createElement('div');
            card.className = 'mem-card';
            card.style.cssText = 'height: 70px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; cursor: pointer;';
            card.dataset.emoji = emoji;
            card.textContent = '?';
            card.onclick = () => {
                if (lock || card.classList.contains('matched') || card === firstCard) return;
                card.textContent = emoji;
                card.style.background = 'rgba(0, 245, 212, 0.15)';

                if (!firstCard) {
                    firstCard = card;
                } else {
                    attempts++;
                    if (firstCard.dataset.emoji === card.dataset.emoji) {
                        firstCard.classList.add('matched');
                        card.classList.add('matched');
                        firstCard = null;
                        matches++;
                        if (matches === 4) {
                            document.getElementById('memoryStatus').textContent = `Victoire en ${attempts} essais !`;
                            this.addXpAndRecord(Math.max(10, 200 - attempts * 10));
                        }
                    } else {
                        lock = true;
                        setTimeout(() => {
                            firstCard.textContent = '?';
                            firstCard.style.background = 'var(--bg-secondary)';
                            card.textContent = '?';
                            card.style.background = 'var(--bg-secondary)';
                            firstCard = null;
                            lock = false;
                        }, 800);
                    }
                }
            };
            grid.appendChild(card);
        });
    }

    // 3. Arène des Quiz
    renderQuizGame(container) {
        const questions = [
            { q: "Quel langage est principalement utilisé pour le développement web front-end ?", options: ["JavaScript", "Python", "C++", "SQL"], correct: 0 },
            { q: "Quel est le système d'exploitation mobile de Google ?", options: ["iOS", "Android", "Windows Phone", "Symbian"], correct: 1 },
            { q: "Que signifie HTML ?", options: ["HyperText Markup Language", "High Tech Modern Language", "Hyper Transfer Machine Language", "Home Tool Multi Language"], correct: 0 }
        ];
        let currentQ = 0, score = 0;

        const loadQ = () => {
            if (currentQ >= questions.length) {
                container.innerHTML = `
                    <h3 style="color: var(--neon-cyan);">Quiz Terminé !</h3>
                    <p style="font-size: 1.2rem; margin: 1rem 0;">Score final : ${score} / ${questions.length}</p>
                    <button class="btn" onclick="app.renderQuizGame(document.getElementById('gameEngine'))">Rejouer</button>
                `;
                this.addXpAndRecord(score * 50);
                return;
            }
            const qData = questions[currentQ];
            container.innerHTML = `
                <h3 style="color: var(--neon-cyan);">Arène des Quiz (Question ${currentQ + 1}/${questions.length})</h3>
                <p style="font-size: 1.1rem; margin: 1rem 0; color: var(--text-primary);">${qData.q}</p>
                <div style="display: flex; flex-direction: column; gap: 0.8rem; max-width: 400px; margin: 0 auto;">
                    ${qData.options.map((opt, i) => `<button class="btn btn-secondary" style="width: 100%; text-align: left;" onclick="app.answerQuiz(${i}, ${qData.correct})">${opt}</button>`).join('')}
                </div>
            `;
        };

        this.answerQuiz = (selected, correct) => {
            if (selected === correct) score++;
            currentQ++;
            loadQ();
        };

        loadQ();
    }

    // 4. Serpent Néon (Snake)
    renderSnakeGame(container) {
        container.innerHTML = `
            <h3 style="color: var(--neon-cyan);">Serpent Néon</h3>
            <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">Utilisez les boutons tactiles pour diriger le serpent.</p>
            <canvas id="snakeCanvas" width="300" height="300" style="background: #050510; border: 1px solid var(--neon-purple); border-radius: 8px; display: block; margin: 0 auto 1rem auto;"></canvas>
            <div style="display: grid; grid-template-columns: repeat(3, 60px); gap: 5px; justify-content: center;">
                <div></div><button class="btn" onclick="app.snakeDir='UP'">⬆️</button><div></div>
                <button class="btn" onclick="app.snakeDir='LEFT'">⬅️</button><button class="btn" onclick="app.snakeDir='DOWN'">⬇️</button><button class="btn" onclick="app.snakeDir='RIGHT'">➡️</button>
            </div>
        `;
        const canvas = document.getElementById('snakeCanvas');
        const ctx = canvas.getContext('2d');
        let snake = [{x: 10, y: 10}], food = {x: 5, y: 5}, dx = 1, dy = 0, score = 0;
        this.snakeDir = 'RIGHT';

        const gameInterval = setInterval(() => {
            if (this.snakeDir === 'UP' && dy === 0) { dx = 0; dy = -1; }
            if (this.snakeDir === 'DOWN' && dy === 0) { dx = 0; dy = 1; }
            if (this.snakeDir === 'LEFT' && dx === 0) { dx = -1; dy = 0; }
            if (this.snakeDir === 'RIGHT' && dx === 0) { dx = 1; dy = 0; }

            const head = {x: snake[0].x + dx, y: snake[0].y + dy};
            if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snake.some(s => s.x === head.x && s.y === head.y)) {
                clearInterval(gameInterval);
                alert(`Partie terminée ! Score : ${score}`);
                this.addXpAndRecord(score * 10);
                return;
            }
            snake.unshift(head);
            if (head.x === food.x && head.y === food.y) {
                score += 10;
                food = {x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)};
            } else {
                snake.pop();
            }

            ctx.fillStyle = '#050510';
            ctx.fillRect(0, 0, 300, 300);
            ctx.fillStyle = '#00f5d4';
            snake.forEach(s => ctx.fillRect(s.x * 15, s.y * 15, 14, 14));
            ctx.fillStyle = '#f72585';
            ctx.fillRect(food.x * 15, food.y * 15, 14, 14);
        }, 120);
    }

    // 5. Fusion 2048
    render2048Game(container) {
        container.innerHTML = `
            <h3 style="color: var(--neon-cyan);">Fusion 2048</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">Jeu de fusion de blocs (version miniature interactive).</p>
            <div id="grid2048" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; max-width: 280px; margin: 0 auto 1rem auto; background: var(--bg-secondary); padding: 10px; border-radius: 8px;"></div>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button class="btn" onclick="app.move2048('LEFT')">⬅️</button>
                <button class="btn" onclick="app.move2048('UP')">⬆️</button>
                <button class="btn" onclick="app.move2048('DOWN')">⬇️</button>
                <button class="btn" onclick="app.move2048('RIGHT')">➡️</button>
            </div>
        `;
        this.board2048 = [
            [2, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 2]
        ];
        this.update2048View();
    }
    update2048View() {
        const gridEl = document.getElementById('grid2048');
        if (!gridEl) return;
        gridEl.innerHTML = '';
        this.board2048.forEach(row => {
            row.forEach(val => {
                const cell = document.createElement('div');
                cell.style.cssText = 'height: 60px; background: rgba(255,255,255,0.05); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: bold; color: ' + (val ? 'var(--neon-cyan)' : 'transparent');
                cell.textContent = val || '';
                gridEl.appendChild(cell);
            });
        });
    }
    move2048(dir) {
        // Simple mock move for interactivity
        let maxVal = 2;
        this.board2048 = this.board2048.map(row => row.map(v => v ? v * 2 : 0));
        this.board2048.forEach(r => r.forEach(v => { if(v > maxVal) maxVal = v; }));
        this.update2048View();
        if (maxVal >= 64) {
            alert('Superbe fusion ! Score atteint : ' + maxVal);
            this.addXpAndRecord(maxVal);
        }
    }

    // 6. Morpion (Tic Tac Toe)
    renderTicTacToeGame(container) {
        container.innerHTML = `
            <h3 style="color: var(--neon-cyan);">Morpion</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">Aligne 3 symboles pour gagner.</p>
            <div id="tttGrid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; max-width: 240px; margin: 0 auto 1rem auto;"></div>
            <p id="tttStatus" style="font-weight: bold;"></p>
            <button class="btn" style="width: auto; margin-top: 1rem;" onclick="app.renderTicTacToeGame(document.getElementById('gameEngine'))">Recommencer</button>
        `;
        const grid = document.getElementById('tttGrid');
        let board = ['', '', '', '', '', '', '', '', ''];
        let turn = 'X';

        const checkWin = () => {
            const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
            for (let w of wins) {
                if (board[w[0]] && board[w[0]] === board[w[1]] && board[w[0]] === board[w[2]]) return board[w[0]];
            }
            if (!board.includes('')) return 'Tie';
            return null;
        };

        board.forEach((_, idx) => {
            const cell = document.createElement('div');
            cell.style.cssText = 'height: 70px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 2rem; cursor: pointer; color: var(--neon-cyan);';
            cell.onclick = () => {
                if (board[idx] || checkWin()) return;
                board[idx] = turn;
                cell.textContent = turn;
                const winner = checkWin();
                if (winner) {
                    document.getElementById('tttStatus').textContent = winner === 'Tie' ? 'Égalité !' : `Victoire des ${winner} !`;
                    if (winner === 'X') this.addXpAndRecord(50);
                } else {
                    turn = turn === 'X' ? 'O' : 'X';
                }
            };
            grid.appendChild(cell);
        });
    }

    // 7. Pierre-Feuille-Ciseaux
    renderRpsGame(container) {
        container.innerHTML = `
            <h3 style="color: var(--neon-cyan);">Pierre-Feuille-Ciseaux</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">Affronte l'ordinateur.</p>
            <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 1rem;">
                <button class="btn" style="width: auto;" onclick="app.playRps('Pierre')">✊ Pierre</button>
                <button class="btn" style="width: auto;" onclick="app.playRps('Feuille')">✋ Feuille</button>
                <button class="btn" style="width: auto;" onclick="app.playRps('Ciseaux')">✌️ Ciseaux</button>
            </div>
            <p id="rpsResult" style="font-size: 1.1px; font-weight: bold;"></p>
        `;
        this.playRps = (userChoice) => {
            const choices = ['Pierre', 'Feuille', 'Ciseaux'];
            const compChoice = choices[Math.floor(Math.random() * 3)];
            let res = '';
            if (userChoice === compChoice) res = `Égalité ! (Ordi : ${compChoice})`;
            else if (
                (userChoice === 'Pierre' && compChoice === 'Ciseaux') ||
                (userChoice === 'Feuille' && compChoice === 'Pierre') ||
                (userChoice === 'Ciseaux' && compChoice === 'Feuille')
            ) {
                res = `Victoire ! (Ordi : ${compChoice})`;
                this.addXpAndRecord(40);
            } else {
                res = `Défaite ! (Ordi : ${compChoice})`;
            }
            document.getElementById('rpsResult').textContent = res;
        };
    }

    // 8. Nombre Mystère
    renderMysteryGame(container) {
        const secret = Math.floor(Math.random() * 100) + 1;
        let attempts = 0;
        container.innerHTML = `
            <h3 style="color: var(--neon-cyan);">Nombre Mystère (1 à 100)</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">Devine le nombre secret choisi par NOVA.</p>
            <div class="form-group" style="max-width: 250px; margin: 0 auto;">
                <input type="number" id="mysteryInput" class="form-control" placeholder="Ton nombre">
            </div>
            <button class="btn" style="width: auto; margin-top: 0.8rem;" onclick="app.guessMystery(${secret})">Tester</button>
            <p id="mysteryHint" style="margin-top: 1rem; font-weight: bold;"></p>
        `;
        this.guessMystery = (secretNum) => {
            const val = parseInt(document.getElementById('mysteryInput').value);
            attempts++;
            const hint = document.getElementById('mysteryHint');
            if (isNaN(val)) {
                hint.textContent = 'Entre un nombre valide.';
                return;
            }
            if (val === secretNum) {
                hint.textContent = `Bravo ! Trouvé en ${attempts} tentatives !`;
                this.addXpAndRecord(Math.max(20, 200 - attempts * 15));
            } else if (val < secretNum) {
                hint.textContent = 'C\'est plus grand ! 📈';
            } else {
                hint.textContent = 'C\'est plus petit ! 📉';
            }
        };
    }

    // 9. Course de Dactylographie
    renderTypingGame(container) {
        const phrase = "univergame est un univers de divertissement interactif et gratuit";
        let startTime;
        container.innerHTML = `
            <h3 style="color: var(--neon-cyan);">Course de Dactylographie</h3>
            <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">Recopie exactement la phrase ci-dessous :</p>
            <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; font-family: monospace; color: var(--neon-cyan);">
                ${phrase}
            </div>
            <div class="form-group">
                <input type="text" id="typingInput" class="form-control" placeholder="Tape ici..." oninput="app.checkTyping('${phrase}')">
            </div>
            <p id="typingResult" style="font-weight: bold;"></p>
        `;
        this.checkTyping = (targetPhrase) => {
            if (!startTime) startTime = performance.now();
            const val = document.getElementById('typingInput').value;
            if (val === targetPhrase) {
                const timeSec = (performance.now() - startTime) / 1000;
                const wpm = Math.round((targetPhrase.split(' ').length / timeSec) * 60);
                document.getElementById('typingResult').textContent = `Terminé en ${timeSec.toFixed(1)}s ! Vitesse : ${wpm} WPM`;
                this.addXpAndRecord(wpm * 5);
            }
        };
    }
}

const app = new UnivergameApp();
