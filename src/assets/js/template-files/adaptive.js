class Adaptive {
    constructor() {
        this.items = document.querySelectorAll('[data-pwc-ae]');
        this.createElementsInstance(this.items);
    }

    createElementsInstance(elements) {
        elements.forEach((element) => {
            new AdaptiveElement(element);
        });
    }

    static docs() {
        console.groupCollapsed('HTML example');
        console.info(Adaptive._showHtmlInfo());
        console.groupEnd();

        console.groupCollapsed('Attributes description');
        console.info(Adaptive._showAttributeOptions());
        console.groupEnd();
    }

    static _showHtmlInfo() {
        const html = `
        <p data-pwc-ae=".move-destination|850|0" class="element">Element<p>
        <div class="move-destination">
            <span>Container</span>
        </div>
        `;

        return html;
    }

    static _showAttributeOptions() {
        const info = `
        You need to use data-attribute {data-pwc-ae} in the floating element.
        Example: data-pwc-ae=".move-destination|850|0"
        Values are separated by a vertical line
        value 1 = element selector where to move
        value 2 = resolution
        value 3 position (by default, the element is inserted after the other elements. If you need to insert before elements that are already in the container - you need to specify a negative index like -1)
        `;

        return info;
    }
}

class AdaptiveElement {
    constructor($element) {
        this.element = $element;
        this.targetElement = null;
        this.resolution = null;
        this.index = null;
        this.cloneElement = null;

        this._parseData(this.element);
        this.checkMatchScreenResolution();

        this.eventHandler();
    }

    _parseData() {
        let data = this.element.dataset.pwcAe.split('|');
        let [selector, res, index] = data;

        this.targetElement = document.querySelector(selector);
        this.resolution = res;
        this.index = index ? index : null;
    }

    checkMatchScreenResolution() {
        if (window.innerWidth <= this.resolution) {
            this.moveElement();
        }
    }

    moveElement() {
        this.removeElement();
        this.appendElement();
    }

    removeElement() {
        let clone = this.element;
        this.element.remove();
        this.cloneElement = clone;
    }

    appendElement() {
        this.targetElement.append(this.cloneElement);
        this.sortElements();
    }

    sortElements() {
        let childrens = [...this.targetElement.children];
        this.targetElement.innerHtml = '';

        childrens.sort((a, b) => {
            let a_data = null;
            let b_data = null;

            if (a.hasAttribute('data-pwc-ae')) {
                a_data = a.dataset.pwcAe.split('|');
                a_data = a_data.length >= 3 ? a_data[2] : null;
            }
            if (b.hasAttribute('data-pwc-ae')) {
                b_data = b.dataset.pwcAe.split('|');
                b_data = b_data.length >= 3 ? b_data[2] : null;
            }

            if (a_data < b_data) {
                return -1;
            }

            if (a_data > b_data) {
                return 1;
            }

            return 0;
        });

        childrens.forEach((el) => {
            this.targetElement.appendChild(el);
        });
    }

    eventHandler() {
        window.addEventListener('resize', (event) => {
            this.checkMatchScreenResolution();
        });
    }
}

export default Adaptive;
