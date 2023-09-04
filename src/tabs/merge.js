import React, { useState, useEffect } from 'react';
import { Form, Select, Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
const defaultCheckedList = [];

function TabMerge({ flies }) {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [firstOptions, setFirstOptions] = useState([]);
  const [secondOptions, setSecondOptions] = useState([]);

  const onChange = (list) => {
    setCheckedList(list);
  };

  useEffect(() => {
    console.log('每次都会执行');

    if(flies[0]) {
      setFirstOptions(flies[0].theadOption)
    }

    if(flies[1]) {
      setSecondOptions(flies[1].theadOption)
    }

  });

  return (
    <div>
      <Form.Item label="id对应值">
        <Select options={firstOptions} style={{ width: 200, margin: '0 10px' }}>
        </Select>
        <Select  options={secondOptions}  style={{ width: 200, margin: '0 10px' }}>
        </Select>
      </Form.Item>
      <Form.Item label="需要导出的项">
        <CheckboxGroup
          options={firstOptions}
          value={checkedList}
          onChange={onChange}
        />
        <span style={{ margin: '0 16px 0 10px' }}>|</span>
        <CheckboxGroup
          options={secondOptions}
          value={checkedList}
          onChange={onChange}
        />
      </Form.Item>
    </div>
  );
}

export default TabMerge;
