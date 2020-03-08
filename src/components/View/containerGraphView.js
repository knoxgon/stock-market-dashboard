import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { containerClose, brewsend } from '../../__redux/actions/containerActions';
import random from 'randomstring';
import { GMArea, AGMButton, GraphFeature, GMTitle, GMSelect, GMTop, GMRH, GMCircle, GraphFeatureHold } from "./styled"
import CandleGraph from '../Graph/Candle/candle'
import LineGraph from '../Graph/Line/line'
import PieGraph from '../Graph/Pie/pie'
import AreaGraph from '../Graph/Area/area'
import { Draggable } from 'react-beautiful-dnd';
import { faTrashAlt, faSave, faGripLines } from '@fortawesome/free-solid-svg-icons';
import { trendspec } from '../../__redux/actions/trendActions';
import { tickUpdate } from '../../__redux/actions/tickrate';
import { getactAction } from '../../__redux/actions/getact';

const ContainerGraphView = ({ getcmp, dyntick, peers, brewort, central, eraseContainer, containers, theme, dyntrend }) => {
  const [intra, setIntra] = useState('d5')
  useEffect(() => {
    getcmp();
  },[getcmp])
  const containerOnDel = (dsid) => eraseContainer(dsid)
  const updateData = (id, cmp, e) => dyntrend(id, cmp, e.value)
  const onChangeIntra = (id, cmp, e) => {
    e.preventDefault();
    setIntra(e.target.value)
    dyntick(id, cmp, e.target.value)
  }

  const renderContainers = () => (
    containers.map(({ dsid, bsw, bsh, bsmw, bsmh, bslw, bslh }, i) => (
      <Draggable draggableId={dsid} key={dsid} index={i}>
        {(provided, snapshot) => (
          <GMCircle ref={provided.innerRef} {...provided.draggableProps}>
            <GMArea bcolor={theme.graphColor} size={{ width: bsw, height: bsh }} maxHeight={bsmh} maxWidth={bsmw} minHeight={bslh} minWidth={bslw} enable={{ top: false, right: false, bottom: false, left: false, topRight: false, bottomRight: true, bottomLeft: false, topLeft: false }}
              onResizeStop={(bz, dc, ac, lc) => brewort(dsid, lc.width, lc.height)}>
              <GMTop color="#0fc4ac">
                <GraphFeature icon={faSave} fcolor={theme.fontColor} onClick={() => containerOnDel(dsid)}></GraphFeature>
                <div {...provided.dragHandleProps}>
                  <GraphFeatureHold icon={faGripLines} fcolor={theme.fontColor}></GraphFeatureHold>
                </div>
                <GraphFeature icon={faTrashAlt} fcolor={theme.fontColor} onClick={() => containerOnDel(dsid)}></GraphFeature>
              </GMTop>
              {central.map((grafData, j) => {
                if (grafData.status === 'ok' && grafData.dsid === dsid && grafData.gtype === 'candle') {
                  return <React.Fragment key={j}>
                    <GMTitle color={theme.fontColor}>{grafData.market} - {grafData.currency}</GMTitle>
                    <CandleGraph market={grafData.market} currency={grafData.currency} primary={grafData.primary.series} alternate={grafData.alternate.series} containerId={dsid} barid={random.generate(16)}></CandleGraph>
                  </React.Fragment>
                } if (grafData.status === 'ok' && grafData.dsid === dsid && grafData.gtype === 'line') {
                  return <React.Fragment key={j}>
                    <GMTitle color={theme.fontColor}>{grafData.symcomp}</GMTitle>
                    <LineGraph series={grafData.series} period={grafData.period} symcomp={grafData.symcomp} containerId={dsid} ></LineGraph>
                  </React.Fragment>
                } if (grafData.status === 'ok' && grafData.dsid === dsid && grafData.gtype === 'pie') {
                  return <React.Fragment key={j}>
                    <GMTitle color={theme.fontColor}>{grafData.compname} - {grafData.period}</GMTitle>
                    <PieGraph series={grafData.series} containerId={dsid}></PieGraph>
                  </React.Fragment>
                } return null;
              })}
              <GMRH fcolor={theme.fontColor}/>
            </GMArea>
          </GMCircle>)}
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
    containers: state.containers,
    theme: state.darkModeToggler.activeTheme
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    eraseContainer: (id) => dispatch(containerClose(id)),
    brewort: (i, a, b) => dispatch(brewsend(i, a, b))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerGraphView)
