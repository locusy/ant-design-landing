import React from 'react';
import { Icon, message } from 'antd';
import { connect } from 'react-redux';
import { getData } from '../utils';
import { saveData } from '../../../edit-module/actions';
import saveJsZip from './saveJsZip';

class NavController extends React.PureComponent {
  static defaultProps = {
    className: 'edit-nav',
  };

  onPreview = (e) => {
    this.onSave(e, () => {
      message.success('生成预览成功。');
    });
    const { templateData } = this.props;
    const url = `${location.port ? `${location.protocol}//${location.hostname}:7113/`
      : `${location.origin}/templates/`}#uid=${templateData.uid}`;
    window.open(url);
  }

  onSave = (e, cb) => {
    saveData(this.props.templateData, (b) => {
      if (b.code) {
        message.error('保存出错，请重试。');
      } else if (!cb) {
        message.success('保存成功。');
      } else {
        cb();
      }
    });
  }

  onSaveCode = (e) => {
    /*     if (!location.port && window.ga) {
      window.ga('send', 'event', 'button', 'click', 'download');
    } */
    this.onSave(e, () => {
      message.success('生成代码成功。');
      saveJsZip(this.props.templateData);
    });
  }

  render() {
    const menuChild = [
      { name: '保存编辑', icon: 'save', onClick: this.onSave },
      { name: '生成预览', icon: 'eye-o', onClick: this.onPreview },
      { name: '生成代码', icon: 'code-o', onClick: this.onSaveCode },
    ].map((item, i) => (
      <li key={i.toString()} onClick={item.onClick}>
        <Icon type={item.icon} />
        {item.name}
      </li>
    ));
    return (
      <div className={this.props.className}>
        <div className="logo">
          <img src="https://gw.alipayobjects.com/zos/rmsportal/SVDdpZEbAlWBFuRGIIIL.svg" alt="logo" />
        </div>
        <ul className="menu">
          {menuChild}
        </ul>
        <div className="new">
          <Icon type="file-add" />
        </div>
      </div>
    );
  }
}
export default connect(getData)(NavController);
