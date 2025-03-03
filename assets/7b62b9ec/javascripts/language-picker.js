$(document).ready(function() {
    LanguagePicker.init()
});
var LanguagePicker = {
    _rendering: !1,
    init: function() {
        $("body").on("click", ".language-picker ul a", $.proxy(function(e) {
            this.change($(e.currentTarget).attr("href")), e.preventDefault()
        }, this)), $("body").on("click", ".language-picker.dropdown-list a, .language-picker.dropup-list a", $.proxy(function(e) {
            this.render($(e.currentTarget).closest(".language-picker")), $(e.currentTarget).parent().find("ul").toggleClass("active"), e.preventDefault()
        }, this)), $("body").on("mouseover", ".language-picker.dropdown-list a, .language-picker.dropup-list a", $.proxy(function(e) {
            this.render($(e.currentTarget).closest(".language-picker"))
        }, this)), $("body").on("mouseout", ".language-picker.dropdown-list, .language-picker.dropup-list", function() {
            $(this).find("ul").removeClass("active")
        })
    },
    change: function(e) {
        $.get(e, {}, function() {
            document.location.reload()
        })
    },
    render: function(e) {
        if (!this._rendering) {
            this._rendering = !0, e.hasClass("dropup-list") && e.addClass("dropdown-list").removeClass("dropup-list");
            var n = $(window).height() + $(window).scrollTop(),
                i = e.height() - e.find("a").eq(0).height(),
                r = e.find("ul").height(),
                t = e.position().top;
            t + i + r > n && (t - n > 0 || n / 2 > n - t) && e.addClass("dropup-list").removeClass("dropdown-list"), this._rendering = !1
        }
    }
};
