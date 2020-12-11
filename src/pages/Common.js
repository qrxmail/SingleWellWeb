import moment from 'moment';

// 动态设置抽屉页的宽度
export const drawWidth = (width) => {
   return document.body.clientWidth < 900 ? '100%' : width;
}

// 将时间格式化为moment或者null
export const setDate = (timeStr) => {
    return timeStr === '0001-01-01T00:00:00' || timeStr === undefined || timeStr === null ? null : moment(timeStr, 'YYYY年MM月DD日');
  };
  
  // 将时间格式化为moment或者null
  export const setTime = (timeStr) => {
    return timeStr === '0001-01-01T00:00:00' || timeStr === undefined || timeStr === null ? null : moment(timeStr, 'YYYY年MM月DD日 HH:mm:ss');
  };
  
  // 输出base64编码
  const base64 = (s) => window.btoa(unescape(encodeURIComponent(s)));
  
  // 导出Excel
  export const exportExcelUtil = (str, filename = '导出.xlsx') => {
    // Worksheet名
    const worksheet = 'Sheet1';
    const uri = 'data:application/vnd.ms-excel;base64,';
  
    // 下载的表格模板数据
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
     xmlns:x="urn:schemas-microsoft-com:office:excel" 
     xmlns="http://www.w3.org/TR/REC-html40">
     <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
     <x:Name>${worksheet}</x:Name>
     <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
     </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
     <style>
       table {
         font-size: 12px;
       }
       td {
         height: 30px;
       }
     </style>
     </head>
     <body>${str}</body></html>`;
  
    let blob = b64toBlob(base64(template), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    saveAs(blob, filename);
  };
  
  const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };
  
  // 将字典项转换为枚举（可支持查询下拉选择）
  export const dicToEnum = (dic) => {
    let valueEnum = {};
    dic.forEach((item) => {
      valueEnum[item] = { text: item };
    });
    return valueEnum;
  };
  