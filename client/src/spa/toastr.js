/**
 * toastr_plugin
 * 
 * https://github.com/CodeSeven/toastr
 * http://codeseven.github.io/toastr/demo.html
 *
 * подключение в главном файле программы
 * 	import toastr_plugin from "../common/toastr_plugin"
 * 	Vue.use(toastr_plugin)
 * 
 * использование:
 * 		this.$toastr.n_info("info", ["title"])
 * 		this.$toastr.n_warning("warning", ["title"])
 * 		this.$toastr.n_success("success", ["title"])
 * 		this.$toastr.n_error("error", ["title"])
 */



/**
 * https://github.com/CodeSeven/toastr
 * http://codeseven.github.io/toastr/demo.html
 */

const options = {
	"closeButton": false,
	"debug": false,
	"newestOnTop": false,
	"progressBar": false,
	"positionClass": "toast-top-right",
	"preventDuplicates": false,
	"onclick": null,
	"showDuration": "300",
	"hideDuration": "1000",
	"timeOut": "5000",
	"extendedTimeOut": "1000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
};





const toastr_methods = {
	n_info: function (text, title) {
		toastr.info(text || "---", title || "");
	},

	n_success: function (text, title) {
		toastr.success(text || "---", title || "");
	},

	n_warning: function (text, title) {
		toastr.warning(text || "---", title || "");
	},

	n_error: function (text, title) {
		toastr.error(text || "---", title || "");
	},



	info: function (text, title) {
		toastr.info(text || "---", title || "");
	},

	success: function (text, title) {
		toastr.success(text || "---", title || "");
	},

	warning: function (text, title) {
		toastr.warning(text || "---", title || "");
	},

	error: function (text, title) {
		toastr.error(text || "---", title || "");
	},
};


const mtoastr = {};


mtoastr.install = function(Vue, options){


    Vue.mixin({
        beforeCreate(){
            this.$toastr = toastr_methods;
        }
    })
}


export default mtoastr; 