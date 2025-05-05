// Função para inicializar o timer de contagem regressiva
function initCountdown() {
    // Define o tempo final (24 horas a partir de agora)
    const now = new Date();
    const end = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    // Atualiza o timer a cada segundo
    const timer = setInterval(() => {
        // Calcula o tempo restante
        const currentTime = new Date();
        const timeLeft = end - currentTime;
        
        // Se o tempo acabou, limpa o intervalo
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.querySelector('#hours').textContent = '00';
            document.querySelector('#minutes').textContent = '00';
            document.querySelector('#seconds').textContent = '00';
            return;
        }
        
        // Calcula horas, minutos e segundos
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Atualiza os elementos na página
        document.querySelector('#hours').textContent = hours.toString().padStart(2, '0');
        document.querySelector('#minutes').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('#seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Função para inicializar o acordeão FAQ
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle a classe active no item atual
            item.classList.toggle('active');
            
            // Fecha outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

// Função para suavizar o scroll ao clicar em links internos
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Função para mostrar botão de WhatsApp após rolagem
function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    // Inicialmente esconde o botão
    whatsappButton.style.opacity = '0';
    whatsappButton.style.visibility = 'hidden';
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.visibility = 'visible';
        } else {
            whatsappButton.style.opacity = '0';
            whatsappButton.style.visibility = 'hidden';
        }
    });
}

// Função para adicionar animações de entrada nos elementos
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.benefit-card, .plan-card, .step');
    
    // Função que verifica se um elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Adiciona uma classe 'visible' quando o elemento entra na viewport
    function handleScroll() {
        elementsToAnimate.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Adiciona estilo inicial para os elementos
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Adiciona o event listener para scroll
    window.addEventListener('scroll', handleScroll);
    
    // Verifica os elementos visíveis imediatamente
    handleScroll();
    
    // Define o estilo para elementos visíveis
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .benefit-card.visible, .plan-card.visible, .step.visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);
}

// Função para adicionar contador de visitantes fictício
function initVisitorCounter() {
    const now = new Date();
    const baseVisitors = 1543; // Número base de visitantes
    const hourlyVisitors = 12; // Visitantes por hora
    
    // Calcula visitantes com base na hora atual
    const hoursToday = now.getHours() + (now.getMinutes() / 60);
    const todaysVisitors = Math.floor(hoursToday * hourlyVisitors);
    const totalVisitors = baseVisitors + todaysVisitors;
    
    // Cria o elemento para exibir o contador
    const counterElement = document.createElement('div');
    counterElement.className = 'visitor-counter';
    counterElement.innerHTML = `
        <p><i class="fas fa-user-group"></i> <strong>${totalVisitors}</strong> pessoas já aproveitaram esta oferta hoje</p>
    `;
    
    counterElement.style.position = 'fixed';
    counterElement.style.bottom = '20px';
    counterElement.style.left = '20px';
    counterElement.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    counterElement.style.padding = '10px 15px';
    counterElement.style.borderRadius = '5px';
    counterElement.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    counterElement.style.fontSize = '0.9rem';
    counterElement.style.zIndex = '99';
    
    // Adiciona o elemento à página
    document.body.appendChild(counterElement);
    
    // Atualiza o contador a cada minuto
    setInterval(() => {
        const minutesToAdd = 1;
        const visitorsToAdd = Math.floor((hourlyVisitors / 60) * minutesToAdd);
        
        if (visitorsToAdd > 0) {
            const currentVisitors = parseInt(counterElement.querySelector('strong').textContent);
            counterElement.querySelector('strong').textContent = currentVisitors + visitorsToAdd;
        }
    }, 60 * 1000);
}

// Função para inicializar exibição do número de estoque limitado
function initLimitedStock() {
    // Espera um pequeno tempo para garantir que os elementos estejam carregados
    setTimeout(() => {
        const plans = document.querySelectorAll('.plan-card');
        
        if (plans.length > 0) {
            plans.forEach((plan, index) => {
                // Cria stocks diferentes para cada plano
                const stocks = [7, 12, 18];
                const stock = stocks[index] || stocks[0]; // Fallback para o primeiro valor se o índice não existir
                
                const stockElement = document.createElement('p');
                stockElement.className = 'stock-info';
                stockElement.innerHTML = `<i class="fas fa-box"></i> Apenas <span class="highlight">${stock}</span> unidades em estoque`;
                stockElement.style.marginTop = '15px';
                stockElement.style.fontSize = '0.9rem';
                
                // Adiciona antes do botão de compra se o botão existir
                const btnOffer = plan.querySelector('.btn-offer');
                if (btnOffer) {
                    btnOffer.parentNode.insertBefore(stockElement, btnOffer);
                } else {
                    // Se o botão não for encontrado, adiciona ao final do card
                    plan.appendChild(stockElement);
                }
                
                // Diminui o estoque a cada 3-5 minutos aleatoriamente
                setInterval(() => {
                    const stockSpan = stockElement.querySelector('span');
                    if (stockSpan) {
                        const currentStock = parseInt(stockSpan.textContent);
                        if (currentStock > 1) {
                            stockSpan.textContent = currentStock - 1;
                        }
                    }
                }, Math.floor(Math.random() * (5 - 3 + 1) + 3) * 60 * 1000);
            });
        } else {
            // Se os planos não foram encontrados, tenta novamente após um tempo maior
            console.log("Planos não encontrados, tentando novamente...");
            setTimeout(initLimitedStock, 1000);
        }
    }, 500);
}


