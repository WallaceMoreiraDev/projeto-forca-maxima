document.addEventListener("DOMContentLoaded", function () {
        // Animação de revelação ao rolar
        const revealElements = document.querySelectorAll(".reveal");
        const revealOnScroll = () => {
          const windowHeight = window.innerHeight;
          revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
              el.classList.add("visible");
            }
          });
        };
        window.addEventListener("scroll", revealOnScroll);
        revealOnScroll();

        // Menu mobile
        const mobileMenuButton = document.getElementById("mobile-menu-button");
        const mobileMenu = document.getElementById("mobile-menu");

        const toggleMenu = () => mobileMenu.classList.toggle("aberto");

        mobileMenuButton.addEventListener("click", toggleMenu);

        mobileMenu.querySelectorAll("a").forEach((a) =>
          a.addEventListener("click", () => {
            if (mobileMenu.classList.contains("aberto")) toggleMenu();
          })
        );

        // Seletor Inteligente
        function setupGuidedSelector() {
          const stepFluid = document.getElementById("step-fluid");
          const stepTemp = document.getElementById("step-temp");
          const selectorResult = document.getElementById("selector-result");

          if (!stepFluid || !stepTemp || !selectorResult) return;

          let selectedFluid = null;
          let selectedTemp = null;

          const fluidBtns = stepFluid.querySelectorAll(".selector-btn");
          const tempBtns = stepTemp.querySelectorAll(".selector-btn");

          const resetSelector = () => {
            selectedFluid = null;
            selectedTemp = null;
            stepFluid.classList.remove("hidden");
            stepTemp.classList.add("hidden");
            selectorResult.classList.add("hidden");
            selectorResult.innerHTML = "";
            fluidBtns.forEach((btn) => btn.classList.remove("selected"));
            tempBtns.forEach((btn) => btn.classList.remove("selected"));
          };

          fluidBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
              selectedFluid = btn.dataset.fluid;
              fluidBtns.forEach((b) => b.classList.remove("selected"));
              btn.classList.add("selected");

              stepFluid.classList.add("hidden");
              stepTemp.classList.remove("hidden");
            });
          });

          tempBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
              selectedTemp = btn.dataset.temp;
              tempBtns.forEach((b) => b.classList.remove("selected"));
              btn.classList.add("selected");

              displayResult();
            });
          });

          function displayResult() {
            if (!selectedFluid || !selectedTemp) return;

            const recommendations = {
              oleo: {
                100: {
                  material: "Borracha Nitrílica (NBR)",
                  details: "Excelente custo-benefício e alta resistência a óleos e graxas.",
                },
                150: {
                  material: "Viton® (FKM)",
                  details: "Superior ao NBR em temperaturas mais altas.",
                },
                200: {
                  material: "Viton® (FKM)",
                  details: "Ideal para altas temperaturas em contato com óleos.",
                },
                250: {
                  material: "PTFE (Teflon®)",
                  details: "Para condições extremas, consulte nosso time.",
                },
              },
              agua: {
                100: {
                  material: "EPDM",
                  details: "Excelente resistência à água, vapor e intempéries.",
                },
                150: {
                  material: "EPDM Alta Temp.",
                  details: "Formulação especial para sistemas de água quente.",
                },
                200: {
                  material: "Viton® (FKM)",
                  details: "Boa resistência, se houver contaminação por óleo.",
                },
                250: {
                  material: "PTFE (Teflon®)",
                  details: "Aplicações de vapor de alta temperatura.",
                },
              },
              quimico: {
                100: {
                  material: "Viton® (FKM)",
                  details: "Alta resistência a químicos, ácidos e combustíveis.",
                },
                150: {
                  material: "Viton® (FKM)",
                  details: "Mantém a performance em ambientes químicos aquecidos.",
                },
                200: {
                  material: "PTFE / Viton®",
                  details: "PTFE para químicos mais agressivos.",
                },
                250: {
                  material: "PTFE / FFKM",
                  details: "Para as condições mais extremas e críticas.",
                },
              },
              alimento: {
                100: {
                  material: "Silicone / EPDM",
                  details: "Materiais atóxicos (grau alimentício).",
                },
                150: {
                  material: "Silicone Atóxico",
                  details: "Ideal para processos de esterilização (CIP/SIP).",
                },
                200: {
                  material: "Silicone Atóxico",
                  details: "Excelente performance em altas temperaturas.",
                },
                250: {
                  material: "PTFE Atóxico",
                  details: "Solução definitiva para aplicações extremas.",
                },
              },
              freio: {
                100: {
                  material: "EPDM",
                  details: "Padrão para fluidos de freio (base glicol).",
                },
                150: {
                  material: "EPDM Alta Perf.",
                  details: "Para sistemas de freio de alta performance.",
                },
                200: {
                  material: "Consulte-nos",
                  details: "Exige análise técnica detalhada.",
                },
                250: {
                  material: "Consulte-nos",
                  details: "Condição crítica, exige análise aprofundada.",
                },
              },
            };
            
            const preloadedSelectorAnalyses = {
              "oleo-100": "## Análise para NBR em Óleos até 100°C\n* Vantagens: A polaridade da borracha nitrílica confere-lhe uma excelente resistência a fluidos apolares como óleos e graxas. Possui ótimas propriedades mecânicas de tensão e compressão, e um custo muito competitivo. É a escolha ideal para a vasta maioria das aplicações industriais standard.\n* Desvantagens: A sua estrutura química com duplas ligações torna-a vulnerável ao ataque de ozono, radiação UV e intempéries. Não deve ser usada com fluidos polares como cetonas (ex: acetona) ou fluidos de freio.",
            };

            const result = recommendations[selectedFluid][selectedTemp];
            const analysisKey = `${selectedFluid}-${selectedTemp}`;
            let analysisText = preloadedSelectorAnalyses[analysisKey] || "Análise técnica detalhada disponível sob consulta com nossos especialistas.";

            analysisText = analysisText.replace(/## (.*)/g, '<h4 class="text-lg font-semibold text-brand-yellow mt-4 mb-2">$1</h4>');
            analysisText = analysisText.replace(/\* (.*)/g, '<li class="ml-5 list-disc text-gray-400 text-sm">$1</li>');

            // --- CÓDIGO JS ATUALIZADO ---
            selectorResult.innerHTML = `
                <div class="resultado-header">
                    <h3 class="resultado-label">Recomendação:</h3>
                    <p class="resultado-material">${result.material}</p>
                    <p class="resultado-detalhes">${result.details}</p>
                </div>
                
                <div class="resultado-analise">
                    <ul>${analysisText}</ul>
                </div>
                
                <div class="resultado-acoes">
                    <button id="reset-selector-btn" class="reset-btn-highlight">Selecionar Novamente</button>
                </div>
            `;

            selectorResult.classList.remove("hidden");

            document.getElementById("reset-selector-btn").addEventListener("click", resetSelector);

            selectorResult.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }

        setupGuidedSelector();

        // Efeito do header ao rolar
        const header = document.getElementById("menu-inicial");
        window.addEventListener("scroll", () => {
          if (window.scrollY > 50) {
            header.classList.add("header-scrolled");
          } else {
            header.classList.remove("header-scrolled");
          }
        });

        // --- ENVIO DO FORMULÁRIO SEM SAIR DA PÁGINA (AJAX) ---
        const formContato = document.getElementById("form-contato");
    
    if (formContato) {
        formContato.addEventListener("submit", function(e) {
            e.preventDefault(); // Impede o redirecionamento padrão
            
            // CORREÇÃO AQUI: Agora ele procura a classe certa do botão novo (.footer-submit-btn)
            const btn = formContato.querySelector(".footer-submit-btn"); 
            
            // Segurança caso ele não ache o botão (evita travar o script)
            if (!btn) {
                console.error("Botão de envio não encontrado!");
                formContato.submit(); // Envia sem animação se der erro
                return;
            }

            const textoOriginal = btn.innerText;

            // Efeito visual imediato (Carregando)
            btn.innerText = "Enviando...";
            btn.style.opacity = "0.7";
            btn.style.cursor = "wait";

            fetch(formContato.action, {
                method: "POST",
                body: new FormData(formContato),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // SUCESSO
                    btn.innerText = "✓ Enviado com Sucesso!";
                    btn.style.backgroundColor = "#22c55e"; // Verde
                    btn.style.color = "#fff";
                    btn.style.cursor = "default";
                    
                    formContato.reset(); // Limpa os campos

                    setTimeout(() => {
                        btn.innerText = textoOriginal;
                        btn.style.backgroundColor = ""; // Volta a cor original
                        btn.style.opacity = "1";
                        btn.style.cursor = "pointer";
                    }, 5000);
                } else {
                    throw new Error('Erro no envio');
                }
            })
            .catch(error => {
                // ERRO
                btn.innerText = "Erro. Tente pelo WhatsApp.";
                btn.style.backgroundColor = "#ef4444"; // Vermelho
                console.error("Erro:", error);
            });
        });
    } });