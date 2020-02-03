import React from 'react';
import { Panel, PanelGroup, PanelControl } from 'components';

///////////////////////////////////////////////
// POST STAGE
///////////////////////////////////////////////

const APITableWrap = ({ heading, children }) => {
  return (
    <PanelGroup
      className="mb-5"
      padding="p-0"
      components={
        !!heading && {
          heading: (
            <PanelControl>
              <b>{heading}</b>
            </PanelControl>
          ),
        }
      }
    >
      <table className="mb-0 table table-striped">
        <tbody>{children}</tbody>
      </table>
    </PanelGroup>
  );
};

const APITableRow = ({ field, hash, component, children }) => {
  return (
    <tr>
      <td className="pl-4 u-border-0 u-width-8 small">{field}</td>
      <td className="pr-0 u-border-0 small u-color-primary-darker u-text-bold">
        {!!component ? (
          component
        ) : (
          <>
            {!!hash ? (
              <>
                {Object.keys(hash).map(
                  (type, i) => `${i === 0 ? '' : ', '}${hash[type]}`
                )}
              </>
            ) : (
              children != undefined && `${children}`
            )}
          </>
        )}
      </td>
    </tr>
  );
};

const CursorTable = ({ x, y, target }) => {
  if (x === undefined && y === undefined && target === undefined) {
    return null;
  }
  let tableTrStyles = { background: 'none' };
  let tableTdStyles = { border: 'none' };
  return (
    <table className="m-0" style={{ minWidth: '100%', maxWidth: '100%' }}>
      <tbody>
        {x !== undefined && (
          <tr style={tableTrStyles}>
            <td style={tableTdStyles} className="pt-0 pb-0 pl-0 pr-1 u-width-1">
              x:
            </td>
            <td style={tableTdStyles} className="p-0">{`${x}`}</td>
          </tr>
        )}
        {y !== undefined && (
          <tr style={tableTrStyles}>
            <td style={tableTdStyles} className="pt-0 pb-0 pl-0 pr-1">
              y:
            </td>
            <td style={tableTdStyles} className="p-0">{`${y}`}</td>
          </tr>
        )}
        {target !== undefined && (
          <>
            <tr style={tableTrStyles}>
              <td
                style={tableTdStyles}
                colSpan={2}
                className="pt-3 pb-0 pl-0 pr-1"
              >
                target:
              </td>
            </tr>
            <tr style={tableTrStyles}>
              <td
                style={tableTdStyles}
                colSpan={2}
                className="pt-1 pb-1 pl-0 pr-0"
              >
                <div className="u-overflow-hidden" style={{ width: 310 }}>
                  <div
                    className="u-nowrap"
                    title={`${target && [target.outerHTML]}`}
                  >{`${target && [target.outerHTML]}`}</div>
                </div>
              </td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
};

const APITable = props => {
  return (
    <div className="APITable d-flex flex-column p-0 u-width-p-12 u-height-p-10 u-pos-absolute">
      <Panel direction="column">
        <APITableWrap heading="layout.window">
          <APITableRow field="width">{props.layout.window.width}</APITableRow>
          <APITableRow field="height">{props.layout.window.height}</APITableRow>
          <APITableRow
            field="cursor"
            component={
              <CursorTable
                x={props.layout.window.cursor.x}
                y={props.layout.window.cursor.y}
                target={props.layout.window.cursor.target}
              />
            }
          />
        </APITableWrap>

        <APITableWrap heading="layout.mainStage">
          <APITableRow field="width">
            {props.layout.mainStage.width}
          </APITableRow>
          <APITableRow field="height">
            {props.layout.mainStage.height}
          </APITableRow>
          <APITableRow field="viewable.width">
            {props.layout.mainStage.viewable.width}
          </APITableRow>
          <APITableRow field="viewable.height">
            {props.layout.mainStage.viewable.height}
          </APITableRow>
          <APITableRow
            field="viewable.offset"
            component={
              <CursorTable
                x={props.layout.mainStage.viewable.offset.x}
                y={props.layout.mainStage.viewable.offset.y}
              />
            }
          />
          <APITableRow
            field="viewable.cursor"
            component={
              <CursorTable
                x={props.layout.mainStage.viewable.cursor.x}
                y={props.layout.mainStage.viewable.cursor.y}
              />
            }
          />
          <APITableRow field="viewable.entered">
            {props.layout.mainStage.viewable.entered}
          </APITableRow>
        </APITableWrap>

        <APITableWrap heading="layout.leftPanel">
          <APITableRow field="width">
            {props.layout.leftPanel.width}
          </APITableRow>
          <APITableRow field="height">
            {props.layout.leftPanel.height}
          </APITableRow>
          <APITableRow field="initialWidth">
            {props.layout.leftPanel.initialWidth}
          </APITableRow>
          <APITableRow field="minWidth">
            {props.layout.leftPanel.minWidth}
          </APITableRow>
          <APITableRow field="maxWidth">
            {props.layout.leftPanel.maxWidth}
          </APITableRow>
          <APITableRow field="visible">
            {props.layout.leftPanel.visible}
          </APITableRow>
          <APITableRow field="resizable">
            {props.layout.leftPanel.resizable}
          </APITableRow>
          <APITableRow field="disabled">
            {props.layout.leftPanel.disabled}
          </APITableRow>
        </APITableWrap>

        <APITableWrap heading="layout.rightPanel">
          <APITableRow field="width">
            {props.layout.rightPanel.width}
          </APITableRow>
          <APITableRow field="height">
            {props.layout.rightPanel.height}
          </APITableRow>
          <APITableRow field="initialWidth">
            {props.layout.rightPanel.initialWidth}
          </APITableRow>
          <APITableRow field="minWidth">
            {props.layout.rightPanel.minWidth}
          </APITableRow>
          <APITableRow field="maxWidth">
            {props.layout.rightPanel.maxWidth}
          </APITableRow>
          <APITableRow field="visible">
            {props.layout.rightPanel.visible}
          </APITableRow>
          <APITableRow field="resizable">
            {props.layout.rightPanel.resizable}
          </APITableRow>
          <APITableRow field="disabled">
            {props.layout.rightPanel.disabled}
          </APITableRow>
        </APITableWrap>

        <APITableWrap heading="layout.topPanel">
          <APITableRow field="width">{props.layout.topPanel.width}</APITableRow>
          <APITableRow field="height">
            {props.layout.topPanel.height}
          </APITableRow>
          <APITableRow field="initialHeight">
            {props.layout.topPanel.initialHeight}
          </APITableRow>
          <APITableRow field="minHeight">
            {props.layout.topPanel.minHeight}
          </APITableRow>
          <APITableRow field="maxHeight">
            {props.layout.topPanel.maxHeight}
          </APITableRow>
          <APITableRow field="visible">
            {props.layout.topPanel.visible}
          </APITableRow>
          <APITableRow field="resizable">
            {props.layout.topPanel.resizable}
          </APITableRow>
          <APITableRow field="disabled">
            {props.layout.topPanel.disabled}
          </APITableRow>
        </APITableWrap>

        <APITableWrap heading="layout.bottomPanel">
          <APITableRow field="width">
            {props.layout.bottomPanel.width}
          </APITableRow>
          <APITableRow field="height">
            {props.layout.bottomPanel.height}
          </APITableRow>
          <APITableRow field="initialHeight">
            {props.layout.bottomPanel.initialHeight}
          </APITableRow>
          <APITableRow field="minHeight">
            {props.layout.bottomPanel.minHeight}
          </APITableRow>
          <APITableRow field="maxHeight">
            {props.layout.bottomPanel.maxHeight}
          </APITableRow>
          <APITableRow field="visible">
            {props.layout.bottomPanel.visible}
          </APITableRow>
          <APITableRow field="resizable">
            {props.layout.bottomPanel.resizable}
          </APITableRow>
          <APITableRow field="disabled">
            {props.layout.bottomPanel.disabled}
          </APITableRow>
        </APITableWrap>

        <APITableWrap heading="layout.thumbnail">
          <APITableRow field="initialWidth">
            {props.layout.thumbnail.initialWidth}
          </APITableRow>
        </APITableWrap>

        <APITableWrap heading="zoom">
          <APITableRow field="percentage">{props.zoom.percentage}</APITableRow>
          <APITableRow field="level">{props.zoom.level}</APITableRow>
          <APITableRow field="levelMin">{props.zoom.levelMin}</APITableRow>
          <APITableRow field="levelMax">{props.zoom.levelMax}</APITableRow>
          <APITableRow field="canZoomIn">{props.zoom.canZoomIn}</APITableRow>
          <APITableRow field="canZoomOut">{props.zoom.canZoomOut}</APITableRow>
        </APITableWrap>
      </Panel>
    </div>
  );
};

export default APITable;
