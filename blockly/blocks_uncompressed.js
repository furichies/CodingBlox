'use strict';

Blockly.Blocks.control = {};
Blockly.Blocks.control.HUE = 120;
Blockly.Blocks.control_arduino_loop = {
    helpUrl: "https://www.arduino.cc/en/Reference/Loop",
    init: function() {
        this.setColour(Blockly.Blocks.control.HUE);
        this.setPreviousStatement(!1);
        this.setNextStatement(!1);
        this.setDeletable(!1);
        this.setEditable(!1);
        this.setTooltip(Blockly.Msg.CONTROL_ARDUINO_LOOP);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROL_ARDUINO_LOOP);
        this.appendStatementInput("DO").appendField("")
    }
};
Blockly.Blocks.control_group = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.control.HUE);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setDeletable(!0);
        this.setEditable(!0);
        this.setTooltip(Blockly.Msg.CONTROL_GROUP);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROL_GROUP);
        this.appendStatementInput("DO").appendField("")
    }
};
Blockly.Blocks.control_arduino_setup = {
    helpUrl: "https://www.arduino.cc/en/Reference/Setup",
    init: function() {
        this.setColour(Blockly.Blocks.control.HUE);
        this.setPreviousStatement(!1);
        this.setNextStatement(!1);
        this.setDeletable(!1);
        this.setEditable(!1);
        this.setTooltip(Blockly.Msg.CONTROL_ARDUINO_SETUP);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROL_ARDUINO_SETUP);
        this.appendStatementInput("DO").appendField("")
    }
};
Blockly.Blocks.controls_repeat_ext = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.CONTROLS_REPEAT_TITLE,
            args0: [{
                type: "input_value",
                name: "TIMES",
                check: "Number"
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.control.HUE,
            tooltip: Blockly.Msg.CONTROLS_REPEAT_TOOLTIP,
            helpUrl: Blockly.Msg.CONTROLS_REPEAT_HELPURL
        });
        this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO)
    }
};
Blockly.Blocks.controls_repeat = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.CONTROLS_REPEAT_TITLE,
            args0: [{
                type: "field_input",
                name: "TIMES",
                text: "10"
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.control.HUE,
            tooltip: Blockly.Msg.CONTROLS_REPEAT_TOOLTIP,
            helpUrl: Blockly.Msg.CONTROLS_REPEAT_HELPURL
        });
        this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.getField("TIMES").setChangeHandler(Blockly.FieldTextInput.nonnegativeIntegerValidator)
    }
};
Blockly.Blocks.controls_whileUntil = {
    init: function() {
        var a = [
            [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE, "WHILE"],
            [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, "UNTIL"]
        ];
        this.setHelpUrl(Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL);
        this.setColour(Blockly.Blocks.control.HUE);
        this.appendValueInput("BOOL").setCheck("Boolean").appendField(new Blockly.FieldDropdown(a), "MODE");
        this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        var b = this;
        this.setTooltip(function() {
            var a = b.getFieldValue("MODE");
            return {
                WHILE: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
                UNTIL: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
            }[a]
        })
    }
};
Blockly.Blocks.controls_for = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.CONTROLS_FOR_TITLE,
            args0: [{
                type: "field_variable",
                name: "VAR",
                variable: null
            }, {
                type: "input_value",
                name: "FROM",
                check: "Number",
                align: "RIGHT"
            }, {
                type: "input_value",
                name: "TO",
                check: "Number",
                align: "RIGHT"
            }, {
                type: "input_value",
                name: "BY",
                check: "Number",
                align: "RIGHT"
            }],
            inputsInline: !0,
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.control.HUE,
            helpUrl: Blockly.Msg.CONTROLS_FOR_HELPURL
        });
        this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_FOR_INPUT_DO);
        var a = this;
        this.setTooltip(function() {
            return Blockly.Msg.CONTROLS_FOR_TOOLTIP.replace("%1", a.getFieldValue("VAR"))
        })
    },
    getVars: function() {
        return [this.getFieldValue("VAR")]
    },
    renameVar: function(a, b) {
        Blockly.Names.equals(a, this.getFieldValue("VAR")) && this.setFieldValue(b, "VAR")
    },
    customContextMenu: function(a) {
        if (!this.isCollapsed()) {
            var b = {
                    enabled: !0
                },
                c = this.getFieldValue("VAR");
            b.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1", c);
            c = goog.dom.createDom("field", null, c);
            c.setAttribute("name", "VAR");
            c = goog.dom.createDom("block", null, c);
            c.setAttribute("type", "variables_get");
            b.callback = Blockly.ContextMenu.callbackFactory(this, c);
            a.push(b)
        }
    }
};
Blockly.Blocks.control_wait_whileUntil = {
    init: function() {
        var a = [
            [Blockly.Msg.TIME_WAIT_UNTIL, "UNTIL"],
            [Blockly.Msg.TIME_WAIT_WHILE, "WHILE"]
        ];
        this.setColour(Blockly.Blocks.control.HUE);
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField(new Blockly.FieldDropdown(a), "MODE");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0)
    }
};
Blockly.Blocks.lists = {};
Blockly.Blocks.lists.HUE = 330;
Blockly.Blocks.lists.HUE2 = 75;
Blockly.Blocks.lists_create_with = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldVariableList(Blockly.Msg.LISTS_LISTNAME), "VAR");
        this.itemCount_ = 3;
        this.updateShape_();
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setMutator(new Blockly.Mutator(["lists_create_with_item"]));
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP)
    },
    getVarsList: function() {
        return [this.getFieldValue("VAR")]
    },
    renameVarList: function(a, b) {
        Blockly.Names.equals(a,
            this.getFieldValue("VAR")) && this.setFieldValue(b, "VAR")
    },
    mutationToDom: function() {
        var a = document.createElement("mutation");
        a.setAttribute("items", this.itemCount_);
        return a
    },
    domToMutation: function(a) {
        this.itemCount_ = parseInt(a.getAttribute("items"), 10);
        this.updateShape_()
    },
    decompose: function(a) {
        var b = Blockly.Block.obtain(a, "lists_create_with_container");
        b.initSvg();
        for (var c = b.getInput("STACK").connection, d = 0; d < this.itemCount_; d++) {
            var e = Blockly.Block.obtain(a, "lists_create_with_item");
            e.initSvg();
            c.connect(e.previousConnection);
            c = e.nextConnection
        }
        return b
    },
    compose: function(a) {
        a = a.getInputTargetBlock("STACK");
        for (var b = [], c = 0; a;) b[c] = a.valueConnection_, a = a.nextConnection && a.nextConnection.targetBlock(), c++;
        this.itemCount_ = c;
        this.updateShape_();
        for (c = 0; c < this.itemCount_; c++) b[c] && this.getInput("ADD" + c).connection.connect(b[c])
    },
    saveConnections: function(a) {
        a = a.getInputTargetBlock("STACK");
        for (var b = 0; a;) {
            var c = this.getInput("ADD" + b);
            a.valueConnection_ = c && c.connection.targetConnection;
            b++;
            a = a.nextConnection &&
                a.nextConnection.targetBlock()
        }
    },
    updateShape_: function() {
        if (this.getInput("EMPTY")) this.removeInput("EMPTY");
        else
            for (var a = 0; this.getInput("ADD" + a);) this.removeInput("ADD" + a), a++;
        if (0 == this.itemCount_) this.appendDummyInput("EMPTY").appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
        else
            for (a = 0; a < this.itemCount_; a++) {
                var b = this.appendValueInput("ADD" + a).setCheck("Number");
                0 == a && b.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH)
            }
    }
};
Blockly.Blocks.lists_create_with_container = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput("STACK");
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.lists_create_with_item = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.lists_getIndex = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE);
        this.setOutput(!0, "Number");
        this.appendValueInput("AT").setCheck("Number").appendField(new Blockly.FieldVariableList(Blockly.Msg.LISTS_LISTNAME), "VAR").appendField(Blockly.Msg.LISTS_GET_INDEX_GET);
        this.setInputsInline(!0)
    }
};
Blockly.Blocks.lists_setIndex = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput("AT").setCheck("Number").appendField(new Blockly.FieldVariableList(Blockly.Msg.LISTS_LISTNAME), "VAR").appendField(Blockly.Msg.LISTS_SET_INDEX_SET);
        this.appendValueInput("TO").setCheck("Number").appendField("=");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0)
    }
};
Blockly.Blocks.lists_length = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.LISTS_LENGTH_TITLE).appendField(new Blockly.FieldVariableList(Blockly.Msg.LISTS_LISTNAME), "VAR");
        this.setTooltip(Blockly.Msg.LISTS_LENGTH_TOOLTIP);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.lists_create_with_text = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE2);
        this.appendDummyInput("").appendField(new Blockly.FieldVariableListText(Blockly.Msg.LISTS_LISTNAME_TEXT), "VAR");
        this.itemCount_ = 3;
        this.updateShape_();
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setMutator(new Blockly.Mutator(["lists_create_with_item_text"]));
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP)
    },
    getVarsListText: function() {
        return [this.getFieldValue("VAR")]
    },
    renameVarListText: function(a,
        b) {
        Blockly.Names.equals(a, this.getFieldValue("VAR")) && this.setFieldValue(b, "VAR")
    },
    mutationToDom: function() {
        var a = document.createElement("mutation");
        a.setAttribute("items", this.itemCount_);
        return a
    },
    domToMutation: function(a) {
        this.itemCount_ = parseInt(a.getAttribute("items"), 10);
        this.updateShape_()
    },
    decompose: function(a) {
        var b = Blockly.Block.obtain(a, "lists_create_with_container_text");
        b.initSvg();
        for (var c = b.getInput("STACK").connection, d = 0; d < this.itemCount_; d++) {
            var e = Blockly.Block.obtain(a, "lists_create_with_item_text");
            e.initSvg();
            c.connect(e.previousConnection);
            c = e.nextConnection
        }
        return b
    },
    compose: function(a) {
        a = a.getInputTargetBlock("STACK");
        for (var b = [], c = 0; a;) b[c] = a.valueConnection_, a = a.nextConnection && a.nextConnection.targetBlock(), c++;
        this.itemCount_ = c;
        this.updateShape_();
        for (c = 0; c < this.itemCount_; c++) b[c] && this.getInput("ADD" + c).connection.connect(b[c])
    },
    saveConnections: function(a) {
        a = a.getInputTargetBlock("STACK");
        for (var b = 0; a;) {
            var c = this.getInput("ADD" + b);
            a.valueConnection_ = c && c.connection.targetConnection;
            b++;
            a = a.nextConnection && a.nextConnection.targetBlock()
        }
    },
    updateShape_: function() {
        if (this.getInput("EMPTY")) this.removeInput("EMPTY");
        else
            for (var a = 0; this.getInput("ADD" + a);) this.removeInput("ADD" + a), a++;
        if (0 == this.itemCount_) this.appendDummyInput("EMPTY").appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
        else
            for (a = 0; a < this.itemCount_; a++) {
                var b = this.appendValueInput("ADD" + a).setCheck("String");
                0 == a && b.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH_TEXT)
            }
    }
};
Blockly.Blocks.lists_create_with_container_text = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE2);
        this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput("STACK");
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.lists_create_with_item_text = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE2);
        this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.lists_getIndex_text = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE2);
        this.setOutput(!0, "String");
        this.appendValueInput("AT").setCheck("Number").appendField(new Blockly.FieldVariableListText(Blockly.Msg.LISTS_LISTNAME_TEXT), "VAR").appendField(Blockly.Msg.LISTS_GET_INDEX_GET);
        this.setInputsInline(!0)
    }
};
Blockly.Blocks.lists_setIndex_text = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE2);
        this.appendValueInput("AT").setCheck("Number").appendField(new Blockly.FieldVariableListText(Blockly.Msg.LISTS_LISTNAME_TEXT), "VAR").appendField(Blockly.Msg.LISTS_SET_INDEX_SET);
        this.appendValueInput("TO").setCheck("String").appendField("=");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0)
    }
};
Blockly.Blocks.lists_length_text = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE2);
        this.appendDummyInput("").appendField(Blockly.Msg.LISTS_LENGTH_TITLE).appendField(new Blockly.FieldVariableListText(Blockly.Msg.LISTS_LISTNAME_TEXT), "VAR");
        this.setTooltip(Blockly.Msg.LISTS_LENGTH_TOOLTIP);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.logic = {};
