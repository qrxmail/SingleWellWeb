import React from 'react';
import { getCurrentUserName } from '@/utils/authority';
import styles from './HrefCMS.less'

const userName = getCurrentUserName();
console.log("当前用户名：" + userName);


export default () => {
  let iframeHeight = document.body.clientHeight+20;
  return (
    <div className={styles.divIframe}>
      <iframe src="http://117.34.91.69:12319/PressureVesselDevice" width="100%" height={iframeHeight} frameBorder="0"></iframe>
    </div>
  );

};
