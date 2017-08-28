/**
 * Created by lyy on 2017/7/9.
 */
window.onload = function () {
    new Vue({
        data: {
            kw: '',
            results: [],
            nowIndex:-1
        },
        methods: {
            show: function (e,click) {
                if(e.keyCode == 38 || e.keyCode == 40) return;
                if(e.keyCode == 13 || click){
                    window.open("https://www.baidu.com/s?wd=" + this.kw);
                    this.kw = "";
                }
                this.$http.jsonp('https://www.baidu.com/su', {
                    params: {
                        wd: this.kw
                    },
                    jsonp:"cb"
                }).then(function (res) {
                    this.results = res.data.s;
                }, function () {
                    console.log("出错了");
                });
            },
            changeDown:function(){
                this.nowIndex ++;
                if(this.nowIndex == this.results.length) this.nowIndex = -1;
                this.kw = this.results[this.nowIndex];
            },
            changeUp:function(){
                this.nowIndex --;
                if(this.nowIndex == -2) this.nowIndex = this.results.length - 1;
                this.kw = this.results[this.nowIndex];
            }
        }
    }).$mount(".project");
};