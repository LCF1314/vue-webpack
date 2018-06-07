import Vue from 'vue'

/* 
 * 注册全局自定义指令
 */
// v-empty: 用于在element-ui的table中无内容是显示的模块
Vue.directive('empty', {
    bind(el, binding, vnode, oldVnode) {
        const EMPTY_BLOCK = el.querySelector('.el-table__empty-block');
        const CONTENT = document.createElement('div');
        CONTENT.className = 'kgw-table-empty-box';

        const i = document.createElement('i');
        i.className = 'iconfont';
        i.innerHTML = '&#xe605;';

        const p = document.createElement('p');
        p.innerHTML = binding.value;
        
        CONTENT.appendChild(i);
        CONTENT.appendChild(p);
        const old = EMPTY_BLOCK.querySelector('.el-table__empty-text');
        
        EMPTY_BLOCK.appendChild(CONTENT);
        //EMPTY_BLOCK.replaceChild(CONTENT, old);
    }
})

// v-blurToFixed: 用于失去焦点是将值加小数点
Vue.directive('blurToFixed', {
    update(el, binding, vnode, oldVnode) {
        const input = el.querySelector('input')
        input.onblur = () => {
            let value = +vnode.child.currentValue;
            vnode.child.currentValue = value.toFixed(binding.value);
        }
    },
    inserted(el, binding, vnode, oldVnode) {
        const input = el.querySelector('input')
        let value = +vnode.child.currentValue;
        vnode.child.currentValue = value.toFixed(binding.value);
    }
})

// v-loadmore: 用于在element-ui的select下拉框加上滚动到底事件监听
Vue.directive('loadmore', {
    bind(el, binding) {
      
      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
    
      SELECTWRAP_DOM.addEventListener('scroll', function() {

          /*
           * scrollHeight 获取元素内容高度(只读)
           * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
           * clientHeight 读取元素的可见高度(只读)
           * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
           * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
           */
          const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;
          
          if(CONDITION) {
              binding.value();
          }
      });
    }
})

// v-loadmore: 用于在element-ui的table加上滚动到底事件监听
Vue.directive('tableLoadmore', {
    bind(el, binding) {
      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector('.el-table__body-wrapper');
      
      SELECTWRAP_DOM.addEventListener('scroll', function() {

          /*
           * scrollHeight 获取元素内容高度(只读)
           * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
           * clientHeight 读取元素的可见高度(只读)
           * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
           * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
           */
            let sign = 80; // 定义默认的向上滚于乡下滚的边界
            const CONDITION = ((this.scrollHeight - this.scrollTop === this.clientHeight) && 
                            this.scrollTop > sign)// 注意: && this.scrollTop
            
            if(this.scrollTop > sign) {
                sign = this.scrollTop;
                //console.log('向下')
            }
            if(this.scrollTop < sign) {
                sign = this.scrollTop;
                //console.log('向上')
            }
            
            if(CONDITION) {
                const res = binding.value();
                if(res) {
                    this.scrollTop = 100;
                }
            }
      });
    }
})

// v-loadmore: 用于在element-ui的table加上滚动到顶部事件监听
let tableScrollLeft = 0;  // 定义table横屏滚动数据
Vue.directive('tableLoadback', {
    bind(el, binding) {
      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector('.el-table__body-wrapper');
      SELECTWRAP_DOM.addEventListener('scroll', function() {

          /*
           * scrollHeight 获取元素内容高度(只读)
           * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
           * clientHeight 读取元素的可见高度(只读)
           * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
           * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
           */
            let sign = 80; // 定义默认的向上滚于乡下滚的边界
            
            if(this.scrollTop > sign) {
                sign = this.scrollTop;
                // log('向下')
            }
            if(this.scrollTop < sign) {
                sign = this.scrollTop;
                //log('向上')
                tableScrollLeft = this.scrollLeft;
                
                // 判断到顶部 且不是左右滚动 且可视长度不够滚动长度
                if(this.scrollTop === 0 && tableScrollLeft === this.scrollLeft && (this.scrollHeight - this.scrollTop !== this.clientHeight)) {

                    // 执行指令绑定事件 且获取是否要指定滚动条位置
                    const res = binding.value();
                    if(res) {
                        this.scrollTop = this.scrollHeight - this.clientHeight - 10
                    }
                }
                
            }
      });
    }
})