// Função para adicionar notificações de compras recentes
function initRecentPurchases() {
    // Lista de nomes fictícios
    const names = [
        "Carlos de São Paulo",
        "Ana do Rio de Janeiro",
        "Roberto de Belo Horizonte",
        "Mariana de Porto Alegre",
        "Juliana de Curitiba",
        "Thiago de Salvador",
        "Fernanda de Fortaleza",
        "Lucas de Recife",
        "Patricia de Brasília",
        "Diego de Florianópolis"
    ];
    
    // Lista de produtos
    const products = [
        "Kit 6 meses de Extrato de Própolis",
        "Kit 3 meses de Extrato de Própolis",
        "Kit 1 mês de Extrato de Própolis"
    ];
    
    // Função para exibir notificação
    function showNotification() {
        // Seleciona um nome e produto aleatório
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const minutesAgo = Math.floor(Math.random() * 10) + 1;
        
        // Cria o elemento de notificação
        const notification = document.createElement('div');
        notification.className = 'purchase-notification';
        notification.innerHTML = `
            <i class="fas fa-shopping-cart"></i>
            <p><strong>${randomName}</strong> comprou <br>${randomProduct} há ${minutesAgo} minutos</p>
            <span class="close-notification">&times;</span>
        `;
        
        // Estiliza o elemento
        notification.style.position = 'fixed';
        notification.style.bottom = '90px';
        notification.style.left = '20px';
        notification.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        notification.style.padding = '15px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        notification.style.display = 'flex';
        notification.style.alignItems = 'center';
        notification.style.fontSize = '0.9rem';
        notification.style.maxWidth = '280px';
        notification.style.zIndex = '99';
        notification.style.transform = 'translateY(20px)';
        notification.style.opacity = '0';
        notification.style.transition = 'all 0.3s ease';
        
        // Estiliza o ícone
        notification.querySelector('i').style.fontSize = '1.5rem';
        notification.querySelector('i').style.marginRight = '10px';
        notification.querySelector('i').style.color = '#006400';
        
        // Estiliza o botão de fechar
        const closeBtn = notification.querySelector('.close-notification');
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '5px';
        closeBtn.style.right = '10px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.fontSize = '1.2rem';
        
        // Adiciona o evento de fechar
        closeBtn.addEventListener('click', () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Adiciona à página
        document.body.appendChild(notification);
        
        // Anima a entrada
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove automaticamente após 5 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    // Exibe a primeira notificação após 30 segundos
    setTimeout(() => {
        showNotification();
        
        // Depois exibe aleatoriamente a cada 30-90 segundos
        setInterval(() => {
            showNotification();
        }, Math.floor(Math.random() * (90 - 30 + 1) + 30) * 1000);
    }, 30 * 1000);
}

// Função para mostrar popup de saída (exit intent)
function initExitIntent() {
    let popupShown = false;
    
    // Cria o elemento de popup
    const popup = document.createElement('div');
    popup.className = 'exit-popup';
    popup.innerHTML = `
        <div class="exit-popup-content">
            <span class="close-popup">&times;</span>
            <h3>ESPERE! NÃO VÁ EMBORA!</h3>
            <p>Temos uma oferta especial exclusiva para você!</p>
            <div class="exit-offer">
                <h4>10% OFF EXTRA</h4>
                <p>Use o cupom:</p>
                <div class="coupon-code">MAIS10OFF</div>
                <p>Válido apenas hoje!</p>
            </div>
            <a href="#ofertas" class="btn btn-cta">APROVEITAR AGORA</a>
        </div>
    `;
    
    // Estiliza o popup
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.zIndex = '999';
    popup.style.opacity = '0';
    popup.style.visibility = 'hidden';
    popup.style.transition = 'all 0.3s ease';
    
    // Estiliza o conteúdo
    const content = popup.querySelector('.exit-popup-content');
    content.style.backgroundColor = '#fff';
    content.style.borderRadius = '8px';
    content.style.padding = '30px';
    content.style.maxWidth = '500px';
    content.style.position = 'relative';
    content.style.textAlign = 'center';
    
    // Estiliza o botão de fechar
    const closeBtn = popup.querySelector('.close-popup');
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '15px';
    closeBtn.style.fontSize = '1.5rem';
    closeBtn.style.cursor = 'pointer';
    
    // Estiliza o cupom
    const coupon = popup.querySelector('.coupon-code');
    coupon.style.backgroundColor = '#f5f5f5';
    coupon.style.padding = '10px 15px';
    coupon.style.margin = '15px auto';
    coupon.style.fontWeight = 'bold';
    coupon.style.fontSize = '1.5rem';
    coupon.style.letterSpacing = '2px';
    coupon.style.borderRadius = '4px';
    coupon.style.border = '2px dashed #006400';
    coupon.style.display = 'inline-block';
    
    // Adiciona à página
    document.body.appendChild(popup);
    
    // Função para mostrar o popup
    function showPopup() {
        if (!popupShown) {
            popup.style.opacity = '1';
            popup.style.visibility = 'visible';
            popupShown = true;
        }
    }
    
    // Monitora o movimento do mouse
    document.addEventListener('mouseleave', (e) => {
        // Se o mouse sair pelo topo da página
        if (e.clientY < 5) {
            showPopup();
        }
    });
    
    // Fecha o popup ao clicar no botão ou no fundo
    closeBtn.addEventListener('click', () => {
        popup.style.opacity = '0';
        popup.style.visibility = 'hidden';
    });
    
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.opacity = '0';
            popup.style.visibility = 'hidden';
        }
    });
    
    // Fecha o popup ao clicar no botão CTA
    popup.querySelector('.btn-cta').addEventListener('click', () => {
        popup.style.opacity = '0';
        popup.style.visibility = 'hidden';
    });
}

