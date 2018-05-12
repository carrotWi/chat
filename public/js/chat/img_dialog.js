	var img_dialog = function(require) {
		var $dialog;
		var _uploadUrl = '';
		var _img_file;

		function _init() {
			_cache();
			_bind_event();
		}

		function _cache() {
			$dialog = $('#img_dialog');

			$img_file = $('#img_file');
			$img_file.fileinput({
				language: 'zh', //设置语言
				uploadUrl: _uploadUrl, //上传的地址
				allowedFileExtensions: ['jpg', 'png', 'gif'], //接收的文件后缀
				showUpload: false, //是否显示上传按钮
				showCaption: false, //是否显示标题
				browseClass: "btn btn-primary", //按钮样式             
				previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
			});

		}

		function _bind_event() {
			$dialog.modal('show');
		}

		return {
			init: _init,
		}
	}

	define(img_dialog);