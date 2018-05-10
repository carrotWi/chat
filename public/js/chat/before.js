 $.fn.fileinput = function (option) {
        if (!hasFileAPISupport() && !isIE(9)) {
            return;
        }
        var args = Array.apply(null, arguments), retvals = [];
        args.shift();
        this.each(function () {
            var self = $(this), data = self.data('fileinput'), options = typeof option === 'object' && option,
                theme = options.theme || self.data('theme'), l = {}, t = {},
                lang = options.language || self.data('language') || 'en', opts;
            if (!data) {
                if (theme) {
                    t = $.fn.fileinputThemes[theme] || {};
                }
                if (lang !== 'en' && !isEmpty($.fn.fileinputLocales[lang])) {
                    l = $.fn.fileinputLocales[lang] || {};
                }
                opts = $.extend(true, {}, $.fn.fileinput.defaults, t, $.fn.fileinputLocales.en, l, options,
                    self.data());
                //加了这句话
                opts = $.extend(true,{},opts,options);
                data = new FileInput(this, opts);
                self.data('fileinput', data);
            }

            if (typeof option === 'string') {
                retvals.push(data[option].apply(data, args));
            }
        });
        switch (retvals.length) {
            case 0:
                return this;
            case 1:
                return retvals[0];
            default:
                return retvals;
        }
    };