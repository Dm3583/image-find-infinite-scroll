import PNotify from '../../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../../node_modules/pnotify/dist/es/PNotifyButtons.js';

PNotify.defaults.delay = 4000;
PNotify.defaults.shadow = true;

export default {

    notification(type, message) {
        return PNotify[type](message);
    },
    // types: [success, info, error, alert]
    close: function () {
        const notification = document.querySelectorAll('.ui-pnotify');
        if (notification) {
            notification.forEach(e => e.parentNode.removeChild(e));
        };
    },

};