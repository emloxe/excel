import React, { useState } from 'react';
import { Form ,Select , Checkbox} from 'antd';

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = [];

function TabMerge() {

  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const onChange = (list) => {
    setCheckedList(list);
  };

  return (
    <div>
      <Form.Item label="id对应值">
        <Select style={{ width: 200 , margin: '0 10px'}}>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
        <Select style={{ width: 200 , margin: '0 10px'}}>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="需要导出的项">
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
        <span style={{  margin: '0 16px 0 10px'}}>|</span>
        <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
      </Form.Item>
    </div>
  );
}

export default TabMerge;
