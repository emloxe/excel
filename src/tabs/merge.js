import React, { useState, useEffect } from 'react';
import { Form, Select, Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = [];

function TabMerge({ flies }) {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [firstThead, setFirstThead] = useState([]);
  const [firstOptions, setFirstOptions] = useState([]);

  const onChange = (list) => {
    setCheckedList(list);
  };

  useEffect(() => {
    console.log('每次都会执行');

    if(flies[0]) {
      console.log(1111)
      setFirstThead(flies[0].thead);
      setFirstOptions(flies[0].thead)
    }

  });

  return (
    <div>
      <Form.Item label="id对应值">
        <Select style={{ width: 200, margin: '0 10px' }}>
          {firstThead.map((value) => (
            <Select.Option value={{ value }}>{{ value }}</Select.Option>
          ))}
        </Select>
        <Select style={{ width: 200, margin: '0 10px' }}>
          <Select.Option value="demo">Demo</Select.Option>
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
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
      </Form.Item>
    </div>
  );
}

export default TabMerge;