Blockly.Blocks.logic.HUE = 210;
Blockly.Blocks.controls_if = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendValueInput("IF0").setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("DO0").appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setMutator(new Blockly.Mutator(["controls_if_elseif", "controls_if_else"]));
        var a = this;
        this.setTooltip(function() {
            if (a.elseifCount_ || a.elseCount_) {
                if (!a.elseifCount_ &&
                    a.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
                if (a.elseifCount_ && !a.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
                if (a.elseifCount_ && a.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_4
            } else return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
            return ""
        });
        this.elseCount_ = this.elseifCount_ = 0
    },
    mutationToDom: function() {
        if (!this.elseifCount_ && !this.elseCount_) return null;
        var a = document.createElement("mutation");
        this.elseifCount_ && a.setAttribute("elseif", this.elseifCount_);
        this.elseCount_ && a.setAttribute("else",
            1);
        return a
    },
    domToMutation: function(a) {
        this.elseifCount_ = parseInt(a.getAttribute("elseif"), 10) || 0;
        this.elseCount_ = parseInt(a.getAttribute("else"), 10) || 0;
        for (a = 1; a <= this.elseifCount_; a++) this.appendValueInput("IF" + a).setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF), this.appendStatementInput("DO" + a).appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.elseCount_ && this.appendStatementInput("ELSE").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE)
    },
    decompose: function(a) {
        var b = a.newBlock("controls_if_if");
        b.initSvg();
        for (var c = b.nextConnection, d = 1; d <= this.elseifCount_; d++) {
            var e = a.newBlock("controls_if_elseif");
            e.initSvg();
            c.connect(e.previousConnection);
            c = e.nextConnection
        }
        this.elseCount_ && (a = a.newBlock("controls_if_else"), a.initSvg(), c.connect(a.previousConnection));
        return b
    },
    compose: function(a) {
        this.elseCount_ && this.removeInput("ELSE");
        this.elseCount_ = 0;
        for (var b = this.elseifCount_; 0 < b; b--) this.removeInput("IF" + b), this.removeInput("DO" + b);
        this.elseifCount_ = 0;
        for (a = a.nextConnection.targetBlock(); a;) {
            switch (a.type) {
                case "controls_if_elseif":
                    this.elseifCount_++;
                    b = this.appendValueInput("IF" + this.elseifCount_).setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
                    var c = this.appendStatementInput("DO" + this.elseifCount_);
                    c.appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
                    a.valueConnection_ && b.connection.connect(a.valueConnection_);
                    a.statementConnection_ && c.connection.connect(a.statementConnection_);
                    break;
                case "controls_if_else":
                    this.elseCount_++;
                    b = this.appendStatementInput("ELSE");
                    b.appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
                    a.statementConnection_ &&
                        b.connection.connect(a.statementConnection_);
                    break;
                default:
                    throw "Unknown block type.";
            }
            a = a.nextConnection && a.nextConnection.targetBlock()
        }
    },
    saveConnections: function(a) {
        a = a.nextConnection.targetBlock();
        for (var b = 1; a;) {
            switch (a.type) {
                case "controls_if_elseif":
                    var c = this.getInput("IF" + b),
                        d = this.getInput("DO" + b);
                    a.valueConnection_ = c && c.connection.targetConnection;
                    a.statementConnection_ = d && d.connection.targetConnection;
                    b++;
                    break;
                case "controls_if_else":
                    d = this.getInput("ELSE");
                    a.statementConnection_ = d &&
                        d.connection.targetConnection;
                    break;
                default:
                    throw "Unknown block type.";
            }
            a = a.nextConnection && a.nextConnection.targetBlock()
        }
    }
};
Blockly.Blocks.controls_if_if = {
    init: function() {
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.controls_if_elseif = {
    init: function() {
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.controls_if_else = {
    init: function() {
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE);
        this.setPreviousStatement(!0);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.logic_compare = {
    init: function() {
        var a = this.RTL ? [
            ["=", "EQ"],
            ["\u2260", "NEQ"],
            [">", "LT"],
            ["\u2265", "LTE"],
            ["<", "GT"],
            ["\u2264", "GTE"]
        ] : [
            ["=", "EQ"],
            ["\u2260", "NEQ"],
            ["<", "LT"],
            ["\u2264", "LTE"],
            [">", "GT"],
            ["\u2265", "GTE"]
        ];
        this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);
        this.setColour(Blockly.Blocks.logic.HUE + 15);
        this.setOutput(!0, "Boolean");
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField(new Blockly.FieldDropdown(a), "OP");
        this.setInputsInline(!0);
        var b = this;
        this.setTooltip(function() {
            var a = b.getFieldValue("OP");
            return {
                EQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,
                NEQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ,
                LT: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,
                LTE: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LTE,
                GT: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
                GTE: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GTE
            }[a]
        });
        this.prevBlocks_ = [null, null]
    },
    onchange: function() {
        var a = this.getInputTargetBlock("A"),
            b = this.getInputTargetBlock("B");
        if (a && b && !a.outputConnection.checkType_(b.outputConnection))
            for (var c =
                    0; c < this.prevBlocks_.length; c++) {
                var d = this.prevBlocks_[c];
                if (d === a || d === b) d.setParent(null), d.bumpNeighbours_()
            }
        this.prevBlocks_[0] = a;
        this.prevBlocks_[1] = b
    }
};
Blockly.Blocks.logic_compare_bool = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);
        this.setColour(Blockly.Blocks.logic.HUE);
        this.setOutput(!0, "Boolean");
        this.appendValueInput("A").setCheck("Boolean");
        this.appendValueInput("B").setCheck("Boolean").appendField(new Blockly.FieldDropdown([
            ["=", "EQ"],
            ["\u2260", "NEQ"]
        ]), "OP");
        this.setInputsInline(!0);
        var a = this;
        this.setTooltip(function() {
            var b = a.getFieldValue("OP");
            return {
                EQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,
                NEQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ
            }[b]
        });
        this.prevBlocks_ = [null, null]
    },
    onchange: function() {
        var a = this.getInputTargetBlock("A"),
            b = this.getInputTargetBlock("B");
        if (a && b && !a.outputConnection.checkType_(b.outputConnection))
            for (var c = 0; c < this.prevBlocks_.length; c++) {
                var d = this.prevBlocks_[c];
                if (d === a || d === b) d.setParent(null), d.bumpNeighbours_()
            }
        this.prevBlocks_[0] = a;
        this.prevBlocks_[1] = b
    }
};
Blockly.Blocks.logic_operation = {
    init: function() {
        var a = [
            [Blockly.Msg.LOGIC_OPERATION_AND, "AND"],
            [Blockly.Msg.LOGIC_OPERATION_OR, "OR"]
        ];
        this.setHelpUrl(Blockly.Msg.LOGIC_OPERATION_HELPURL);
        this.setColour(Blockly.Blocks.logic.HUE);
        this.setOutput(!0, "Boolean");
        this.appendValueInput("A").setCheck("Boolean");
        this.appendValueInput("B").setCheck("Boolean").appendField(new Blockly.FieldDropdown(a), "OP");
        this.setInputsInline(!0);
        var b = this;
        this.setTooltip(function() {
            var a = b.getFieldValue("OP");
            return {
                AND: Blockly.Msg.LOGIC_OPERATION_TOOLTIP_AND,
                OR: Blockly.Msg.LOGIC_OPERATION_TOOLTIP_OR
            }[a]
        })
    }
};
Blockly.Blocks.logic_negate = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.LOGIC_NEGATE_TITLE,
            args0: [{
                type: "input_value",
                name: "BOOL",
                check: "Boolean"
            }],
            output: "Boolean",
            colour: Blockly.Blocks.logic.HUE,
            tooltip: Blockly.Msg.LOGIC_NEGATE_TOOLTIP,
            helpUrl: Blockly.Msg.LOGIC_NEGATE_HELPURL
        })
    }
};
Blockly.Blocks.logic_boolean = {
    init: function() {
        this.jsonInit({
            message0: "%1",
            args0: [{
                type: "field_dropdown",
                name: "BOOL",
                options: [
                    [Blockly.Msg.LOGIC_BOOLEAN_TRUE, "TRUE"],
                    [Blockly.Msg.LOGIC_BOOLEAN_FALSE, "FALSE"]
                ]
            }],
            output: "Boolean",
            colour: Blockly.Blocks.logic.HUE,
            tooltip: Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP,
            helpUrl: Blockly.Msg.LOGIC_BOOLEAN_HELPURL
        })
    }
};
Blockly.Blocks.logic_boolean2 = {
    init: function() {
        this.jsonInit({
            message0: "%1",
            args0: [{
                type: "field_dropdown",
                name: "BOOL",
                options: [
                    [Blockly.Msg.IO_BOOLEAN_ON, "TRUE"],
                    [Blockly.Msg.IO_BOOLEAN_OFF, "FALSE"]
                ]
            }],
            output: "Boolean",
            colour: Blockly.Blocks.logic.HUE,
            tooltip: Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP,
            helpUrl: Blockly.Msg.LOGIC_BOOLEAN_HELPURL
        })
    }
};
Blockly.Blocks.math = {};
Blockly.Blocks.math.HUE = 240;
Blockly.Blocks.math_angle = {
    init: function() {
        this.setColour(Blockly.Blocks.math.HUE);
        this.setHelpUrl("https://developers.google.com/blockly/custom-blocks/defining-blocks#appendfield");
        this.appendDummyInput("").appendField(Blockly.Msg.MATH_ANGLE).appendField(new Blockly.FieldAngle("90"), "ANGLE");
        this.setOutput(!0, "Number");
        this.setTooltip(Blockly.Msg.MATH_ANGLE)
    }
};
Blockly.Blocks.math_number = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
        this.setColour(Blockly.Blocks.math.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "NUM");
        this.setOutput(!0, "Number");
        this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP)
    }
};
Blockly.Blocks.math_to_int = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
        this.setColour(Blockly.Blocks.math.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.MATH_TO_INT);
        this.appendValueInput("NUM").setCheck("Number");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number");
        this.setTooltip(Blockly.Msg.MATH_TO_INT)
    }
};
Blockly.Blocks.math_to_uint = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
        this.setColour(Blockly.Blocks.math.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.MATH_TO_UINT);
        this.appendValueInput("NUM").setCheck("Number");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number");
        this.setTooltip(Blockly.Msg.MATH_TO_UINT)
    }
};
Blockly.Blocks.math_atan2 = {
    init: function() {
        this.setColour(Blockly.Blocks.math.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.MATH_TRIG_ATAN2);
        this.appendValueInput("NUM1").setCheck("Number");
        this.appendValueInput("NUM2").setCheck("Number");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number");
        this.setTooltip(Blockly.Msg.MATH_TRIG_TOOLTIP_ATAN2)
    }
};
Blockly.Blocks.math_arithmetic = {
    init: function() {
        var a = [
            [Blockly.Msg.MATH_ADDITION_SYMBOL, "ADD"],
            [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, "MINUS"],
            [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, "MULTIPLY"],
            [Blockly.Msg.MATH_DIVISION_SYMBOL, "DIVIDE"],
            [Blockly.Msg.MATH_POWER_SYMBOL, "POWER"]
        ];
        this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
        this.setColour(Blockly.Blocks.math.HUE);
        this.setOutput(!0, "Number");
        this.appendValueInput("A").setCheck("Number");
        this.appendValueInput("B").setCheck("Number").appendField(new Blockly.FieldDropdown(a),
            "OP");
        this.setInputsInline(!0);
        var b = this;
        this.setTooltip(function() {
            var a = b.getFieldValue("OP");
            return {
                ADD: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
                MINUS: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
                MULTIPLY: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
                DIVIDE: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
                POWER: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
            }[a]
        })
    }
};
Blockly.Blocks.math_single = {
    init: function() {
        var a = [
            [Blockly.Msg.MATH_SINGLE_OP_ROOT, "ROOT"],
            [Blockly.Msg.MATH_SINGLE_OP_ABSOLUTE, "ABS"],
            ["-", "NEG"],
            ["log(e)", "LOG"],
            ["log(10)", "LOG10"],
            [Blockly.Msg.MATH_ROUND_OPERATOR_ROUND, "ROUND"],
            [Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDUP, "ROUNDUP"],
            [Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDDOWN, "ROUNDDOWN"],
            [Blockly.Msg.MATH_TRIG_SIN, "SIN"],
            [Blockly.Msg.MATH_TRIG_COS, "COS"],
            [Blockly.Msg.MATH_TRIG_TAN, "TAN"],
            [Blockly.Msg.MATH_TRIG_ASIN, "ASIN"],
            [Blockly.Msg.MATH_TRIG_ACOS,
                "ACOS"
            ],
            [Blockly.Msg.MATH_TRIG_ATAN, "ATAN"]
        ];
        this.setHelpUrl(Blockly.Msg.MATH_SINGLE_HELPURL);
        this.setColour(Blockly.Blocks.math.HUE);
        this.setOutput(!0, "Number");
        this.appendValueInput("NUM").setCheck("Number").appendField(new Blockly.FieldDropdown(a), "OP");
        var b = this;
        this.setTooltip(function() {
            var a = b.getFieldValue("OP");
            return {
                ROOT: Blockly.Msg.MATH_SINGLE_TOOLTIP_ROOT,
                ABS: Blockly.Msg.MATH_SINGLE_TOOLTIP_ABS,
                NEG: Blockly.Msg.MATH_SINGLE_TOOLTIP_NEG,
                LOG: Blockly.Msg.MATH_SINGLE_TOOLTIP_LN,
                LOG10: Blockly.Msg.MATH_SINGLE_TOOLTIP_LOG10,
                SIN: Blockly.Msg.MATH_TRIG_TOOLTIP_SIN,
                COS: Blockly.Msg.MATH_TRIG_TOOLTIP_COS,
                TAN: Blockly.Msg.MATH_TRIG_TOOLTIP_TAN,
                ASIN: Blockly.Msg.MATH_TRIG_TOOLTIP_ASIN,
                ACOS: Blockly.Msg.MATH_TRIG_TOOLTIP_COS,
                ATAN: Blockly.Msg.MATH_TRIG_TOOLTIP_ATAN
            }[a]
        })
    }
};
Blockly.Blocks.math_change = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.MATH_CHANGE_TITLE,
            args0: [{
                type: "field_variable",
                name: "VAR",
                variable: Blockly.Msg.MATH_CHANGE_TITLE_ITEM
            }, {
                type: "input_value",
                name: "DELTA",
                check: "Number"
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.math.HUE,
            helpUrl: Blockly.Msg.MATH_CHANGE_HELPURL
        });
        var a = this;
        this.setTooltip(function() {
            return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace("%1", a.getFieldValue("VAR"))
        })
    },
    getVars: function() {
        return [this.getFieldValue("VAR")]
    },
    renameVar: function(a, b) {
        Blockly.Names.equals(a, this.getFieldValue("VAR")) && this.setFieldValue(b, "VAR")
    }
};
Blockly.Blocks.math_random_int = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.MATH_RANDOM_INT_TITLE,
            args0: [{
                type: "input_value",
                name: "FROM",
                check: "Number"
            }, {
                type: "input_value",
                name: "TO",
                check: "Number"
            }],
            inputsInline: !0,
            output: "Number",
            colour: Blockly.Blocks.math.HUE,
            tooltip: Blockly.Msg.MATH_RANDOM_INT_TOOLTIP,
            helpUrl: Blockly.Msg.MATH_RANDOM_INT_HELPURL
        })
    }
};
Blockly.Blocks.math_modulo = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.MATH_MODULO_TITLE,
            args0: [{
                type: "input_value",
                name: "DIVIDEND",
                check: "Number"
            }, {
                type: "input_value",
                name: "DIVISOR",
                check: "Number"
            }],
            inputsInline: !0,
            output: "Number",
            colour: Blockly.Blocks.math.HUE,
            tooltip: Blockly.Msg.MATH_MODULO_TOOLTIP,
            helpUrl: Blockly.Msg.MATH_MODULO_HELPURL
        })
    }
};
Blockly.Blocks.math_map = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.MATH_MAP_TITLE,
            args0: [{
                type: "input_value",
                name: "VALUE",
                check: "Number"
            }, {
                type: "input_value",
                name: "FROMLOW",
                check: "Number"
            }, {
                type: "input_value",
                name: "FROMHIGH",
                check: "Number"
            }, {
                type: "input_value",
                name: "TOLOW",
                check: "Number"
            }, {
                type: "input_value",
                name: "TOHIGH",
                check: "Number"
            }],
            inputsInline: !0,
            output: "Number",
            colour: Blockly.Blocks.math.HUE
        })
    }
};
Blockly.Blocks.math_constrain = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.MATH_CONSTRAIN_TITLE,
            args0: [{
                type: "input_value",
                name: "VALUE",
                check: "Number"
            }, {
                type: "input_value",
                name: "LOW",
                check: "Number"
            }, {
                type: "input_value",
                name: "HIGH",
                check: "Number"
            }],
            inputsInline: !0,
            output: "Number",
            colour: Blockly.Blocks.math.HUE,
            tooltip: Blockly.Msg.MATH_CONSTRAIN_TOOLTIP,
            helpUrl: Blockly.Msg.MATH_CONSTRAIN_HELPURL
        })
    }
};
Blockly.Blocks.procedures = {};
Blockly.Blocks.procedures.HUE = 270;
Blockly.Blocks.procedures_defnoreturn = {
    init: function() {
        var a = new Blockly.FieldTextInput(Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE, Blockly.Procedures.rename);
        a.setSpellcheck(!1);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE).appendField(a, "NAME").appendField("", "PARAMS");
        this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"]));
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
        this.arguments_ = [];
        this.setStatements_(!0);
        this.statementConnection_ = null
    },
    validate: function() {
        var a = Blockly.Procedures.findLegalName(this.getFieldValue("NAME"), this);
        this.setFieldValue(a, "NAME")
    },
    setStatements_: function(a) {
        this.hasStatements_ !== a && (a ? (this.appendStatementInput("STACK").appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO), this.getInput("RETURN") && this.moveInputBefore("STACK", "RETURN")) : this.removeInput("STACK", !0), this.hasStatements_ = a)
    },
    updateParams_: function() {
        for (var a = !1, b = {}, c =
                0; c < this.arguments_.length; c++) {
            if (b["arg_" + this.arguments_[c].toLowerCase()]) {
                a = !0;
                break
            }
            b["arg_" + this.arguments_[c].toLowerCase()] = !0
        }
        a ? this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING) : this.setWarningText(null);
        a = "";
        this.arguments_.length && (a = Blockly.Msg.PROCEDURES_BEFORE_PARAMS + " " + this.arguments_.join(", "));
        this.setFieldValue(a, "PARAMS")
    },
    mutationToDom: function() {
        for (var a = document.createElement("mutation"), b = 0; b < this.arguments_.length; b++) {
            var c = document.createElement("arg");
            c.setAttribute("name", this.arguments_[b]);
            a.appendChild(c)
        }
        this.hasStatements_ || a.setAttribute("statements", "false");
        return a
    },
    domToMutation: function(a) {
        this.arguments_ = [];
        for (var b = 0, c; c = a.childNodes[b]; b++) "arg" == c.nodeName.toLowerCase() && this.arguments_.push(c.getAttribute("name"));
        this.updateParams_();
        this.setStatements_("false" !== a.getAttribute("statements"))
    },
    decompose: function(a) {
        var b = a.newBlock("procedures_mutatorcontainer");
        b.initSvg();
        this.getInput("RETURN") ? b.setFieldValue(this.hasStatements_ ?
            "TRUE" : "FALSE", "STATEMENTS") : b.getInput("STATEMENT_INPUT").setVisible(!1);
        for (var c = b.getInput("STACK").connection, d = 0; d < this.arguments_.length; d++) {
            var e = a.newBlock("procedures_mutatorarg");
            e.initSvg();
            e.setFieldValue(this.arguments_[d], "NAME");
            e.oldLocation = d;
            c.connect(e.previousConnection);
            c = e.nextConnection
        }
        Blockly.Procedures.mutateCallers(this.getFieldValue("NAME"), this.workspace, this.arguments_, null);
        return b
    },
    compose: function(a) {
        this.arguments_ = [];
        this.paramIds_ = [];
        for (var b = a.getInputTargetBlock("STACK"); b;) this.arguments_.push(b.getFieldValue("NAME")),
            this.paramIds_.push(b.id), b = b.nextConnection && b.nextConnection.targetBlock();
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this.getFieldValue("NAME"), this.workspace, this.arguments_, this.paramIds_);
        a = a.getFieldValue("STATEMENTS");
        if (null !== a && (a = "TRUE" == a, this.hasStatements_ != a))
            if (a) this.setStatements_(!0), a = this.getInput("STACK").connection, a.targetConnection || !this.statementConnection_ || this.statementConnection_.targetConnection || this.statementConnection_.sourceBlock_.workspace != this.workspace ?
                this.statementConnection_ = null : a.connect(this.statementConnection_);
            else {
                a = this.getInput("STACK").connection;
                if (this.statementConnection_ = a.targetConnection) a = a.targetBlock(), a.setParent(null), a.bumpNeighbours_();
                this.setStatements_(!1)
            }
    },
    dispose: function() {
        var a = this.getFieldValue("NAME");
        Blockly.Procedures.disposeCallers(a, this.workspace);
        this.constructor.prototype.dispose.apply(this, arguments)
    },
    getProcedureDef: function() {
        return [this.getFieldValue("NAME"), this.arguments_, !1]
    },
    getVars: function() {
        return this.arguments_
    },
    renameVar: function(a, b) {
        for (var c = !1, d = 0; d < this.arguments_.length; d++) Blockly.Names.equals(a, this.arguments_[d]) && (this.arguments_[d] = b, c = !0);
        if (c && (this.updateParams_(), this.mutator.isVisible())) {
            c = this.mutator.workspace_.getAllBlocks();
            d = 0;
            for (var e; e = c[d]; d++) "procedures_mutatorarg" == e.type && Blockly.Names.equals(a, e.getFieldValue("NAME")) && e.setFieldValue(b, "NAME")
        }
    },
    customContextMenu: function(a) {
        var b = {
                enabled: !0
            },
            c = this.getFieldValue("NAME");
        b.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace("%1",
            c);
        var d = goog.dom.createDom("mutation");
        d.setAttribute("name", c);
        for (var e = 0; e < this.arguments_.length; e++) c = goog.dom.createDom("arg"), c.setAttribute("name", this.arguments_[e]), d.appendChild(c);
        d = goog.dom.createDom("block", null, d);
        d.setAttribute("type", this.callType_);
        b.callback = Blockly.ContextMenu.callbackFactory(this, d);
        a.push(b);
        if (!this.isCollapsed())
            for (e = 0; e < this.arguments_.length; e++) b = {
                enabled: !0
            }, c = this.arguments_[e], b.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1", c), d = goog.dom.createDom("field",
                null, c), d.setAttribute("name", "VAR"), d = goog.dom.createDom("block", null, d), d.setAttribute("type", "variables_get"), b.callback = Blockly.ContextMenu.callbackFactory(this, d), a.push(b)
    },
    callType_: "procedures_callnoreturn"
};
Blockly.Blocks.procedures_defreturn = {
    init: function() {
        var a = new Blockly.FieldTextInput(Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE, Blockly.Procedures.rename);
        a.setSpellcheck(!1);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_DEFRETURN_TITLE).appendField(a, "NAME").appendField("", "PARAMS");
        this.appendValueInput("RETURN").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN).setCheck("Number");
        this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"]));
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL);
        this.arguments_ = [];
        this.setStatements_(!0);
        this.statementConnection_ = null
    },
    setStatements_: Blockly.Blocks.procedures_defnoreturn.setStatements_,
    validate: Blockly.Blocks.procedures_defnoreturn.validate,
    updateParams_: Blockly.Blocks.procedures_defnoreturn.updateParams_,
    mutationToDom: Blockly.Blocks.procedures_defnoreturn.mutationToDom,
    domToMutation: Blockly.Blocks.procedures_defnoreturn.domToMutation,
    decompose: Blockly.Blocks.procedures_defnoreturn.decompose,
    compose: Blockly.Blocks.procedures_defnoreturn.compose,
    dispose: Blockly.Blocks.procedures_defnoreturn.dispose,
    getProcedureDef: function() {
        return [this.getFieldValue("NAME"), this.arguments_, !0]
    },
    getVars: Blockly.Blocks.procedures_defnoreturn.getVars,
    renameVar: Blockly.Blocks.procedures_defnoreturn.renameVar,
    customContextMenu: Blockly.Blocks.procedures_defnoreturn.customContextMenu,
    callType_: "procedures_callreturn"
};
Blockly.Blocks.procedures_mutatorcontainer = {
    init: function() {
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE);
        this.appendStatementInput("STACK");
        this.appendDummyInput("STATEMENT_INPUT").appendField(Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS).appendField(new Blockly.FieldCheckbox("TRUE"), "STATEMENTS");
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.procedures_mutatorarg = {
    init: function() {
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE).appendField(new Blockly.FieldTextInput("x", this.validator_), "NAME");
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP);
        this.contextMenu = !1
    },
    validator_: function(a) {
        return (a = a.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, "")) || null
    }
};
Blockly.Blocks.procedures_callnoreturn = {
    init: function() {
        this.appendDummyInput("TOPROW").appendField("", "NAME");
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
        this.arguments_ = [];
        this.quarkConnections_ = {};
        this.quarkArguments_ = null
    },
    getProcedureCall: function() {
        return this.getFieldValue("NAME")
    },
    renameProcedure: function(a, b) {
        Blockly.Names.equals(a, this.getProcedureCall()) && (this.setFieldValue(b,
            "NAME"), this.setTooltip((this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP : Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).replace("%1", b)))
    },
    setProcedureParameters: function(a, b) {
        if (b)
            if (goog.array.equals(this.arguments_, a)) this.quarkArguments_ = b;
            else {
                this.setCollapsed(!1);
                if (b.length != a.length) throw "Error: paramNames and paramIds must be the same length.";
                this.quarkArguments_ || (this.quarkConnections_ = {}, a.join("\n") == this.arguments_.join("\n") ? this.quarkArguments_ = b : this.quarkArguments_ = []);
                var c = this.rendered;
                this.rendered = !1;
                for (var d = this.arguments_.length - 1; 0 <= d; d--) {
                    var e = this.getInput("ARG" + d);
                    if (e) {
                        var f = e.connection.targetConnection;
                        this.quarkConnections_[this.quarkArguments_[d]] = f;
                        this.removeInput("ARG" + d)
                    }
                }
                this.arguments_ = [].concat(a);
                this.renderArgs_();
                if (this.quarkArguments_ = b)
                    for (d = 0; d < this.arguments_.length; d++) {
                        e = this.getInput("ARG" + d);
                        var g = this.quarkArguments_[d];
                        g in this.quarkConnections_ && (f = this.quarkConnections_[g], !f || f.targetConnection || f.sourceBlock_.workspace !=
                            this.workspace ? delete this.quarkConnections_[g] : e.connection.connect(f))
                    }(this.rendered = c) && this.render()
            } else this.quarkConnections_ = {}, this.quarkArguments_ = null
    },
    renderArgs_: function() {
        for (var a = 0; a < this.arguments_.length; a++) {
            var b = this.appendValueInput("ARG" + a).setAlign(Blockly.ALIGN_RIGHT).appendField(this.arguments_[a]);
            b.init()
        }
        if (b = this.getInput("TOPROW")) this.arguments_.length ? this.getField("WITH") || (b.appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS, "WITH"), b.init()) : this.getField("WITH") &&
            b.removeField("WITH")
    },
    mutationToDom: function() {
        var a = document.createElement("mutation");
        a.setAttribute("name", this.getProcedureCall());
        for (var b = 0; b < this.arguments_.length; b++) {
            var c = document.createElement("arg");
            c.setAttribute("name", this.arguments_[b]);
            a.appendChild(c)
        }
        return a
    },
    domToMutation: function(a) {
        var b = a.getAttribute("name");
        this.setFieldValue(b, "NAME");
        this.setTooltip((this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP : Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).replace("%1",
            b));
        if ((b = Blockly.Procedures.getDefinition(b, this.workspace)) && b.mutator && b.mutator.isVisible()) this.setProcedureParameters(b.arguments_, b.paramIds_);
        else {
            b = [];
            for (var c = 0, d; d = a.childNodes[c]; c++) "arg" == d.nodeName.toLowerCase() && b.push(d.getAttribute("name"));
            this.setProcedureParameters(b, b)
        }
    },
    renameVar: function(a, b) {
        for (var c = 0; c < this.arguments_.length; c++) Blockly.Names.equals(a, this.arguments_[c]) && (this.arguments_[c] = b, this.getInput("ARG" + c).fieldRow[0].setText(b))
    },
    customContextMenu: function(a) {
        var b = {
            enabled: !0
        };
        b.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
        var c = this.getProcedureCall(),
            d = this.workspace;
        b.callback = function() {
            var a = Blockly.Procedures.getDefinition(c, d);
            a && a.select()
        };
        a.push(b)
    }
};
Blockly.Blocks.procedures_callreturn = {
    init: function() {
        this.appendDummyInput("TOPROW").appendField("", "NAME");
        this.setOutput(!0);
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL);
        this.arguments_ = [];
        this.quarkConnections_ = {};
        this.quarkArguments_ = null
    },
    getProcedureCall: Blockly.Blocks.procedures_callnoreturn.getProcedureCall,
    renameProcedure: Blockly.Blocks.procedures_callnoreturn.renameProcedure,
    setProcedureParameters: Blockly.Blocks.procedures_callnoreturn.setProcedureParameters,
    renderArgs_: Blockly.Blocks.procedures_callnoreturn.renderArgs_,
    mutationToDom: Blockly.Blocks.procedures_callnoreturn.mutationToDom,
    domToMutation: Blockly.Blocks.procedures_callnoreturn.domToMutation,
    renameVar: Blockly.Blocks.procedures_callnoreturn.renameVar,
    customContextMenu: Blockly.Blocks.procedures_callnoreturn.customContextMenu
};
Blockly.Blocks.texts = {};
Blockly.Blocks.texts.HUE = 160;
Blockly.Blocks.text = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput().appendField(this.newQuote_(!0)).appendField(new Blockly.FieldTextInput(""), "TEXT").appendField(this.newQuote_(!1));
        this.setOutput(!0, "String");
        this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP)
    },
    newQuote_: function(a) {
        return new Blockly.FieldImage(a == this.RTL ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC",
            12, 12, '"')
    }
};
Blockly.Blocks.text_tonumber = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.TEXT_TONUMBER);
        this.appendValueInput("TXT").setCheck("String");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.text_format = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.TEXT_FORMAT);
        this.appendValueInput("NUM").setCheck("Number");
        this.appendDummyInput().appendField(Blockly.Msg.AS).appendField(new Blockly.FieldDropdown([
            ["HEX", "HEX"],
            ["BIN", "BIN"],
            ["DEC", "DEC"]
        ]), "FORMAT");
        this.setInputsInline(!0);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.text_format_decimal = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.TEXT_FORMAT);
        this.appendValueInput("NUM").setCheck("Number");
        this.appendDummyInput().appendField(Blockly.Msg.WITH).appendField(new Blockly.FieldDropdown([
            ["0", "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"]
        ]), "DECIMALS").appendField(Blockly.Msg.TEXT_DECIMAL);
        this.setInputsInline(!0);
        this.setOutput(!0,
            "String")
    }
};
Blockly.Blocks.text_join = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.itemCount_ = 2;
        this.updateShape_();
        this.setOutput(!0, "String");
        this.setMutator(new Blockly.Mutator(["text_create_join_item"]));
        this.setTooltip(Blockly.Msg.TEXT_JOIN_TOOLTIP)
    },
    mutationToDom: function() {
        var a = document.createElement("mutation");
        a.setAttribute("items", this.itemCount_);
        return a
    },
    domToMutation: function(a) {
        this.itemCount_ = parseInt(a.getAttribute("items"), 10);
        this.updateShape_()
    },
    decompose: function(a) {
        var b = a.newBlock("text_create_join_container");
        b.initSvg();
        for (var c = b.getInput("STACK").connection, d = 0; d < this.itemCount_; d++) {
            var e = a.newBlock("text_create_join_item");
            e.initSvg();
            c.connect(e.previousConnection);
            c = e.nextConnection
        }
        return b
    },
    compose: function(a) {
        var b = a.getInputTargetBlock("STACK");
        for (a = []; b;) a.push(b.valueConnection_), b = b.nextConnection && b.nextConnection.targetBlock();
        this.itemCount_ = a.length;
        this.updateShape_();
        for (b = 0; b < this.itemCount_; b++) a[b] &&
            this.getInput("ADD" + b).connection.connect(a[b])
    },
    saveConnections: function(a) {
        a = a.getInputTargetBlock("STACK");
        for (var b = 0; a;) {
            var c = this.getInput("ADD" + b);
            a.valueConnection_ = c && c.connection.targetConnection;
            b++;
            a = a.nextConnection && a.nextConnection.targetBlock()
        }
    },
    updateShape_: function() {
        if (this.getInput("EMPTY")) this.removeInput("EMPTY");
        else
            for (var a = 0; this.getInput("ADD" + a);) this.removeInput("ADD" + a), a++;
        if (0 == this.itemCount_) this.appendDummyInput("EMPTY").appendField(this.newQuote_(!0)).appendField(this.newQuote_(!1));
        else
            for (a = 0; a < this.itemCount_; a++) {
                var b = this.appendValueInput("ADD" + a);
                0 == a && b.appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH)
            }
    },
    newQuote_: Blockly.Blocks.text.newQuote_
};
Blockly.Blocks.text_create_join_container = {
    init: function() {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.TEXT_CREATE_JOIN_TITLE_JOIN);
        this.appendStatementInput("STACK");
        this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.text_create_join_item = {
    init: function() {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TITLE_ITEM);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.text_length = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.TEXT_LENGTH_TITLE,
            args0: [{
                type: "input_value",
                name: "VALUE",
                check: ["String", "Array"]
            }],
            output: "Number",
            colour: Blockly.Blocks.texts.HUE,
            tooltip: Blockly.Msg.TEXT_LENGTH_TOOLTIP,
            helpUrl: Blockly.Msg.TEXT_LENGTH_HELPURL
        })
    }
};
Blockly.Blocks.text_compare = {
    init: function() {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput("TEXT1", "String");
        this.appendDummyInput().appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.TEXT_EQUALS, "equals"],
            [Blockly.Msg.TEXT_STARTSWITH, "startswith"],
            [Blockly.Msg.TEXT_ENDSWITH, "endswith"]
        ]), "TYPE");
        this.appendValueInput("TEXT2", "String");
        this.setInputsInline(!0);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.text_indexof = {
    init: function() {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput("TEXT1", "String").setCheck("String").appendField(Blockly.Msg.TEXT_INDEXOF);
        this.appendValueInput("TEXT2", "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.TEXT_INDEXOF_1);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.TEXT_INDEXOF_FIRST, "indexof"],
            [Blockly.Msg.TEXT_INDEXOF_LAST, "lastindexof"]
        ]), "TYPE").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!1);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.text_contains = {
    init: function() {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput("TEXT1", "String").setCheck("String").appendField(Blockly.Msg.TEXT_CONTAINS);
        this.appendValueInput("TEXT2", "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.TEXT_CONTAINS_1);
        this.setInputsInline(!1);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.text_replace = {
    init: function() {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.appendDummyInput("").appendField(Blockly.Msg.TEXT_REPLACE).appendField(new Blockly.FieldVariableText(Blockly.Msg.VARIABLES_DEFAULT_NAME_TEXT), "VARTEXT");
        this.appendValueInput("TEXT2", "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.TEXT_REPLACE_1);
        this.appendValueInput("TEXT3", "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.TEXT_REPLACE_2);
        this.setInputsInline(!1);
        this.setOutput(!1)
    }
};
Blockly.Blocks.text_substring = {
    init: function() {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput("TEXT1", "String").setCheck("String").appendField(Blockly.Msg.TEXT_SUBSTRING);
        this.appendValueInput("START").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.TEXT_SUBSTRING_1);
        this.appendValueInput("END").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.TEXT_SUBSTRING_2);
        this.setInputsInline(!1);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.text_ascii = {
    init: function() {
        this.setHelpUrl("https://es.wikipedia.org/wiki/ASCII");
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.TEXT_ASCII).appendField(new Blockly.FieldDropdown([
            ["a", "a"],
            ["b", "b"],
            ["c", "c"],
            ["d", "d"],
            ["e", "e"],
            ["f", "f"],
            ["g", "g"],
            ["h", "h"],
            ["i", "i"],
            ["j", "j"],
            ["k", "k"],
            ["l", "l"],
            ["m", "m"],
            ["n", "n"],
            ["o", "o"],
            ["p", "p"],
            ["q", "q"],
            ["r", "r"],
            ["s", "s"],
            ["t", "t"],
            ["u", "u"],
            ["v", "v"],
            ["w", "w"],
            ["x", "x"],
            ["y", "y"],
            ["z", "z"],
            ["A",
                "A"
            ],
            ["B", "B"],
            ["C", "C"],
            ["D", "D"],
            ["E", "E"],
            ["F", "F"],
            ["G", "G"],
            ["H", "H"],
            ["I", "I"],
            ["J", "J"],
            ["K", "K"],
            ["L", "L"],
            ["M", "M"],
            ["N", "N"],
            ["O", "O"],
            ["P", "P"],
            ["Q", "Q"],
            ["R", "R"],
            ["S", "S"],
            ["T", "T"],
            ["U", "U"],
            ["V", "V"],
            ["W", "W"],
            ["X", "X"],
            ["Y", "Y"],
            ["Z", "Z"],
            ["0", "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["!", "!"],
            ['"', '"'],
            ["#", "#"],
            ["$", "$"],
            ["%", "%"],
            ["&", "&"],
            ["(", "("],
            [")", ")"],
            ["*", "*"],
            ["+", "+"],
            ["-", "-"],
            [".", "."],
            ["/", "/"],
            ["{", "}"],
            ["|", "|"],
            ["\\", "\\"],
            ["[", "["],
            ["@", "@"],
            ["]", "]"],
            ["^", "^"],
            ["_", "_"],
            [":", ":"],
            [";", ";"],
            [",", ","],
            ["<", "<"],
            [">", ">"],
            ["?", "?"],
            ["space", " "]
        ]), "CHAR");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.variables = {};
Blockly.Blocks.variables.HUE = 330;
Blockly.Blocks.variables.HUE2 = 75;
Blockly.Blocks.variables.HUE3 = 290;
Blockly.Blocks.variables_get = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
        this.setColour(Blockly.Blocks.variables.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR");
        this.setOutput(!0, "Number");
        this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET
    },
    getVars: function() {
        return [this.getFieldValue("VAR")]
    },
    renameVar: function(a, b) {
        Blockly.Names.equals(a, this.getFieldValue("VAR")) &&
            this.setFieldValue(b, "VAR")
    },
    contextMenuType_: "variables_set",
    customContextMenu: function(a) {
        var b = {
                enabled: !0
            },
            c = this.getFieldValue("VAR");
        b.text = this.contextMenuMsg_.replace("%1", c);
        c = goog.dom.createDom("field", null, c);
        c.setAttribute("name", "VAR");
        c = goog.dom.createDom("block", null, c);
        c.setAttribute("type", this.contextMenuType_);
        b.callback = Blockly.ContextMenu.callbackFactory(this, c);
        a.push(b)
    }
};
Blockly.Blocks.variables_set = {
    init: function() {
        this.setColour(Blockly.Blocks.variables.HUE);
        this.appendValueInput("VALUE").appendField(Blockly.Msg.VARIABLES_SET).appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR").appendField("=").setCheck("Number");
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP)
    },
    getVars: function() {
        return [this.getFieldValue("VAR")]
    },
    renameVar: function(a,
        b) {
        Blockly.Names.equals(a, this.getFieldValue("VAR")) && this.setFieldValue(b, "VAR")
    },
    contextMenuType_: "variables_get",
    customContextMenu: Blockly.Blocks.variables_get.customContextMenu
};
Blockly.Blocks.variables_get_text = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
        this.setColour(Blockly.Blocks.variables.HUE2);
        this.appendDummyInput().appendField(new Blockly.FieldVariableText(Blockly.Msg.VARIABLES_DEFAULT_NAME_TEXT), "VARTEXT");
        this.setOutput(!0, "String");
        this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET
    },
    getVarsText: function() {
        return [this.getFieldValue("VARTEXT")]
    },
    renameVarText: function(a, b) {
        Blockly.Names.equals(a,
            this.getFieldValue("VARTEXT")) && this.setFieldValue(b, "VARTEXT")
    },
    contextMenuType_: "variables_set_text",
    customContextMenu: function(a) {
        var b = {
                enabled: !0
            },
            c = this.getFieldValue("VARTEXT");
        b.text = this.contextMenuMsg_.replace("%1", c);
        c = goog.dom.createDom("field", null, c);
        c.setAttribute("name", "VARTEXT");
        c = goog.dom.createDom("block", null, c);
        c.setAttribute("type", this.contextMenuType_);
        b.callback = Blockly.ContextMenu.callbackFactory(this, c);
        a.push(b)
    }
};
Blockly.Blocks.variables_set_text = {
    init: function() {
        this.setColour(Blockly.Blocks.variables.HUE2);
        this.appendValueInput("VALUE").appendField(Blockly.Msg.VARIABLES_SET).appendField(new Blockly.FieldVariableText(Blockly.Msg.VARIABLES_DEFAULT_NAME_TEXT), "VARTEXT").appendField("=").setCheck("String");
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP)
    },
    getVarsText: function() {
        return [this.getFieldValue("VARTEXT")]
    },
    renameVarText: function(a, b) {
        Blockly.Names.equals(a,
            this.getFieldValue("VARTEXT")) && this.setFieldValue(b, "VARTEXT")
    }
};
Blockly.Blocks.variables_get_bool = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
        this.setColour(Blockly.Blocks.variables.HUE3);
        this.appendDummyInput().appendField(new Blockly.FieldVariableBool(Blockly.Msg.VARIABLES_DEFAULT_NAME_BOOL), "VARBOOL");
        this.setOutput(!0, "Boolean");
        this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET
    },
    getVarsBool: function() {
        return [this.getFieldValue("VARBOOL")]
    },
    renameVarBool: function(a, b) {
        Blockly.Names.equals(a,
            this.getFieldValue("VARBOOL")) && this.setFieldValue(b, "VARBOOL")
    },
    contextMenuType_: "variables_set_bool",
    customContextMenu: function(a) {
        var b = {
                enabled: !0
            },
            c = this.getFieldValue("VARBOOL");
        b.text = this.contextMenuMsg_.replace("%1", c);
        c = goog.dom.createDom("field", null, c);
        c.setAttribute("name", "VARBOOL");
        c = goog.dom.createDom("block", null, c);
        c.setAttribute("type", this.contextMenuType_);
        b.callback = Blockly.ContextMenu.callbackFactory(this, c);
        a.push(b)
    }
};
Blockly.Blocks.variables_set_bool = {
    init: function() {
        this.setColour(Blockly.Blocks.variables.HUE3);
        this.appendValueInput("VALUE").appendField(Blockly.Msg.VARIABLES_SET).appendField(new Blockly.FieldVariableBool(Blockly.Msg.VARIABLES_DEFAULT_NAME_BOOL), "VARBOOL").appendField("=").setCheck("Boolean");
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP)
    },
    getVarsBool: function() {
        return [this.getFieldValue("VARBOOL")]
    },
    renameVarBool: function(a, b) {
        Blockly.Names.equals(a,
            this.getFieldValue("VARBOOL")) && this.setFieldValue(b, "VARBOOL")
    }
};
Blockly.Blocks._3dbot = {};
Blockly.Blocks._3dbot.HUE = 180;
Blockly.Blocks._3dbot_move = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_move.png", 66, 42)).appendField(Blockly.Msg._3DBOT_MOVE);
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg._3DBOT_MOVE_FORWARD, "1"],
            [Blockly.Msg._3DBOT_MOVE_BACKWARD, "2"],
            [Blockly.Msg._3DBOT_MOVE_LEFT, "3"],
            [Blockly.Msg._3DBOT_MOVE_RIGHT, "4"],
            [Blockly.Msg._3DBOT_MOVE_ROTATE_LEFT, "5"],
            [Blockly.Msg._3DBOT_MOVE_ROTATE_RIGHT, "6"],
            [Blockly.Msg._3DBOT_MOVE_BACKWARD_LEFT, "7"],
            [Blockly.Msg._3DBOT_MOVE_BACKWARD_RIGHT, "8"],
            [Blockly.Msg._3DBOT_MOVE_STOP, "0"]
        ]), "MOV");
        this.appendDummyInput("").appendField(" ");
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg._3DBOT_MOVE_FAST, "FAST"],
            [Blockly.Msg._3DBOT_MOVE_NORMAL, "NORMAL"],
            [Blockly.Msg._3DBOT_MOVE_SLOW,
                "SLOW"
            ]
        ]), "SPEED");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks._3dbot_steps = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_steps.png", 66, 42)).appendField(Blockly.Msg._3DBOT_WAIT);
        this.appendValueInput("STEPS", "Number").setCheck("Number");
        this.appendDummyInput().appendField(Blockly.Msg._3DBOT_STEPS);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0,
            null)
    }
};
Blockly.Blocks._3dbot_motor = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_motor.png", 66, 42)).appendField(Blockly.Msg._3DBOT_MOTOR);
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg._3DBOT_LEFT, "0"],
            [Blockly.Msg._3DBOT_RIGHT, "1"]
        ]), "MOTOR");
        this.appendDummyInput("").appendField(" ").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg._3DBOT_MOVE_FORWARD, "1"],
            [Blockly.Msg._3DBOT_MOVE_BACKWARD, "2"],
            [Blockly.Msg._3DBOT_MOVE_STOP, "0"]
        ]), "DIR");
        this.appendValueInput("SPEED", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg._3DBOT_MOVE_SPEED);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks._3dbot_distance = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_distance.png", 66, 42)).appendField(Blockly.Msg._3DBOT_DISTANCE);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks._3dbot_distance2 = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_distance.png", 66, 42)).appendField(Blockly.Msg._3DBOT_DISTANCE);
        this.appendValueInput("MAXDISTANCE", "Number").appendField(Blockly.Msg.SENSOR_ULTRASONIC_MAXDISTANCE).setCheck("Number");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks._3dbot_ldr = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_ldr.png", 66, 42)).appendField(Blockly.Msg._3DBOT_LDR);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks._3dbot_ntc = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_ntc.png", 60, 36)).appendField(Blockly.Msg._3DBOT_NTC);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks._3dbot_irsensor = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_ir.png", 66, 42)).appendField(Blockly.Msg._3DBOT_IRSENSOR + " ");
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg._3DBOT_IRSENSOR_LEFT, "LEFT"],
            [Blockly.Msg._3DBOT_IRSENSOR_RIGHT, "RIGHT"]
        ]), "IRSENSOR");
        this.setInputsInline(!0);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks._3dbot_irremote_keys = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=564&controller=product",
    init: function() {
        var a = [
            [Blockly.Msg.UP, "16736925"],
            [Blockly.Msg.DOWN, "16754775"],
            [Blockly.Msg.LEFT, "16720605"],
            [Blockly.Msg.RIGHT, "16761405"],
            [Blockly.Msg.OK, "16712445"],
            ["1", "16738455"],
            ["2", "16750695"],
            ["3", "16756815"],
            ["4", "16724175"],
            ["5", "16718055"],
            ["6", "16743045"],
            ["7", "16716015"],
            ["8", "16726215"],
            ["9", "16734885"],
            ["0", "16730805"]
        ];
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_irrx_keys.png", 88, 40)).appendField(new Blockly.FieldDropdown(a), "KEY");
        this.setOutput("Number")
    }
};
Blockly.Blocks._3dbot_buzzer = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_buzzer.png", 66, 42)).appendField(Blockly.Msg._3DBOT_BUZZER);
        this.appendValueInput("MS", "Number").appendField("Ms").setCheck("Number");
        this.appendValueInput("TONE", "Number").appendField(Blockly.Msg._3DBOT_BUZZER_FREQ).setCheck("Number");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};

