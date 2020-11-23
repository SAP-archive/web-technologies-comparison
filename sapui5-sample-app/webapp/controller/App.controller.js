sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.todo.controller.App", {

		onInit: function () {
			this.aSearchFilters = [];
			this.aTabFilters = [];

			this.getView().setModel(new JSONModel({
				filterText: undefined
			}), "view");
		},

		/**
		 * Adds a new todo item to the bottom of the list.
		 */
		addTodo: function () {
			var oModel = this.getView().getModel();
			var aTodos = oModel.getProperty("/todos");

			const oNew = oModel.getProperty("/newTodo");
			oNew.id = aTodos.length + 1;

			oModel.setProperty("/todos", [...aTodos, oNew]);
			oModel.setProperty("/newTodo", "");
		},

		onEditTodo: function (oEvent) {
			var oModel = this.getView().getModel();
			const todo = oEvent.getSource().getBindingContext().getObject();

			oModel.setProperty("/edit", Object.assign({}, todo));

			this.getView().byId("editDialog").open();
		},

		onClose: function () {
			this.getView().byId("editDialog").close();
		},

		onDeleteTodo: function (oEvent) {
			var oModel = this.getView().getModel();
			var aTodos = oModel.getProperty("/todos");

			const removedTodo = oEvent.getSource().getBindingContext().getObject();

			oModel.setProperty("/todos", aTodos.filter(todo => todo !== removedTodo));
		},

		onSave: function () {
			var oModel = this.getView().getModel();
			var aTodos = oModel.getProperty("/todos");
			const edited = oModel.getProperty("/edit");

			const idx = aTodos.findIndex((todo) => todo.id === edited.id);
			aTodos[idx] = edited;

			oModel.setProperty("/todos", [...aTodos]);
			this.getView().byId("editDialog").close();
		}

	});

});
