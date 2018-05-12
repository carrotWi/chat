var qq_ui = function(require) {
	var $textarea;
	var _imgPath = '/public/libs/kyo4311-jquery.qqface-32bf148/gif/';
	var $handle;
	//隐藏的中间表单
	var $qq_context;

	var face_map = [
		'weixiao,微笑',
		'piezui,撇嘴',
		'se,色',
		'fadai,发呆',
		'deyi,得意',
		'liulei,流泪',
		'haixiu,害羞',
		'bizui,闭嘴',
		'shui,睡',
		'daku,大哭',
		'ganga,尴尬',
		'fanu,发怒',
		'tiaopi,调皮',
		'ciya,呲牙',
		'jingya,惊讶',
		'nanguo,难过',
		'ku,酷',
		'lenghan,冷汗',
		'zhuakuang,抓狂',
		'tu,吐',
		'touxiao,偷笑',
		'keai,可爱',
		'baiyan,白眼',
		'aoman,-傲慢',
		'jie,饥饿',
		'kun,困',
		'jingkong,惊恐',
		'liuhan,流汗',
		'hanxiao,憨笑',
		'dabing,大兵',
		'fendou,奋斗',
		'zhouma,咒骂',
		'yiwen,疑问',
		'xu,嘘',
		'yun,晕',
		'zhemo,折磨',
		'shuai,衰',
		'kulou,骷髅',
		'qiaoda,敲打',
		'zaijian,再见',
		'cahan,擦汗',
		'koubi,抠鼻',
		'guzhang,鼓掌',
		'qiudale,糗大了',
		'huaixiao,坏笑',
		'zuohengheng,左哼哼',
		'youhengheng,右哼哼',
		'haqian,哈欠',
		'bishi,鄙视',
		'weiqu,委屈',
		'kuaikule,快哭了',
		'yinxian,阴险',
		'qinqin,亲亲',
		'xia,吓',
		'kelian,可怜',
		'caidao,菜刀',
		'xigua,西瓜',
		'pijiu,啤酒',
		'lanqiu,篮球',
		'pingpang,乒乓',
		'kafei,咖啡',
		'fan,饭',
		'zhutou,猪头',
		'meigui,玫瑰',
		'diaoxie,凋谢',
		'shiai,示爱',
		'aixin,爱心',
		'xinsui,心碎',
		'dangao,蛋糕',
		'shandian,闪电',
		'zhadan,炸弹',
		'dao,刀',
		'zuqiu,足球',
		'piaochong,瓢虫',
		'bianbian,便便',
		'yueliang,月亮',
		'taiyang,太阳',
		'liwu,礼物',
		'yongbao,拥抱',
		'qiang,强',
		'ruo,弱',
		'woshou,握手',
		'shengli,胜利',
		'baoquan,抱拳',
		'gouyin,勾引',
		'quantou,拳头',
		'chajin,差劲',
		'aini,爱你',
		'no,NO',
		'ok,OK'
	];
	var _map;
	var _is_init = false;
	var _hb;
	var $layer;

	function _init(hb) {
		if (_is_init) {
			return;
		}
		_hb = hb;
		_is_init = true;
		_cache();
		_bindEvent();
	}


	function _bindEvent() {
		$handle.click(function(event) {
			$textarea.focusin(_china_to_en_handle);
		});
		//失去焦点同步 value AND innerHTML
		$textarea.focusout(function(event) {
			_refresh();
		});
		$.qqface({
			imgPath: _imgPath,
			textarea: $textarea,
			handle: $handle,
		});
	}

	function _refresh() {
		var html = $textarea.html();
		$textarea.val(html);

	}

	function _click_handle(e) {
		$layer = $('.jquery-qqface-layer');
		var $i = $layer.find('i');
		$i.click(_china_to_en_handle);
	}

	function _china_to_en_handle(e) {
		setTimeout(function() {
			var context = $textarea.val();
			context = _split_undefined(context);
			context = _format_img_src(context);
			if (!context.trim()) {
				return
			}
			$textarea.html(context);
			$textarea.val(context);

		}, 100);
		$textarea.off('focusin');

	}


	function _split_undefined(str) {
		str = str.replace(/undefined/g, '');
		return str;
	}

	function _format_img_src(str) {
		if (!str) {
			return
		}
		var rex1 = new RegExp(/(\[:([\u4e00-\u9fa5]+)\])/g);
		str = str.replace(rex1, function(a, b, c) {
			return '<img src="' + _imgPath + _name_map(c) + '.gif">';
		});
		return str;
	}

	function _name_map(china) {
		if (!_map) {
			_map = _to_obj(face_map);
		}
		return _map[china];
	}

	function _to_obj(arr) {
		var obj = {};
		for (var i = 0; i < face_map.length; i++) {
			var map = face_map[i];
			var pair = map.split(',');
			var key = pair[1];
			var value = pair[0];
			obj[key] = value;
		}
		return obj;
	}

	function _cache() {
		$textarea = $('#context_msg');
		$handle = $('#face');
		$qq_context = $('#qq_context');
	}

	function _clean() {
		$textarea.html('');
		_refresh();
	}
	return {
		init: _init,
		clean: _clean,
	}
}

define(qq_ui);