Blockly.Blocks._3dbot_buzzer_rttl = {
    helpUrl: "http://www.arduinoblocks.com/web/help/rtttl",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_buzzer.png", 60, 42)).appendField(Blockly.Msg._3DBOT_BUZZER);
        this.appendDummyInput().appendField(Blockly.Msg.SOUND_PLAY + " RTTTL");
        this.appendValueInput("RTTTL", "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0,
            null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks._3dbot_buzzer_rttl_melody = {
    helpUrl: "http://www.arduinoblocks.com/web/help/rtttl",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/note.png", 25, 25)).appendField("RTTTL");
        this.appendDummyInput().appendField(new Blockly.FieldDropdown([
            ["The Simpsons", ":d=4,o=5,b=160:c.6,e6,f#6,8a6,g.6,e6,c6,8a,8f#,8f#,8f#,2g,8p,8p"],
            ["Indiana Jones", ":d=4,o=5,b=250:e,8p,8f,8g,8p,1c6,8p.,d,8p,8e,1f"],
            ["Muppets",
                ":d=4,o=5,b=250:c6,c6,a,b,8a,b,g,p,c6,c6,a,8b,8a,8p,g.,p"
            ],
            ["Looney", ":d=4,o=5,b=140:32p,c6,8f6,8e6,8d6,8c6,a.,8c6,8f6,8e6,8d6,8d#6,e.6"],
            ["20th Century Fox", ":d=16,o=5,b=180:b,8p,b,b,2b,p,c6,32p,b,32p,c6,32p,b,32p,c6,32p,b,8p,b,b,b,32p,b,32p,b,32p,b,32p,b,32p,b,32p,b,32p,g#,32p,a,32p,b,8p"],
            ["Star Wars", ":d=4,o=5,b=45:32p,32f#,32f#,32f#,8b.,8f#.6,32e6,32d#6,32c#6,8b.6,16f#.6,32e6,32d#6,32c#6,8b.6,16f#.6,32e6,32d#6,32e6,8c#.6"],
            ["A-Team", ":d=8,o=5,b=125:4d#6,a#,2d#6,16p,g#,4a#,4d#.,p,16g,16a#,d#6,a#,f6,2d#6,16p,c#.6,16c6,16a#,g#.,2a#"],
            ["Mission Impossible", ":d=16,o=6,b=95:g,8p,g,8p,a#,p,c7,p,g,8p,g,8p,f,p,f#,p,g,8p,g,8p,a#,p,c7,p,g,8p,g,8p,f,p,f#"],
            ["Gadget", ":d=16,o=5,b=50:32d#,32f,32f#,32g#,a#,f#,a,f,g#,f#,32d#,32f,32f#,32g#,a#,d#6,4d6"],
            ["Bubble Bobble", ":d=4,o=5,b=125:8a#6,8a6,8g.6,16f6,8a6,8g6,8f6,8d#6,8g6,8f6,16d#6,8d.6,f.6"],
            ["Arkanoid", ":d=4,o=5,b=140:8g6,16p,16g.6,2a#6,32p,8a6,8g6,8f6,8a6,2g6"],
            ["Donkey Kong", ":d=4,o=5,b=160:2c,8d.,d#.,c.,16b,16c6,16b,16c6,16b,16c6,16b,16c6,16b,16c6,16b,16c6,16b,2c6"],
            ["Pac-Man", ":d=4,o=5,b=112:16p,32d#6,32e6,32f6,32p,32f6,32f#6,32g6,32p,32g6,32g#6,32a6,32p,32b.6"],
            ["Tetris", ":d=4,o=5,b=160:e6,8b,8c6,8d6,16e6,16d6,8c6,8b,a,8a,8c6,e6,8d6,8c6,b,8b,8c6,d6,e6,c6,a,2a,8p"],
            ["Super Mario", ":d=4,o=5,b=100:16e6,16e6,32p,8e6,16c6,8e6,8g6,8p"],
            ["Addams Family", ":d=4,o=5,b=160:8c,8d,8e,8f,1p,8d,8e,8f#,8g,1p,8d,8e,8f#,8g,p,8d,8e,8f#,8g,p,8c,8d,8e,8f"],
            ["Popeye", ":d=4,o=5,b=120:8p,16a,16f,16a,16c6,16b,16a,16g,16a,16g,8e,16g,16g,16g,16g,8a,16b,32c6,32b,32c6,32b,32c6,32b,8c6"],
            ["Beethoven", ":d=4,o=5,b=140:8e6,8d#6,8e6,8d#6,8e6,8b,8d6,8c6,a,8p,8c,8e,8a,b,8p,8e,8g#,8b,c6"],
            ["Ghostbusters", ":d=4,o=5,b=250:8g,8g,4b,4g,4a,4f,1p,8g,8g,8g,8g,4f,4g,2p,4p"]
        ]), "RTTTL_MELODY");
        this.setInputsInline(!0);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks._3dbot_led_pwm = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_led.png", 66, 42)).appendField(Blockly.Msg._3DBOT_LED_PWM);
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg._3DBOT_LED_RED, "RED"],
            [Blockly.Msg._3DBOT_LED_YELLOW, "YELLOW"],
            [Blockly.Msg._3DBOT_LED_GREEN,
                "GREEN"
            ]
        ]), "LED");
        this.appendValueInput("PWM", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.VALUE);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks._3dbot_button = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_button.png", 66, 42)).appendField(Blockly.Msg._3DBOT_BUTTON).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_BUTTON_DEBOUNCED_PRESSED, "pressed"],
            [Blockly.Msg.SENSOR_BUTTON_DEBOUNCED_RELEASED, "released"]
        ]), "STATUS");
        this.setInputsInline(!0);
        this.setOutput(!0,
            "Boolean")
    }
};
Blockly.Blocks._3dbot_irremote_rx = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_irrx.png", 66, 42)).appendField(Blockly.Msg._3DBOT_IRRX);
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks._3dbot_irremote_tx = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_irtx.png", 66, 42)).appendField(Blockly.Msg._3DBOT_IRTX);
        this.appendDummyInput("").appendField(Blockly.Msg.ACTUATOR_IRTX_PROTOCOL).appendField(new Blockly.FieldDropdown([
            ["RC5", "RC5"],
            ["RC6", "RC6"],
            ["NEC", "NEC"],
            ["SONY", "SONY"],
            ["JVC", "JVC"],
            ["SAMSUNG",
                "SAMSUNG"
            ],
            ["WHYNTER", "WHYNTER"],
            ["AIWA", "AIWA"],
            ["LG", "LG"],
            ["DISH", "DISH"],
            ["DENON", "DENON"]
        ]), "PROTOCOL");
        this.appendValueInput("CODE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.ACTUATOR_IRTX_CODE);
        this.appendValueInput("BITS", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.ACTUATOR_IRTX_BITS);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks._3dbot_digital_write = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_io.png", 66, 42)).appendField(Blockly.Msg.IO_DIGITAL_WRITE);
        this.appendValueInput("STAT", "Boolean").setCheck("Boolean").setAlign(Blockly.ALIGN_RIGHT).appendField("");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0,
            null)
    }
};
Blockly.Blocks._3dbot_digital_read = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_io.png", 66, 42)).appendField(Blockly.Msg.IO_DIGITAL_READ);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks._3dbot_analog_read = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_io.png", 66, 42)).appendField(Blockly.Msg.IO_ANALOG_READ);
        this.setOutput(!0, "Number");
        this.setTooltip("0 - 1023")
    }
};
Blockly.Blocks._3dbot_nunchuk = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/3dbot_nunchuk.png", 66, 42)).appendField(Blockly.Msg.NUNCHUK);
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.NUNCHUK_X, "analogX"],
            [Blockly.Msg.NUNCHUK_Y, "analogY"],
            [Blockly.Msg.NUNCHUK_aX, "accelX"],
            [Blockly.Msg.NUNCHUK_aY, "accelY"],
            [Blockly.Msg.NUNCHUK_aZ, "accelZ"],
            [Blockly.Msg.NUNCHUK_bC, "cButton"],
            [Blockly.Msg.NUNCHUK_bZ, "zButton"]
        ]), "ID");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks._3dbot_irremote_keys = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=564&controller=product",
    init: function() {
        var a = [
            [Blockly.Msg.UP, "16736925"],
            [Blockly.Msg.DOWN, "16754775"],
            [Blockly.Msg.LEFT, "16720605"],
            [Blockly.Msg.RIGHT, "16761405"],
            [Blockly.Msg.OK, "16712445"],
            ["1", "16738455"],
            ["2", "16750695"],
            ["3", "16756815"],
            ["4", "16724175"],
            ["5", "16718055"],
            ["6", "16743045"],
            ["7", "16716015"],
            ["8", "16726215"],
            ["9", "16734885"],
            ["0", "16730805"]
        ];
        this.setColour(Blockly.Blocks._3dbot.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_irrx_keys.png", 88, 40)).appendField(new Blockly.FieldDropdown(a), "KEY");
        this.setOutput("Number")
    }
};
Blockly.Blocks.actuator = {};
Blockly.Blocks.actuator.HUE = 15;
Blockly.Blocks.actuator_led = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=723&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.ACTUATOR_LED).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/actuator_led.png", 80, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN").appendField(Blockly.Msg.STATUS).appendField(new Blockly.FieldDropdown([
            ["ON", "HIGH"],
            ["OFF", "LOW"]
        ]), "STAT");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.actuator_led_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=539&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/actuator_led_EP.png", 73, 43)).appendField(Blockly.Msg.ACTUATOR_LED).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN").appendField(Blockly.Msg.STATUS).appendField(new Blockly.FieldDropdown([
            ["ON", "HIGH"],
            ["OFF",
                "LOW"
            ]
        ]), "STAT");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.actuator_irtx = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=623&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.ACTUATOR_IRTX).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/actuator_ir.png", 80, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].ir_tx), "PIN");
        this.appendDummyInput("").appendField(Blockly.Msg.ACTUATOR_IRTX_PROTOCOL).appendField(new Blockly.FieldDropdown([
            ["RC5",
                "RC5"
            ],
            ["RC6", "RC6"],
            ["NEC", "NEC"],
            ["SONY", "SONY"],
            ["JVC", "JVC"],
            ["SAMSUNG", "SAMSUNG"],
            ["WHYNTER", "WHYNTER"],
            ["AIWA", "AIWA"],
            ["LG", "LG"],
            ["DISH", "DISH"],
            ["DENON", "DENON"]
        ]), "PROTOCOL");
        this.appendValueInput("CODE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.ACTUATOR_IRTX_CODE);
        this.appendValueInput("BITS", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.ACTUATOR_IRTX_BITS);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0,
            null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.actuator_irtx_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=623&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/actuator_ir_EP.png", 103, 40)).appendField(Blockly.Msg.ACTUATOR_IRTX).appendField(new Blockly.FieldDropdown(profile["default"].ir_tx), "PIN");
        this.appendDummyInput("").appendField(Blockly.Msg.ACTUATOR_IRTX_PROTOCOL).appendField(new Blockly.FieldDropdown([
            ["RC5", "RC5"],
            ["RC6", "RC6"],
            ["NEC", "NEC"],
            ["SONY", "SONY"],
            ["JVC", "JVC"],
            ["SAMSUNG", "SAMSUNG"],
            ["WHYNTER", "WHYNTER"],
            ["AIWA", "AIWA"],
            ["LG", "LG"],
            ["DISH", "DISH"],
            ["DENON", "DENON"]
        ]), "PROTOCOL");
        this.appendValueInput("CODE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.ACTUATOR_IRTX_CODE);
        this.appendValueInput("BITS", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.ACTUATOR_IRTX_BITS);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.actuator_led_pwm = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=723&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.ACTUATOR_LED_PWM).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/actuator_led.png", 80, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].PWM), "PIN");
        this.appendValueInput("NUM", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.VALUE);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.actuator_led_pwm_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=539&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/actuator_led_EP.png", 73, 43)).appendField(Blockly.Msg.ACTUATOR_LED_PWM).appendField(new Blockly.FieldDropdown(profile["default"].PWM), "PIN");
        this.appendValueInput("NUM", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.VALUE);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.actuator_led_rgb = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=627&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.ACTUATOR_RGBLED).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/actuator_rgb.png", 80, 40)).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.COMMON_CATHODE, "CC"],
            [Blockly.Msg.COMMON_ANODE, "CA"]
        ]), "TYPE").appendField(Blockly.Msg.PIN + " R").appendField(new Blockly.FieldDropdown(profile["default"].PWM),
            "PIN_R").appendField(Blockly.Msg.PIN + " G").appendField(new Blockly.FieldDropdown(profile["default"].PWM), "PIN_G").appendField(Blockly.Msg.PIN + " B").appendField(new Blockly.FieldDropdown(profile["default"].PWM), "PIN_B").appendField(Blockly.Msg.COLOUR).appendField(new Blockly.FieldColour("#ff0000"), "COLOR");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.actuator_relay = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=604&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.ACTUATOR_RELAY).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/actuator_relay.png", 80, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN").appendField(Blockly.Msg.STATUS).appendField(new Blockly.FieldDropdown([
            ["ON",
                "HIGH"
            ],
            ["OFF", "LOW"]
        ]), "STAT");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.actuator_relay_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=566&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/actuator_relay_EP.png", 97, 56)).appendField(Blockly.Msg.ACTUATOR_RELAY).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN").appendField(Blockly.Msg.STATUS).appendField(new Blockly.FieldDropdown([
            ["ON", "HIGH"],
            ["OFF", "LOW"]
        ]), "STAT");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.actuator_buzzer = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=614&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.ACTUATOR_BUZZER).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/actuator_buzzer.png", 60, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.appendValueInput("MS", "Number").appendField("Ms").setCheck("Number");
        this.appendValueInput("TONE", "Number").appendField(Blockly.Msg.ACTUATOR_BUZZER_FREQ).setCheck("Number");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.actuator_buzzer_blox = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=614&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.ACTUATOR_BUZZER).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/actuator_buzzer.png", 60, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.appendValueInput("MS", "Number").appendField("Ms").setCheck("Number");
        this.appendValueInput("TONE", "Number").appendField(Blockly.Msg.ACTUATOR_BUZZER_FREQ).setCheck("Number");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.actuator_buzzer_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=542&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/actuator_buzzer_EP.png", 83, 42)).appendField(Blockly.Msg.ACTUATOR_BUZZER).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.appendValueInput("MS", "Number").appendField("Ms").setCheck("Number");
        this.appendValueInput("TONE",
            "Number").appendField(Blockly.Msg.ACTUATOR_BUZZER_FREQ).setCheck("Number");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.actuator_buzzer_tone = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=614&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.ACTUATOR_BUZZER_TONE + " (Hz)").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/note.png", 25, 25)).appendField(new Blockly.FieldDropdown([
            ["C", "261"],
            ["C#", "277"],
            ["D", "294"],
            ["D#", "311"],
            ["E", "330"],
            ["F", "349"],
            ["F#", "370"],
            ["G", "392"],
            ["G#", "415"],
            ["A",
                "440"
            ]
        ]), "NOTE");
        this.setOutput("Number")
    }
};
Blockly.Blocks.actuator_buzzer_rttl = {
    helpUrl: "http://www.arduinoblocks.com/web/help/rtttl",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.ACTUATOR_BUZZER).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/actuator_buzzer.png", 60, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.appendDummyInput().appendField(Blockly.Msg.SOUND_PLAY + " RTTTL");
        this.appendValueInput("RTTTL",
            "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.actuator_buzzer_rttl_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=542&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/actuator_buzzer_EP.png", 83, 42)).appendField(Blockly.Msg.ACTUATOR_BUZZER).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.appendDummyInput().appendField(Blockly.Msg.SOUND_PLAY + " RTTTL");
        this.appendValueInput("RTTTL",
            "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.actuator_buzzer_rttl_melody = {
    helpUrl: "http://www.arduinoblocks.com/web/help/rtttl",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/note.png", 25, 25)).appendField("RTTTL");
        this.appendDummyInput().appendField(new Blockly.FieldDropdown([
            ["The Simpsons", ":d=4,o=5,b=160:c.6,e6,f#6,8a6,g.6,e6,c6,8a,8f#,8f#,8f#,2g,8p,8p"],
            ["Indiana Jones", ":d=4,o=5,b=250:e,8p,8f,8g,8p,1c6,8p.,d,8p,8e,1f"],
            ["Muppets", ":d=4,o=5,b=250:c6,c6,a,b,8a,b,g,p,c6,c6,a,8b,8a,8p,g.,p"],
            ["Looney", ":d=4,o=5,b=140:32p,c6,8f6,8e6,8d6,8c6,a.,8c6,8f6,8e6,8d6,8d#6,e.6"],
            ["20th Century Fox", ":d=16,o=5,b=180:b,8p,b,b,2b,p,c6,32p,b,32p,c6,32p,b,32p,c6,32p,b,8p,b,b,b,32p,b,32p,b,32p,b,32p,b,32p,b,32p,b,32p,g#,32p,a,32p,b,8p"],
            ["Star Wars", ":d=4,o=5,b=45:32p,32f#,32f#,32f#,8b.,8f#.6,32e6,32d#6,32c#6,8b.6,16f#.6,32e6,32d#6,32c#6,8b.6,16f#.6,32e6,32d#6,32e6,8c#.6"],
            ["A-Team", ":d=8,o=5,b=125:4d#6,a#,2d#6,16p,g#,4a#,4d#.,p,16g,16a#,d#6,a#,f6,2d#6,16p,c#.6,16c6,16a#,g#.,2a#"],
            ["Mission Impossible", ":d=16,o=6,b=95:g,8p,g,8p,a#,p,c7,p,g,8p,g,8p,f,p,f#,p,g,8p,g,8p,a#,p,c7,p,g,8p,g,8p,f,p,f#"],
            ["Gadget", ":d=16,o=5,b=50:32d#,32f,32f#,32g#,a#,f#,a,f,g#,f#,32d#,32f,32f#,32g#,a#,d#6,4d6"],
            ["Bubble Bobble", ":d=4,o=5,b=125:8a#6,8a6,8g.6,16f6,8a6,8g6,8f6,8d#6,8g6,8f6,16d#6,8d.6,f.6"],
            ["Arkanoid", ":d=4,o=5,b=140:8g6,16p,16g.6,2a#6,32p,8a6,8g6,8f6,8a6,2g6"],
            ["Donkey Kong", ":d=4,o=5,b=160:2c,8d.,d#.,c.,16b,16c6,16b,16c6,16b,16c6,16b,16c6,16b,16c6,16b,16c6,16b,2c6"],
            ["Pac-Man", ":d=4,o=5,b=112:16p,32d#6,32e6,32f6,32p,32f6,32f#6,32g6,32p,32g6,32g#6,32a6,32p,32b.6"],
            ["Tetris", ":d=4,o=5,b=160:e6,8b,8c6,8d6,16e6,16d6,8c6,8b,a,8a,8c6,e6,8d6,8c6,b,8b,8c6,d6,e6,c6,a,2a,8p"],
            ["Super Mario", ":d=4,o=5,b=100:16e6,16e6,32p,8e6,16c6,8e6,8g6,8p"],
            ["Addams Family", ":d=4,o=5,b=160:8c,8d,8e,8f,1p,8d,8e,8f#,8g,1p,8d,8e,8f#,8g,p,8d,8e,8f#,8g,p,8c,8d,8e,8f"],
            ["Popeye", ":d=4,o=5,b=120:8p,16a,16f,16a,16c6,16b,16a,16g,16a,16g,8e,16g,16g,16g,16g,8a,16b,32c6,32b,32c6,32b,32c6,32b,8c6"],
            ["Beethoven", ":d=4,o=5,b=140:8e6,8d#6,8e6,8d#6,8e6,8b,8d6,8c6,a,8p,8c,8e,8a,b,8p,8e,8g#,8b,c6"],
            ["Ghostbusters", ":d=4,o=5,b=250:8g,8g,4b,4g,4a,4f,1p,8g,8g,8g,8g,4f,4g,2p,4p"]
        ]), "RTTTL_MELODY");
        this.setInputsInline(!0);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.actuator_fanmotor_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=588&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/actuator_fanmotor_EP.png", 95, 74)).appendField(Blockly.Msg.ACTUATOR_FANMOTOR);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown([
            [Blockly.Msg._3DBOT_MOVE_LEFT, "L"],
            [Blockly.Msg._3DBOT_MOVE_RIGHT, "R"],
            [Blockly.Msg._3DBOT_MOVE_STOP,
                "STOP"
            ]
        ]), "DIR");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.bluetooth = {};
