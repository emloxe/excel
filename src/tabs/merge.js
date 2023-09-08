// 表格合并

import React, { useState, useEffect } from 'react';
import {
  Form,
  Select,
  Checkbox,
  Button,
  message,
  Modal,
  Input,
  Cascader,
  Alert
} from 'antd';
import xlsx from 'node-xlsx';
import { SwapOutlined } from '@ant-design/icons';

import moment from 'moment-timezone';

import { jointData, obj2arr, getThead, savefiles } from '../utils';

const CheckboxGroup = Checkbox.Group;

function TabMerge({ flies }) {
  const [messageApi, contextHolder] = message.useMessage();

  const [firstOptions, setFirstOptions] = useState([]);
  const [secondOptions, setSecondOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);

  // 需要将两个表联立的列
  const [uniqueKey1, setUniqueKey1] = useState('');
  const [uniqueKey2, setUniqueKey2] = useState('');
  // 需要导出的数据列
  const [exportList1, setExportList1] = useState([]);
  const [exportList2, setExportList2] = useState([]);
  // 除法计算的数据
  const [dividendArr, setDividendArr] = useState([]); // 被除数
  const [divisorArr, setDivisorArr] = useState([]); // 除数

  // 弹框
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filename, setFilename] = useState('');

  // 清空数据
  const clearChoose = () => {
    setUniqueKey1('');
    setUniqueKey2('');
    setExportList1([]);
    setExportList2([]);

    setDividendArr([]);
    setDivisorArr([]);
  };

  useEffect(() => {
    console.log('每次都会执行');

    const groupOption = [];

    if (flies[0]) {
      setFirstOptions(flies[0].theadOption);

      groupOption.push({
        label: '组1',
        value: 0,
        children: flies[0].theadOption,
      });
    }

    if (flies[1]) {
      setSecondOptions(flies[1].theadOption);

      groupOption.push({
        label: '组2',
        value: 1,
        children: flies[1].theadOption,
      });
    }

    setGroupOptions(groupOption);

    clearChoose();
  }, [flies]);

  const exportHandler = () => {
    if (flies.length <= 1) {
      message.error(`需要上传2个文件`);
      return;
    }

    if (!(uniqueKey1 !== '' || uniqueKey2 !== '')) {
      message.error(`id对应值必须选`);
      return;
    }

    if (!(exportList1.length > 0 || exportList2.length > 0)) {
      message.error(`需要导出的项至少选一个`);
      return;
    }

    // 创建一个时间对象，并设置为中国时区
    var now = moment.tz('Asia/Shanghai').format();
    // 输出当前时间和时区
    setFilename(now.slice(0, 10));
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);

    messageApi.open({
      type: 'loading',
      content: '正在处理数据中...',
      duration: 0,
    });
    const obj = jointData(flies[0].data, uniqueKey1, flies[1].data, uniqueKey2);

    const division =
      (dividendArr.length > 0) & (divisorArr.length > 0)
        ? [dividendArr, divisorArr]
        : undefined;

    const data = obj2arr(obj, exportList1, exportList2, division);
    // 处理表头
    const thead = getThead(
      flies[0].theadOption,
      exportList1,
      flies[1].theadOption,
      exportList2
    );

    data.unshift(thead);

    var buffer = xlsx.build([{ name: 'Sheet1', data: data }]);
    savefiles(buffer, filename + '.xlsx');

    messageApi.destroy();
    messageApi.success('处理完成');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFlieNameChange = (e) => {
    setFilename(e.target.value);
  };

  return (
    <div>
      <Alert message="需要上传2个文件" type="info" />
      <br />

      {contextHolder}
      <Form.Item label="id对应值">
        <Select
          options={firstOptions}
          style={{ width: 200, margin: '0 10px' }}
          onChange={(value) => {
            setUniqueKey1(value);
          }}
        ></Select>
        <SwapOutlined />
        <Select
          options={secondOptions}
          style={{ width: 200, margin: '0 10px' }}
          onChange={(value) => {
            setUniqueKey2(value);
          }}
        ></Select>
      </Form.Item>
      <Form.Item label="需要导出的项">
        <CheckboxGroup
          options={firstOptions}
          value={exportList1}
          onChange={(list) => {
            setExportList1(list);
          }}
        />
        <span style={{ margin: '0 16px 0 10px' }}>|</span>
        <CheckboxGroup
          options={secondOptions}
          value={exportList2}
          onChange={(list) => {
            setExportList2(list);
          }}
        />
      </Form.Item>
      <Form.Item label="两项相除">
        <Cascader
          options={groupOptions}
          onChange={(value) => {
            setDividendArr(value);
          }}
          style={{ width: 200, margin: '0 10px' }}
        />
        /
        <Cascader
          options={groupOptions}
          onChange={(value) => {
            setDivisorArr(value);
          }}
          style={{ width: 200, margin: '0 10px' }}
        />
      </Form.Item>
      <Button type="primary" onClick={exportHandler}>
        导出数据
      </Button>

      <Modal
        title="下载提示"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form.Item label="文件名称">
          <Input onChange={onFlieNameChange} defaultValue={filename} />
        </Form.Item>
      </Modal>
    </div>
  );
}

export default TabMerge;
