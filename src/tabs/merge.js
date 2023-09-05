import React, { useState, useEffect } from 'react';
import { Form, Select, Checkbox, Button, message, Modal, Input } from 'antd';
import xlsx from 'node-xlsx';
import { SwapOutlined } from '@ant-design/icons';

import moment from 'moment-timezone';

import { jointData, obj2arr, getThead, savefiles } from '../utils';

const CheckboxGroup = Checkbox.Group;

function TabMerge({ flies }) {
  const [firstOptions, setFirstOptions] = useState([]);
  const [secondOptions, setSecondOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([
    {
      label: '组1',
      options: [],
    },
    {
      label: '组2',
      options: [],
    },
  ]);

  // 需要将两个表联立的列
  const [uniqueKey1, setUniqueKey1] = useState('');
  const [uniqueKey2, setUniqueKey2] = useState('');
  // 需要导出的数据列
  const [exportList1, setExportList1] = useState([]);
  const [exportList2, setExportList2] = useState([]);

  // 弹框
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filename, setFilename] = useState('');

  const clearChoose = () =>  {
    setUniqueKey1('')
    setUniqueKey2('')
    setExportList1([])
    setExportList2([])
  }

  useEffect(() => {
    console.log('每次都会执行');

    if (flies[0]) {
      setFirstOptions(flies[0].theadOption);
    }

    if (flies[1]) {
      setSecondOptions(flies[1].theadOption);
    }

    setGroupOptions([
      {
        label: '组1',
        options: flies[0] ? flies[0].theadOption : [],
      },
      {
        label: '组2',
        options: flies[1] ? flies[1].theadOption : [],
      },
    ]);

    clearChoose()
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
    const obj = jointData(flies[0].data, uniqueKey1, flies[1].data, uniqueKey2);
    const data = obj2arr(obj, exportList1, exportList2);
    const thead = getThead(
      flies[0].theadOption,
      exportList1,
      flies[1].theadOption,
      exportList2
    );

    data.unshift(thead);

    var buffer = xlsx.build([{ name: 'Sheet1', data: data }]);

    savefiles(buffer, filename + '.xlsx');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFlieNameChange = (e) => {
    setFilename(e.target.value);
  };

  return (
    <div>
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
        <Select
          options={groupOptions}
          style={{ width: 200, margin: '0 10px' }}
        ></Select>{' '}
        /
        <Select
          options={groupOptions}
          style={{ width: 200, margin: '0 10px' }}
        ></Select>
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
