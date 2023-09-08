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
  Divider,
  Alert
} from 'antd';

const CheckboxGroup = Checkbox.Group;

const TabRepeat = ({ flies }) => {
  const [firstOptions, setFirstOptions] = useState([]);
  const [dealtList, setDealtList] = useState([]);

  useEffect(() => {
    console.log('每次都会执行');

    if (flies[0]) {
      setFirstOptions(flies[0].theadOption);
    }
  }, [flies]);

  return (
    <div>
      <Alert message="数据处理只会读取第一个文件" type="info" />
      <br></br>
      <Form.Item label="需要查重的项">
        <CheckboxGroup
          options={firstOptions}
          value={dealtList}
          onChange={(list) => {
            setDealtList(list);
          }}
        />
      </Form.Item>


      <Button type="primary" onClick={() =>{}}>
        确定
      </Button>
    </div>
  );
};

export default TabRepeat;
