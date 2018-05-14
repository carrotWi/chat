var file_dialog = function(require) {
	var $dialog;
	var _file_file;
	var $form;

	function _init() {
		_cache();
		_bind_event();
	}

	function _cache() {
		$dialog = $('#file_dialog');
		$file_file = $('#file_file');
		$form = $('#file_form');
		$file_file.fileinput({
			language: 'zh', //设置语言
			uploadUrl: $form.attr('action'), //上传的地址
			allowedFileExtensions: ['jpg', 'png', 'gif'], //接收的文件后缀
			showUpload: false, //是否显示上传按钮showUpload
			showCaption: false, //是否显示标题
			browseClass: "btn btn-primary", //按钮样式             
			previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
			uploadAsync: true,
			slugCallback: function(filename) {
				debugger　　　　
				return filename;　　
			},
		})
		// .on('fileuploaded', function(event, data, id, index) {
		// 	debugger
		// })
		// .on("filebatchselected", function(event, files) {  
		//          	debugger
		//          });
		//todo : ajax
		// _validate($form);

	}

	function _validate($form) {
		$form.validate({
			rules: {
				file_name: {
					required: true,
				},
			},
			submitHandler: _form_handle,
		});
	}

	function _form_handle(form) {
		var $form = $(form);
		var opt = {
			type: $form.attr('method'),
			url: $form.attr('action'),
			data: $form.serialize(),
			dataType: "json",
			success: function(data) {
				$enroll_dialog.modal('hide');
				if (data.verify) {
					_add_success(data);
				} else {
					add_fail(data);
				}
			},
			beforeSend: function() {

			},
		}
		debugger
		$.ajax(opt)
		// .done(function() {
		// 	log("success");
		// })
		// .fail(function() {
		// 	log("fail");
		// })
		// .always(function() {
		// 	log("complete");
		// });
	}


	function _bind_event() {
		$dialog.modal('show');

	}



	return {
		init: _init,
	}
}

define(file_dialog);