Blockly.Blocks.bluetooth.HUE = 190;
Blockly.Blocks.bluetooth_init = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=648&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.bluetooth.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/bluetooth.png", 25, 25)).appendField(Blockly.Msg.BLUETOOTH_INIT).appendField("Rx").appendField(new Blockly.FieldDropdown(profile["default"].rxtx), "RX").appendField("Tx").appendField(new Blockly.FieldDropdown(profile["default"].rxtx), "TX").appendField(new Blockly.FieldDropdown([
            ["2400",
                "2400"
            ],
            ["4800", "4800"],
            ["9600", "9600"],
            ["19200", "19200"],
            ["38400", "38400"],
            ["57600", "57600"],
            ["115200", "115200"]
        ]), "BAUD");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.bluetooth_init2 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=648&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.bluetooth.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/bluetooth.png", 25, 25)).appendField(Blockly.Msg.BLUETOOTH_INIT).appendField(new Blockly.FieldDropdown([
            ["2400", "2400"],
            ["4800", "4800"],
            ["9600", "9600"],
            ["19200", "19200"],
            ["38400", "38400"],
            ["57600", "57600"],
            ["115200", "115200"]
        ]), "BAUD");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.bluetooth_init2_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=648&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.bluetooth.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/bluetooth_EP.png", 147, 35)).appendField(Blockly.Msg.BLUETOOTH_INIT).appendField(new Blockly.FieldDropdown([
                ["2400", "2400"],
                ["4800", "4800"],
                ["9600", "9600"],
                ["19200", "19200"],
                ["38400", "38400"],
                ["57600", "57600"],
                ["115200", "115200"]
            ]),
            "BAUD");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.bluetooth_name = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=648&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.bluetooth.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/bluetooth.png", 25, 25)).appendField(Blockly.Msg.BLUETOOTH_DEVNAME);
        this.appendValueInput("DEVNAME", "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("DEVPIN", "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.bluetooth_name2 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=648&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.bluetooth.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/bluetooth.png", 25, 25)).appendField(Blockly.Msg.BLUETOOTH_DEVNAME);
        this.appendValueInput("DEVNAME", "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("DEVPIN", "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            ["Standard", "standard"],
            ["ZS-040/3.0", "ZS040v3"]
        ]), "VERSION");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.bluetooth_timeout = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=648&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.bluetooth.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/bluetooth.png", 25, 25));
        this.appendValueInput("MS", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.SERIAL_TIMEOUT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0,
            null)
    }
};
Blockly.Blocks.bluetooth_print = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=648&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.bluetooth.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/bluetooth.png", 25, 25)).appendField(Blockly.Msg.BLUETOOTH_PRINT);
        this.appendValueInput("STRINGOUTPUT", "String").setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "NEWLINE").appendField(Blockly.Msg.ADD_NEW_LINE);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.bluetooth_println = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=648&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.bluetooth.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/bluetooth.png", 25, 25)).appendField(Blockly.Msg.BLUETOOTH_PRINTLN);
        this.appendValueInput("STRINGOUTPUT", "String").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0,
            null)
    }
};
Blockly.Blocks.bluetooth_read_float = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=648&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.bluetooth.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/bluetooth.png", 25, 25)).appendField(Blockly.Msg.BLUETOOTH_READFLOAT);
        this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "NEWLINE").appendField(Blockly.Msg.UNTIL_NEW_LINE);
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.bluetooth_read_string = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=648&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.bluetooth.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/bluetooth.png", 25, 25)).appendField(Blockly.Msg.BLUETOOTH_READSTRING);
        this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "NEWLINE").appendField(Blockly.Msg.UNTIL_NEW_LINE);
        this.setInputsInline(!0);
        this.setOutput(!0,
            "String")
    }
};
Blockly.Blocks.bluetooth_read_string_line = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=648&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.bluetooth.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/bluetooth.png", 25, 25)).appendField(Blockly.Msg.BLUETOOTH_READSTRINGLINE);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.bluetooth_read_byte = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=648&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.bluetooth.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/bluetooth.png", 25, 25)).appendField(Blockly.Msg.BLUETOOTH_READBYTE);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.bluetooth_write_byte = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=648&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.bluetooth.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/bluetooth.png", 25, 25)).appendField(Blockly.Msg.BLUETOOTH_WRITEBYTE);
        this.appendValueInput("BYTE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0,
            null)
    }
};
Blockly.Blocks.bluetooth_read_available = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=648&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.bluetooth.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/bluetooth.png", 25, 25)).appendField(Blockly.Msg.BLUETOOTH_AVAILABLE);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.domotics = {};
Blockly.Blocks.domotics.HUE = 250;
Blockly.Blocks.domotics_pzem004t_init = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.domotics.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/domotics_pzem004t.png", 90, 48)).appendField("PZEM-004T " + Blockly.Msg.DOMOTICS_PZEM004T_INIT).appendField("Rx").appendField(new Blockly.FieldDropdown(profile["default"].rxtx), "RX").appendField("Tx").appendField(new Blockly.FieldDropdown(profile["default"].rxtx), "TX");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0,
            null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.domotics_pzem004t_value = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.domotics.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/domotics_pzem004t.png", 90, 48)).appendField("PZEM-004T").appendField("#").appendField(new Blockly.FieldDropdown(profile["default"].ids), "ID").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.DOMOTICS_PZEM004T_VOLTAGE, "V"],
            [Blockly.Msg.DOMOTICS_PZEM004T_CURRENT, "I"],
            [Blockly.Msg.DOMOTICS_PZEM004T_POWER,
                "W"
            ],
            [Blockly.Msg.DOMOTICS_PZEM004T_ENERGY, "WH"]
        ]), "TYPE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.domotics_pzem004t_setaddress = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.domotics.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/domotics_pzem004t.png", 90, 48)).appendField("PZEM-004T").appendField(Blockly.Msg.DOMOTICS_PZEM004T_SETADDRESS + " #").appendField(new Blockly.FieldDropdown(profile["default"].ids), "ID");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.domotics_ina219_init = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.domotics.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/domotics_ina219.png", 90, 48)).appendField(Blockly.Msg.DOMOTICS_INA219_INIT).appendField("#").appendField(new Blockly.FieldDropdown(profile["default"].ids), "ID").appendField("I2C").appendField(new Blockly.FieldDropdown([
            ["0x40", "0x40"],
            ["0x41", "0x41"],
            ["0x42", "0x42"],
            ["0x43", "0x43"]
        ]), "ADDR");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.domotics_ina219_value = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.domotics.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/domotics_ina219.png", 90, 48)).appendField("INA219").appendField("#").appendField(new Blockly.FieldDropdown(profile["default"].ids), "ID").appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.DOMOTICS_INA219_VOLTAGE, "V"],
                [Blockly.Msg.DOMOTICS_INA219_CURRENT, "I"],
                [Blockly.Msg.DOMOTICS_INA219_POWER, "W"]
            ]),
            "TYPE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.eeprom = {};
Blockly.Blocks.eeprom.HUE = 220;
Blockly.Blocks.eeprom_read_var = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.eeprom.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.EEPROM_READ);
        this.appendValueInput("DIR", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.EEPROM_ADDRESS);
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.eeprom_write_var = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.eeprom.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.EEPROM_WRITE);
        this.appendValueInput("DIR", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.EEPROM_ADDRESS);
        this.appendValueInput("VAL", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.VALUE);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ESP = {};
Blockly.Blocks.ESP.HUE = 180;
Blockly.Blocks.esp_wdt = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.ESP.HUE);
        this.appendDummyInput().appendField("ESP WatchDogTimer");
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            ["OFF", "0"],
            ["ON", "1"]
        ]), "WDT");
        this.appendValueInput("MS", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Timeout (ms)");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.esp_wdt_reset = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.ESP.HUE);
        this.appendDummyInput().appendField("ESP WatchDogTimer Reset");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.esp_restart = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.ESP.HUE);
        this.appendDummyInput().appendField("ESP Restart");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.esp_chipid = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.ESP.HUE);
        this.appendDummyInput().appendField("ESP Chip ID");
        this.setInputsInline(!0);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.esp_yield = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.ESP.HUE);
        this.appendDummyInput().appendField("ESP Yield");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.gps = {};
Blockly.Blocks.gps.HUE = 360;
Blockly.Blocks.gps_init = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=733&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.gps.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/gps.png", 40, 40)).appendField(Blockly.Msg.GPS_INIT).appendField("Rx").appendField(new Blockly.FieldDropdown(profile["default"].rxtx), "RX").appendField("Tx").appendField(new Blockly.FieldDropdown(profile["default"].rxtx), "TX");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.gps_getposition = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=733&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.gps.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/gps.png", 40, 40)).appendField(Blockly.Msg.GPS_GETPOSITION).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.GPS_LAT, "lat"],
            [Blockly.Msg.GPS_LONG, "long"]
        ]), "TYPE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.gps_getdatetime = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=733&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.gps.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/gps.png", 40, 40)).appendField(Blockly.Msg.GPS_GETDATETIME).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.GPS_DAY, "day"],
            [Blockly.Msg.GPS_MONTH, "month"],
            [Blockly.Msg.GPS_YEAR, "year"],
            [Blockly.Msg.GPS_HOUR, "hour"],
            [Blockly.Msg.GPS_MIN,
                "min"
            ],
            [Blockly.Msg.GPS_SEC, "sec"],
            [Blockly.Msg.GPS_HUND, "hund"]
        ]), "TYPE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.gps_getspeed = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=733&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.gps.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/gps.png", 40, 40)).appendField(Blockly.Msg.GPS_GETSPEED).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.GPS_KMPH, "kmph"],
            [Blockly.Msg.GPS_MPH, "mph"]
        ]), "TYPE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.gps_getaltitude = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=733&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.gps.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/gps.png", 40, 40)).appendField(Blockly.Msg.GPS_GETALTITUDE);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.gps_getcourse = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=733&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.gps.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/gps.png", 40, 40)).appendField(Blockly.Msg.GPS_GETCOURSE);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.gps_validdata = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=733&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.gps.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/gps.png", 40, 40)).appendField(Blockly.Msg.GPS_VALIDDATA);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.gps_distancebetween = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=733&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.gps.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/gps.png", 40, 40)).appendField(Blockly.Msg.GPS_DISTANCEBETWEEN);
        this.appendValueInput("LAT1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.GPS_LAT);
        this.appendValueInput("LON1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.GPS_LONG);
        this.appendDummyInput("").appendField(Blockly.Msg.AND);
        this.appendValueInput("LAT2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.GPS_LAT);
        this.appendValueInput("LON2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.GPS_LONG);
        this.setInputsInline(!1);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.io = {};
Blockly.Blocks.io.HUE = 230;
Blockly.Blocks.io_pinmode = {
    helpUrl: "https://www.arduino.cc/reference/en/language/functions/digital-io/pinmode/",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.setColour(Blockly.Blocks.io.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.IO_PINMODE).setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR").appendField(Blockly.Msg.IO_PINMODE_AS).appendField(new Blockly.FieldDropdown([
            ["OUTPUT", "OUTPUT"],
            ["INPUT", "INPUT"],
            ["INPUT_PULLUP",
                "INPUT_PULLUP"
            ]
        ]), "MODE");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.io_digital_write = {
    helpUrl: "http://arduino.cc/en/Reference/DigitalWrite",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.setColour(Blockly.Blocks.io.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.IO_DIGITAL_WRITE + " " + Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN").appendField(Blockly.Msg.LOGIC_STAT).appendField(new Blockly.FieldDropdown(profile["default"].logic_levels), "STAT");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0,
            null)
    }
};
Blockly.Blocks.io_digital_write2 = {
    helpUrl: "http://arduino.cc/en/Reference/DigitalWrite",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.setColour(Blockly.Blocks.io.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.IO_DIGITAL_WRITE);
        this.appendValueInput("PIN", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PIN);
        this.appendValueInput("STAT", "Boolean").setCheck("Boolean").setAlign(Blockly.ALIGN_RIGHT).appendField("");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0,
            null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.io_digital_read = {
    helpUrl: "http://arduino.cc/en/Reference/DigitalRead",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.IO_DIGITAL_READ + " " + Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.io_digital_read2 = {
    helpUrl: "http://arduino.cc/en/Reference/DigitalRead",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.IO_DIGITAL_READ);
        this.appendValueInput("PIN", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PIN);
        this.setInputsInline(!0);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.io_analog_write = {
    helpUrl: "http://arduino.cc/en/Reference/AnalogWrite",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.IO_ANALOG_WRITE + " " + Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].PWM), "PIN");
        this.appendValueInput("NUM", "Number").appendField(Blockly.Msg.VALUE).setCheck("Number");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null);
        this.setTooltip("0 - 255")
    }
};
Blockly.Blocks.io_analog_write2 = {
    helpUrl: "http://arduino.cc/en/Reference/AnalogWrite",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.IO_ANALOG_WRITE);
        this.appendValueInput("PIN", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PIN);
        this.appendValueInput("NUM", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.VALUE);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0,
            null);
        this.setTooltip("0 - 255")
    }
};
Blockly.Blocks.io_analog_read = {
    helpUrl: "http://arduino.cc/en/Reference/AnalogRead",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.IO_ANALOG_READ + " " + Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN");
        this.setOutput(!0, "Number");
        this.setTooltip("0 - 1023")
    }
};
Blockly.Blocks.io_analog_read2 = {
    helpUrl: "http://arduino.cc/en/Reference/AnalogRead",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.IO_ANALOG_READ);
        this.appendValueInput("PIN", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PIN + " A");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number");
        this.setTooltip("0 - 1023")
    }
};
Blockly.Blocks.io_pulsein = {
    helpUrl: "http://arduino.cc/en/Reference/PulseIn",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.IO_PULSEIN).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].logic_levels), "STAT");
        this.appendValueInput("TIMEOUT", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.IO_PULSEIN_TIMEOUT);
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.io_interrupt = {
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.IO_INTERRUPT).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].intPins), "PIN").appendField(new Blockly.FieldDropdown([
            ["RISING ", "RISING"],
            ["FALLING", "FALLING"],
            ["CHANGE ", "CHANGE"],
            ["LOW ", "LOW"]
        ]), "MODE");
        this.appendStatementInput("DO");
        this.setInputsInline(!1);
        this.setPreviousStatement(!1);
        this.setNextStatement(!1)
    }
};
Blockly.Blocks.io_digital_write_i2c = {
    helpUrl: "https://www.luisllamas.es/mas-pines-digitales-con-arduino-y-el-expansor-es-i2c-pcf8574/",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.setTooltip("PCF8574 - I2C");
        this.appendDummyInput().appendField(Blockly.Msg.IO_DIGITAL_WRITE + " - I2C").appendField(new Blockly.FieldDropdown([
            ["0x20", "0x20"],
            ["0x21", "0x21"],
            ["0x22", "0x22"],
            ["0x23", "0x23"],
            ["0x24", "0x24"],
            ["0x25", "0x25"],
            ["0x26", "0x26"],
            ["0x27", "0x27"],
            ["0x38", "0x38"],
            ["0x39", "0x39"],
            ["0x40",
                "0x40"
            ],
            ["0x41", "0x41"],
            ["0x42", "0x42"],
            ["0x43", "0x44"],
            ["0x45", "0x46"],
            ["0x47", "0x47"]
        ]), "ADDR").appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown([
            ["0", "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"]
        ]), "PIN").appendField(Blockly.Msg.LOGIC_STAT).appendField(new Blockly.FieldDropdown(profile["default"].logic_levels), "STAT");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.io_digital_write2_i2c = {
    helpUrl: "https://www.luisllamas.es/mas-pines-digitales-con-arduino-y-el-expansor-es-i2c-pcf8574/",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.setTooltip("PCF8574 - I2C");
        this.appendDummyInput().appendField(Blockly.Msg.IO_DIGITAL_WRITE + " - I2C").appendField(new Blockly.FieldDropdown([
            ["0x20", "0x20"],
            ["0x21", "0x21"],
            ["0x22", "0x22"],
            ["0x23", "0x23"],
            ["0x24", "0x24"],
            ["0x25", "0x25"],
            ["0x26", "0x26"],
            ["0x27", "0x27"],
            ["0x38", "0x38"],
            ["0x39", "0x39"],
            ["0x40",
                "0x40"
            ],
            ["0x41", "0x41"],
            ["0x42", "0x42"],
            ["0x43", "0x44"],
            ["0x45", "0x46"],
            ["0x47", "0x47"]
        ]), "ADDR");
        this.appendValueInput("PIN", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PIN);
        this.appendValueInput("STAT", "Boolean").setCheck("Boolean").setAlign(Blockly.ALIGN_RIGHT).appendField("");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.io_digital_read_i2c = {
    helpUrl: "http://arduino.cc/en/Reference/DigitalRead",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.setTooltip("PCF8574 - I2C");
        this.appendDummyInput().appendField(Blockly.Msg.IO_DIGITAL_READ + " - I2C").appendField(new Blockly.FieldDropdown([
            ["0x20", "0x20"],
            ["0x21", "0x21"],
            ["0x22", "0x22"],
            ["0x23", "0x23"],
            ["0x24", "0x24"],
            ["0x25", "0x25"],
            ["0x26", "0x26"],
            ["0x27", "0x27"],
            ["0x38", "0x38"],
            ["0x39", "0x39"],
            ["0x40", "0x40"],
            ["0x41", "0x41"],
            ["0x42", "0x42"],
            ["0x43",
                "0x44"
            ],
            ["0x45", "0x46"],
            ["0x47", "0x47"]
        ]), "ADDR").appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown([
            ["0", "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"]
        ]), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.io_digital_read2_i2c = {
    helpUrl: "http://arduino.cc/en/Reference/DigitalRead",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.setTooltip("PCF8574 - I2C");
        this.appendDummyInput().appendField(Blockly.Msg.IO_DIGITAL_READ + " - I2C").appendField(new Blockly.FieldDropdown([
            ["0x20", "0x20"],
            ["0x21", "0x21"],
            ["0x22", "0x22"],
            ["0x23", "0x23"],
            ["0x24", "0x24"],
            ["0x25", "0x25"],
            ["0x26", "0x26"],
            ["0x27", "0x27"],
            ["0x38", "0x38"],
            ["0x39", "0x39"],
            ["0x40", "0x40"],
            ["0x41", "0x41"],
            ["0x42", "0x42"],
            ["0x43",
                "0x44"
            ],
            ["0x45", "0x46"],
            ["0x47", "0x47"]
        ]), "ADDR");
        this.appendValueInput("PIN", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PIN);
        this.setInputsInline(!0);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.io_analog_write_i2c = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=657&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.IO_ANALOG_WRITE + " - I2C (PCA9685)").appendField(new Blockly.FieldDropdown([
            ["0x40", "0x40"],
            ["0x41", "0x41"],
            ["0x42", "0x42"],
            ["0x43", "0x43"],
            ["0x44", "0x44"],
            ["0x45", "0x45"],
            ["0x46", "0x46"],
            ["0x47", "0x47"]
        ]), "ADDR").appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown([
            ["0",
                "0"
            ],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["14", "14"],
            ["15", "15"]
        ]), "PIN");
        this.appendValueInput("NUM", "Number").appendField(Blockly.Msg.VALUE).setCheck("Number");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null);
        this.setTooltip("0 - 4095")
    }
};
Blockly.Blocks.io_analog_write2_i2c = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=657&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.io.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.IO_ANALOG_WRITE + " - I2C (PCA9685)").appendField(new Blockly.FieldDropdown([
            ["0x40", "0x40"],
            ["0x41", "0x41"],
            ["0x42", "0x42"],
            ["0x43", "0x43"],
            ["0x44", "0x44"],
            ["0x45", "0x45"],
            ["0x46", "0x46"],
            ["0x47", "0x47"]
        ]), "ADDR");
        this.appendValueInput("PIN", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PIN);
        this.appendValueInput("NUM", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.VALUE);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null);
        this.setTooltip("0 - 4095")
    }
};
Blockly.Blocks.keyboardmouse = {};
Blockly.Blocks.keyboardmouse.HUE = 85;
Blockly.Blocks.keyboard_code = {
    init: function() {
        this.setColour(Blockly.Blocks.keyboardmouse.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keycode.png", 22, 22)).appendField(new Blockly.FieldDropdown([
            ["a", "a"],
            ["b", "b"],
            ["c", "c"],
            ["d", "d"],
            ["e", "e"],
            ["f", "f"],
            ["g", "g"],
            ["h", "h"],
            ["i", "i"],
            ["j", "j"],
            ["k", "k"],
            ["l", "l"],
            ["m", "m"],
            ["n", "n"],
            ["o", "o"],
            ["p", "p"],
            ["q", "q"],
            ["r", "r"],
            ["s", "s"],
            ["t", "t"],
            ["u", "u"],
            ["v", "v"],
            ["w", "w"],
            ["x", "x"],
            ["y", "y"],
            ["z",
                "z"
            ],
            ["A", "A"],
            ["B", "B"],
            ["C", "C"],
            ["D", "D"],
            ["E", "E"],
            ["F", "F"],
            ["G", "G"],
            ["H", "H"],
            ["I", "I"],
            ["J", "J"],
            ["K", "K"],
            ["L", "L"],
            ["M", "M"],
            ["N", "N"],
            ["O", "O"],
            ["P", "P"],
            ["Q", "Q"],
            ["R", "R"],
            ["S", "S"],
            ["T", "T"],
            ["U", "U"],
            ["V", "V"],
            ["W", "W"],
            ["X", "X"],
            ["Y", "Y"],
            ["Z", "Z"],
            ["0", "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["!", "!"],
            ['"', '"'],
            ["#", "#"],
            ["$", "$"],
            ["%", "%"],
            ["&", "&"],
            ["(", "("],
            [")", ")"],
            ["*", "*"],
            ["+", "+"],
            ["-", "-"],
            [".", "."],
            ["/", "/"],
            ["{", "}"],
            ["|", "|"],
            ["\\", "\\"],
            ["[", "["],
            ["@", "@"],
            ["]", "]"],
            ["^", "^"],
            ["_", "_"],
            [":", ":"],
            [";", ";"],
            [",", ","],
            ["<", "<"],
            [">", ">"],
            ["?", "?"],
            ["SPACE", " "],
            ["LEFT CTRL", "0x80"],
            ["LEFT SHIFT", "0x81"],
            ["LEFT ALT", "0x82"],
            ["LEFT GUI", "0x83"],
            ["RIGHT CTRL", "0x84"],
            ["RIGHT SHIFT", "0x85"],
            ["RIGHT ALT", "0x86"],
            ["RIGHT GUI", "0x87"],
            ["UP ARROW", "0xDA"],
            ["DOWN ARROW", "0xD9"],
            ["LEFT ARROW", "0xD8"],
            ["RIGHT ARROW", "0xD7"],
            ["BACKSPACE", "0xB2"],
            ["TAB", "0xB3"],
            ["RETURN", "0xB0"],
            ["ESC", "0xB1"],
            ["INSERT", "0xD1"],
            ["DELETE", "0xD4"],
            ["PAGE UP", "0xD3"],
            ["PAGE DOWN", "0xD6"],
            ["HOME", "0xD2"],
            ["END", "0xD5"],
            ["CAPS_LOCK", "0xC1"],
            ["F1", "0xC2"],
            ["F2", "0xC3"],
            ["F3", "0xC4"],
            ["F4", "0xC5"],
            ["F5", "0xC6"],
            ["F6", "0xC7"],
            ["F7", "0xC8"],
            ["F8", "0xC9"],
            ["F9", "0xCA"],
            ["F10", "0xCB"],
            ["F11", "0xCC"],
            ["F12", "0xCD"]
        ]), "CHAR");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.keyboard_key = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.keyboardmouse.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.KEYBOARD).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keyboard.png", 30, 22));
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.KEYBOARD_KEYSTROKE, "WRITE"],
            [Blockly.Msg.KEYBOARD_PRESS, "PRESS"],
            [Blockly.Msg.KEYBOARD_RELEASE, "RELEASE"]
        ]), "TYPE");
        this.appendValueInput("KEYCODE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.keyboard_print = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.keyboardmouse.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.KEYBOARD).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keyboard.png", 30, 22));
        this.appendDummyInput("").appendField(Blockly.Msg.SERIAL_PRINT);
        this.appendValueInput("STRINGOUTPUT", "String");
        this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "NEWLINE").appendField(Blockly.Msg.ADD_NEW_LINE);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mouse_press = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.keyboardmouse.HUE + 10);
        this.appendDummyInput("").appendField(Blockly.Msg.MOUSE).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mouse.png", 29, 24));
        this.appendDummyInput("").appendField(Blockly.Msg.MOUSE_BUTTON).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MOUSE_CLICK, "CLICK"],
            [Blockly.Msg.KEYBOARD_PRESS, "PRESS"],
            [Blockly.Msg.KEYBOARD_RELEASE, "RELEASE"]
        ]), "TYPE").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.LEFT,
                "MOUSE_LEFT"
            ],
            [Blockly.Msg.RIGHT, "MOUSE_RIGHT"],
            [Blockly.Msg.MOUSE_MIDDLE, "MOUSE_MIDDLE"]
        ]), "BUTTON");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mouse_move = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.keyboardmouse.HUE + 10);
        this.appendDummyInput("").appendField(Blockly.Msg.MOUSE).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mouse.png", 29, 24));
        this.appendDummyInput("").appendField(Blockly.Msg.MOUSE_MOVE).appendField(new Blockly.FieldDropdown([
            ["X", "X"],
            ["Y", "Y"],
            [Blockly.Msg.MOUSE_WHEEL, "WHEEL"]
        ]), "TYPE");
        this.appendValueInput("N", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.keybot = {};
Blockly.Blocks.keybot.HUE = 60;
Blockly.Blocks.keybot_move = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/8",
    init: function() {
        this.setColour(Blockly.Blocks.keybot.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keybot_move.png", 66, 42)).appendField(Blockly.Msg.KEYBOT_MOVE);
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.KEYBOT_MOVE_FORWARD, "1"],
            [Blockly.Msg.KEYBOT_MOVE_BACKWARD, "2"],
            [Blockly.Msg.KEYBOT_MOVE_LEFT,
                "3"
            ],
            [Blockly.Msg.KEYBOT_MOVE_RIGHT, "4"],
            [Blockly.Msg.KEYBOT_MOVE_ROTATE_LEFT, "5"],
            [Blockly.Msg.KEYBOT_MOVE_ROTATE_RIGHT, "6"],
            [Blockly.Msg.KEYBOT_MOVE_STOP, "0"]
        ]), "MOV");
        this.appendDummyInput("").appendField(" ");
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.KEYBOT_MOVE_VERYFAST, "VERYFAST"],
            [Blockly.Msg.KEYBOT_MOVE_FAST, "FAST"],
            [Blockly.Msg.KEYBOT_MOVE_NORMAL, "NORMAL"],
            [Blockly.Msg.KEYBOT_MOVE_SLOW, "SLOW"],
            [Blockly.Msg.KEYBOT_MOVE_VERYSLOW,
                "VERYSLOW"
            ]
        ]), "SPEED");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.keybot_motor = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks.keybot.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keybot_motor.png", 66, 42)).appendField(Blockly.Msg.KEYBOT_MOTOR);
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.KEYBOT_LEFT, "0"],
            [Blockly.Msg.KEYBOT_RIGHT, "1"]
        ]), "MOTOR");
        this.appendDummyInput("").appendField(" ").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.KEYBOT_MOVE_FORWARD,
                "1"
            ],
            [Blockly.Msg.KEYBOT_MOVE_BACKWARD, "2"],
            [Blockly.Msg.KEYBOT_MOVE_STOP, "0"]
        ]), "DIR");
        this.appendValueInput("SPEED", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.KEYBOT_MOVE_SPEED);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.keybot_distance = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks.keybot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keybot_distance.png", 66, 42)).appendField(Blockly.Msg.KEYBOT_DISTANCE);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.keybot_distance2 = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks.keybot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keybot_distance.png", 66, 42)).appendField(Blockly.Msg.KEYBOT_DISTANCE);
        this.appendValueInput("MAXDISTANCE", "Number").appendField(Blockly.Msg.SENSOR_ULTRASONIC_MAXDISTANCE).setCheck("Number");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.keybot_irsensor = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks.keybot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keybot_ir.png", 66, 42)).appendField(Blockly.Msg.KEYBOT_IRSENSOR + " ");
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.KEYBOT_IRSENSOR_LEFT, "LEFT"],
            [Blockly.Msg.KEYBOT_IRSENSOR_MIDDLE, "MIDDLE"],
            [Blockly.Msg.KEYBOT_IRSENSOR_RIGHT,
                "RIGHT"
            ]
        ]), "IRSENSOR");
        this.setInputsInline(!0);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.keybot_buzzer = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/5",
    init: function() {
        this.setColour(Blockly.Blocks.keybot.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keybot_buzzer.png", 66, 42)).appendField(Blockly.Msg.KEYBOT_BUZZER);
        this.appendValueInput("MS", "Number").appendField("Ms").setCheck("Number");
        this.appendValueInput("TONE", "Number").appendField(Blockly.Msg.KEYBOT_BUZZER_FREQ).setCheck("Number");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.keybot_buzzer_rttl = {
    helpUrl: "http://www.arduinoblocks.com/web/help/rtttl",
    init: function() {
        this.setColour(Blockly.Blocks.keybot.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keybot_buzzer.png", 66, 42)).appendField(Blockly.Msg.KEYBOT_BUZZER);
        this.appendDummyInput().appendField(Blockly.Msg.SOUND_PLAY + " RTTTL");
        this.appendValueInput("RTTTL", "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0,
            null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.keybot_buzzer_rttl_melody = {
    helpUrl: "http://www.arduinoblocks.com/web/help/rtttl",
    init: function() {
        this.setColour(Blockly.Blocks.keybot.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/note.png", 25, 25)).appendField("RTTTL");
        this.appendDummyInput().appendField(new Blockly.FieldDropdown([
            ["The Simpsons", ":d=4,o=5,b=160:c.6,e6,f#6,8a6,g.6,e6,c6,8a,8f#,8f#,8f#,2g,8p,8p"],
            ["Indiana Jones", ":d=4,o=5,b=250:e,8p,8f,8g,8p,1c6,8p.,d,8p,8e,1f"],
            ["Muppets",
                ":d=4,o=5,b=250:c6,c6,a,b,8a,b,g,p,c6,c6,a,8b,8a,8p,g.,p"
            ],
            ["Looney", ":d=4,o=5,b=140:32p,c6,8f6,8e6,8d6,8c6,a.,8c6,8f6,8e6,8d6,8d#6,e.6"],
            ["20th Century Fox", ":d=16,o=5,b=180:b,8p,b,b,2b,p,c6,32p,b,32p,c6,32p,b,32p,c6,32p,b,8p,b,b,b,32p,b,32p,b,32p,b,32p,b,32p,b,32p,b,32p,g#,32p,a,32p,b,8p"],
            ["Star Wars", ":d=4,o=5,b=45:32p,32f#,32f#,32f#,8b.,8f#.6,32e6,32d#6,32c#6,8b.6,16f#.6,32e6,32d#6,32c#6,8b.6,16f#.6,32e6,32d#6,32e6,8c#.6"],
            ["A-Team", ":d=8,o=5,b=125:4d#6,a#,2d#6,16p,g#,4a#,4d#.,p,16g,16a#,d#6,a#,f6,2d#6,16p,c#.6,16c6,16a#,g#.,2a#"],
            ["Mission Impossible", ":d=16,o=6,b=95:g,8p,g,8p,a#,p,c7,p,g,8p,g,8p,f,p,f#,p,g,8p,g,8p,a#,p,c7,p,g,8p,g,8p,f,p,f#"],
            ["Gadget", ":d=16,o=5,b=50:32d#,32f,32f#,32g#,a#,f#,a,f,g#,f#,32d#,32f,32f#,32g#,a#,d#6,4d6"],
            ["Bubble Bobble", ":d=4,o=5,b=125:8a#6,8a6,8g.6,16f6,8a6,8g6,8f6,8d#6,8g6,8f6,16d#6,8d.6,f.6"],
            ["Arkanoid", ":d=4,o=5,b=140:8g6,16p,16g.6,2a#6,32p,8a6,8g6,8f6,8a6,2g6"],
            ["Donkey Kong", ":d=4,o=5,b=160:2c,8d.,d#.,c.,16b,16c6,16b,16c6,16b,16c6,16b,16c6,16b,16c6,16b,16c6,16b,2c6"],
            ["Pac-Man", ":d=4,o=5,b=112:16p,32d#6,32e6,32f6,32p,32f6,32f#6,32g6,32p,32g6,32g#6,32a6,32p,32b.6"],
            ["Tetris", ":d=4,o=5,b=160:e6,8b,8c6,8d6,16e6,16d6,8c6,8b,a,8a,8c6,e6,8d6,8c6,b,8b,8c6,d6,e6,c6,a,2a,8p"],
            ["Super Mario", ":d=4,o=5,b=100:16e6,16e6,32p,8e6,16c6,8e6,8g6,8p"],
            ["Addams Family", ":d=4,o=5,b=160:8c,8d,8e,8f,1p,8d,8e,8f#,8g,1p,8d,8e,8f#,8g,p,8d,8e,8f#,8g,p,8c,8d,8e,8f"],
            ["Popeye", ":d=4,o=5,b=120:8p,16a,16f,16a,16c6,16b,16a,16g,16a,16g,8e,16g,16g,16g,16g,8a,16b,32c6,32b,32c6,32b,32c6,32b,8c6"],
            ["Beethoven", ":d=4,o=5,b=140:8e6,8d#6,8e6,8d#6,8e6,8b,8d6,8c6,a,8p,8c,8e,8a,b,8p,8e,8g#,8b,c6"],
            ["Ghostbusters", ":d=4,o=5,b=250:8g,8g,4b,4g,4a,4f,1p,8g,8g,8g,8g,4f,4g,2p,4p"]
        ]), "RTTTL_MELODY");
        this.setInputsInline(!0);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.keypad = {};
Blockly.Blocks.keypad.HUE = 75;
Blockly.Blocks.keypad_init = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=652&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.keypad.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.KEYPAD).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keypad34.png", 32, 32));
        this.appendDummyInput().appendField(Blockly.Msg.KEYPAD_ROW + "-1").appendField(new Blockly.FieldDropdown(profile["default"].digital), "ROW1").appendField(Blockly.Msg.KEYPAD_ROW + "-2").appendField(new Blockly.FieldDropdown(profile["default"].digital),
            "ROW2").appendField(Blockly.Msg.KEYPAD_ROW + "-3").appendField(new Blockly.FieldDropdown(profile["default"].digital), "ROW3").appendField(Blockly.Msg.KEYPAD_ROW + "-4").appendField(new Blockly.FieldDropdown(profile["default"].digital), "ROW4");
        this.appendDummyInput().appendField(Blockly.Msg.KEYPAD_COL + "-1").appendField(new Blockly.FieldDropdown(profile["default"].digital), "COL1").appendField(Blockly.Msg.KEYPAD_COL + "-2").appendField(new Blockly.FieldDropdown(profile["default"].digital), "COL2").appendField(Blockly.Msg.KEYPAD_COL +
            "-3").appendField(new Blockly.FieldDropdown(profile["default"].digital), "COL3");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.keypad_init_34 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=652&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.keypad.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.KEYPAD + " (3x4)").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keypad34.png", 32, 32));
        this.appendDummyInput().appendField(Blockly.Msg.KEYPAD_ROW + "-1").appendField(new Blockly.FieldDropdown(profile["default"].digital), "ROW1").appendField(Blockly.Msg.KEYPAD_ROW +
            "-2").appendField(new Blockly.FieldDropdown(profile["default"].digital), "ROW2").appendField(Blockly.Msg.KEYPAD_ROW + "-3").appendField(new Blockly.FieldDropdown(profile["default"].digital), "ROW3").appendField(Blockly.Msg.KEYPAD_ROW + "-4").appendField(new Blockly.FieldDropdown(profile["default"].digital), "ROW4");
        this.appendDummyInput().appendField(Blockly.Msg.KEYPAD_COL + "-1").appendField(new Blockly.FieldDropdown(profile["default"].digital), "COL1").appendField(Blockly.Msg.KEYPAD_COL + "-2").appendField(new Blockly.FieldDropdown(profile["default"].digital),
            "COL2").appendField(Blockly.Msg.KEYPAD_COL + "-3").appendField(new Blockly.FieldDropdown(profile["default"].digital), "COL3");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.keypad_init_44 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=652&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.keypad.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.KEYPAD + " (4x4)").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keypad44.png", 32, 32));
        this.appendDummyInput().appendField(Blockly.Msg.KEYPAD_ROW + "-1").appendField(new Blockly.FieldDropdown(profile["default"].digital), "ROW1").appendField(Blockly.Msg.KEYPAD_ROW +
            "-2").appendField(new Blockly.FieldDropdown(profile["default"].digital), "ROW2").appendField(Blockly.Msg.KEYPAD_ROW + "-3").appendField(new Blockly.FieldDropdown(profile["default"].digital), "ROW3").appendField(Blockly.Msg.KEYPAD_ROW + "-4").appendField(new Blockly.FieldDropdown(profile["default"].digital), "ROW4");
        this.appendDummyInput().appendField(Blockly.Msg.KEYPAD_COL + "-1").appendField(new Blockly.FieldDropdown(profile["default"].digital), "COL1").appendField(Blockly.Msg.KEYPAD_COL + "-2").appendField(new Blockly.FieldDropdown(profile["default"].digital),
            "COL2").appendField(Blockly.Msg.KEYPAD_COL + "-3").appendField(new Blockly.FieldDropdown(profile["default"].digital), "COL3").appendField(Blockly.Msg.KEYPAD_COL + "-4").appendField(new Blockly.FieldDropdown(profile["default"].digital), "COL4");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.keypad_getkey = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=652&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.keypad.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.KEYPAD).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keypadkey.png", 24, 24)).appendField(Blockly.Msg.KEYPAD_KEY);
        this.setOutput(!0, "Number");
        this.setInputsInline(!0)
    }
};
Blockly.Blocks.keypad_getkey_str = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=652&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.keypad.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.KEYPAD).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keypadkey.png", 24, 24)).appendField(Blockly.Msg.KEYPAD_KEY + " (" + Blockly.Msg.AS_STRING + ")");
        this.setOutput(!0, "String");
        this.setInputsInline(!0)
    }
};
Blockly.Blocks.keypad_key = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=652&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.keypad.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.KEYPAD).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/keypadkeyblank.png", 24, 24)).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.KEYPAD_NOKEY, "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["*", "10"],
            ["0", "11"],
            ["#", "12"],
            ["A", "13"],
            ["B", "14"],
            ["C", "15"],
            ["D", "16"]
        ]), "KEY");
        this.setOutput("Number")
    }
};
Blockly.Blocks.lcd = {};
Blockly.Blocks.lcd.HUE = 140;
Blockly.Blocks.lcd_begin = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=653&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.LCD + " " + Blockly.Msg.LCD_BEGIN).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/lcd2.png", 120, 45)).appendField(new Blockly.FieldDropdown([
            ["2x16", "2x16"],
            ["4x20", "4x20"]
        ]), "SIZE").appendField(Blockly.Msg.PIN + " Rs").appendField(new Blockly.FieldDropdown(profile["default"].digital), "RS_PIN").appendField(Blockly.Msg.PIN +
            " En").appendField(new Blockly.FieldDropdown(profile["default"].digital), "ENABLE_PIN").appendField(Blockly.Msg.PIN + " D4").appendField(new Blockly.FieldDropdown(profile["default"].digital), "D4_PIN").appendField(Blockly.Msg.PIN + " D5").appendField(new Blockly.FieldDropdown(profile["default"].digital), "D5_PIN").appendField(Blockly.Msg.PIN + " D6").appendField(new Blockly.FieldDropdown(profile["default"].digital), "D6_PIN").appendField(Blockly.Msg.PIN + " D7").appendField(new Blockly.FieldDropdown(profile["default"].digital),
            "D7_PIN");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.lcd_begin_i2c = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=653&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.LCD + " " + Blockly.Msg.LCD_BEGIN + " (I2C)").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/lcd2_i2c.png", 130, 45)).appendField(new Blockly.FieldDropdown([
            ["2x16", "2x16"],
            ["4x20", "4x20"]
        ]), "SIZE").appendField("ADDR").appendField(new Blockly.FieldDropdown([
            ["0x20", "0x20"],
            ["0x21", "0x21"],
            ["0x22", "0x22"],
            ["0x23", "0x23"],
            ["0x24", "0x24"],
            ["0x25", "0x25"],
            ["0x26", "0x26"],
            ["0x27 *", "0x27"],
            ["0x38", "0x39"],
            ["0x3A", "0x3A"],
            ["0x3B", "0x3B"],
            ["0x3C", "0x3C"],
            ["0x3D", "0x3D"],
            ["0x3E", "0x3E"],
            ["0x3F *", "0x3F"]
        ]), "ADDR");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.lcd_begin_i2c_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=653&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/lcd2_i2c_EP.png", 137, 50)).appendField(Blockly.Msg.LCD + " " + Blockly.Msg.LCD_BEGIN).appendField(new Blockly.FieldDropdown([
            ["2x16", "2x16"],
            ["4x20", "4x20"]
        ]), "SIZE").appendField("ADDR").appendField(new Blockly.FieldDropdown([
            ["0x20", "0x20"],
            ["0x21", "0x21"],
            ["0x22", "0x22"],
            ["0x23", "0x23"],
            ["0x24", "0x24"],
            ["0x25", "0x25"],
            ["0x26", "0x26"],
            ["0x27 *", "0x27"],
            ["0x38", "0x39"],
            ["0x3A", "0x3A"],
            ["0x3B", "0x3B"],
            ["0x3C", "0x3C"],
            ["0x3D", "0x3D"],
            ["0x3E", "0x3E"],
            ["0x3F *", "0x3F"]
        ]), "ADDR");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.lcd_customchar = {
    helpUrl: "http://www.arduinoblocks.com/web/help/chareditor",
    init: function() {
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.LCD + " " + Blockly.Msg.LCD_DEFINE + " " + Blockly.Msg.LCD_SYMBOL).appendField(new Blockly.FieldDropdown([
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"]
        ]), "NUM").appendField(new Blockly.FieldTextInput(""), "DATA");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.lcd_print_customchar = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=653&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.LCD + " " + Blockly.Msg.LCD_PRINT).appendField(Blockly.Msg.LCD_COL).appendField(new Blockly.FieldDropdown([
            ["0", "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["14", "14"],
            ["15", "15"],
            ["16", "16"],
            ["17", "17"],
            ["18", "18"],
            ["19", "19"]
        ]), "CURSOR_COLUMN").appendField(Blockly.Msg.LCD_ROW).appendField(new Blockly.FieldDropdown([
            ["0", "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"]
        ]), "CURSOR_ROW");
        this.appendDummyInput("").appendField(Blockly.Msg.LCD_SYMBOL).appendField(new Blockly.FieldDropdown([
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"]
        ]), "NUM");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.lcd_print = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=653&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.LCD + " " + Blockly.Msg.LCD_PRINT).appendField(Blockly.Msg.LCD_COL).appendField(new Blockly.FieldDropdown([
            ["0", "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["14", "14"],
            ["15", "15"],
            ["16", "16"],
            ["17", "17"],
            ["18", "18"],
            ["19", "19"]
        ]), "CURSOR_COLUMN").appendField(Blockly.Msg.LCD_ROW).appendField(new Blockly.FieldDropdown([
            ["0", "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"]
        ]), "CURSOR_ROW");
        this.appendValueInput("STRINGOUTPUT", "String").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.lcd_print2 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=653&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.LCD + " " + Blockly.Msg.LCD_PRINT);
        this.appendValueInput("CURSOR_COLUMN", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.LCD_COL);
        this.appendValueInput("CURSOR_ROW", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.LCD_ROW);
        this.appendValueInput("STRINGOUTPUT", "String").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.lcd_print2_customchar = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=653&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.LCD + " " + Blockly.Msg.LCD_PRINT);
        this.appendValueInput("CURSOR_COLUMN", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.LCD_COL);
        this.appendValueInput("CURSOR_ROW", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.LCD_ROW);
        this.appendDummyInput("").appendField(Blockly.Msg.LCD_SYMBOL).appendField(new Blockly.FieldDropdown([
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"]
        ]), "NUM");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.lcd_clear = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=653&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.LCD + " " + Blockly.Msg.LCD_CLEAR);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.lcd_display = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=653&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.LCD + " " + Blockly.Msg.LCD_DISPLAY).appendField(new Blockly.FieldDropdown([
            ["ON", "on"],
            ["OFF", "off"]
        ]), "DISPLAY");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.lcd_backlight = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=653&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.LCD + " " + Blockly.Msg.LCD_BACKLIGHT).appendField(new Blockly.FieldDropdown([
            ["ON", "on"],
            ["OFF", "off"]
        ]), "BACKLIGHT");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.lcd_cursor = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=653&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.LCD + " " + Blockly.Msg.LCD_CURSOR).appendField(new Blockly.FieldDropdown([
            ["ON", "on"],
            ["OFF", "off"]
        ]), "CURSOR");
        this.appendDummyInput("").appendField(Blockly.Msg.LCD_BLINK).appendField(new Blockly.FieldDropdown([
            ["ON", "on"],
            ["OFF", "off"]
        ]), "BLINK");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0,
            null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix = {};
