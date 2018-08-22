/**
 * alert_plugin
 *
 * подключение в главном файле программы
 * 	import alert_plugin from "../common/alert_plugin"
 * 	Vue.use(alert_plugin)
 * 
 * использование:
 * 		this.$alert.remove("Remove item?").then(() => on_remove)
 *
 * https://craftpip.github.io/jquery-confirm/index.html
 */




function alert_remove(text){
	return new Promise((resolve, reject) => {
		$.alert({
		    title: 'Подтверждение удаления!',
		    content: text,
		    type: "red",
		    icon: 'fa fa-warning',
		    escapeKey: true,
			backgroundDismiss: true,
		    buttons: {
		    	confirm: {
		    		text: "Удалить",
		    		btnClass: 'btn-red',
		    		keys: ["enter"],
		    		action: function(){
		    			resolve();
		    		}
		    	},
		    	cancel: {
		    		text: "Отмена",
		    		// action: function(){
		    		// 	// reject();
		    		// }
		    	},
		    }
		});
	})
}


function alert_confirm(text, title){
	return new Promise((resolve, reject) => {
		$.alert({
		    title: title || "Подтверждение",
		    content: text,
		    type: "orange",
		    icon: 'fa fa-warning',
		    escapeKey: true,
			backgroundDismiss: true,
		    buttons: {
		    	confirm: {
		    		text: "Принять",
		    		btnClass: 'btn-blue',
		    		keys: ["enter"],
		    		action: function(){
		    			resolve();
		    		}
		    	},
		    	cancel: {
		    		text: "Отмена",
		    		// action: function(){
		    		// 	// reject();
		    		// }
		    	},
		    }
		});
	})
}

const METHODS = {
	"remove"	: alert_remove,
	"confirm"	: alert_confirm
}


const mtoastr = {};


mtoastr.install = function(Vue, options){


    Vue.mixin({
        beforeCreate(){
            this.$alert = METHODS;
        }
    })
}


export default mtoastr; 