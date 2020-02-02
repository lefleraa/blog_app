import React from 'react';
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
  draggable,
  disabled,
  deactivated,
  icon,
  small,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        'TopBar--Btn',
        !!active && 'TopBar--Btn--active',
        !!draggable && 'TopBar--Btn--draggable',
        !!disabled && 'TopBar--Btn--disabled',
        !!deactivated && 'TopBar--Btn--deactivated'
      )}
      disabled={disabled}
      {...cleanProps(rest)}
    >
      <div className="content d-flex align-items-center justify-content-center">
        {!!icon ? (
          <Icon
            icon={icon}
            size={!!small ? 'sm' : 'lg'}
            className="u-pos-relative"
            style={{ marginTop: 2 }}
          />
        ) : (
          <div className="u-pos-relative">{children}</div>
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

const ViewModeSelector = ({ activeView, types, setViewMode }) => {
  return (
    <div className="d-flex flex-row flex-nowrap">
      <TopBarBtn
        icon={['fal', 'mobile']}
        active={activeView === types.mobile}
        onClick={
          typeof setViewMode === 'function'
            ? () => setViewMode(types.mobile)
            : null
        }
      />
      <TopBarBtn
        icon={['fal', 'desktop']}
        active={activeView === types.desktop}
        onClick={
          typeof setViewMode === 'function'
            ? () => setViewMode(types.desktop)
            : null
        }
      />
    </div>
  );
};

const TopBar = ({ children, view, zoom, layout, ...rest }) => {
  const { leftPanel, rightPanel } = layout;
  return (
    <div
      className="TopBar d-flex u-width-p-12 align-items-stretch"
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
            <ViewModeSelector {...view} />
          </div>
          <div className="col-auto p-0 d-flex">
            <TopBarBtn icon={['fal', 'image-polaroid']} draggable={true} />
            <TopBarBtn icon={['far', 'align-left']} draggable={true} />
            <TopBarBtn icon={['fal', 'game-board-alt']} />
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