Blockly.Blocks.ledmatrix.HUE = 390;
Blockly.Blocks.ledmatrix_ids = [
    ["1", "1"],
    ["2", "2"],
    ["3", "3"],
    ["4", "4"],
    ["5", "5"],
    ["6", "6"],
    ["7", "7"],
    ["8", "8"]
];
Blockly.Blocks.ledmatrix_init = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=656&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_INIT + " I2C").appendField(new Blockly.FieldDropdown([
            ["0x70", "0x70"],
            ["0x71",
                "0x71"
            ],
            ["0x72", "0x72"],
            ["0x73", "0x73"],
            ["0x74", "0x74"],
            ["0x75", "0x75"],
            ["0x76", "0x76"],
            ["0x77", "0x77"]
        ]), "ADDR").appendField(new Blockly.FieldDropdown([
            ["v1", "0"],
            ["v2", "1"]
        ]), "TYPE");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_clear = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=656&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_CLEAR);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0,
            null)
    }
};
Blockly.Blocks.ledmatrix_drawpixel = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=656&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWPIXEL);
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y",
            "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            ["Led ON", "LED_ON"],
            ["Led OFF", "LED_OFF"]
        ]), "COL");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_drawline = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=656&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_LINE);
        this.appendValueInput("X1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X1");
        this.appendValueInput("Y1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y1");
        this.appendValueInput("X2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X2");
        this.appendValueInput("Y2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y2");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            ["Led ON", "LED_ON"],
            ["Led OFF", "LED_OFF"]
        ]), "COL");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0,
            null)
    }
};
Blockly.Blocks.ledmatrix_drawrectangle = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=656&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_RECTANGLE);
        this.appendValueInput("X1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X1");
        this.appendValueInput("Y1",
            "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y1");
        this.appendValueInput("X2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X2");
        this.appendValueInput("Y2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y2");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            ["Led ON", "LED_ON"],
            ["Led OFF", "LED_OFF"]
        ]), "COL");
        this.appendDummyInput("").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "FILL").appendField(Blockly.Msg.LEDMATRIX_FILL);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_drawcircle = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=656&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWCIRCLE);
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendValueInput("R", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("R");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            ["Led ON", "LED_ON"],
            ["Led OFF", "LED_OFF"]
        ]), "COL");
        this.appendDummyInput("").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "FILL").appendField(Blockly.Msg.LEDMATRIX_FILL);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0,
            null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_drawtext = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=656&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWTEXT);
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendValueInput("TXT", "String");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            ["Led ON", "LED_ON"],
            ["Led OFF", "LED_OFF"]
        ]), "COL");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_drawbitmap = {
    helpUrl: "http://www.arduinoblocks.com/web/help/ledmatrixeditor",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWBITMAP).appendField(new Blockly.FieldTextInput(""), "DATA");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_drawsprite = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=656&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWBITMAP).appendField(new Blockly.FieldDropdown([
            ["Face normal", "face_normal"],
            ["Face happy", "face_happy"],
            ["Face sad", "face_sad"],
            ["Face angry", "face_angry"],
            ["Eye normal", "eye_normal"],
            ["Eye medium", "eye_medium"],
            ["Eye small", "eye_small"],
            ["Eye closed", "eye_closed"],
            ["Eye look left", "eye_lookL"],
            ["Eye look right", "eye_lookR"],
            ["Eye look up", "eye_lookU"],
            ["Eye look down", "eye_lookD"],
            ["Eye angry left", "eye_angryL"],
            ["Eye angry right", "eye_angryR"],
            ["Eye sad", "eye_sad"],
            ["Eye surprise", "eye_surprise"],
            ["Icon heart", "icon_heart"],
            ["Icon user", "icon_user"],
            ["Icon clock", "icon_clock"],
            ["Icon arrow up", "icon_arrowU"],
            ["Icon arrow down", "icon_arrowD"],
            ["Icon arrow left", "icon_arrowL"],
            ["Icon arrow right", "icon_arrowR"],
            ["Icon headphones", "icon_headphones"],
            ["Icon ray", "icon_ray"],
            ["Icon invader", "icon_invader"],
            ["Icon moon", "icon_moon"],
            ["Icon glasses", "icon_glasses"],
            ["Icon castle", "icon_castle"],
            ["Icon smile", "icon_smile"],
            ["Icon planet", "icon_planet"],
            ["Icon star", "icon_star"],
            ["Icon cup", "icon_cup"],
            ["Icon home", "icon_home"],
            ["Battery empty", "battery_empty"],
            ["Battery medium",
                "battery_medium"
            ],
            ["Battery full", "battery_full"]
        ]), "SPRITE");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_rotation = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=680&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_ROTATION).appendField(new Blockly.FieldDropdown([
            ["0\u00ba", "0"],
            ["90\u00ba",
                "1"
            ],
            ["180\u00ba", "2"],
            ["-90\u00ba", "3"]
        ]), "ROT");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_show = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=680&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_SHOW);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0,
            null)
    }
};
Blockly.Blocks.ledmatrix_init_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=577&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix_EP.png", 99, 65)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_INIT + " I2C").appendField(new Blockly.FieldDropdown([
            ["0x70", "0x70"],
            ["0x71", "0x71"],
            ["0x72", "0x72"],
            ["0x73", "0x73"],
            ["0x74", "0x74"],
            ["0x75", "0x75"],
            ["0x76", "0x76"],
            ["0x77", "0x77"]
        ]), "ADDR").appendField(new Blockly.FieldDropdown([
            ["v1", "0"],
            ["v2", "1"]
        ]), "TYPE");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_clear_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=577&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix_EP.png", 99, 65)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_CLEAR);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_drawpixel_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=577&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix_EP.png", 99, 65)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWPIXEL);
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            ["Led ON", "LED_ON"],
            ["Led OFF", "LED_OFF"]
        ]), "COL");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_drawline_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=577&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix_EP.png", 99, 65)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_LINE);
        this.appendValueInput("X1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X1");
        this.appendValueInput("Y1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y1");
        this.appendValueInput("X2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X2");
        this.appendValueInput("Y2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y2");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            ["Led ON", "LED_ON"],
            ["Led OFF", "LED_OFF"]
        ]), "COL");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0,
            null)
    }
};
Blockly.Blocks.ledmatrix_drawrectangle_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=577&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix_EP.png", 99, 65)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_RECTANGLE);
        this.appendValueInput("X1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X1");
        this.appendValueInput("Y1",
            "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y1");
        this.appendValueInput("X2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X2");
        this.appendValueInput("Y2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y2");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            ["Led ON", "LED_ON"],
            ["Led OFF", "LED_OFF"]
        ]), "COL");
        this.appendDummyInput("").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "FILL").appendField(Blockly.Msg.LEDMATRIX_FILL);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_drawcircle_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=577&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix_EP.png", 99, 65)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWCIRCLE);
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendValueInput("R", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("R");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            ["Led ON", "LED_ON"],
            ["Led OFF", "LED_OFF"]
        ]), "COL");
        this.appendDummyInput("").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "FILL").appendField(Blockly.Msg.LEDMATRIX_FILL);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0,
            null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_drawtext_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=577&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix_EP.png", 99, 65)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWTEXT);
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendValueInput("TXT", "String");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            ["Led ON", "LED_ON"],
            ["Led OFF", "LED_OFF"]
        ]), "COL");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_drawbitmap_EP = {
    helpUrl: "http://www.arduinoblocks.com/web/help/ledmatrixeditor",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix_EP.png", 99, 65)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWBITMAP).appendField(new Blockly.FieldTextInput(""), "DATA");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_drawsprite_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=577&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix_EP.png", 99, 65)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWBITMAP).appendField(new Blockly.FieldDropdown([
            ["Face normal", "face_normal"],
            ["Face happy", "face_happy"],
            ["Face sad", "face_sad"],
            ["Face angry", "face_angry"],
            ["Eye normal", "eye_normal"],
            ["Eye medium", "eye_medium"],
            ["Eye small", "eye_small"],
            ["Eye closed", "eye_closed"],
            ["Eye look left", "eye_lookL"],
            ["Eye look right", "eye_lookR"],
            ["Eye look up", "eye_lookU"],
            ["Eye look down", "eye_lookD"],
            ["Eye angry left", "eye_angryL"],
            ["Eye angry right", "eye_angryR"],
            ["Eye sad", "eye_sad"],
            ["Eye surprise", "eye_surprise"],
            ["Icon heart", "icon_heart"],
            ["Icon user", "icon_user"],
            ["Icon clock", "icon_clock"],
            ["Icon arrow up", "icon_arrowU"],
            ["Icon arrow down", "icon_arrowD"],
            ["Icon arrow left", "icon_arrowL"],
            ["Icon arrow right", "icon_arrowR"],
            ["Icon headphones", "icon_headphones"],
            ["Icon ray", "icon_ray"],
            ["Icon invader", "icon_invader"],
            ["Icon moon", "icon_moon"],
            ["Icon glasses", "icon_glasses"],
            ["Icon castle", "icon_castle"],
            ["Icon smile", "icon_smile"],
            ["Icon planet", "icon_planet"],
            ["Icon star", "icon_star"],
            ["Icon cup", "icon_cup"],
            ["Icon home", "icon_home"],
            ["Battery empty", "battery_empty"],
            ["Battery medium",
                "battery_medium"
            ],
            ["Battery full", "battery_full"]
        ]), "SPRITE");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_rotation_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=577&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix_EP.png", 99, 65)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_ROTATION).appendField(new Blockly.FieldDropdown([
            ["0\u00ba", "0"],
            ["90\u00ba", "1"],
            ["180\u00ba", "2"],
            ["-90\u00ba", "3"]
        ]), "ROT");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.ledmatrix_show_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=577&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.ledmatrix.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/ledmatrix_EP.png", 99, 65)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.ledmatrix_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_SHOW);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motor = {};
