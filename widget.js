/**
 * THINK ENERGY · Multi-Channel Messenger Widget (Telegram, Viber, WhatsApp)
 * Official Think Energy B2B Widget · Vanilla JS
 */

(function (window, document) {
  'use strict';

  const ICONS = {
    chat: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    close: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    arrow: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    send: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    trader: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    
    // Brand SVGs
    tg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>`,
    
    vb: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.34 3.78C17.38 2.1 14.7 1.25 11.83 1.25c-.24 0-.48.01-.72.03C7.23 1.55 3.96 4.19 3.12 8.04c-.39 1.78-.29 3.58.29 5.25.15.42.33.82.55 1.21l-.73 2.65c-.17.62.39 1.18 1.01 1.01l2.67-.73c.48.27.99.5 1.52.68 1.07.36 2.22.54 3.38.54.24 0 .47-.01.71-.03 3.88-.27 7.15-2.91 7.99-6.76.88-4.04-.47-6.95-1.16-8.09zM15.8 14.18c-.28.47-.79.76-1.34.76-.23 0-.47-.05-.69-.14-1.78-.73-3.26-2.21-3.99-3.99-.18-.44-.13-.94.13-1.34.25-.39.69-.62 1.15-.62.24 0 .47.07.67.2l1.09.73c.35.23.51.67.39 1.07l-.23.77c.41.48.89.96 1.37 1.37l.77-.23c.4-.12.84.04 1.07.39l.73 1.09c.27.41.22.95-.12 1.33z"/></svg>`,
    
    wa: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.05 7.42C8.86 7.42 8.56 7.49 8.31 7.76C8.06 8.03 7.35 8.7 7.35 10.05C7.35 11.41 8.34 12.72 8.47 12.9C8.61 13.08 10.41 15.88 13.18 17.07C15.48 18.06 15.95 17.86 16.44 17.82C16.94 17.77 18.03 17.16 18.26 16.53C18.49 15.89 18.49 15.35 18.42 15.24C18.35 15.12 18.17 15.06 17.89 14.92C17.61 14.78 16.25 14.11 16 14.02C15.74 13.92 15.56 13.88 15.37 14.16C15.19 14.43 14.67 15.06 14.51 15.24C14.35 15.42 14.19 15.45 13.91 15.31C13.64 15.17 12.74 14.88 11.68 13.93C10.85 13.19 10.29 12.28 10.13 12C9.97 11.73 10.11 11.58 10.25 11.44C10.38 11.31 10.53 11.11 10.67 10.95C10.81 10.79 10.86 10.67 10.95 10.49C11.04 10.31 11 10.15 10.93 10.01C10.86 9.88 10.3 8.51 10.07 7.96C9.84 7.42 9.61 7.5 9.44 7.49C9.28 7.48 9.09 7.42 9.05 7.42Z"/></svg>`,
    
    phone: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`
  };

  const DEFAULT_CONFIG = {
    telegramUsername: 'Thinkenergy1',
    viberNumber: '+380778888098',
    whatsappNumber: '380778888098',
    phoneNumber: '+380778888098',
    phoneFormatted: '+38 077 888 80 98',
    traderDesk: 'Черговий енерготрейдер',
    traderStatus: 'В мережі • відповідь за 3–5 хв',
    pillText: 'На зв\'язку черговий трейдер',
    topics: [
      'Ціна газу на місяць',
      'Тариф на електроенергію',
      'Графік оплати 33/33/34',
      'Терміновий перехід з ПОН'
    ],
    autoShowPillMs: 3500
  };

  class ThinkEnergyWidget {
    constructor(userConfig = {}) {
      this.cfg = Object.assign({}, DEFAULT_CONFIG, userConfig);
      this.isOpen = false;
      this.selectedTopic = this.cfg.topics[0];
      this.init();
    }

    init() {
      if (document.getElementById('teWidgetRoot')) return;
      this.render();
      this.bindEvents();
      this.schedulePill();
    }

    render() {
      const root = document.createElement('div');
      root.id = 'teWidgetRoot';
      root.className = 'te-widget-root';
      root.setAttribute('role', 'region');
      root.setAttribute('aria-label', 'Віджет вибору каналу зв\'язку Think Energy');

      root.innerHTML = `
        <!-- Floating Notification Pill -->
        <div class="te-widget-pill" id="tePill" role="button" aria-label="Відкрити чат з трейдером">
          <span class="te-pill-dot"></span>
          <span>${this.cfg.pillText}</span>
          <button type="button" class="te-pill-close" id="tePillClose" title="Приховати" aria-label="Приховати">&times;</button>
        </div>

        <!-- Floating Launcher (FAB) -->
        <button type="button" class="te-widget-fab" id="teFab" aria-expanded="false" aria-controls="tePanel" aria-label="Зв'язатися з черговим трейдером">
          <span class="te-fab-icon-chat">${ICONS.chat}</span>
          <span class="te-fab-icon-close">${ICONS.close}</span>
          <span class="te-fab-badge" id="teBadge" title="Нове повідомлення">1</span>
        </button>

        <!-- Popover Panel -->
        <div class="te-widget-panel" id="tePanel" role="dialog" aria-modal="true" aria-labelledby="teTraderTitle">
          
          <!-- Panel Header -->
          <div class="te-panel-header">
            <div class="te-header-top">
              <div class="te-trader-badge">
                <div class="te-trader-avatar">
                  ${ICONS.trader}
                  <span class="te-avatar-status"></span>
                </div>
                <div class="te-trader-meta">
                  <div class="te-trader-title" id="teTraderTitle">${this.cfg.traderDesk}</div>
                  <div class="te-trader-status">${this.cfg.traderStatus}</div>
                </div>
              </div>
              <button type="button" class="te-panel-close-btn" id="tePanelClose" aria-label="Закрити меню">&times;</button>
            </div>
            <div class="te-header-sub">
              Оберіть зручний месенджер для миттєвої консультації, розрахунку ціни або замовлення договору:
            </div>
          </div>

          <!-- Panel Body -->
          <div class="te-panel-body">
            
            <div class="te-channels-label">Оберіть канал зв'язку:</div>

            <div class="te-channels-list">
              
              <!-- 1. Telegram -->
              <a href="#" class="te-channel-item" data-channel="tg" id="teChanTg" target="_blank" rel="noopener">
                <div class="te-channel-left">
                  <div class="te-channel-icon-wrap te-icon-tg">
                    ${ICONS.tg}
                  </div>
                  <div class="te-channel-info">
                    <div class="te-channel-name">
                      Telegram
                      <span class="te-channel-tag te-tag-fast">Найшвидший</span>
                    </div>
                    <div class="te-channel-desc">Прямий чат із закріпленим трейдером</div>
                  </div>
                </div>
                <div class="te-channel-arrow">${ICONS.arrow}</div>
              </a>

              <!-- 2. Viber -->
              <a href="#" class="te-channel-item" data-channel="vb" id="teChanVb">
                <div class="te-channel-left">
                  <div class="te-channel-icon-wrap te-icon-vb">
                    ${ICONS.vb}
                  </div>
                  <div class="te-channel-info">
                    <div class="te-channel-name">
                      Viber
                      <span class="te-channel-tag te-tag-b2b">Зручно B2B</span>
                    </div>
                    <div class="te-channel-desc">Для бухгалтерів та обміну рахунками</div>
                  </div>
                </div>
                <div class="te-channel-arrow">${ICONS.arrow}</div>
              </a>

              <!-- 3. WhatsApp -->
              <a href="#" class="te-channel-item" data-channel="wa" id="teChanWa" target="_blank" rel="noopener">
                <div class="te-channel-left">
                  <div class="te-channel-icon-wrap te-icon-wa">
                    ${ICONS.wa}
                  </div>
                  <div class="te-channel-info">
                    <div class="te-channel-name">
                      WhatsApp
                    </div>
                    <div class="te-channel-desc">Миттєве листування та файли</div>
                  </div>
                </div>
                <div class="te-channel-arrow">${ICONS.arrow}</div>
              </a>

              <!-- 4. Телефонний дзвінок -->
              <a href="tel:${this.cfg.phoneNumber}" class="te-channel-item" data-channel="call" id="teChanCall">
                <div class="te-channel-left">
                  <div class="te-channel-icon-wrap te-icon-ph">
                    ${ICONS.phone}
                  </div>
                  <div class="te-channel-info">
                    <div class="te-channel-name">
                      ${this.cfg.phoneFormatted}
                      <span class="te-channel-tag te-tag-call">Пряма лінія</span>
                    </div>
                    <div class="te-channel-desc">Дзвінок до торгового залу Think Energy</div>
                  </div>
                </div>
                <div class="te-channel-arrow">${ICONS.arrow}</div>
              </a>

            </div>

            <!-- Quick Inquiry Box -->
            <div class="te-quick-box">
              <div class="te-quick-title">Тема вашого запиту:</div>
              <div class="te-topics-cloud" id="teTopicsCloud">
                ${this.cfg.topics.map((t, idx) => `
                  <button type="button" class="te-topic-chip ${idx === 0 ? 'is-selected' : ''}" data-topic="${t}">${t}</button>
                `).join('')}
              </div>

              <div class="te-input-wrap">
                <label for="teQuickInput" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;">Компанія, ЄДРПОУ або телефон</label>
                <input type="text" id="teQuickInput" class="te-quick-input" placeholder="Компанія / ЄДРПОУ або телефон..." aria-label="Компанія, ЄДРПОУ або телефон">
                <button type="button" class="te-quick-send-btn" id="teQuickSend" title="Надіслати в Telegram">
                  <span>Чат</span>
                  ${ICONS.send}
                </button>
              </div>
            </div>

          </div>

          <!-- Panel Footer -->
          <div class="te-panel-footer">
            <span>ТОВ «СІНК ЕНЕРДЖІ» • ЄДРПОУ 45111501</span>
            <a href="tel:${this.cfg.phoneNumber}" class="te-footer-phone">${this.cfg.phoneFormatted}</a>
          </div>

        </div>
      `;

      document.body.appendChild(root);
      this.updateChannelLinks();
    }

    bindEvents() {
      const fab = document.getElementById('teFab');
      const panelClose = document.getElementById('tePanelClose');
      const pill = document.getElementById('tePill');
      const pillClose = document.getElementById('tePillClose');
      const topics = document.querySelectorAll('.te-topic-chip');
      const quickSend = document.getElementById('teQuickSend');
      const quickInput = document.getElementById('teQuickInput');

      fab.addEventListener('click', () => this.toggle());
      panelClose.addEventListener('click', () => this.close());

      if (pill) {
        pill.addEventListener('click', (e) => {
          if (e.target.id === 'tePillClose') return;
          this.open();
        });
      }

      if (pillClose) {
        pillClose.addEventListener('click', (e) => {
          e.stopPropagation();
          pill.style.display = 'none';
        });
      }

      topics.forEach(chip => {
        chip.addEventListener('click', () => {
          topics.forEach(c => c.classList.remove('is-selected'));
          chip.classList.add('is-selected');
          this.selectedTopic = chip.getAttribute('data-topic');
          this.updateChannelLinks();
        });
      });

      if (quickInput) {
        quickInput.addEventListener('input', () => this.updateChannelLinks());
        quickInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            this.dispatchMessage('tg');
          }
        });
      }

      if (quickSend) {
        quickSend.addEventListener('click', () => this.dispatchMessage('tg'));
      }

      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });

      // Close on Outside Click
      document.addEventListener('click', (e) => {
        const root = document.getElementById('teWidgetRoot');
        if (this.isOpen && root && !root.contains(e.target)) {
          this.close();
        }
      });
    }

    buildMessage() {
      const input = document.getElementById('teQuickInput');
      const userText = input ? input.value.trim() : '';
      let msg = `Добрий день! Цікавить: ${this.selectedTopic}.`;
      if (userText) {
        msg += ` Контакт/Компанія: ${userText}.`;
      }
      return msg;
    }

    updateChannelLinks() {
      const msg = this.buildMessage();
      const encMsg = encodeURIComponent(msg);

      const tgLink = `https://t.me/${this.cfg.telegramUsername}?text=${encMsg}`;
      const waLink = `https://wa.me/${this.cfg.whatsappNumber}?text=${encMsg}`;
      const vbLink = `viber://chat?number=${encodeURIComponent(this.cfg.viberNumber)}`;

      const tgEl = document.getElementById('teChanTg');
      const waEl = document.getElementById('teChanWa');
      const vbEl = document.getElementById('teChanVb');

      if (tgEl) tgEl.href = tgLink;
      if (waEl) waEl.href = waLink;
      if (vbEl) vbEl.href = vbLink;
    }

    dispatchMessage(preferred = 'tg') {
      this.updateChannelLinks();
      const tgEl = document.getElementById('teChanTg');
      if (tgEl) {
        window.open(tgEl.href, '_blank', 'noopener,noreferrer');
      }
    }

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    open() {
      this.isOpen = true;
      const fab = document.getElementById('teFab');
      const panel = document.getElementById('tePanel');
      const pill = document.getElementById('tePill');
      const badge = document.getElementById('teBadge');

      if (fab) {
        fab.classList.add('is-active');
        fab.setAttribute('aria-expanded', 'true');
      }
      if (panel) {
        panel.classList.add('is-open');
      }
      if (pill) {
        pill.style.display = 'none';
      }
      if (badge) {
        badge.style.display = 'none';
      }
      this.updateChannelLinks();
    }

    close() {
      this.isOpen = false;
      const fab = document.getElementById('teFab');
      const panel = document.getElementById('tePanel');

      if (fab) {
        fab.classList.remove('is-active');
        fab.setAttribute('aria-expanded', 'false');
      }
      if (panel) {
        panel.classList.remove('is-open');
      }
    }

    schedulePill() {
      if (this.cfg.autoShowPillMs > 0) {
        setTimeout(() => {
          const pill = document.getElementById('tePill');
          if (pill && !this.isOpen) {
            pill.style.display = 'flex';
          }
        }, this.cfg.autoShowPillMs);
      }
    }
  }

  // Auto-mount on DOM Ready
  function autoInit() {
    if (!window.ThinkEnergyWidgetInstance) {
      window.ThinkEnergyWidgetInstance = new ThinkEnergyWidget();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  window.ThinkEnergyWidget = ThinkEnergyWidget;
})(window, document);
