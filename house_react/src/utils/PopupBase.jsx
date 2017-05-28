import ReactDOM from 'react-dom';

class PopupBase {
  /*
    打开一个全屏的浮动div
      element: React Component
      background: 背景色，'#fff' 或 PopupBase.TRANSLUCENCE（半透明） 或 其他CSS语法
      callback: 如果为 true，表示接受点击动作（关闭），如果是个函数，则表示关闭后的回掉通知
  */
  static open(element, background, callback) {
    let div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.left = 0;
    div.style.top = 0;
    div.style.right = 0;
    div.style.bottom = 0;
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    if ( !! background )
      div.style.background = background;
    div.style.zIndex = ++PopupBase._ZIndex;
    if ( !!callback )
      div.onclick = ()=>{
        PopupBase.close();
        if ( typeof callback == 'function' )
          callback();
      };
    document.body.appendChild(div);
    ReactDOM.render(element, div);
    PopupBase._VStack.push(div);
  }
  /* 关闭最顶层的全屏浮动div */
  static close() {
    if ( PopupBase._VStack.length == 0 )
      return;
    let div = PopupBase._VStack.pop();
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
    PopupBase._ZIndex --;
  }
};

PopupBase.TRANSLUCENCE = 'rgba(0,0,0,0.2)';   // 半透明
PopupBase._ZIndex = 10000;
PopupBase._VStack = [];

export default PopupBase;