Blockly.Blocks.motor.HUE = 310;
Blockly.Blocks.motor_servo_move = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=700&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.MOTOR_SERVO).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/servo.png", 32, 32)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.appendValueInput("DEGREE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_SERVO_DEGREE_RANGE);
        this.appendValueInput("DELAY_TIME", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_SERVO_DELAY);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motor_servo_move_i2c = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=657&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.MOTOR_SERVO + " - I2C (PCA9685)").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/servo.png", 32, 32)).appendField(new Blockly.FieldDropdown([
            ["0x40", "0x40"],
            ["0x41", "0x41"],
            ["0x42", "0x42"],
            ["0x43", "0x43"],
            ["0x44", "0x44"],
            ["0x45", "0x45"],
            ["0x46", "0x46"],
            ["0x47",
                "0x47"
            ]
        ]), "ADDR").appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown([
            ["0", "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["14", "14"],
            ["15", "15"]
        ]), "PIN");
        this.appendValueInput("DEGREE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_SERVO_DEGREE_RANGE);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motor_servo_move_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=700&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/servo_EP.png", 85, 52)).appendField(Blockly.Msg.MOTOR_SERVO).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.appendValueInput("DEGREE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_SERVO_DEGREE_RANGE);
        this.appendValueInput("DELAY_TIME", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_SERVO_DELAY);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motor_servo_read_degrees = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=700&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.MOTOR_SERVO).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/servo.png", 32, 32)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].PWM), "PIN");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.motor_servo_oscillator_set = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=700&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.MOTOR_SERVO_OSCILLATOR).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/servo_oscillator.png", 73, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MOTOR_SERVO_OSCILLATOR_AMPLITUDE,
                "A"
            ],
            [Blockly.Msg.MOTOR_SERVO_OSCILLATOR_PHASE, "P"],
            [Blockly.Msg.MOTOR_SERVO_OSCILLATOR_OFFSET, "O"],
            [Blockly.Msg.MOTOR_SERVO_OSCILLATOR_PERIOD, "T"]
        ]), "TYPE");
        this.appendValueInput("VALUE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motor_servo_oscillator_action = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=700&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.MOTOR_SERVO_OSCILLATOR).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/servo_oscillator.png", 73, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MOTOR_SERVO_OSCILLATOR_REFRESH,
                "UPDATE"
            ],
            [Blockly.Msg.MOTOR_SERVO_OSCILLATOR_START, "START"],
            [Blockly.Msg.MOTOR_SERVO_OSCILLATOR_STOP, "STOP"],
            [Blockly.Msg.MOTOR_SERVO_OSCILLATOR_RESET, "RESET"]
        ]), "TYPE");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motor_servo_oscillator_refresh = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=700&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.MOTOR_SERVO_OSCILLATOR).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/servo_oscillator.png", 73, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN").appendField(Blockly.Msg.MOTOR_SERVO_OSCILLATOR_REFRESH);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motor_stepper_init = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=671&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE + 10);
        this.appendDummyInput().appendField(Blockly.Msg.MOTOR_STEPPER).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/stepper.png", 32, 32)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(profile["default"].ids), "ID");
        this.appendValueInput("STEPS", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_STEPPER_STEPS);
        this.appendDummyInput().appendField(Blockly.Msg.PIN + "-1").appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN1").appendField(Blockly.Msg.PIN + "-2").appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN2").appendField(Blockly.Msg.PIN + "-3").appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN3").appendField(Blockly.Msg.PIN + "-4").appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN4");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0,
            null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motor_stepper_setspeed = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=671&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE + 10);
        this.appendDummyInput().appendField(Blockly.Msg.MOTOR_STEPPER).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/stepper.png", 32, 32)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown([
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"]
        ]), "ID");
        this.appendValueInput("RPM", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_STEPPER_RPM);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motor_stepper_step = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=671&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE + 10);
        this.appendDummyInput().appendField(Blockly.Msg.MOTOR_STEPPER).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/stepper.png", 32, 32)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown([
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"]
        ]), "ID");
        this.appendValueInput("STEP", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_STEPPER_STEP);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motor_l298n_init = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=698&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE + 20);
        this.appendDummyInput("").appendField(Blockly.Msg.MOTOR_LM298N + " " + Blockly.Msg.MOTOR_LM298N_INIT).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/l298n_2wd.png", 80, 38));
        this.appendDummyInput("").appendField(" EN-A").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(profile["default"].PWM), "EN-A");
        this.appendDummyInput("").appendField(" IN1").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(profile["default"].digital), "IN1");
        this.appendDummyInput("").appendField(" IN2").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(profile["default"].digital), "IN2");
        this.appendDummyInput("").appendField(" IN3").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(profile["default"].digital), "IN3");
        this.appendDummyInput("").appendField(" IN4").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(profile["default"].digital),
            "IN4");
        this.appendDummyInput("").appendField(" EN-B").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(profile["default"].PWM), "EN-B");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motor_l298n_move = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=698&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE + 20);
        this.appendDummyInput("").appendField(Blockly.Msg.MOTOR_LM298N + " " + Blockly.Msg.MOTOR_LM298N_MOVE).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/l298n_2wd.png", 80, 38));
        this.appendDummyInput("").appendField(Blockly.Msg.MOTOR_LM298N_MOTOR).setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            ["A",
                "A"
            ],
            ["B", "B"]
        ]), "MOTOR");
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" ").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MOTOR_LM298N_FW, "FW"],
            [Blockly.Msg.MOTOR_LM298N_BW, "BW"]
        ]), "DIR");
        this.appendValueInput("SPEED", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_LM298N_SPEED);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motor_l298p_init = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=600&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE + 40);
        this.appendDummyInput("").appendField(Blockly.Msg.MOTOR_LM298P + " " + Blockly.Msg.MOTOR_LM298N_INIT).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/l298p_2wd.png", 80, 37));
        this.appendDummyInput("").appendField(" EN-A").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(profile["default"].PWM),
            "EN1");
        this.appendDummyInput("").appendField(" DIR-A").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(profile["default"].digital), "M1");
        this.appendDummyInput("").appendField(" EN-B").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(profile["default"].PWM), "EN2");
        this.appendDummyInput("").appendField(" DIR-B").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(profile["default"].digital), "M2");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0,
            null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motor_l298p_move = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=600&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE + 40);
        this.appendDummyInput("").appendField(Blockly.Msg.MOTOR_LM298P + " " + Blockly.Msg.MOTOR_LM298N_MOVE).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/l298p_2wd.png", 80, 37));
        this.appendDummyInput("").appendField(Blockly.Msg.MOTOR_LM298N_MOTOR).setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            ["A", "A"],
            ["B", "B"]
        ]), "MOTOR");
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" ").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MOTOR_LM298N_FW, "FW"],
            [Blockly.Msg.MOTOR_LM298N_BW, "BW"]
        ]), "DIR");
        this.appendValueInput("SPEED", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_LM298N_SPEED);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motor_dcpwm = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=698&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE + 30);
        this.appendDummyInput("").appendField("Motor DC").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/motordc.png", 48, 22));
        this.appendDummyInput().appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN1").appendField(new Blockly.FieldDropdown(profile["default"].logic_levels),
            "PIN1STATUS");
        this.appendDummyInput().appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN2").appendField(new Blockly.FieldDropdown(profile["default"].logic_levels), "PIN2STATUS");
        this.appendDummyInput().appendField(Blockly.Msg.PIN + "-PWM").appendField(new Blockly.FieldDropdown(profile["default"].PWM), "PIN3");
        this.appendValueInput("PWMVAL", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motorshield = {};
Blockly.Blocks.motor.HUE = 310;
Blockly.Blocks.motorshield_servo_move = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=700&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE);
        this.appendDummyInput().appendField("Motor-Shield").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/servo.png", 32, 32)).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MOTORSHIELD_SERVO + "-1", "1"],
            [Blockly.Msg.MOTORSHIELD_SERVO + "-2", "2"]
        ]), "ID");
        this.appendValueInput("DEGREE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_SERVO_DEGREE_RANGE);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motorshield_stepper_init = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=671&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE + 10);
        this.appendDummyInput().appendField("Motor-Shield").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/stepper.png", 32, 32)).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MOTORSHIELD_STEPPER + "-1", "1"],
            [Blockly.Msg.MOTORSHIELD_STEPPER + "-2", "2"]
        ]), "ID");
        this.appendValueInput("STEPS", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_STEPPER_STEPS);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motorshield_stepper_setspeed = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=671&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE + 10);
        this.appendDummyInput().appendField("Motor-Shield").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/stepper.png", 32, 32)).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MOTORSHIELD_STEPPER + "-1", "1"],
            [Blockly.Msg.MOTORSHIELD_STEPPER + "-2", "2"]
        ]), "ID");
        this.appendValueInput("RPM", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_STEPPER_RPM);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motorshield_stepper_step = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=671&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE + 10);
        this.appendDummyInput().appendField("Motor-Shield").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/stepper.png", 32, 32)).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MOTORSHIELD_STEPPER + "-1", "1"],
            [Blockly.Msg.MOTORSHIELD_STEPPER + "-2", "2"]
        ]), "ID");
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_LM298N_MOVE).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MOTOR_LM298N_FW,
                "FORWARD"
            ],
            [Blockly.Msg.MOTOR_LM298N_BW, "BACKWARD"]
        ]), "DIR");
        this.appendValueInput("STEP", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_STEPPER_STEP);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motorshield_dc_move = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=698&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE + 20);
        this.appendDummyInput("").appendField("Motor-Shield").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/motordc.png", 48, 32));
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MOTORSHIELD_DC + "-1", "1"],
            [Blockly.Msg.MOTORSHIELD_DC + "-2", "2"],
            [Blockly.Msg.MOTORSHIELD_DC +
                "-3", "3"
            ],
            [Blockly.Msg.MOTORSHIELD_DC + "-4", "4"]
        ]), "ID");
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_LM298N_MOVE).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MOTOR_LM298N_FW, "FORWARD"],
            [Blockly.Msg.MOTOR_LM298N_BW, "BACKWARD"],
            ["Stop", "RELEASE"]
        ]), "DIR");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.motorshield_dc_setspeed = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=698&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.motor.HUE + 20);
        this.appendDummyInput("").appendField("Motor-Shield").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/motordc.png", 48, 32));
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MOTORSHIELD_DC + "-1", "1"],
            [Blockly.Msg.MOTORSHIELD_DC + "-2", "2"],
            [Blockly.Msg.MOTORSHIELD_DC +
                "-3", "3"
            ],
            [Blockly.Msg.MOTORSHIELD_DC + "-4", "4"]
        ]), "ID");
        this.appendValueInput("SPEED", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MOTOR_LM298N_SPEED);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mp3 = {};