// Inicializa todas as funções quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    // Aguarda um pequeno intervalo para garantir que todos os elementos estão carregados
    setTimeout(() => {
        try {
            initCountdown();
            initFaqAccordion();
            initSmoothScroll();
            initWhatsAppButton();
            initScrollAnimations();
            initVisitorCounter();
            initLimitedStock();
            initRecentPurchases();
            initExitIntent();
            
            // Verifica se os botões de oferta foram carregados corretamente
            const offerButtons = document.querySelectorAll('.btn-offer');
            if (offerButtons.length === 0) {
                console.log("Botões de oferta não encontrados, tentando novamente...");
                setTimeout(() => {
                    attachOfferButtonEvents();
                }, 1000);
            } else {
                attachOfferButtonEvents();
            }
        } catch (error) {
            console.error("Erro ao inicializar funções:", error);
        }
    }, 300);
});

// Função para anexar eventos aos botões de oferta
function attachOfferButtonEvents() {
    const offerButtons = document.querySelectorAll('.btn-offer');
    offerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Cria feedback visual
            const feedback = document.createElement('div');
            feedback.className = 'add-to-cart-feedback';
            feedback.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Produto adicionado ao carrinho!</p>
            `;
            
            // Estiliza o feedback
            feedback.style.position = 'fixed';
            feedback.style.top = '20px';
            feedback.style.left = '50%';
            feedback.style.transform = 'translateX(-50%) translateY(-100px)';
            feedback.style.backgroundColor = 'rgba(0, 100, 0, 0.9)';
            feedback.style.color = '#fff';
            feedback.style.padding = '15px 30px';
            feedback.style.borderRadius = '5px';
            feedback.style.display = 'flex';
            feedback.style.alignItems = 'center';
            feedback.style.zIndex = '9999';
            feedback.style.transition = 'transform 0.3s ease';
            
            // Estiliza o ícone
            feedback.querySelector('i').style.fontSize = '1.5rem';
            feedback.querySelector('i').style.marginRight = '10px';
            
            // Adiciona à página
            document.body.appendChild(feedback);
            
            // Anima a entrada
            setTimeout(() => {
                feedback.style.transform = 'translateX(-50%) translateY(0)';
            }, 10);
            
            // Remove após 3 segundos
            setTimeout(() => {
                feedback.style.transform = 'translateX(-50%) translateY(-100px)';
                setTimeout(() => {
                    document.body.removeChild(feedback);
                }, 300);
            }, 3000);
            
            // Redireciona para a seção de checkout (simulado)
            setTimeout(() => {
                const targetLink = button.getAttribute('href');
                const targetElement = document.querySelector(targetLink);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }, 1000);
        });
    });
}