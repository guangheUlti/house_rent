import React from 'react';
import { Icon } from 'antd';
import PopupBase from './PopupBase';

export default class PopupWait {
  /* 等待 */
  static open(tip) {
    let component = (
      <div style={{display:'flex',alignItems:'center'}}>
        <div><Icon style={{color:'white',fontSize:24}} type="loading" /></div>
        { !!tip ? <div>&nbsp;&nbsp;&nbsp;&nbsp;</div> : null }
        { !!tip ? <div style={{color:'white',fontSize:16}}>{tip}</div> : null }
      </div>
    );
    PopupBase.open(component, PopupBase.TRANSLUCENCE);
  }
  /* 关闭 */
  static close() {
    PopupBase.close();
  }
}
