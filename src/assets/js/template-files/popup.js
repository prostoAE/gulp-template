import { bodyLockToggle } from './functions.js';

class Popup {
    constructor(popupSelector, config = {}) {
        this.selector = popupSelector;
        this.element = document.querySelector(this.selector);
        this.config = Popup._getConfig(config);
        this.isShown = false;
        this.eventHandler();
    }

    toggle() {
        return this.isShown ? this.hide() : this.show();
    }

    show() {
        if (this.isShown) {
            return;
        }

        this._beforePopupOpen();

        this.element.classList.add('show');
        this.isShown = true;
        bodyLockToggle();
    }

    hide() {
        if (!this.isShown) {
            return;
        }

        this._beforePopupClose();

        this.element.classList.remove('show');
        this.isShown = false;
        bodyLockToggle();
    }

    static _getConfig(config) {
        config = {
            ...(typeof config === 'object' ? config : {}),
        };
        return config;
    }

    _beforePopupOpen() {
        if (!this.config.beforeOpen) return;

        this.config.beforeOpen();
    }

    _beforePopupClose() {
        if (!this.config.beforeClose) return;

        this.config.beforeClose();
    }

    eventHandler() {
        document.addEventListener(
            'click',
            function (event) {
                if (
                    event.target.dataset.pwcToggle &&
                    event.target.dataset.pwcTarget == this.selector
                ) {
                    this.toggle();
                }

                if (
                    event.target.dataset.pwcDismiss &&
                    event.target.dataset.pwcDismiss === 'modal'
                ) {
                    this.hide();
                }
            }.bind(this)
        );

        document.addEventListener(
            'keydown',
            function (e) {
                if (e.code && e.code === 'Escape') {
                    this.hide();
                }
            }.bind(this)
        );
    }

    static docs() {
        // Config info
        console.groupCollapsed('Config example');
        console.info(Popup._showConfigInfo());
        console.groupEnd();

        // HTML layout info
        console.groupCollapsed('HTML example');
        console.info(Popup._showHtmlInfo());
        console.groupEnd();
    }

    static _showConfigInfo() {
        const methods = `
        let config = {
            beforeOpen: function () {
                BEFORE MODAL OPEN
            },
            beforeClose: function () {
                BEFORE MODAL CLOSE
            },
        }
        `;

        return methods;
    }

    static _showHtmlInfo() {
        const html = `
        <button
            type="button"
            data-pwc-toggle="modal"
            data-pwc-target="#{MODAL_ID_HERE}"
        >
            Launch demo modal1
        </button>

        <div class="modal" id="{MODAL_ID}">
            <div class="modal__dialog">
                <div class="modal__content">
                    <div class="modal__header">
                        <h5 class="modal__title">
                            Modal title1
                        </h5>
                        <button
                            type="button"
                            class="modal__btn-close"
                            data-pwc-dismiss="modal"
                        >
                            X
                        </button>
                    </div>
                    <div class="modal__body">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Corporis exercitationem fugit hic illo iure
                            pariatur perferendis quis sed? Beatae corporis
                            dignissimos, distinctio exercitationem id ipsa
                            laborum nobis odit officiis quaerat quis quisquam,
                            recusandae, voluptate? Officiis!1
                        </p>
                    </div>
                    <div class="modal__footer">
                        <button type="button" data-pwc-dismiss="modal">
                            Close
                        </button>
                        <button type="button">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        return html;
    }
}

export default Popup;