Blockly.Blocks.mp3.HUE = 58;
Blockly.Blocks.mp3_init = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=868&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mp3.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mp3b.png", 88, 27)).appendField(Blockly.Msg.MP3_INIT).appendField("Rx").appendField(new Blockly.FieldDropdown(profile["default"].rxtx), "RX").appendField("Tx").appendField(new Blockly.FieldDropdown(profile["default"].rxtx), "TX");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mp3_play_folderfile = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=868&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mp3.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mp3b.png", 88, 27)).appendField(Blockly.Msg.MP3_PLAY);
        this.appendValueInput("FOLDER", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MP3_FOLDER + " #");
        this.appendValueInput("FILE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MP3_FILE +
            " #");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mp3_play_folder = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=868&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mp3.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mp3b.png", 88, 27)).appendField(Blockly.Msg.MP3_PLAY);
        this.appendValueInput("FOLDER", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MP3_FOLDER + " #");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.MP3_REPEAT,
                "REPEAT"
            ],
            [Blockly.Msg.MP3_SHUFFLE, "SHUFFLE"]
        ]), "MODE");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mp3_play_file = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=868&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mp3.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mp3b.png", 88, 27)).appendField(Blockly.Msg.MP3_PLAY);
        this.appendValueInput("FILE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MP3_FILE + " #");
        this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"),
            "REPEAT").appendField(Blockly.Msg.MP3_REPEAT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mp3_control = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=868&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mp3.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mp3b.png", 88, 27)).appendField(Blockly.Msg.MP3_CONTROL).appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MP3_PAUSE, "PAUSE"],
                [Blockly.Msg.MP3_PLAY, "PLAY"],
                [Blockly.Msg.MP3_STOP, "STOP"],
                [Blockly.Msg.MP3_NEXT, "NEXT"],
                [Blockly.Msg.MP3_PREV, "PREV"]
            ]),
            "CONTROL");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mp3_eq = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=868&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mp3.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mp3b.png", 88, 27)).appendField(Blockly.Msg.MP3_EQ).appendField(new Blockly.FieldDropdown([
            ["NORMAL", "0"],
            ["POP", "1"],
            ["ROCK", "2"],
            ["JAZZ", "3"],
            ["CLASSIC", "4"],
            ["BASE", "5"]
        ]), "EQ");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0,
            null)
    }
};
Blockly.Blocks.mp3_volume = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=868&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mp3.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mp3b.png", 88, 27)).appendField(Blockly.Msg.MP3_VOLUME);
        this.appendValueInput("VOLUME", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("(0-30)");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mp3_reset = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=868&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mp3.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mp3b.png", 88, 27)).appendField(Blockly.Msg.MP3_RESET);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mqtt = {};
Blockly.Blocks.mqtt.HUE = 190;
Blockly.Blocks.mqtt_init = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mqtt.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mqtt.png", 40, 25)).appendField(Blockly.Msg.MQTT_INIT + " (EthernetShield)");
        var a = (256 * Math.random() | 0).toString(16).toUpperCase(),
            b = (256 * Math.random() | 0).toString(16).toUpperCase(),
            c = (256 * Math.random() | 0).toString(16).toUpperCase(),
            d = (256 * Math.random() |
                0).toString(16).toUpperCase(),
            e = (256 * Math.random() | 0).toString(16).toUpperCase();
        1 == a.length && (a = "0" + a);
        1 == b.length && (b = "0" + b);
        1 == c.length && (c = "0" + c);
        1 == d.length && (d = "0" + d);
        1 == e.length && (e = "0" + e);
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_MAC).appendField(new Blockly.FieldTextInput("0E:" + a + ":" + b + ":" + c + ":" + d + ":" + e), "MAC");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_BROKER).appendField(new Blockly.FieldTextInput("mqtt.eclipse.org"), "BROKER");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_PORT).appendField(new Blockly.FieldTextInput("1883"),
            "PORT");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_CLIENTID).appendField(new Blockly.FieldTextInput("AB_"), "CLIENTID");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_USER).appendField(new Blockly.FieldTextInput(""), "USER");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_PASS).appendField(new Blockly.FieldTextInput(""), "PASS");
        this.setInputsInline(!1);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mqtt_init_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=590&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mqtt.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mqtt_EP.png", 167, 60)).appendField(Blockly.Msg.MQTT_INIT);
        var a = (256 * Math.random() | 0).toString(16).toUpperCase(),
            b = (256 * Math.random() | 0).toString(16).toUpperCase(),
            c = (256 * Math.random() | 0).toString(16).toUpperCase(),
            d = (256 * Math.random() | 0).toString(16).toUpperCase(),
            e = (256 * Math.random() | 0).toString(16).toUpperCase();
        1 == a.length && (a = "0" + a);
        1 == b.length && (b = "0" + b);
        1 == c.length && (c = "0" + c);
        1 == d.length && (d = "0" + d);
        1 == e.length && (e = "0" + e);
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_MAC).appendField(new Blockly.FieldTextInput("0E:" + a + ":" + b + ":" + c + ":" + d + ":" + e), "MAC");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_BROKER).appendField(new Blockly.FieldTextInput("mqtt.eclipse.org"), "BROKER");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_PORT).appendField(new Blockly.FieldTextInput("1883"),
            "PORT");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_CLIENTID).appendField(new Blockly.FieldTextInput("AB_"), "CLIENTID");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_USER).appendField(new Blockly.FieldTextInput(""), "USER");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_PASS).appendField(new Blockly.FieldTextInput(""), "PASS");
        this.setInputsInline(!1);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mqtt_init_esp8266 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mqtt.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mqtt.png", 40, 25)).appendField(Blockly.Msg.MQTT_INIT + " (Esp8266 WiFi)");
        this.appendDummyInput().appendField("Rx").appendField(new Blockly.FieldDropdown(profile["default"].rxtx), "RX").appendField("Tx").appendField(new Blockly.FieldDropdown(profile["default"].rxtx),
            "TX").appendField(Blockly.Msg.BLUETOOTH_BAUDRATE).appendField(new Blockly.FieldDropdown([
            ["2400", "2400"],
            ["4800", "4800"],
            ["9600", "9600"],
            ["19200", "19200"],
            ["38400", "38400"],
            ["57600", "57600"],
            ["115200", "115200"]
        ]), "BAUD");
        this.appendDummyInput().appendField("WiFi " + Blockly.Msg.MQTT_WIFI_NAME).appendField(new Blockly.FieldTextInput(""), "WIFINAME").appendField(Blockly.Msg.MQTT_WIFI_PASS).appendField(new Blockly.FieldTextInput(""), "WIFIPASS");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_BROKER).appendField(new Blockly.FieldTextInput("mqtt.eclipse.org"),
            "BROKER");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_PORT).appendField(new Blockly.FieldTextInput("1883"), "PORT");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_CLIENTID).appendField(new Blockly.FieldTextInput("AB_"), "CLIENTID");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_USER).appendField(new Blockly.FieldTextInput(""), "USER");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_PASS).appendField(new Blockly.FieldTextInput(""), "PASS");
        this.setInputsInline(!1);
        this.setPreviousStatement(!0,
            null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mqtt_init_esp8266_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mqtt.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mqtt_wifi_EP.png", 151, 60)).appendField(Blockly.Msg.MQTT_INIT + " (Esp8266 WiFi)");
        this.appendDummyInput().appendField("Rx").appendField(new Blockly.FieldDropdown(profile["default"].rxtx), "RX").appendField("Tx").appendField(new Blockly.FieldDropdown(profile["default"].rxtx), "TX").appendField(Blockly.Msg.BLUETOOTH_BAUDRATE).appendField(new Blockly.FieldDropdown([
            ["2400",
                "2400"
            ],
            ["4800", "4800"],
            ["9600", "9600"],
            ["19200", "19200"],
            ["38400", "38400"],
            ["57600", "57600"],
            ["115200", "115200"]
        ]), "BAUD");
        this.appendDummyInput().appendField("WiFi " + Blockly.Msg.MQTT_WIFI_NAME).appendField(new Blockly.FieldTextInput(""), "WIFINAME").appendField(Blockly.Msg.MQTT_WIFI_PASS).appendField(new Blockly.FieldTextInput(""), "WIFIPASS");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_BROKER).appendField(new Blockly.FieldTextInput("mqtt.eclipse.org"), "BROKER");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_PORT).appendField(new Blockly.FieldTextInput("1883"),
            "PORT");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_CLIENTID).appendField(new Blockly.FieldTextInput("AB_"), "CLIENTID");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_USER).appendField(new Blockly.FieldTextInput(""), "USER");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_PASS).appendField(new Blockly.FieldTextInput(""), "PASS");
        this.setInputsInline(!1);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mqtt_init_ESP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mqtt.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mqtt.png", 40, 25)).appendField(Blockly.Msg.MQTT_INIT);
        this.appendDummyInput().appendField("WiFi " + Blockly.Msg.MQTT_WIFI_NAME).appendField(new Blockly.FieldTextInput(""), "WIFINAME").appendField(Blockly.Msg.MQTT_WIFI_PASS).appendField(new Blockly.FieldTextInput(""),
            "WIFIPASS");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_BROKER).appendField(new Blockly.FieldTextInput("mqtt.eclipse.org"), "BROKER");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_PORT).appendField(new Blockly.FieldTextInput("1883"), "PORT");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_CLIENTID).appendField(new Blockly.FieldTextInput("AB_"), "CLIENTID");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_USER).appendField(new Blockly.FieldTextInput(""), "USER");
        this.appendDummyInput().appendField(Blockly.Msg.MQTT_PASS).appendField(new Blockly.FieldTextInput(""),
            "PASS");
        this.setInputsInline(!1);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mqtt_pub = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mqtt.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mqtt.png", 40, 25)).appendField(Blockly.Msg.MQTT_PUB);
        this.appendValueInput("TOPIC", "String").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MQTT_TOPIC);
        this.appendValueInput("MSG", "String").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MQTT_VALUE);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.mqtt_sub = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mqtt.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mqtt.png", 40, 25)).appendField(Blockly.Msg.MQTT_SUB);
        this.appendValueInput("TOPIC", "String").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MQTT_TOPIC);
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField("> ").appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME),
            "VAR");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null);
        this.setTooltip(Blockly.Msg.MQTT_SUB)
    },
    getVars: function() {
        return [this.getFieldValue("VAR")]
    }
};
Blockly.Blocks.mqtt_sub_text = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mqtt.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mqtt.png", 40, 25)).appendField(Blockly.Msg.MQTT_SUB);
        this.appendValueInput("TOPIC", "String").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MQTT_TOPIC);
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField("> ").appendField(new Blockly.FieldVariableText(Blockly.Msg.VARIABLES_DEFAULT_NAME_TEXT),
            "VARTEXT");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null);
        this.setTooltip(Blockly.Msg.MQTT_SUB)
    },
    getVarsText: function() {
        return [this.getFieldValue("VARTEXT")]
    },
    renameVarText: function(a, b) {
        Blockly.Names.equals(a, this.getFieldValue("VARTEXT")) && this.setFieldValue(b, "VARTEXT")
    }
};
Blockly.Blocks.mqtt_isconnected = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.mqtt.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mqtt.png", 40, 25)).appendField(Blockly.Msg.MQTT_ISCONNECTED);
        this.setOutput(!0, "Boolean");
        this.setTooltip(Blockly.Msg.MQTT_SUB)
    }
};
Blockly.Blocks.mqtt_thingspeak_pub = {
    helpUrl: "https://es.mathworks.com/help/thingspeak/publishtoachannelfieldfeed.html",
    init: function() {
        this.setColour(Blockly.Blocks.mqtt.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mqtt_thingspeak_pub.png", 111, 26));
        this.appendDummyInput().appendField("Channel ID").appendField(new Blockly.FieldTextInput(""), "CHANNEL");
        this.appendDummyInput().appendField("Write API Key").appendField(new Blockly.FieldTextInput(""),
            "APIKEY");
        this.appendDummyInput().appendField("Field").appendField(new Blockly.FieldDropdown([
            ["field1", "field1"],
            ["field2", "field2"],
            ["field3", "field3"],
            ["field4", "field4"],
            ["field5", "field5"],
            ["field6", "field6"],
            ["field7", "field7"],
            ["field8", "field8"]
        ]), "FIELD");
        this.setInputsInline(!1);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.mqtt_thingspeak_sub = {
    helpUrl: "https://es.mathworks.com/help/thingspeak/subscribetoachannelfieldfeed.html",
    init: function() {
        this.setColour(Blockly.Blocks.mqtt.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mqtt_thingspeak_sub.png", 111, 26));
        this.appendDummyInput().appendField("Channel ID").appendField(new Blockly.FieldTextInput(""), "CHANNEL");
        this.appendDummyInput().appendField("Read API Key").appendField(new Blockly.FieldTextInput(""),
            "APIKEY");
        this.appendDummyInput().appendField("Field").appendField(new Blockly.FieldDropdown([
            ["field1", "field1"],
            ["field2", "field2"],
            ["field3", "field3"],
            ["field4", "field4"],
            ["field5", "field5"],
            ["field6", "field6"],
            ["field7", "field7"],
            ["field8", "field8"]
        ]), "FIELD");
        this.setInputsInline(!1);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.mqtt_adafruit_pub = {
    helpUrl: "https://learn.adafruit.com/welcome-to-adafruit-io/mqtt-api-documentation-2",
    init: function() {
        this.setColour(Blockly.Blocks.mqtt.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mqtt_adafruit_pub.png", 109, 26));
        this.appendDummyInput().appendField("User").appendField(new Blockly.FieldTextInput(""), "USER");
        this.appendDummyInput().appendField("Feed Key").appendField(new Blockly.FieldTextInput(""), "FEED");
        this.setInputsInline(!1);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.mqtt_adafruit_sub = {
    helpUrl: "https://learn.adafruit.com/welcome-to-adafruit-io/mqtt-api-documentation-2",
    init: function() {
        this.setColour(Blockly.Blocks.mqtt.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/mqtt_adafruit_sub.png", 109, 26));
        this.appendDummyInput().appendField("User").appendField(new Blockly.FieldTextInput(""), "USER");
        this.appendDummyInput().appendField("Feed Key").appendField(new Blockly.FieldTextInput(""), "FEED");
        this.setInputsInline(!1);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.neopixel = {};
Blockly.Blocks.neopixel.HUE = 210;
Blockly.Blocks.neopixel_init = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=680&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.neopixel.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/neopixel2.png", 50, 25)).appendField(Blockly.Msg.NEOPIXEL_INIT).appendField(new Blockly.FieldDropdown([
            ["GRB", "NEO_GRB"],
            ["RBG", "NEO_RBG"],
            ["NRGB", "NEO_RGB"]
        ]), "RGBMODE").appendField(new Blockly.FieldDropdown([
            ["800Khz", "NEO_KHZ800"],
            ["400Khz",
                "NEO_KHZ400"
            ]
        ]), "FREQ");
        this.appendValueInput("LEDCOUNT", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.NEOPIXEL_LEDCOUNT);
        this.appendDummyInput("").appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.neopixel_clear = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=680&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.neopixel.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/neopixel2.png", 50, 25)).appendField(Blockly.Msg.NEOPIXEL_CLEAR);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.neopixel_setled = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=680&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.neopixel.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/neopixel2.png", 50, 25));
        this.appendValueInput("LEDNUMBER", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.NEOPIXEL_SETPIXEL + " #");
        this.appendValueInput("R", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("R");
        this.appendValueInput("G", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("G");
        this.appendValueInput("B", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("B");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.neopixel_setledxy = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=680&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.neopixel.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/neopixel2.png", 50, 25)).appendField(Blockly.Msg.NEOPIXEL_SETMATRIX).appendField(new Blockly.FieldDropdown([
            ["8x8", "8x8"],
            ["16x16", "16x16"],
            ["8x5", "8x5"]
        ]), "MATRIXSIZE");
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendValueInput("R", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("R");
        this.appendValueInput("G", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("G");
        this.appendValueInput("B", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("B");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.neopixel_setled2 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=680&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.neopixel.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/neopixel2.png", 50, 25));
        this.appendValueInput("LEDNUMBER", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.NEOPIXEL_SETPIXEL + " #");
        this.appendDummyInput("").appendField(Blockly.Msg.COLOUR).appendField(new Blockly.FieldColour("#ff0000"),
            "COLOR");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.neopixel_setled2xy = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=680&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.neopixel.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/neopixel2.png", 50, 25)).appendField(Blockly.Msg.NEOPIXEL_SETMATRIX).appendField(new Blockly.FieldDropdown([
            ["8x8", "8x8"],
            ["16x16", "16x16"],
            ["8x5", "8x5"]
        ]), "MATRIXSIZE");
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendDummyInput("").appendField(Blockly.Msg.COLOUR).appendField(new Blockly.FieldColour("#ff0000"), "COLOR");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.neopixel_setdata = {
    helpUrl: "http://www.arduinoblocks.com/web/help/matrixeditor",
    init: function() {
        this.setColour(Blockly.Blocks.neopixel.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/neopixel2.png", 50, 25)).appendField(Blockly.Msg.NEOPIXEL_SETRAW).appendField(new Blockly.FieldTextInput(""), "DATA");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.neopixel_show = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=680&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.neopixel.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/neopixel2.png", 50, 25)).appendField(Blockly.Msg.NEOPIXEL_SHOW);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled = {};
Blockly.Blocks.oled.HUE = 160;
Blockly.Blocks.oled_ids = [
    ["1", "1"],
    ["2", "2"]
];
Blockly.Blocks.oled_colors = [
    ["Led ON", "WHITE"],
    ["Led OFF", "BLACK"]
];
Blockly.Blocks.oled_init = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_INIT + " I2C").appendField(new Blockly.FieldDropdown([
            ["0x7B", "0x7B"],
            ["0x7A", "0x7A"],
            ["0x3C", "0x3C"],
            ["0x3D", "0x3D"]
        ]), "ADDR");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_clear = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_CLEAR);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_drawpixel = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWPIXEL);
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_colors), "COL");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_drawline = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_LINE);
        this.appendValueInput("X1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X1");
        this.appendValueInput("Y1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y1");
        this.appendValueInput("X2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X2");
        this.appendValueInput("Y2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y2");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_colors), "COL");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_drawrectangle = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_RECTANGLE);
        this.appendValueInput("X1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X1");
        this.appendValueInput("Y1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y1");
        this.appendValueInput("X2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("W");
        this.appendValueInput("Y2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("H");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_colors), "COL");
        this.appendDummyInput("").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "FILL").appendField(Blockly.Msg.LEDMATRIX_FILL);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_drawcircle = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWCIRCLE);
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendValueInput("R", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("R");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_colors), "COL");
        this.appendDummyInput("").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "FILL").appendField(Blockly.Msg.LEDMATRIX_FILL);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_drawtext = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWTEXT);
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendValueInput("TXT", "String");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_colors), "COL");
        this.appendDummyInput("").appendField(" ").appendField(new Blockly.FieldDropdown([
            ["small", "1"],
            ["big", "2"]
        ]), "SIZE");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_drawbitmap = {
    helpUrl: "http://www.arduinoblocks.com/web/help/olededitor",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWBITMAP);
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendDummyInput("").appendField(new Blockly.FieldTextInput(""), "DATA");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_rotation = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled.png", 50, 38)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_ROTATION).appendField(new Blockly.FieldDropdown([
            ["0\u00ba",
                "0"
            ],
            ["90\u00ba", "1"],
            ["180\u00ba", "2"],
            ["-90\u00ba", "3"]
        ]), "ROT");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_init_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled_EP.png", 65, 35)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_INIT + " I2C").appendField(new Blockly.FieldDropdown([
            ["0x3C",
                "0x3C"
            ],
            ["0x3D", "0x3D"]
        ]), "ADDR");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_clear_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled_EP.png", 65, 35)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_CLEAR);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0,
            null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_drawpixel_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled_EP.png", 65, 35)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWPIXEL);
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_colors), "COL");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_drawline_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled_EP.png", 65, 35)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_LINE);
        this.appendValueInput("X1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X1");
        this.appendValueInput("Y1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y1");
        this.appendValueInput("X2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X2");
        this.appendValueInput("Y2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y2");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_colors), "COL");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_drawrectangle_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled_EP.png", 65, 35)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_RECTANGLE);
        this.appendValueInput("X1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X1");
        this.appendValueInput("Y1", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y1");
        this.appendValueInput("X2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("W");
        this.appendValueInput("Y2", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("H");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_colors), "COL");
        this.appendDummyInput("").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "FILL").appendField(Blockly.Msg.LEDMATRIX_FILL);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_drawcircle_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled_EP.png", 65, 35)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWCIRCLE);
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendValueInput("R", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("R");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_colors), "COL");
        this.appendDummyInput("").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "FILL").appendField(Blockly.Msg.LEDMATRIX_FILL);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_drawtext_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled_EP.png", 65, 35)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWTEXT);
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendValueInput("TXT", "String");
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_colors), "COL");
        this.appendDummyInput("").appendField(" ").appendField(new Blockly.FieldDropdown([
            ["small", "1"],
            ["big", "2"]
        ]), "SIZE");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_drawbitmap_EP = {
    helpUrl: "http://www.arduinoblocks.com/web/help/olededitor",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled_EP.png", 65, 35)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_DRAWBITMAP);
        this.appendValueInput("X", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("X");
        this.appendValueInput("Y", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Y");
        this.appendDummyInput("").appendField(new Blockly.FieldTextInput(""), "DATA");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.oled_rotation_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=751&controller=product&search_query=oled&results=9",
    init: function() {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/oled_EP.png", 65, 35)).appendField(Blockly.Msg.ID).appendField(new Blockly.FieldDropdown(Blockly.Blocks.oled_ids), "ID").appendField(Blockly.Msg.LEDMATRIX_ROTATION).appendField(new Blockly.FieldDropdown([
            ["0\u00ba",
                "0"
            ],
            ["90\u00ba", "1"],
            ["180\u00ba", "2"],
            ["-90\u00ba", "3"]
        ]), "ROT");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.otto = {};
Blockly.Blocks.otto.HUE = 230;
Blockly.Blocks.otto_calibrate = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/4",
    init: function() {
        this.setColour(Blockly.Blocks.otto.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/otto42.png", 29, 42)).appendField(Blockly.Msg.OTTO_CALIBRATE);
        this.appendValueInput("LEGL", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.OTTO_CALIB_LEGL);
        this.appendValueInput("LEGR", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.OTTO_CALIB_LEGR);
        this.appendValueInput("FOOTL", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.OTTO_CALIB_FOOTL);
        this.appendValueInput("FOOTR", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.OTTO_CALIB_FOOTR);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.otto_move = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/4",
    init: function() {
        this.setColour(Blockly.Blocks.otto.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/otto42.png", 29, 42)).appendField(Blockly.Msg.OTTO_MOVE);
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.OTTO_MOVE_HOME, "home"],
            [Blockly.Msg.OTTO_MOVE_WALKF, "walkF"],
            [Blockly.Msg.OTTO_MOVE_WALKB, "walkB"],
            [Blockly.Msg.OTTO_MOVE_TURNL,
                "turnL"
            ],
            [Blockly.Msg.OTTO_MOVE_TURNR, "turnR"],
            [Blockly.Msg.OTTO_MOVE_JUMP, "jump"],
            [Blockly.Msg.OTTO_MOVE_BENDL, "bendL"],
            [Blockly.Msg.OTTO_MOVE_BENDR, "bendR"],
            [Blockly.Msg.OTTO_MOVE_SHAKEL, "shakeL"],
            [Blockly.Msg.OTTO_MOVE_SHAKER, "shakeR"],
            [Blockly.Msg.OTTO_MOVE_UPDOWN, "updown"],
            [Blockly.Msg.OTTO_MOVE_MOONWALKL, "moonwalkerL"],
            [Blockly.Msg.OTTO_MOVE_MOONWALKR, "moonwalkerR"],
            [Blockly.Msg.OTTO_MOVE_SWING, "swing"],
            [Blockly.Msg.OTTO_MOVE_CRUSAITO1, "crusaito1"],
            [Blockly.Msg.OTTO_MOVE_CRUSAITO2, "crusaito2"],
            [Blockly.Msg.OTTO_MOVE_FLAPPING1, "flapping1"],
            [Blockly.Msg.OTTO_MOVE_FLAPPING2, "flapping2"],
            [Blockly.Msg.OTTO_MOVE_TIPTOESWING, "tiptoeswing"],
            [Blockly.Msg.OTTO_MOVE_JITTER, "jitter"],
            [Blockly.Msg.OTTO_MOVE_ASCTURN, "ascendingturn"]
        ]), "MOV");
        this.appendDummyInput("").appendField(Blockly.Msg.OTTO_SPEED).setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.OTTO_SPEED_VERYFAST, "600"],
            [Blockly.Msg.OTTO_SPEED_FAST, "800"],
            [Blockly.Msg.OTTO_SPEED_NORMAL, "1000"],
            [Blockly.Msg.OTTO_SPEED_SLOW,
                "1200"
            ],
            [Blockly.Msg.OTTO_SPEED_VERYSLOW, "1400"]
        ]), "SPEED");
        this.appendDummyInput("").appendField(Blockly.Msg.OTTO_AMP).setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            ["5", "5"],
            ["10", "10"],
            ["15", "15"],
            ["20", "20"],
            ["25", "25"]
        ]), "AMPLITUDE");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.otto_sing = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/4",
    init: function() {
        this.setColour(Blockly.Blocks.otto.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/otto42.png", 29, 42)).appendField(Blockly.Msg.OTTO_SING);
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.OTTO_SOUND_CONNECTION, "S_connection"],
            [Blockly.Msg.OTTO_SOUND_DISCONNECTION, "S_disconnection"],
            [Blockly.Msg.OTTO_SOUND_SURPRISE,
                "S_surprise"
            ],
            [Blockly.Msg.OTTO_SOUND_OH_, "S_OhOoh"],
            [Blockly.Msg.OTTO_SOUND_OH2, "S_OhOoh2"],
            [Blockly.Msg.OTTO_SOUND_CUDDLY, "S_cuddly"],
            [Blockly.Msg.OTTO_SOUND_SLEEPING, "S_sleeping"],
            [Blockly.Msg.OTTO_SOUND_HAPPY, "S_happy"],
            [Blockly.Msg.OTTO_SOUND_SUPERHAPPY, "S_superHappy"],
            [Blockly.Msg.OTTO_SOUND_HAPPYSHOR, "S_happy_short"],
            [Blockly.Msg.OTTO_SOUND_SAD, "S_sad"],
            [Blockly.Msg.OTTO_SOUND_CONFUSED, "S_confused"],
            [Blockly.Msg.OTTO_SOUND_FART1, "S_fart1"],
            [Blockly.Msg.OTTO_SOUND_FART2, "S_fart2"],
            [Blockly.Msg.OTTO_SOUND_FART3,
                "S_fart3"
            ],
            [Blockly.Msg.OTTO_SOUND_BUTTON, "S_buttonPushed"],
            [Blockly.Msg.OTTO_SOUND_MODE1, "S_mode1"],
            [Blockly.Msg.OTTO_SOUND_MODE2, "S_mode2"],
            [Blockly.Msg.OTTO_SOUND_MODE3, "S_mode3"]
        ]), "SOUND");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.otto_note = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/4",
    init: function() {
        this.setColour(Blockly.Blocks.otto.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/otto42.png", 29, 42)).appendField(Blockly.Msg.OTTO_NOTE);
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            ["C4", "note_C4"],
            ["D4", "note_D4"],
            ["E4", "note_E4"],
            ["F4", "note_F4"],
            ["G4", "note_G4"],
            ["A4", "note_A4"],
            ["B4", "note_B4"],
            ["C5", "note_C5"],
            ["D5", "note_D5"],
            ["E5", "note_E5"],
            ["F5", "note_F5"],
            ["G5", "note_G5"],
            ["A5", "note_A5"],
            ["B5", "note_B5"],
            ["C6", "note_C6"],
            ["D6", "note_D6"],
            ["E6", "note_E6"],
            ["F6", "note_F6"],
            ["G6", "note_G6"],
            ["A6", "note_A6"],
            ["B6", "note_B6"]
        ]), "FREQ");
        this.appendValueInput("DURATION", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.OTTO_NOTE_DURATION);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.otto_gesture = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/4",
    init: function() {
        this.setColour(Blockly.Blocks.otto.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/otto42.png", 29, 42)).appendField(Blockly.Msg.OTTO_GESTURE);
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.OTTO_GESTURE_HAPPY, "OttoHappy"],
            [Blockly.Msg.OTTO_GESTURE_SUPERHAPPY, "OttoSuperHappy"],
            [Blockly.Msg.OTTO_GESTURE_SAD,
                "OttoSad"
            ],
            [Blockly.Msg.OTTO_GESTURE_SLEEPING, "OttoSleeping"],
            [Blockly.Msg.OTTO_GESTURE_FART, "OttoFart"],
            [Blockly.Msg.OTTO_GESTURE_CONFUSED, "OttoConfused"],
            [Blockly.Msg.OTTO_GESTURE_LOVE, "OttoLove"],
            [Blockly.Msg.OTTO_GESTURE_ANGRY, "OttoAngry"],
            [Blockly.Msg.OTTO_GESTURE_FRETFUL, "OttoFretful"],
            [Blockly.Msg.OTTO_GESTURE_MAGIC, "OttoMagic"],
            [Blockly.Msg.OTTO_GESTURE_WAVE, "OttoWave"],
            [Blockly.Msg.OTTO_GESTURE_VICTORY, "OttoVictory"],
            [Blockly.Msg.OTTO_GESTURE_FAIL, "OttoFail"]
        ]), "GESTURE");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.otto_mouth = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/4",
    init: function() {
        this.setColour(Blockly.Blocks.otto.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/otto42.png", 29, 42)).appendField(Blockly.Msg.OTTO_MOUTH);
        this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.OTTO_MOUTH_CLEAR, "-1"],
            [Blockly.Msg.OTTO_MOUTH_ZERO, "0"],
            [Blockly.Msg.OTTO_MOUTH_ONE, "1"],
            [Blockly.Msg.OTTO_MOUTH_TWO,
                "2"
            ],
            [Blockly.Msg.OTTO_MOUTH_THREE, "3"],
            [Blockly.Msg.OTTO_MOUTH_FOUR, "4"],
            [Blockly.Msg.OTTO_MOUTH_FIVE, "5"],
            [Blockly.Msg.OTTO_MOUTH_SIX, "6"],
            [Blockly.Msg.OTTO_MOUTH_SEVEN, "7"],
            [Blockly.Msg.OTTO_MOUTH_EIGHT, "8"],
            [Blockly.Msg.OTTO_MOUTH_NINE, "9"],
            [Blockly.Msg.OTTO_MOUTH_SMILE, "10"],
            [Blockly.Msg.OTTO_MOUTH_HAPPYOPEN, "11"],
            [Blockly.Msg.OTTO_MOUTH_HAPPYCLOSED, "12"],
            [Blockly.Msg.OTTO_MOUTH_HEART, "13"],
            [Blockly.Msg.OTTO_MOUTH_BIGSURPRISE, "14"],
            [Blockly.Msg.OTTO_MOUTH_SMALLSURPRISE, "15"],
            [Blockly.Msg.OTTO_MOUTH_TONGUEOUT,
                "16"
            ],
            [Blockly.Msg.OTTO_MOUTH_VAMP1, "17"],
            [Blockly.Msg.OTTO_MOUTH_VAMP2, "18"],
            [Blockly.Msg.OTTO_MOUTH_LINEMOUTH, "19"],
            [Blockly.Msg.OTTO_MOUTH_CONFUSED, "20"],
            [Blockly.Msg.OTTO_MOUTH_DIAGONAL, "21"],
            [Blockly.Msg.OTTO_MOUTH_SAD, "22"],
            [Blockly.Msg.OTTO_MOUTH_SADOPEN, "23"],
            [Blockly.Msg.OTTO_MOUTH_SADCLOSED, "24"],
            [Blockly.Msg.OTTO_MOUTH_OKMOUTH, "25"],
            [Blockly.Msg.OTTO_MOUTH_XMOUTH, "26"],
            [Blockly.Msg.OTTO_MOUTH_INTERROGATION, "27"],
            [Blockly.Msg.OTTO_MOUTH_THUNDER, "28"],
            [Blockly.Msg.OTTO_MOUTH_CULITO, "29"],
            [Blockly.Msg.OTTO_MOUTH_ANGRY, "30"]
        ]), "MOUTH");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.otto_distance = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/4",
    init: function() {
        this.setColour(Blockly.Blocks.otto.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/otto42.png", 29, 42)).appendField(Blockly.Msg.OTTO_DISTANCE);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.otto_noise = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/4",
    init: function() {
        this.setColour(Blockly.Blocks.otto.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/otto42.png", 29, 42)).appendField(Blockly.Msg.OTTO_NOISE);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.otto_button = {
    helpUrl: "http://www.arduinoblocks.com/web/site/boardinfo/4",
    init: function() {
        this.setColour(Blockly.Blocks.otto.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/otto42.png", 29, 42)).appendField(Blockly.Msg.OTTO_BUTTON).appendField(new Blockly.FieldDropdown([
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"]
        ]), "PIN").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_BUTTON_DEBOUNCED_PRESSED, "pressed"],
            [Blockly.Msg.SENSOR_BUTTON_DEBOUNCED_RELEASED,
                "released"
            ]
        ]), "STATUS");
        this.setInputsInline(!0);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.rfid = {};
Blockly.Blocks.rfid.HUE = 235;
Blockly.Blocks.rfid_init = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=658&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.rfid.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/rfid.png", 85, 45)).appendField(Blockly.Msg.RFID_INIT + " (SPI)").appendField(Blockly.Msg.PIN + " CS").appendField(new Blockly.FieldDropdown(profile["default"].digital), "CS_PIN").appendField(Blockly.Msg.PIN + " RESET").appendField(new Blockly.FieldDropdown(profile["default"].digital),
            "RST_PIN");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.rfid_newcardpresent = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=658&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.rfid.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/rfid.png", 85, 45)).appendField(Blockly.Msg.RFID_NEWCARDPRESENT);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.rfid_readuid = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=658&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.rfid.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/rfid.png", 85, 45)).appendField(Blockly.Msg.RFID_READUID);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.rtc = {};
Blockly.Blocks.rtc.HUE = 120;
Blockly.Blocks.rtc_set_time = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=634&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.rtc.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.RTC + " (I2C)").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_rtc.png", 80, 37));
        this.appendValueInput("DAY", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.RTC_DAY + "=");
        this.appendValueInput("MONTH", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.RTC_MONTH +
            "=");
        this.appendValueInput("YEAR", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.RTC_YEAR + "=");
        this.appendValueInput("HOUR", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.RTC_HOUR + "=");
        this.appendValueInput("MINUTE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.RTC_MINUTE + "=");
        this.appendValueInput("SECOND", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.RTC_SECOND +
            "=");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.rtc_set = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=634&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.rtc.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.RTC + " (I2C)").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_rtc.png", 80, 37));
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.RTC_DAY, "day"],
            [Blockly.Msg.RTC_MONTH, "month"],
            [Blockly.Msg.RTC_YEAR, "year"],
            [Blockly.Msg.RTC_HOUR, "hour"],
            [Blockly.Msg.RTC_MINUTE, "minute"],
            [Blockly.Msg.RTC_SECOND, "second"]
        ]), "FIELD").appendField("=");
        this.appendValueInput("VALUE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.rtc_get = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=634&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.rtc.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.RTC + " (I2C)").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_rtc.png", 80, 37)).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.RTC_DAY, "day"],
            [Blockly.Msg.RTC_MONTH, "month"],
            [Blockly.Msg.RTC_YEAR, "year"],
            [Blockly.Msg.RTC_HOUR, "hour"],
            [Blockly.Msg.RTC_MINUTE,
                "minute"
            ],
            [Blockly.Msg.RTC_SECOND, "second"]
        ]), "FIELD");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.rtc_get_time_text = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=634&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.rtc.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.RTC + " (I2C)").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_rtc.png", 80, 37));
        this.appendDummyInput("").appendField(Blockly.Msg.RTC_TIME_TEXT);
        this.setInputsInline(!0);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.rtc_get_date_text = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=634&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.rtc.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.RTC + " (I2C)").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_rtc.png", 80, 37));
        this.appendDummyInput("").appendField(Blockly.Msg.RTC_DATE_TEXT);
        this.setInputsInline(!0);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.rtc_set_time_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=761&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.rtc.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_rtc_EP.png", 78, 40)).appendField(Blockly.Msg.RTC);
        this.appendValueInput("DAY", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.RTC_DAY + "=");
        this.appendValueInput("MONTH", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.RTC_MONTH +
            "=");
        this.appendValueInput("YEAR", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.RTC_YEAR + "=");
        this.appendValueInput("HOUR", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.RTC_HOUR + "=");
        this.appendValueInput("MINUTE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.RTC_MINUTE + "=");
        this.appendValueInput("SECOND", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.RTC_SECOND +
            "=");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.rtc_set_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=761&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.rtc.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_rtc_EP.png", 78, 40)).appendField(Blockly.Msg.RTC);
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.RTC_DAY, "day"],
            [Blockly.Msg.RTC_MONTH, "month"],
            [Blockly.Msg.RTC_YEAR, "year"],
            [Blockly.Msg.RTC_HOUR, "hour"],
            [Blockly.Msg.RTC_MINUTE, "minute"],
            [Blockly.Msg.RTC_SECOND, "second"]
        ]), "FIELD").appendField("=");
        this.appendValueInput("VALUE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.rtc_get_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=761&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.rtc.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_rtc_EP.png", 78, 40)).appendField(Blockly.Msg.RTC).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.RTC_DAY, "day"],
            [Blockly.Msg.RTC_MONTH, "month"],
            [Blockly.Msg.RTC_YEAR, "year"],
            [Blockly.Msg.RTC_HOUR, "hour"],
            [Blockly.Msg.RTC_MINUTE, "minute"],
            [Blockly.Msg.RTC_SECOND, "second"]
        ]), "FIELD");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.rtc_get_time_text_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=761&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.rtc.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_rtc_EP.png", 78, 40)).appendField(Blockly.Msg.RTC + " -");
        this.appendDummyInput("").appendField(Blockly.Msg.RTC_TIME_TEXT);
        this.setInputsInline(!0);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.rtc_get_date_text_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=761&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.rtc.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_rtc_EP.png", 78, 40)).appendField(Blockly.Msg.RTC + " -");
        this.appendDummyInput("").appendField(Blockly.Msg.RTC_DATE_TEXT);
        this.setInputsInline(!0);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.sd = {};
