import React, { useState, useContext } from 'react';
import cleanProps from 'clean-react-props';
import classNames from 'classnames';
import { Btn, Icon } from 'atoms';
import { Panel } from 'components';
import { GlobalContext } from 'contexts';

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
        'TopBar--Btn u-nowrap',
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
            {...icon}
            size={!!small ? 'sm' : 'lg'}
            className={'TopBar--Btn--Icon'}
          />
        ) : (
          <>{children}</>
        )}
        {!!caret && (
          <Icon
            icon={['fa', !!selected ? 'chevron-up' : 'chevron-down']}
            size="sm"
            className="TopBar--Btn--Caret"
          />
        )}
      </div>
    </button>
  );
};

const ZoomControls = () => {
  const { layout = {} } = useContext(GlobalContext);
  const { zoom = {} } = layout;
  const {
    level,
    percentage,
    zoomIn,
    zoomOut,
    reset,
    canZoomIn,
    canZoomOut,
  } = zoom;
  return (
    <div className="d-flex flex-row flex-nowrap align-items-center">
      <TopBarBtn
        icon={{
          icon: ['fal', 'minus'],
        }}
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
        icon={{
          icon: ['fal', 'plus'],
        }}
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
      <TopBarBtn
        icon={{
          icon: ['fal', 'phone-laptop'],
        }}
      />
    </div>
  );
};

const NewBlockControls = () => {
  const { layout = {} } = useContext(GlobalContext);
  const { elements = {} } = layout;
  const { leftPanel, rightPanel, topPanel } = elements;

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
    <div className="d-inline-flex flex-row flex-nowrap">
      <TopBarBtn
        icon={{
          icon: ['fal', 'image-polaroid'],
        }}
        draggable={true}
      />
      <TopBarBtn
        icon={{
          icon: ['fal', 'align-left'],
        }}
        draggable={true}
      />
      <TopBarBtn
        icon={{
          icon: ['fal', 'clone'],
        }}
        caret={true}
        selected={showTemplates}
        onClick={toggleTemplatePanel}
      />
    </div>
  );
};

const DebugControls = () => {
  const { layout = {} } = useContext(GlobalContext);
  const { elements = {} } = layout;
  const { leftPanel, rightPanel, topPanel, bottomPanel } = elements;
  const allVisible =
    leftPanel.visible &&
    rightPanel.visible &&
    topPanel.visible &&
    bottomPanel.visible;

  return (
    <div className="d-inline-flex flex-row flex-nowrap pl-5">
      <TopBarBtn
        icon={{
          icon: ['fal', leftPanel.visible ? 'sign-out' : 'sign-in'],
          rotate: leftPanel.visible ? 180 : undefined,
        }}
        onClick={() => leftPanel.toggle()}
        selected={leftPanel.visible}
      />
      <TopBarBtn
        icon={{
          icon: ['fal', rightPanel.visible ? 'sign-out' : 'sign-in'],
          rotate: !rightPanel.visible ? 180 : undefined,
        }}
        onClick={() => rightPanel.toggle()}
        selected={rightPanel.visible}
      />
      <TopBarBtn
        icon={{
          icon: ['fal', topPanel.visible ? 'sign-out' : 'sign-in'],
          rotate: topPanel.visible ? 270 : 90,
        }}
        onClick={() => topPanel.toggle()}
        selected={topPanel.visible}
      />
      <TopBarBtn
        icon={{
          icon: ['fal', bottomPanel.visible ? 'sign-out' : 'sign-in'],
          rotate: bottomPanel.visible ? 90 : 270,
        }}
        onClick={() => bottomPanel.toggle()}
        selected={bottomPanel.visible}
      />
      <TopBarBtn
        icon={{
          icon: ['fal', 'expand'],
        }}
        onClick={() => {
          if (allVisible) {
            leftPanel.hide();
            rightPanel.hide();
            topPanel.hide();
            bottomPanel.hide();
          } else {
            leftPanel.show();
            rightPanel.show();
            topPanel.show();
            bottomPanel.show();
          }
        }}
        selected={allVisible}
      />
    </div>
  );
};

const TopBar = () => {
  const { layout = {} } = useContext(GlobalContext);
  const { elements = {}, zoom = {} } = layout;
  const { leftPanel, rightPanel, topBar } = elements;

  return (
    <div
      className="TopBar d-flex u-width-p-12 align-items-stretch"
      style={{ height: topBar.height }}
    >
      <Panel
        size={leftPanel.initialWidth}
        scroll={false}
        className="TopBar--inner"
      >
        <div className="d-flex align-items-center u-height-p-10 u-width-p-12">
          <div className="col-auto pl-0 pr-1 u-height-p-10">
            <TopBarBtn
              icon={{
                icon: ['fal', 'bars'],
              }}
            />
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
            <NewBlockControls />
            <DebugControls />
          </div>
          <div className="col p-0 d-flex justify-content-end">
            <ZoomControls />
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
            <TopBarBtn
              icon={{
                icon: ['fal', 'user-circle'],
              }}
            />
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default TopBar;
