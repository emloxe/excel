/**
 * 将两个数组数据根据键进行联立
 *
 * @param {Array[]} arr1 二维数组
 * @param {number} keyIndex1 相连接的键
 * @param {Array[]} arr2 二维数组
 * @param {number} keyIndex2 相连接的键
 * @returns
 */
export const jointData = (arr1, keyIndex1, arr2, keyIndex2) => {
  const obj = {};

  arr1.forEach((element) => {
    const arr = [];
    arr.push(element);
    obj[element[keyIndex1]] = arr;
  });

  arr2.forEach((element) => {
    if (obj[element[keyIndex2]]) {
      obj[element[keyIndex2]].push(element);
    } else {
      console.log('数据异常，没有对应的键', element);
    }
  });

  return obj;
};

/**
 *
 * @param {Object} obj JointData返回的数据
 * @param {Array} arrIndex1 索引值数组
 * @param {Array} arrIndex2 索引值数组
 * @param {Array[]} division 二维数组
 * @returns
 */
export const obj2arr = (obj, arrIndex1, arrIndex2, division) => {
  const arrAll = [];

  Object.values(obj).forEach(([arr1, arr2]) => {
    const arr = [];

    arrIndex1.forEach((index) => {
      arr.push(arr1[index]);
    });

    arrIndex2.forEach((index) => {
      arr.push(arr2[index]);
    });


    // 处理除法
    if(division) {
      const [dividendArr, divisorArr] = division;
      let dividend = 0;
      let divisor = 1;

      if(dividendArr[0] === 0) {
        dividend = arr1[dividendArr[1]]
      } else {
        dividend = arr2[dividendArr[1]]
      }

      if(divisorArr[0] === 0) {
        divisor = arr1[divisorArr[1]]
      } else {
        divisor = arr2[divisorArr[1]]
      }

      const num = (dividend / divisor).toFixed(1)
      arr.push(num)
    }

    arrAll.push(arr);
  });

  return arrAll;
};

/**
 * 获取表头数据
 * @param {*} arr1
 * @param {*} arrIndex1
 * @param {*} arr2
 * @param {*} arrIndex2
 */
export const getThead = (arr1, arrIndex1, arr2, arrIndex2) => {
  const arr = [];

  arrIndex1.forEach((index) => {
    arr.push(arr1[index].label);
  });

  arrIndex2.forEach((index) => {
    arr.push(arr2[index].label);
  });

  return arr;
};


const dealDivision = () => {

}


/**
 * 下载
 * @param {*} data 数据值
 * @param {*} name 下载的文件名称
 */
export function savefiles(data, name) {
  //Blob为js的一个对象，表示一个不可变的, 原始数据的类似文件对象，这是创建文件中不可缺少的！
  var urlObject = window.URL || window.webkitURL || window;
  var export_blob = new Blob([data]);
  var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  save_link.href = urlObject.createObjectURL(export_blob);
  save_link.download = name;
  save_link.click();
}
