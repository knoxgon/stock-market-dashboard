import React from 'react';
import { connect } from 'react-redux';
import { containerClose, brewsend } from '../../__redux/actions/containerActions';
import random from 'randomstring';
import { GMArea, MCCloser, GMTitle, GMTop, GMRH } from "./styled"
import CandleGraph from '../Graph/Candle/candle'
import LineGraph from '../Graph/Line/line'
import PieGraph from '../Graph/Pie/pie'
import { Draggable } from 'react-beautiful-dnd';

const ContainerGraphView = ({ brewort, central, eraseContainer, containers }) => {
  const containerOnDel = (dsid) => {
    eraseContainer(dsid)
  }

  const renderContainers = () => (
    containers.map(({ dsid, type, bsw, bsh, bsmw, bsmh, bslw, bslh }, i) => (
      <Draggable draggableId={dsid} key={dsid} index={i}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <GMArea key={i} t={type} bl={dsid} size={{ width: bsw, height: bsh }} maxHeight={bsmh} maxWidth={bsmw} minHeight={bslh} minWidth={bslw} enable={{ top: false, right: false, bottom: false, left: false, topRight: false, bottomRight: true, bottomLeft: false, topLeft: false }}
              onResizeStop={(bz, dc, ac, lc) => {
                brewort(dsid, lc.width, lc.height)
              }}>
              <GMTop {...provided.dragHandleProps} color="#0fc4ac">
                <MCCloser src={require('../../assets/employee/bin.svg')} onClick={() => containerOnDel(dsid)}></MCCloser>
              </GMTop>
              {central.map((grafData, j) => {
                if (grafData.status === 'ok' && grafData.dsid === dsid && grafData.gtype === 'candle') {
                  return <React.Fragment key={j}>
                    <GMTitle color="#44b9bf">{grafData.market} - {grafData.currency}</GMTitle>
                    <CandleGraph market={grafData.market} currency={grafData.currency} primary={grafData.primary.series} alternate={grafData.alternate.series} containerId={dsid} barid={random.generate(16)}></CandleGraph>
                  </React.Fragment>
                } if (grafData.status === 'ok' && grafData.dsid === dsid && grafData.gtype === 'line') {
                  return <React.Fragment key={j}>
                    <GMTitle color="#30c97c">{grafData.symcomp}</GMTitle>
                    <LineGraph series={grafData.series} period={grafData.period} symcomp={grafData.symcomp} containerId={dsid}></LineGraph>
                  </React.Fragment>
                } if (grafData.status === 'ok' && grafData.dsid === dsid && grafData.gtype === 'pie') {
                  return <React.Fragment key={j}>
                    <GMTitle color="#6c96af">{grafData.compname} - {grafData.period}</GMTitle>
                    <PieGraph series={grafData.series} containerId={dsid}></PieGraph>
                  </React.Fragment>
                } return null;
              })}
              <GMRH />
            </GMArea>
          </div>)}
      </Draggable>
    ))
  )
  return (
    renderContainers()
  )
}

const mapStateToProps = (state) => {
  return {
    central: state.central,
    containers: state.containers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    eraseContainer: (id) => dispatch(containerClose(id)),
    brewort: (i, a, b) => dispatch(brewsend(i, a, b))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerGraphView)
