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

const APITableRow = ({ field, hash, children }) => {
  return (
    <tr>
      <td className="pl-4 u-border-0 u-width-p-6 small">{field}</td>
      <td className="pr-4 u-border-0 small u-color-primary-darker u-text-bold">
        {!!hash ? (
          <>
            {Object.keys(hash).map(
              (type, i) => `${i === 0 ? '' : ', '}${hash[type]}`
            )}
          </>
        ) : (
          <>{`${children}`}</>
        )}
      </td>
    </tr>
  );
};

const APITableHeaderRow = ({ children }) => {
  return (
    <tr className="u-bg-white">
      <td
        className="pl-4 pr-4 u-border-t-1 u-border-b-1 u-text-bold"
        colSpan={2}
      >
        {children}
      </td>
    </tr>
  );
};

const APITable = props => {
  return (
    <div className="MediaPool d-flex flex-column p-0 u-width-p-12 u-height-p-10 u-pos-absolute">
      <Panel direction="column">
        <APITableWrap heading="layout.window">
          <APITableRow field="width">{props.layout.window.width}</APITableRow>
          <APITableRow field="height">{props.layout.window.height}</APITableRow>
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
          <APITableRow field="viewable.offsetX">
            {props.layout.mainStage.viewable.offsetX}
          </APITableRow>
          <APITableRow field="viewable.offsetY">
            {props.layout.mainStage.viewable.offsetY}
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
