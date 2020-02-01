import React from 'react';
import cleanProps from 'clean-react-props';
import classNames from 'classnames';
import { Btn } from 'atoms';
import { Panel } from 'components';

///////////////////////////////////////////////
// TOP BAR
///////////////////////////////////////////////

const TopBarBtn = ({ children, active, ...rest }) => {
  return (
    <button
      className={classNames('TopBar--Btn', !!active && 'TopBar--Btn--active')}
      {...cleanProps(rest)}
    >
      <div className="content d-flex align-items-center justify-content-center">
        <div className="u-pos-relative">{children}</div>
      </div>
    </button>
  );
};

const ZoomControls = () => {
  return (
    <div className="d-flex flex-row flex-nowrap align-items-center">
      <TopBarBtn>-</TopBarBtn>
      <span className="small u-color-white u-text-center" style={{ width: 26 }}>
        100%
      </span>
      <TopBarBtn>+</TopBarBtn>
    </div>
  );
};

const TopBar = ({ children, ...rest }) => {
  return (
    <div
      className="TopBar d-flex u-width-p-12 align-items-stretch"
      {...cleanProps(rest)}
    >
      <Panel size={275} scroll={false} className="TopBar--inner">
        <div className="d-flex align-items-center u-height-p-10 u-width-p-12">
          <div className="col-auto pl-0 pr-1 u-height-p-10">
            <TopBarBtn>M</TopBarBtn>
          </div>
          <div className="col-auto pl-1 pr-0">blah</div>
        </div>
      </Panel>
      <Panel
        auto={true}
        direction="row"
        scroll={false}
        className="TopBar--inner"
      >
        <TopBarBtn>M</TopBarBtn>
        <TopBarBtn>D</TopBarBtn>
      </Panel>
      <Panel
        auto={true}
        direction="row"
        scroll={false}
        className="TopBar--inner"
      >
        <ZoomControls />
      </Panel>
      <Panel className="TopBar--inner" direction="row" scroll={false}>
        <TopBarBtn>T</TopBarBtn>
        <TopBarBtn>C</TopBarBtn>
        <TopBarBtn>H</TopBarBtn>
      </Panel>
      <Panel size={275} scroll={false}>
        <div className="d-flex align-items-center u-height-p-10 u-width-p-12">
          <div className="col pl-0 pr-1">
            <Btn variant="dark" block>
              Copy Link
            </Btn>
          </div>
          <div className="col pl-1 pr-0">
            <Btn variant="primary" block>
              Update
            </Btn>
          </div>
          <div className="col-auto pl-0 pr-0 u-height-p-10">
            <TopBarBtn>A</TopBarBtn>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default TopBar;
