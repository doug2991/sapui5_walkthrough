sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	],function (Controller,JSONModel,MessageToast,formatter,Filter,FilterOperator) {
		"use strict";
		return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
			formatter : formatter,
			
			onInit : function(){
				var oViewModel = new JSONModel({
					currency : "EUR"
				});	
				this.getView().setModel(oViewModel,"view");
			},
			
			onPressItem : function(argInput){
				var objItem = argInput.getSource().getProperty("title");
				MessageToast.show(objItem);                         
			},
			
			onFilterInvoices : function(oEvent){
				//Build filter array
				var aFilter = [];
				var sQuery = oEvent.getParameter("query");
				if(sQuery){
					aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
				}
				//Filter Binding
				var oList = this.byId("invoiceList");
				var oBinding =  oList.getBinding("items");
				oBinding.filter(aFilter);
			},
			
			onPress : function(oEvent){
				var oItem = oEvent.getSource();
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("detail", {
					invoicePath : oItem.getBindingContext("invoice").getPath().substr(1)
				});
			}
		});
	});