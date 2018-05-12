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
		$form = $file_file.parentsUntil("form")
		$file_file.fileinput({
			language: 'zh', //设置语言
			uploadUrl: $form.attr('action'), //上传的地址
			allowedFileExtensions: ['jpg', 'png', 'gif'], //接收的文件后缀
			showUpload: false, //是否显示上传按钮showUpload
			showCaption: false, //是否显示标题
			browseClass: "btn btn-primary", //按钮样式             
			previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
			uploadAsync: true,
		});



	}

	function _bind_event() {
		$dialog.modal('show');

	}



	return {
		init: _init,
	}
}

define(file_dialog);