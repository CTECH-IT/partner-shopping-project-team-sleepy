(function (window) {
    'use strict';
    let App = window.App || {};
    let $ = window.jQuery;
    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        if (this.$element.length ===0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    CheckList.prototype.addRow = function (shoppingOrder) {
        this.removeRow(shoppingOrder.emailAddress);
        var rowElement = new Row(shoppingOrder);
        this.$element.append(rowElement.$element);
    }

    CheckList.prototype.removeRow = function (email) {
        this.$element
            .find('[value="' + email + '"]')
            .closest('[data-shopping-order="checkbox"]')
            .remove();
    };

    CheckList.prototype.addClickHandler = function (func) {
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            this.removeRow(email);
            func(email);
        }.bind(this));
    };

    function Row(shoppingOrder) {
        let $div = $('<div></div>', {
            'data-shopping-order': 'checkbox', 'class': 'checkbox'
        });
        let $label = $('<label></label>');

        let $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: shoppingOrder.emailAddress
        });

        let description = shoppingOrder.shopping + ', ';
        if (shoppingOrder.flavor) {
            description += shoppingOrder.flavor + ' ';
        }
        description += shoppingOrder.shopping + ', ';
        description += ' (' + shoppingOrder.emailAddress + ')';
        description += ' [' + shoppingOrder.orderedItems + 'x]';

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }
    App.CheckList = CheckList;
    window.App = App;
})(window);