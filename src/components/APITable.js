import React from 'react';
import { ScrollArea } from 'components';

///////////////////////////////////////////////
// POST STAGE
///////////////////////////////////////////////

const APITableWrap = ({ heading, children }) => {
  return (
    <>
      <b className="mb-3 d-block">{heading}</b>
      <table className="mb-5 table table-striped">
        <tbody>{children}</tbody>
      </table>
    </>
  );
};

const APITableRow = ({ field, hash, children }) => {
  return (
    <tr>
      <td className="u-width-p-5">{field}:</td>
      <td>
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

const APITable = props => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `.APITable .ps__rail-y { right: ${props.layout.rightPanel.width}px !important }`,
        }}
      />
      <ScrollArea className="APITable u-width-p-12 u-height-p-10 u-pos-absolute justify-content-center">
        <div className="d-flex u-width-p-12 justify-content-center p-5">
          <div style={{ width: 900 }}>
            <div className="card m-0 p-5 u-border-1">
              <APITableWrap heading="layout">
                <APITableRow field="leftPanel.width">
                  {props.layout.leftPanel.width}
                </APITableRow>
                <APITableRow field="leftPanel.initialWidth">
                  {props.layout.leftPanel.initialWidth}
                </APITableRow>
                <APITableRow field="leftPanel.minWidth">
                  {props.layout.leftPanel.minWidth}
                </APITableRow>
                <APITableRow field="leftPanel.maxWidth">
                  {props.layout.leftPanel.maxWidth}
                </APITableRow>
                <APITableRow field="leftPanel.visible">
                  {props.layout.leftPanel.visible}
                </APITableRow>

                <APITableRow field="rightPanel.width">
                  {props.layout.rightPanel.width}
                </APITableRow>
                <APITableRow field="rightPanel.initialWidth">
                  {props.layout.rightPanel.initialWidth}
                </APITableRow>
                <APITableRow field="rightPanel.minWidth">
                  {props.layout.rightPanel.minWidth}
                </APITableRow>
                <APITableRow field="rightPanel.maxWidth">
                  {props.layout.rightPanel.maxWidth}
                </APITableRow>
                <APITableRow field="rightPanel.visible">
                  {props.layout.rightPanel.visible}
                </APITableRow>

                <APITableRow field="thumbnail.initialWidth">
                  {props.layout.thumbnail.initialWidth}
                </APITableRow>
              </APITableWrap>

              <APITableWrap heading="view">
                <APITableRow field="types" hash={props.view.types} />
                <APITableRow field="activeView">
                  {props.view.activeView}
                </APITableRow>
              </APITableWrap>

              <APITableWrap heading="zoom">
                <APITableRow field="percentage">
                  {props.zoom.percentage + '%'}
                </APITableRow>
                <APITableRow field="level">{props.zoom.level}</APITableRow>
                <APITableRow field="levelMin">
                  {props.zoom.levelMin}
                </APITableRow>
                <APITableRow field="levelMax">
                  {props.zoom.levelMax}
                </APITableRow>
                <APITableRow field="canZoomIn">
                  {props.zoom.canZoomIn}
                </APITableRow>
                <APITableRow field="canZoomOut">
                  {props.zoom.canZoomOut}
                </APITableRow>
              </APITableWrap>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default APITable;
