var file_list_ui = function(require) {
	var $tem_file;
	var $files;
	var _hb;
	var __io;
	var _is_init = false;
	var $file_layout;
	var _is_click_file = false;

	function _init(_io, hb, file_list) {
		if (_is_init) {
			_replace_file_list(file_list);
			return this;
		}
		_is_init = true;
		__io = _io;
		_hb = hb;
		_cache();
		_bindEvent();
		if (file_list) {
			_append_file_list(file_list);
		}
		return this;
	}


	function _append_file_list(file_list) {
		Object.keys(file_list).forEach(function(key) {
			_add(file_list[key]);
		});
	}

	function _replace_file_list(file_list) {
		var data = {
			files: file_list,
		}
		_hb.combine_replace($tem_file, $files, data);
	}

	function _bindEvent() {
		__io.on('new_file', function(data) {
			_online(data);
			var str = '有文件上传 : ' + data.name;
			require('./char_ui').append(str);
		});
		__io.on('delete_file', function(data) {
			_remove(data.id);
		});
	}

	function _cache() {
		$tem_file = $('#file_tem');
		$files = $('#files');
		$file_layout = $('#tab_layout');
	}

	function _add(file) {
		var data = {
			files: [file],
		}
		_hb.combine_append($tem_file, $files, data);
	}
	//点亮
	function _online(file) {
		var $btns = $files.find('Button');
		$btns.each(function(index, item) {
			var $btn = $(item);
			if ($btn.data('file-id') === file.id) {
				$btn.removeAttr('disabled');
			}
		});
	}

	function _remove(id) {
		var $file = $files.children();
		$file.each(function(index, item) {
			if ($(item).data('file-id') === id) {
				$(item).remove();
			}
		});
	}

	function _update_online_file(files) {
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			var $btns = $files.find('Button');
			$btns.each(function(index, item) {
				var $btn = $(item);
				if ($btn.data('file-id') === file.id) {
					$btn.removeAttr('disabled');
				}
			});
		}
	}

	function _file_list_ui() {
		
	}

	return {
		init: _init,
		add: _add,
		update_online_file: _update_online_file,
		remove: _remove,
		online: _online,
		file_list_ui : _file_list_ui,
	}
}

define(file_list_ui);