export default class Button {
    constructor({ selector, label, labelOnStateChange = null, hidden = false }) {
        this.refs = this.getRefs(selector, label);
        this.label = label;
        this.labelOnStateChange = labelOnStateChange;

        hidden && this.hide();
    };

    getRefs(selector, label) {
        const refs = {};
        refs.button = document.querySelector(selector);
        refs.label = refs.button.querySelector('.label');
        // refs.label.textContent = label;
        return refs;
    };

    enable() {
        this.refs.button.disabled = false;
        this.refs.label.textContent = this.label;
    };

    disable() {
        this.refs.button.disabled = true;
        this.refs.label.textContent = this.labelOnStateChange;
    };

    show() {
        this.refs.button.classList.remove('is-hidden');
    };

    hide() {
        this.refs.button.classList.add('is-hidden')
    };


};