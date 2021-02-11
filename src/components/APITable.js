import React, { useContext } from 'react';
import { Panel, PanelGroup, PanelControl } from 'components';
import { GlobalContext } from 'contexts';

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
              children !== undefined && `${children}`
            )}
          </>
        )}
      </td>
    </tr>
  );
};

const CursorTable = ({ x, y, target, mouseover, showTarget = false }) => {
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
        {mouseover !== undefined && (
          <tr style={tableTrStyles}>
            <td style={tableTdStyles} className="pt-0 pb-0 pl-0 pr-1">
              mouseover:
            </td>
            <td style={tableTdStyles} className="p-0">{`${mouseover}`}</td>
          </tr>
        )}
        {target !== undefined && !!showTarget && (
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
                  <div className="u-nowrap">{`${target && [
                    target.outerHTML,
                  ]}`}</div>
                </div>
              </td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
};

const APITable = () => {
  const { layout = {}, window = {}, cursor = {} } = useContext(GlobalContext);
  return (
    <div className="APITable d-flex flex-column p-0 u-width-p-12 u-height-p-10 u-pos-absolute">
      <Panel direction="column" scroll={true}>
        <APITableWrap heading="zoom">
          <APITableRow field="percentage">{layout.zoom.percentage}</APITableRow>
          <APITableRow field="level">{layout.zoom.level}</APITableRow>
          <APITableRow field="levelMin">{layout.zoom.levelMin}</APITableRow>
          <APITableRow field="levelMax">{layout.zoom.levelMax}</APITableRow>
          <APITableRow field="canZoomIn">{layout.zoom.canZoomIn}</APITableRow>
          <APITableRow field="canZoomOut">{layout.zoom.canZoomOut}</APITableRow>
        </APITableWrap>

        <APITableWrap heading="elements.window">
          <APITableRow field="width">{window.width}</APITableRow>
          <APITableRow field="height">{window.height}</APITableRow>
          <APITableRow field="cursor" component={<CursorTable {...cursor} />} />
        </APITableWrap>

        <APITableWrap heading="elements.mainStage">
          <APITableRow field="width">
            {layout.elements.mainStage.width}
          </APITableRow>
          <APITableRow field="height">
            {layout.elements.mainStage.height}
          </APITableRow>
          <APITableRow field="viewable.width">
            {layout.elements.mainStage.viewable.width}
          </APITableRow>
          <APITableRow field="viewable.height">
            {layout.elements.mainStage.viewable.height}
          </APITableRow>
          <APITableRow
            field="viewable.offset"
            component={
              <CursorTable {...layout.elements.mainStage.viewable.offset} />
            }
          />
          <APITableRow
            field="viewable.cursor"
            component={
              <CursorTable {...layout.elements.mainStage.viewable.cursor} />
            }
          />
          <APITableRow field="viewable.visible">
            {layout.elements.mainStage.visible}
          </APITableRow>
        </APITableWrap>

        <APITableWrap heading="elements.leftPanel">
          <APITableRow field="width">
            {layout.elements.leftPanel.width}
          </APITableRow>
          <APITableRow field="height">
            {layout.elements.leftPanel.height}
          </APITableRow>
          <APITableRow field="initialWidth">
            {layout.elements.leftPanel.initialWidth}
          </APITableRow>
          <APITableRow field="minWidth">
            {layout.elements.leftPanel.minWidth}
          </APITableRow>
          <APITableRow field="maxWidth">
            {layout.elements.leftPanel.maxWidth}
          </APITableRow>
          <APITableRow field="visible">
            {layout.elements.leftPanel.visible}
          </APITableRow>
          <APITableRow field="resizable">
            {layout.elements.leftPanel.resizable}
          </APITableRow>
          <APITableRow field="disabled">
            {layout.elements.leftPanel.disabled}
          </APITableRow>
          <APITableRow
            field="cursor"
            component={<CursorTable {...layout.elements.leftPanel.cursor} />}
          />
        </APITableWrap>

        <APITableWrap heading="elements.rightPanel">
          <APITableRow field="width">
            {layout.elements.rightPanel.width}
          </APITableRow>
          <APITableRow field="height">
            {layout.elements.rightPanel.height}
          </APITableRow>
          <APITableRow field="initialWidth">
            {layout.elements.rightPanel.initialWidth}
          </APITableRow>
          <APITableRow field="minWidth">
            {layout.elements.rightPanel.minWidth}
          </APITableRow>
          <APITableRow field="maxWidth">
            {layout.elements.rightPanel.maxWidth}
          </APITableRow>
          <APITableRow field="visible">
            {layout.elements.rightPanel.visible}
          </APITableRow>
          <APITableRow field="resizable">
            {layout.elements.rightPanel.resizable}
          </APITableRow>
          <APITableRow field="disabled">
            {layout.elements.rightPanel.disabled}
          </APITableRow>
          <APITableRow
            field="cursor"
            component={<CursorTable {...layout.elements.rightPanel.cursor} />}
          />
        </APITableWrap>

        <APITableWrap heading="elements.topPanel">
          <APITableRow field="width">
            {layout.elements.topPanel.width}
          </APITableRow>
          <APITableRow field="height">
            {layout.elements.topPanel.height}
          </APITableRow>
          <APITableRow field="initialHeight">
            {layout.elements.topPanel.initialHeight}
          </APITableRow>
          <APITableRow field="minHeight">
            {layout.elements.topPanel.minHeight}
          </APITableRow>
          <APITableRow field="maxHeight">
            {layout.elements.topPanel.maxHeight}
          </APITableRow>
          <APITableRow field="visible">
            {layout.elements.topPanel.visible}
          </APITableRow>
          <APITableRow field="resizable">
            {layout.elements.topPanel.resizable}
          </APITableRow>
          <APITableRow field="disabled">
            {layout.elements.topPanel.disabled}
          </APITableRow>
          <APITableRow
            field="cursor"
            component={<CursorTable {...layout.elements.topPanel.cursor} />}
          />
        </APITableWrap>

        <APITableWrap heading="elements.bottomPanel">
          <APITableRow field="width">
            {layout.elements.bottomPanel.width}
          </APITableRow>
          <APITableRow field="height">
            {layout.elements.bottomPanel.height}
          </APITableRow>
          <APITableRow field="initialHeight">
            {layout.elements.bottomPanel.initialHeight}
          </APITableRow>
          <APITableRow field="minHeight">
            {layout.elements.bottomPanel.minHeight}
          </APITableRow>
          <APITableRow field="maxHeight">
            {layout.elements.bottomPanel.maxHeight}
          </APITableRow>
          <APITableRow field="visible">
            {layout.elements.bottomPanel.visible}
          </APITableRow>
          <APITableRow field="resizable">
            {layout.elements.bottomPanel.resizable}
          </APITableRow>
          <APITableRow field="disabled">
            {layout.elements.bottomPanel.disabled}
          </APITableRow>
          <APITableRow
            field="cursor"
            component={<CursorTable {...layout.elements.bottomPanel.cursor} />}
          />
        </APITableWrap>
      </Panel>
    </div>
  );
};

export default APITable;