Blockly.Blocks.sd.HUE = 290;
Blockly.Blocks.sd_init = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sd.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sd.png", 30, 30)).appendField(Blockly.Msg.SD_BEGIN + " (SPI)").appendField(Blockly.Msg.PIN + " CS").appendField(new Blockly.FieldDropdown(profile["default"].digital), "CS");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.sd_init_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sd.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sd_EP.png", 68, 30)).appendField(Blockly.Msg.SD_BEGIN + " (SPI)").appendField(Blockly.Msg.PIN + " CS").appendField(new Blockly.FieldDropdown(profile["default"].digital), "CS");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.sd_print = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sd.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sd.png", 30, 30)).appendField(Blockly.Msg.SD_PRINT);
        this.appendValueInput("FILE", "String").setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("STRINGOUTPUT", "String").setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"),
            "NEWLINE").appendField(Blockly.Msg.ADD_NEW_LINE);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.sd_filesize = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sd.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sd.png", 30, 30)).appendField(Blockly.Msg.SD_SIZE);
        this.appendValueInput("FILE", "String").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!1, null);
        this.setNextStatement(!1, null);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sd_readbyte = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sd.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sd.png", 30, 30)).appendField(Blockly.Msg.SD_READBYTE);
        this.appendValueInput("FILE", "String").setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("POS", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.SD_POS);
        this.setInputsInline(!0);
        this.setPreviousStatement(!1, null);
        this.setNextStatement(!1, null);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sd_readloop = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sd.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sd.png", 30, 30)).appendField(Blockly.Msg.SD_READLOOP);
        this.appendValueInput("FILE", "String").setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput("").appendField(new Blockly.FieldVariable, "VAR");
        this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_FOR_INPUT_DO);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    },
    getVars: function() {
        return [this.getFieldValue("VAR")]
    },
    renameVar: function(a, b) {
        Blockly.Names.equals(a, this.getFieldValue("VAR")) && this.setFieldValue(b, "VAR")
    },
    customContextMenu: function(a) {
        if (!this.isCollapsed()) {
            var b = {
                    enabled: !0
                },
                c = this.getFieldValue("VAR");
            b.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1", c);
            c = goog.dom.createDom("field", null, c);
            c.setAttribute("name", "VAR");
            c = goog.dom.createDom("block",
                null, c);
            c.setAttribute("type", "variables_get");
            b.callback = Blockly.ContextMenu.callbackFactory(this, c);
            a.push(b)
        }
    }
};
Blockly.Blocks.sd_writebyte = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sd.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sd.png", 30, 30)).appendField(Blockly.Msg.SD_WRITEBYTE);
        this.appendValueInput("FILE", "String").setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("BYTE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0,
            null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.sd_remove = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sd.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sd.png", 30, 30)).appendField(Blockly.Msg.SD_REMOVE);
        this.appendValueInput("FILE", "String").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.sd_exists = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=679&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sd.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sd.png", 30, 30)).appendField(Blockly.Msg.SD_EXISTS);
        this.appendValueInput("FILE", "String").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor = {};
Blockly.Blocks.sensor.HUE = 230;
Blockly.Blocks.sensor_adxl335 = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_ACCEL).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_adxl335.png", 50, 40)).appendField(Blockly.Msg.SENSOR_ACCEL_X).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PINX").appendField(Blockly.Msg.SENSOR_ACCEL_Y).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PINY").appendField(Blockly.Msg.SENSOR_ACCEL_Z).appendField(new Blockly.FieldDropdown(profile["default"].analog),
            "PINZ").appendField(new Blockly.FieldDropdown([
            ["Accel-X", "0"],
            ["Accel-Y", "1"],
            ["Accel-Z", "2"],
            ["Roll-X", "3"],
            ["Pitch-Y", "4"]
        ]), "TYPE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_potentiometer = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=607&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_POT).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_pot.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range),
            "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_potentiometer_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=548&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_pot_EP.png", 79, 39)).appendField(Blockly.Msg.SENSOR_POT).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0,
            "Number")
    }
};
Blockly.Blocks.sensor_potentiometer_slider_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=864&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_pot_slider_EP.png", 205, 35)).appendField(Blockly.Msg.SENSOR_POT).appendField(new Blockly.FieldDropdown(profile["default"].analog2), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_button = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=625&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_BUTTON).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_button.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_BUTTON_INVERT).appendField(new Blockly.FieldCheckbox("FALSE"), "INVERT");
        this.setInputsInline(!0);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_crash_EP = {
    helpUrl: "shop.innovadidactic.com/index.php?id_product=550&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_crash_EP.png", 93, 42)).appendField(Blockly.Msg.SENSOR_CRASH).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setInputsInline(!0);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_button_debounced = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=625&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_BUTTON_DEBOUNCED).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_button.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_BUTTON_DEBOUNCED_PRESSED,
                "pressed"
            ],
            [Blockly.Msg.SENSOR_BUTTON_DEBOUNCED_RELEASED, "released"]
        ]), "STATUS");
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_BUTTON_INVERT).appendField(new Blockly.FieldCheckbox("FALSE"), "INVERT");
        this.setInputsInline(!0);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_button_debounced_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=551&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_button_EP.png", 80, 40)).appendField(Blockly.Msg.SENSOR_BUTTON).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_BUTTON_DEBOUNCED_PRESSED,
                "pressed"
            ],
            [Blockly.Msg.SENSOR_BUTTON_DEBOUNCED_RELEASED, "released"]
        ]), "STATUS");
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_BUTTON_INVERT).appendField(new Blockly.FieldCheckbox("TRUE"), "INVERT");
        this.setInputsInline(!0);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_touch = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=626&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_TOUCH).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_touch.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_touch_EP = {
    helpUrl: "shop.innovadidactic.com/index.php?id_product=552&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_touch_EP.png", 89, 40)).appendField(Blockly.Msg.SENSOR_TOUCH).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_pir = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=646&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_PIR).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_pir.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_pir_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=561&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_pir_EP.png", 82, 42)).appendField(Blockly.Msg.SENSOR_PIR).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_dht11 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=629&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_DHT11).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_TEMPERATURE, "temperature"],
            [Blockly.Msg.SENSOR_HUMIDITY, "humidity"]
        ]), "TYPE").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_dht11.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital),
            "PIN");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_dht11_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=568&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_dht11_EP.png", 88, 40)).appendField(Blockly.Msg.SENSOR_DHT11).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_TEMPERATURE, "temperature"],
            [Blockly.Msg.SENSOR_HUMIDITY, "humidity"]
        ]), "TYPE").appendField(new Blockly.FieldDropdown(profile["default"].digital),
            "PIN");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_dht22 = {
    helpUrl: "http://www.keyestudio.com/shop/sensor/keyestudio-dht11-temperature-and-humidity-sensor-for-arduino.html",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_DHT22).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_TEMPERATURE, "temperature"],
            [Blockly.Msg.SENSOR_HUMIDITY, "humidity"]
        ]), "TYPE").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_dht22.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital),
            "PIN");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_dht22_EP = {
    helpUrl: "http://www.keyestudio.com/shop/sensor/keyestudio-dht11-temperature-and-humidity-sensor-for-arduino.html",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_dht22_EP.png", 88, 40)).appendField(Blockly.Msg.SENSOR_DHT22).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_TEMPERATURE, "temperature"],
            [Blockly.Msg.SENSOR_HUMIDITY, "humidity"]
        ]), "TYPE").appendField(new Blockly.FieldDropdown(profile["default"].digital),
            "PIN");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_ultrasonic = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=44&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_ULTRASONIC).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_ultrasonic.png", 50, 40)).appendField("[Trigger]").appendField(new Blockly.FieldDropdown(profile["default"].digital), "TRIGGER_PIN").appendField("[Echo]").appendField(new Blockly.FieldDropdown(profile["default"].digital), "ECHO_PIN");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_ultrasonic2 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=44&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_ULTRASONIC).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_ultrasonic.png", 50, 40)).appendField("[Trigger]").appendField(new Blockly.FieldDropdown(profile["default"].digital), "TRIGGER_PIN").appendField("[Echo]").appendField(new Blockly.FieldDropdown(profile["default"].digital), "ECHO_PIN");
        this.appendValueInput("MAXDISTANCE", "Number").appendField(Blockly.Msg.SENSOR_ULTRASONIC_MAXDISTANCE).setCheck("Number");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_ultrasonic_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=44&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_ultrasonic_EP.png", 108, 41)).appendField(Blockly.Msg.SENSOR_ULTRASONIC);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_ldr = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=624&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_LDR).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_ldr.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_ldr_EP = {
    helpUrl: "shop.innovadidactic.com/index.php?id_product=545&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_ldr_EP.png", 78, 41)).appendField(Blockly.Msg.SENSOR_LDR).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_ntc = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=628&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_NTC).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_ntc.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_ntc_EP = {
    helpUrl: "shop.innovadidactic.com/index.php?id_product=543&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_ntc_EP.png", 74, 38)).appendField(Blockly.Msg.SENSOR_NTC).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_joystick = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=601&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_JOYSTICK).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_joystick.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown([
            ["X", "X"],
            ["Y", "Y"]
        ]), "TYPE").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range),
            "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_joystick_EP = {
    helpUrl: "shop.innovadidactic.com/index.php?id_product=592&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_joystick_EP.png", 92, 56)).appendField("Joystick").appendField(new Blockly.FieldDropdown([
            ["X", "X"],
            ["Y", "Y"],
            [Blockly.Msg.SENSOR_BUTTON_DEBOUNCED_PRESSED, "PRESSED"]
        ]), "TYPE").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_obstacle = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=645&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_OBSTACLE).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_obstacle.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_obstacle_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=559&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_obstacle_EP.png", 122, 42)).appendField(Blockly.Msg.SENSOR_OBSTACLE).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_linetracking = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=644&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_LINETRACKING).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_linetracking.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_photoint = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=602&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_PHOTOINT).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_photoint.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_lm35 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=617&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_LM35).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_lm35.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_lm35_EP = {
    helpUrl: "shop.innovadidactic.com/index.php?id_product=562&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_lm35_EP.png", 77, 40)).appendField(Blockly.Msg.SENSOR_LM35).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_tmp36 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=617&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_TMP36).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_lm35.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_knock = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=619&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_KNOCK).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_knock.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_knock_EP = {
    helpUrl: "shop.innovadidactic.com/index.php?id_product=553&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_knock_EP.png", 80, 39)).appendField(Blockly.Msg.SENSOR_KNOCK).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_tilt = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=620&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_TILT).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_tilt.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_tilt_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=554&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_tilt_EP.png", 79, 39)).appendField(Blockly.Msg.SENSOR_TILT).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_hall = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=615&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_HALL).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_hall.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_hall_EP = {
    helpUrl: "shop.innovadidactic.com/index.php?id_product=549&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_hall_EP.png", 84, 38)).appendField(Blockly.Msg.SENSOR_HALL).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_vibration = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=632&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_VIBRATION).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_vibration.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_vibration_EP = {
    helpUrl: "shop.innovadidactic.com/index.php?id_product=556&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_vibration_EP.png", 97, 35)).appendField(Blockly.Msg.SENSOR_VIBRATION).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_reed = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=632&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_REED).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_reed.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_reed_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=557&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_reed_EP.png", 84, 50)).appendField(Blockly.Msg.SENSOR_REED).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_irremote_decode = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=668&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_IRRX).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_irrx.png", 100, 40));
        this.appendDummyInput("").appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].ir_rx), "PIN");
        this.setInputsInline(!0);
        this.setOutput(!0,
            "Number")
    }
};
Blockly.Blocks.sensor_irremote_decode_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=564&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_irrx_EP.png", 150, 46)).appendField(Blockly.Msg.SENSOR_IRRX).appendField(new Blockly.FieldDropdown(profile["default"].ir_rx), "PIN");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_irremote_keys = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=564&controller=product",
    init: function() {
        var a = [
            [Blockly.Msg.UP, "16736925"],
            [Blockly.Msg.DOWN, "16754775"],
            [Blockly.Msg.LEFT, "16720605"],
            [Blockly.Msg.RIGHT, "16761405"],
            [Blockly.Msg.OK, "16712445"],
            ["1", "16738455"],
            ["2", "16750695"],
            ["3", "16756815"],
            ["4", "16724175"],
            ["5", "16718055"],
            ["6", "16743045"],
            ["7", "16716015"],
            ["8", "16726215"],
            ["9", "16734885"],
            ["0", "16730805"]
        ];
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_irrx_keys.png", 88, 40)).appendField(new Blockly.FieldDropdown(a), "KEY");
        this.setOutput("Number")
    }
};
Blockly.Blocks.sensor_rotary_encoder = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=606&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_ROTARY_ENCODER).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_encoder.png", 50, 40));
        this.appendDummyInput("").appendField("[Clk]").appendField(new Blockly.FieldDropdown(profile["default"].encoder_clk), "CLK").appendField("[Dt]").appendField(new Blockly.FieldDropdown(profile["default"].encoder_dt),
            "DT");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_rotary_encoder_set = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=606&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.SENSOR_ROTARY_ENCODER).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_encoder.png", 50, 40));
        this.appendValueInput("POS", "Number").appendField(Blockly.Msg.SENSOR_ROTARY_ENCODER_POS).setCheck("Number");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0,
            null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.sensor_flame = {
    helpUrl: "http://www.keyestudio.com/keyestudio-flame-sensor-for-arduino.html",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_FLAME).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_flame.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_flame_EP = {
    helpUrl: "shop.innovadidactic.com/index.php?id_product=555&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_flame_EP.png", 95, 32)).appendField(Blockly.Msg.SENSOR_FLAME).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_sound = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=630&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_SOUND).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_sound.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range),
            "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_sound_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=544&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_sound_EP.png", 84, 39)).appendField(Blockly.Msg.SENSOR_SOUND).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0,
            "Number")
    }
};
Blockly.Blocks.sensor_gas = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=635&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_GAS).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_gas.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_gas_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=569&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_gas_EP.png", 122, 42)).appendField(Blockly.Msg.SENSOR_GAS).appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_alcohol = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=636&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_ALCOHOL).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_alcohol.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range),
            "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_alcohol_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=570&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_alcohol_EP.png", 122, 42)).appendField(Blockly.Msg.SENSOR_ALCOHOL).appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_air = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=762&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_AIR).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_gas.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_air_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=571&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_gas_EP.png", 122, 42)).appendField(Blockly.Msg.SENSOR_AIR).appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_TEMT6000 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=670&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_TEMT6000).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_TEMT6000.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range),
            "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_TEMT6000_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=670&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_TEMT6000_EP.png", 60, 40)).appendField(Blockly.Msg.SENSOR_TEMT6000).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_soilhumidity = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=643&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_SOILHUMIDITY).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_soilhumidity.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_soilhumidity_EP = {
    helpUrl: "shop.innovadidactic.com/index.php?id_product=547&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_soilhumidity_EP.png", 122, 38)).appendField(Blockly.Msg.SENSOR_SOILHUMIDITY).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_water = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=642&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_WATER).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_water.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_water_EP = {
    helpUrl: "shop.innovadidactic.com/index.php?id_product=546&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_water_EP.png", 143, 42)).appendField(Blockly.Msg.SENSOR_WATER).appendField(new Blockly.FieldDropdown(profile["default"].analog), "PIN").appendField(new Blockly.FieldDropdown(profile["default"].sensor_range), "RANGE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_nunchuk = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=16&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.NUNCHUK).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_nunchuk.png", 32, 40));
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.NUNCHUK_X, "analogX"],
            [Blockly.Msg.NUNCHUK_Y, "analogY"],
            [Blockly.Msg.NUNCHUK_aX, "accelX"],
            [Blockly.Msg.NUNCHUK_aY,
                "accelY"
            ],
            [Blockly.Msg.NUNCHUK_aZ, "accelZ"],
            [Blockly.Msg.NUNCHUK_bC, "cButton"],
            [Blockly.Msg.NUNCHUK_bZ, "zButton"]
        ]), "ID");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_adxl345 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=605&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_ACCEL_ADXL345).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_adxl345.png", 50, 40));
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            ["Accel-X (m/s2)", "4"],
            ["Accel-Y (m/s2)", "5"],
            ["Accel-Z (m/s2)", "6"],
            ["Roll-X (\u00ba)", "7"],
            ["Pitch-Y (\u00ba)",
                "8"
            ],
            ["Accel-X (raw)", "1"],
            ["Accel-Y (raw)", "2"],
            ["Accel-Z (raw)", "3"]
        ]), "ID");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_adxl345_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=567&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_adxl345_EP.png", 83, 42)).appendField(Blockly.Msg.SENSOR_ACCEL_ADXL345);
        this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
            ["Accel-X (m/s2)", "4"],
            ["Accel-Y (m/s2)", "5"],
            ["Accel-Z (m/s2)", "6"],
            ["Roll-X (\u00ba)", "7"],
            ["Pitch-Y (\u00ba)", "8"],
            ["Accel-X (raw)", "1"],
            ["Accel-Y (raw)", "2"],
            ["Accel-Z (raw)", "3"]
        ]), "ID");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_pm25 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=701&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_PM25).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_pm25.png", 64, 32));
        this.appendDummyInput("").appendField("LED").appendField(new Blockly.FieldDropdown(profile["default"].digital), "LED");
        this.appendDummyInput("").appendField("OUT").appendField(new Blockly.FieldDropdown(profile["default"].analog),
            "OUT");
        this.appendDummyInput("").appendField(" ").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_PM25_DENSITY, "0"],
            [Blockly.Msg.SENSOR_PM25_PARTICLESM3, "1"]
        ]), "TYPE");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_pm25_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=701&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_pm25_EP.png", 155, 78)).appendField(Blockly.Msg.SENSOR_PM25);
        this.appendDummyInput("").appendField(" ").appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_PM25_DENSITY, "0"],
            [Blockly.Msg.SENSOR_PM25_PARTICLESM3, "1"]
        ]), "TYPE");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_mics4514 = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_MICS4514).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_mics4514.png", 62, 32));
        this.appendDummyInput("").appendField("PRE").appendField(new Blockly.FieldDropdown(profile["default"].digital), "PRE");
        this.appendDummyInput("").appendField("NOX").appendField(new Blockly.FieldDropdown(profile["default"].analog), "NOX");
        this.appendDummyInput("").appendField("RED").appendField(new Blockly.FieldDropdown(profile["default"].analog),
            "RED");
        this.appendDummyInput("").appendField(" ").appendField(new Blockly.FieldDropdown([
            ["NO2 (ppb)", "0"],
            ["NO2 (ug/m3)", "2"],
            ["CO (ppm)", "1"]
        ]), "TYPE");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_mics4514_EP = {
    helpUrl: "",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_mics4514_EP.png", 79, 42)).appendField(Blockly.Msg.SENSOR_MICS4514);
        this.appendDummyInput("").appendField("PRE").appendField(new Blockly.FieldDropdown(profile["default"].digital), "PRE");
        this.appendDummyInput("").appendField("NOX").appendField(new Blockly.FieldDropdown(profile["default"].analog), "NOX");
        this.appendDummyInput("").appendField("RED").appendField(new Blockly.FieldDropdown(profile["default"].analog), "RED");
        this.appendDummyInput("").appendField(" ").appendField(new Blockly.FieldDropdown([
            ["NO2 (ppb)", "0"],
            ["NO2 (ug/m3)", "2"],
            ["CO (ppm)", "1"]
        ]), "TYPE");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_color_tcs34725 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=890&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_COLOR).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/tcs34725c.png", 56, 48)).appendField(Blockly.Msg.SENSOR_COLOR_READCOLOR);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.sensor_color_tcs34725_value = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=890&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_COLOR).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/tcs34725c.png", 56, 48)).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_COLOR_RGB_R, "0"],
            [Blockly.Msg.SENSOR_COLOR_RGB_G, "1"],
            [Blockly.Msg.SENSOR_COLOR_RGB_B, "2"],
            [Blockly.Msg.SENSOR_COLOR_RGB_CLEAR,
                "3"
            ],
            [Blockly.Msg.SENSOR_COLOR_HSV_H, "4"],
            [Blockly.Msg.SENSOR_COLOR_HSV_S, "5"],
            [Blockly.Msg.SENSOR_COLOR_HSV_V, "6"]
        ]), "TYPE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_color_tcs34725_iscolor = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=890&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_COLOR).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/tcs34725c.png", 56, 48)).appendField(Blockly.Msg.SENSOR_COLOR_ISCOLOR).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_COLOR_RED, "2"],
            [Blockly.Msg.SENSOR_COLOR_ORANGE, "3"],
            [Blockly.Msg.SENSOR_COLOR_YELLOW, "4"],
            [Blockly.Msg.SENSOR_COLOR_GREEN, "5"],
            [Blockly.Msg.SENSOR_COLOR_CYAN, "6"],
            [Blockly.Msg.SENSOR_COLOR_BLUE, "7"],
            [Blockly.Msg.SENSOR_COLOR_PURPLE, "8"]
        ]), "COLOR").appendField("?");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_color_tcs34725_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=890&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/tcs34725c_EP.png", 65, 35)).appendField(Blockly.Msg.SENSOR_COLOR).appendField(Blockly.Msg.SENSOR_COLOR_READCOLOR);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.sensor_color_tcs34725_value_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=890&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/tcs34725c_EP.png", 65, 35)).appendField(Blockly.Msg.SENSOR_COLOR).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_COLOR_RGB_R, "0"],
            [Blockly.Msg.SENSOR_COLOR_RGB_G, "1"],
            [Blockly.Msg.SENSOR_COLOR_RGB_B, "2"],
            [Blockly.Msg.SENSOR_COLOR_RGB_CLEAR,
                "3"
            ],
            [Blockly.Msg.SENSOR_COLOR_HSV_H, "4"],
            [Blockly.Msg.SENSOR_COLOR_HSV_S, "5"],
            [Blockly.Msg.SENSOR_COLOR_HSV_V, "6"]
        ]), "TYPE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_color_tcs34725_iscolor_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=890&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/tcs34725c_EP.png", 65, 35)).appendField(Blockly.Msg.SENSOR_COLOR).appendField(Blockly.Msg.SENSOR_COLOR_ISCOLOR).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_COLOR_RED, "2"],
            [Blockly.Msg.SENSOR_COLOR_ORANGE,
                "3"
            ],
            [Blockly.Msg.SENSOR_COLOR_YELLOW, "4"],
            [Blockly.Msg.SENSOR_COLOR_GREEN, "5"],
            [Blockly.Msg.SENSOR_COLOR_CYAN, "6"],
            [Blockly.Msg.SENSOR_COLOR_BLUE, "7"],
            [Blockly.Msg.SENSOR_COLOR_PURPLE, "8"]
        ]), "COLOR").appendField("?");
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.sensor_bmp180 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=572&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_BAROMETRIC).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_bmp180.png", 50, 40)).appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.SENSOR_PRESSURE, "PRESSURE"],
                [Blockly.Msg.SENSOR_ALTITUDE, "ALTITUDE"],
                [Blockly.Msg.SENSOR_TEMPERATURE, "TEMPERATURE"]
            ]),
            "TYPE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_bmp180_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=572&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_bmp180_EP.png", 77, 42)).appendField(Blockly.Msg.SENSOR_BAROMETRIC).appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.SENSOR_PRESSURE, "PRESSURE"],
                [Blockly.Msg.SENSOR_ALTITUDE, "ALTITUDE"],
                [Blockly.Msg.SENSOR_TEMPERATURE, "TEMPERATURE"]
            ]),
            "TYPE");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_ds18b20 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=618&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_DS18B20).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_ds18b20.png", 50, 40)).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN").appendField("#").appendField(new Blockly.FieldDropdown([
            ["0", "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"]
        ]), "INDEX");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_ds18b20_EP = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=563&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_ds18b20_EP.png", 79, 42)).appendField(Blockly.Msg.SENSOR_DS18B20).appendField(Blockly.Msg.PIN).appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN").appendField("#").appendField(new Blockly.FieldDropdown([
            ["0",
                "0"
            ],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"]
        ]), "INDEX");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_paj7620 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=965&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_PAJ7620).appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_paj7620.png", 69, 40));
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.sensor_paj7620_gesture = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=965&controller=product",
    init: function() {
        var a = [
            [Blockly.Msg.UP, "5"],
            [Blockly.Msg.DOWN, "6"],
            [Blockly.Msg.LEFT, "4"],
            [Blockly.Msg.RIGHT, "3"],
            [Blockly.Msg.BACKWARD, "2"],
            [Blockly.Msg.FORWARD, "1"],
            [Blockly.Msg.CLOCKWISE, "7"],
            [Blockly.Msg.ANTICLOCKWISE, "8"],
            [Blockly.Msg.WAVE, "9"]
        ];
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_paj7620.png",
            69, 40)).appendField(new Blockly.FieldDropdown(a), "GESTURE");
        this.setOutput("Number")
    }
};
Blockly.Blocks.sensor_ccs811 = {
    helpUrl: "http://shop.innovadidactic.com/index.php?id_product=983&controller=product",
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.SENSOR_CCS811).appendField(new Blockly.FieldDropdown([
            [Blockly.Msg.SENSOR_CCS811_CO2, "CO2"],
            [Blockly.Msg.SENSOR_CCS811_TVOC, "TVOC"]
        ]), "TYPE").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/sensor_ccs811.png", 78, 40));
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.serial = {};
Blockly.Blocks.serial.HUE = 170;
Blockly.Blocks.serial_init = {
    helpUrl: "https://www.arduino.cc/en/Serial/Begin",
    init: function() {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/console.png", 25, 25)).appendField(Blockly.Msg.SERIAL_INIT).appendField(Blockly.Msg.SERIAL_BAUDRATE).appendField(new Blockly.FieldDropdown([
            ["2400", "2400"],
            ["4800", "4800"],
            ["9600", "9600"],
            ["19200", "19200"],
            ["38400", "38400"],
            ["57600", "57600"],
            ["115200", "115200"]
        ]), "BAUD");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.serial_timeout = {
    helpUrl: "https://www.arduino.cc/en/Serial/SetTimeout",
    init: function() {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/console.png", 25, 25));
        this.appendValueInput("MS", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.SERIAL_TIMEOUT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.serial_print = {
    helpUrl: "https://www.arduino.cc/en/Serial/Print",
    init: function() {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/console.png", 25, 25)).appendField(Blockly.Msg.SERIAL_PRINT);
        this.appendValueInput("STRINGOUTPUT", "String");
        this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "NEWLINE").appendField(Blockly.Msg.ADD_NEW_LINE);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0,
            null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.serial_println = {
    helpUrl: "https://www.arduino.cc/en/Serial/Println",
    init: function() {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/console.png", 25, 25)).appendField(Blockly.Msg.SERIAL_PRINTLN);
        this.appendValueInput("STRINGOUTPUT", "String").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.serial_read_float = {
    helpUrl: "https://www.arduino.cc/en/Serial/ParseFloat",
    init: function() {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/console.png", 25, 25)).appendField(Blockly.Msg.SERIAL_READFLOAT);
        this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "NEWLINE").appendField(Blockly.Msg.UNTIL_NEW_LINE);
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.serial_read_string = {
    helpUrl: "https://www.arduino.cc/en/Serial/ReadString",
    init: function() {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/console.png", 25, 25)).appendField(Blockly.Msg.SERIAL_READSTRING);
        this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "NEWLINE").appendField(Blockly.Msg.UNTIL_NEW_LINE);
        this.setInputsInline(!0);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.serial_read_string_line = {
    helpUrl: "https://www.arduino.cc/en/Serial/ReadStringUntil",
    init: function() {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/console.png", 25, 25)).appendField(Blockly.Msg.SERIAL_READSTRINGLINE);
        this.setOutput(!0, "String")
    }
};
Blockly.Blocks.serial_read_byte = {
    helpUrl: "https://www.arduino.cc/en/Serial/Read",
    init: function() {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/console.png", 25, 25)).appendField(Blockly.Msg.SERIAL_READBYTE);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.serial_write_byte = {
    helpUrl: "https://www.arduino.cc/en/Serial/Write",
    init: function() {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/console.png", 25, 25)).appendField(Blockly.Msg.SERIAL_WRITEBYTE);
        this.appendValueInput("BYTE", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.serial_read_available = {
    helpUrl: "https://www.arduino.cc/en/Serial/Available",
    init: function() {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendDummyInput("").appendField(new Blockly.FieldImage(img_path + "blockly/media/arduino/console.png", 25, 25)).appendField(Blockly.Msg.SERIAL_AVAILABLE);
        this.setOutput(!0, "Boolean")
    }
};
Blockly.Blocks.time = {};
Blockly.Blocks.time.HUE = 110;
Blockly.Blocks.time_delay = {
    init: function() {
        this.setHelpUrl("http://arduino.cc/en/Reference/Delay");
        this.setColour(Blockly.Blocks.time.HUE);
        this.appendValueInput("DELAY_TIME_MILI").setCheck("Number").appendField(Blockly.Msg.TIME_WAIT);
        this.appendDummyInput().appendField(Blockly.Msg.TIME_MILLIS);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.time_delaymicros = {
    init: function() {
        this.setHelpUrl("http://arduino.cc/en/Reference/DelayMicroseconds");
        this.setColour(Blockly.Blocks.time.HUE);
        this.appendValueInput("DELAY_TIME_MICRO").setCheck("Number").appendField(Blockly.Msg.TIME_WAIT);
        this.appendDummyInput().appendField(Blockly.Msg.TIME_MICROS);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.time_millis = {
    init: function() {
        this.setHelpUrl("http://arduino.cc/en/Reference/Millis");
        this.setColour(Blockly.Blocks.time.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.TIME_TIME_ELAPSED + " (" + Blockly.Msg.TIME_MILLIS + ")");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.time_micros = {
    init: function() {
        this.setHelpUrl("http://arduino.cc/en/Reference/Micros");
        this.setColour(Blockly.Blocks.time.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.TIME_TIME_ELAPSED + " (" + Blockly.Msg.TIME_MICROS + ")");
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.time_runeveryms = {
    helpUrl: "http://www.arduinoblocks.com/blog/2016/12/01/multitarea-sin-bloqueo/",
    init: function() {
        this.setColour(Blockly.Blocks.time.HUE);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.appendDummyInput().appendField(Blockly.Msg.TIME_RUNEVERYMS);
        this.appendValueInput("MS", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput().appendField("ms");
        this.appendStatementInput("DO").appendField("");
        this.setInputsInline(!0)
    }
};
Blockly.Blocks.infinite_loop = {
    init: function() {
        this.setHelpUrl("");
        this.setColour(Blockly.Blocks.time.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.TIME_WAIT_FOREVER);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0)
    }
};
Blockly.Blocks.time_timer = {
    init: function() {
        this.setColour(Blockly.Blocks.time.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.TIME_TIMER).appendField(new Blockly.FieldDropdown([
            ["ms", "ms"],
            ["s", "s"]
        ]), "TYPE");
        this.setInputsInline(!0);
        this.setOutput(!0, "Number")
    }
};
Blockly.Blocks.time_timer_reset = {
    init: function() {
        this.setColour(Blockly.Blocks.time.HUE);
        this.appendDummyInput("").appendField(Blockly.Msg.TIME_TIMER_RESET);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
Blockly.Blocks.time_snooze = {
    init: function() {
        this.setColour(Blockly.Blocks.time.HUE);
        this.appendValueInput("DELAY_TIME_MILI").setCheck("Number").appendField(Blockly.Msg.TIME_SNOOZE);
        this.appendDummyInput().appendField(Blockly.Msg.TIME_MILLIS);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null)
    }
};