// v-downFill: 数量 单价 Ctrl+c向下填充
Vue.directive('downFill', {
    update(el, binding, vnode, oldVnode) {
        let classNameWh = ''; // 仓库的类名
        let indexWh = ''; // 仓库的下标
        // 可以向下填充的字段
        const PROP = ['unitCodeNumber', 'price', 'whName'];
        const hash = {
            'unitCodeNumber': 'numberPrecisions',
            'price': 'amountPrecisions'
        }
        let tableDom = document.getElementsByClassName('downfill-table')[0];
        // 获取点击仓库时的位置
        // log(tableDom)
        // if(tableDom) {
        el.onclick = (event) => {
            let e = event || window.event;
            // 判断是仓库（仓库DOM初始为span  不是 select）
            if(e.toElement.className.includes('down-fill')) {
                classNameWh = e.srcElement.attributes.typeName.value;
                indexWh = e.srcElement.attributes.textIndex.value;
            } else if(e.srcElement.parentElement && e.srcElement.parentElement.parentElement){
                classNameWh = e.srcElement.parentElement.parentElement.attributes.typeName && e.srcElement.parentElement.parentElement.attributes.typeName.value;
                indexWh = e.srcElement.parentElement.parentElement.attributes.typeName && e.srcElement.parentElement.parentElement.attributes.textIndex.value;
            }
        } 
        // }
        
        // 获取 数量 单价 位置  按下 键盘时获取
        el.onkeydown = (event) => {
            let e = event || window.event || arguments.callee.caller.arguments[0]; 
            // 获取光标所在位置的 typeName属性
            const CLASSNAME = e.srcElement.parentElement.attributes.typeName && e.srcElement.parentElement.attributes.typeName.value;
            // 获取光标所在位置的 textIndex (光标所在当前行的index)属性
            const index = e.srcElement.parentElement.attributes.typeName && e.srcElement.parentElement.attributes.textIndex.value;
            
            let copyName = classNameWh || CLASSNAME;
            let copyIndex = indexWh === undefined ? index : indexWh;
            if(e && e.keyCode==67 && copyName && PROP.includes(copyName)){ // 按 ctrl+c 
                binding.value(copyIndex, copyName, hash[copyName])
            }
            
        };  
    }
})

// v-enter: 回车提交
Vue.directive('enter', {
    bind(el, binding, vnode, oldVnode) {
        el.onkeydown = (event) => {
            let e = event || window.event || arguments.callee.caller.arguments[0];  
            if(e && e.keyCode==13){ // 按 ctrl+c 
                binding.value('loginParams')
            }
        };  
    }
})

// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        dialogHeaderEl.style.cursor = 'move';

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
        
        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;
            
            // 获取到的值带px 正则匹配替换
            let styL, styT;

            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if(sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            }else {
                styL = +sty.left.replace(/\px/g, '');
                styT = +sty.top.replace(/\px/g, '');
            };
            
            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离 
                const l = e.clientX - disX;
                const t = e.clientY - disY;

                // 移动当前元素  
                dragDom.style.left = `${l + styL}px`;
                dragDom.style.top = `${t + styT}px`;

                //将此时的位置传出去
                //binding.value({x:e.pageX,y:e.pageY})
            };

            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }  
    }
})

// v-dialogDragWidth: 弹窗宽度拖大 拖小
Vue.directive('dialogDragWidth', {
    bind(el, binding, vnode, oldVnode) {
        const dragDom = binding.value.$el.querySelector('.el-dialog');

        el.onmousedown = (e) => {
            
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - el.offsetLeft;
            
            document.onmousemove = function (e) {
                e.preventDefault(); // 移动时禁用默认事件

                // 通过事件委托，计算移动的距离 
                const l = e.clientX - disX;
                dragDom.style.width = `${l}px`;
            };

            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }  
    }
})