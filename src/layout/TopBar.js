import React, { useState } from 'react';
import cleanProps from 'clean-react-props';
import classNames from 'classnames';
import { Btn, Icon } from 'atoms';
import { Panel } from 'components';

///////////////////////////////////////////////
// TOP BAR
///////////////////////////////////////////////

const TopBarBtn = ({
  children,
  active,
  selected,
  draggable,
  disabled,
  deactivated,
  caret,
  icon,
  small,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        'TopBar--Btn',
        'd-flex align-items-center',
        !!active && 'TopBar--Btn--active',
        !!selected && 'TopBar--Btn--selected',
        !!draggable && 'TopBar--Btn--draggable',
        !!disabled && 'TopBar--Btn--disabled',
        !!deactivated && 'TopBar--Btn--deactivated',
        !!caret && 'TopBar--Btn--caret'
      )}
      disabled={disabled}
      {...cleanProps(rest)}
    >
      <div className="TopBar--Btn--Inner">
        {!!icon ? (
          <Icon
            icon={icon}
            size={!!small ? 'sm' : 'lg'}
            className="TopBar--Btn--Icon"
          />
        ) : (
          <>{children}</>
        )}
        {!!caret && (
          <Icon
            icon={['fa', 'chevron-down']}
            size="sm"
            className="TopBar--Btn--Caret"
          />
        )}
      </div>
    </button>
  );
};

const ZoomControls = ({
  level,
  percentage,
  zoomIn,
  zoomOut,
  reset,
  canZoomIn,
  canZoomOut,
}) => {
  return (
    <div className="d-flex flex-row flex-nowrap align-items-center">
      <TopBarBtn
        icon={['fal', 'minus']}
        small={true}
        disabled={!canZoomOut}
        onClick={typeof zoomOut === 'function' ? () => zoomOut() : null}
      />
      <TopBarBtn
        onDoubleClick={typeof reset === 'function' ? () => reset() : null}
        deactivated={level === 1}
      >
        <span className="small u-color-white">{percentage}%</span>
      </TopBarBtn>
      <TopBarBtn
        icon={['fal', 'plus']}
        small={true}
        disabled={!canZoomIn}
        onClick={typeof zoomIn === 'function' ? () => zoomIn() : null}
      />
    </div>
  );
};

const PreviewModeBtn = () => {
  return (
    <div className="d-flex flex-row flex-nowrap">
      <TopBarBtn icon={['fal', 'phone-laptop']} />
    </div>
  );
};

const NewBlockControls = ({ leftPanel, rightPanel, topPanel }) => {
  const [showTemplates, setShowTemplates] = useState(topPanel.visible);

  function toggleTemplatePanel() {
    if (showTemplates) {
      setShowTemplates(false);
      topPanel.hide();
      leftPanel.enable();
      rightPanel.enable();
    } else {
      setShowTemplates(true);
      topPanel.show();
      leftPanel.disable();
      rightPanel.disable();
    }
  }
  return (
    <div className="d-flex flex-row flex-nowrap">
      <TopBarBtn icon={['fal', 'image-polaroid']} draggable={true} />
      <TopBarBtn icon={['far', 'align-left']} draggable={true} />
      <TopBarBtn
        icon={['fal', 'clone']}
        caret={true}
        selected={showTemplates}
        onClick={toggleTemplatePanel}
      />
    </div>
  );
};

const TopBar = ({ children, zoom, layout, ...rest }) => {
  const { leftPanel, rightPanel, topBar } = layout;

  return (
    <div
      className="TopBar d-flex u-width-p-12 align-items-stretch"
      style={{ height: topBar.height }}
      {...cleanProps(rest)}
    >
      <Panel
        size={leftPanel.initialWidth}
        scroll={false}
        className="TopBar--inner"
      >
        <div className="d-flex align-items-center u-height-p-10 u-width-p-12">
          <div className="col-auto pl-0 pr-1 u-height-p-10">
            <TopBarBtn icon={['fal', 'bars']} />
          </div>
          <div className="col-auto pl-1 pr-0">blah</div>
        </div>
      </Panel>

      <Panel scroll={false} className="TopBar--inner">
        <div className="d-flex align-items-center u-height-p-10 u-width-p-12">
          <div className="col p-0">
            <PreviewModeBtn />
          </div>
          <div className="col-auto p-0 d-flex">
            <NewBlockControls {...layout} />
          </div>
          <div className="col p-0 d-flex justify-content-end">
            <ZoomControls {...zoom} />
          </div>
        </div>
      </Panel>

      <Panel size={rightPanel.initialWidth} scroll={false}>
        <div className="d-flex align-items-center u-height-p-10 u-width-p-12">
          <div className="col pl-0 pr-1">
            <Btn variant="dark" block>
              <Icon icon={['far', 'code']} className="mr-2" />
              Copy Link
            </Btn>
          </div>
          <div className="col pl-1 pr-0">
            <Btn variant="primary" block>
              <Icon icon={['far', 'sync']} className="mr-2" />
              Update
            </Btn>
          </div>
          <div className="col-auto pl-0 pr-0 u-height-p-10">
            <TopBarBtn icon={['fal', 'user-circle']} />
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default TopBar;
