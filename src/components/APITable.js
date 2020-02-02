import React from 'react';

///////////////////////////////////////////////
// POST STAGE
///////////////////////////////////////////////

const APITable = props => {
  return (
    <>
      <b className="mb-3 d-block">layout</b>
      <table className="mb-4 table">
        <tbody>
          <tr>
            <td className="u-width-10">leftPanelWidth:</td>
            <td>{`${props.leftPanelWidth}`}</td>
          </tr>
          <tr>
            <td className="u-width-10">rightPanelWidth:</td>
            <td>{`${props.rightPanelWidth}`}</td>
          </tr>
          <tr>
            <td className="u-width-10">initialThumbnailWidth:</td>
            <td>{`${props.initialThumbnailWidth}`}</td>
          </tr>
          <tr>
            <td className="u-width-10">leftPanelVisible:</td>
            <td>{`${props.leftPanelVisible}`}</td>
          </tr>
          <tr>
            <td className="u-width-10">rightPanelVisible:</td>
            <td>{`${props.rightPanelVisible}`}</td>
          </tr>
        </tbody>
      </table>

      <b className="mb-3 d-block">view</b>
      <table className="mb-4 table">
        <tbody>
          <tr>
            <td className="u-width-10">viewModeTypes:</td>
            <td>
              {Object.keys(props.viewModeTypes).map(
                (type, i) =>
                  `${i == 0 ? '' : ', '}"${props.viewModeTypes[type]}"`
              )}
            </td>
          </tr>
          <tr>
            <td className="u-width-10">activeViewMode:</td>
            <td>{`"${props.activeViewMode}"`}</td>
          </tr>
        </tbody>
      </table>

      <b className="mb-3 d-block">zoom</b>
      <table className="mb-4 table">
        <tbody>
          <tr>
            <td className="u-width-10">zoomPercentage:</td>
            <td>{`${props.zoomPercentage}`}%</td>
          </tr>
          <tr>
            <td className="u-width-10">zoomLevel:</td>
            <td>{`${props.zoomLevel}`}</td>
          </tr>
          <tr>
            <td className="u-width-10">minZoomLevel:</td>
            <td>{`${props.minZoomLevel}`}</td>
          </tr>
          <tr>
            <td className="u-width-10">maxZoomLevel:</td>
            <td>{`${props.maxZoomLevel}`}</td>
          </tr>
          <tr>
            <td className="u-width-10">canZoomIn:</td>
            <td>{`${props.canZoomIn}`}</td>
          </tr>
          <tr>
            <td className="u-width-10">canZoomOut:</td>
            <td>{`${props.canZoomOut}`}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default APITable;
