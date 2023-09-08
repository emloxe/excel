import './App.css';

// eslint-disable-next-line no-unused-vars
import React, { useState, useReducer } from 'react';
import { Layout, theme } from 'antd';

import { InboxOutlined } from '@ant-design/icons';

import { message, Upload, Tabs } from 'antd';
import xlsx from 'node-xlsx';
import filesReducer from './filesReducer';
import TabMerge from './tabs/merge';
import TabRepeat from './tabs/repeat';
const { Header, Content, Footer } = Layout;
const { Dragger } = Upload;

const onTabsChange = (key) => {
  // console.log(key);
};

function App() {
  const [flies, dispatch] = useReducer(filesReducer, []);

  const tabsItems = [
    {
      key: '1',
      label: '表格查重',
      children:   <TabRepeat flies={flies} />,
    },
    // {
    //   key: '3',
    //   label: '表格对比',
    //   children: 'Content of Tab Pane 3',
    // },
    {
      key: '3',
      label: '表格合并',
      children: <TabMerge flies={flies} />,
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const uploadProps = {
    name: 'file',
    multiple: true,
    maxCount: 2,
    listType: 'picture',
    className: 'upload-list-inline',
    customRequest(options) {
      options.onSuccess();
    },

    onChange(info) {
      const { status } = info.file;
      console.log(info.file);
      if (status === 'removed') {
        dispatch({
          type: 'deleted',
          id: info.file.uid,
        });
      }
      if (status === 'done') {
        const isExcel = info.file.name.search(/(.xlsx)|(.xls)/);

        if (!isExcel) {
          message.error(`${info.file.name} 不支持该格式`);
        } else {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(info.file.originFileObj);
          fileReader.onload = function () {
            const workSheetsFromFile = xlsx.parse(fileReader.result);
            if (workSheetsFromFile[0].data.length > 0) {
              message.success(`${info.file.name} 文件上传成功`);

              const thead = workSheetsFromFile[0].data.shift();
              const theadOption = thead.map((element, index) => {
                return { value: index, label: element };
              });

              dispatch({
                type: 'added',
                id: info.file.uid,
                data: workSheetsFromFile[0].data,
                theadOption,
              });
            } else {
              message.error(`${info.file.name} 请检查文件格式并重新上传`);
            }
          };
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="title-logo">表格处理</div>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
        }}
      >
        <div
          style={{
            margin: '16px 0 16px',
          }}
        >
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              单击或拖动文件到此区域进行上传，最多只能上传2个文件
            </p>
            {/* <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p> */}
          </Dragger>
        </div>

        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
          }}
        >
          <Tabs
            defaultActiveKey="1"
            items={tabsItems}
            onChange={onTabsChange}
          />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        ©2023 Created by ZWJ
      </Footer>
    </Layout>
  );
}

export default App;
