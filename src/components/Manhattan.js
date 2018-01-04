import React, { Component } from 'react';
import '../App.css';
import './manhattan-style.css'
import manhattan from '../manhattan.png'

import * as d3 from 'd3'

const svgWidth = 787.4;
const svgHeight = 1756.3;

class Manhattan extends Component {

  constructor(props){
    super(props);
    this.prepareSvg = this.prepareSvg.bind(this)
    this.state = {
      selection: ''
    }
        this.onClickHandle = this.onClickHandle.bind(this)
  }

  prepareSvg(){
    const node = this.node
    d3.select('#the_map').selectAll('g, rect, polygon').on('click', this.zoomFocus)
  }

    onClickHandle(name){
      return () => {
        this.setState({
          selection: name,
        })
      }
    }

  onHoverOrClick(name){
    return () => {
      if(this.state.selection === name){
        console.log("resetting focus")
        this.resetFocus()
        this.setState({
          selection: ''
        })
      } else{
      this.setState({
        selection: name
      })
    }
  }
  }

  // https://bl.ocks.org/mbostock/9656675
  zoomFocus(){
    console.log("zooming focus")
    let bbox = this.getBBox()
    let bounds = [[bbox.x, bbox.y],[bbox.x + bbox.width, bbox.y + bbox.height]]
    let x = (bounds[0][0] + bounds[1][0]) / 2
    let y = (bounds[0][1] + bounds[1][1]) / 2
    let dx = bbox.width
    let dy = bbox.height
    let scale = Math.max(1, Math.min(4, 0.9 / Math.max(dx / svgWidth, dy / svgHeight)))
    let translate = [svgWidth / 2 - scale * x, svgHeight / 2 - scale * y]

    d3.select('#the_map').transition().duration(750).attr('transform', `translate(${translate})scale(${scale})`)
  }

  componentDidMount(){
    this.prepareSvg()
  }

  componentDidUpdate(){
    // this.prepareSvg()
  }

  resetFocus(){
    console.log("resetting focus")
    d3.select('#the_map').transition().duration(750).attr('transform', '')
  }

  render() {
    return (
      <div className="text-center">
        <h3>{this.state.selection}</h3>
<svg
ref={node => this.node = node}
id="Layer_1"
className="manhattan-svg-container"
viewBox="0 0 787 1756"
>
  <g id="the_map">
  <g id="Manhattan" onClick={this.onClickHandle("Manhattan")}  class="cls-1">
    <path class="cls-2" d="M338.4,117.5c-5.4.6-15.4-.2-19.4,4.8s2.8,7.8,1.5,12.6-10.4,6.4-14.7,5.4c-6-1.5-9.2-7-12.3-12-5.2-8.5-15.6-13.2-25.3-8.5-5,2.4-5.6,6.1-6.7,11.1-1.6,7.1-3.8,14.2-4.9,21.5s-2.3,13.8-.6,19.8,5.2,10.3,7.9,15.1c6.9,12.2,10,23.8,11.4,37.9a418.2,418.2,0,0,1,1.7,47.6c-.4,21.1.6,42.3-.2,63.4-.4,10,0,22-4.8,31-2.6,5.2-5.2,7.8-5.8,14.1s1.1,13.3,6.7,18c8.7,7.6,19.4,9.5,24.6,20.3s3.5,27.9,6.1,40.6c3.7,16.8,9,33,11.6,50.1s5.1,36.9,3.9,55-4.5,37.5-4.8,56.2c-.1,2.3.4,4.8-1.1,6.7s-3.6,1.7-4.7,3.3c-3.3,4.9.7,10.1,0,15.1s-7.5,8.4-6.8,12.5,6.3.6,8.6,4.6.4,13.3.3,17.2c-.2,7.4-1.3,14.7-.8,22.1s2.7,16.2,2.9,24.4c.5,12.6,1.4,25.2.8,37.8-.8,17.2-3,35.5-.9,52.5.5,4.6,2.1,8.7,3,13.2,1.9,9.8,1.8,18.7,1.7,28.6,0,12.8,1.1,25.7.9,38.5-.2,7.1,1.2,14.2.5,21.3s-3.5,13.9-3.5,21.9,1.8,13.7,2.2,20.5c.8,12.6-.3,25.3-.1,37.8.1,4.3.9,9.9-.2,14s-3.8,5-7.6,7.1c-2,1.1-10.1,4.2-6.8,7.7,1.7,1.8,7.7-1.2,10.6.7,6.6,4.3-1.6,10.1-2.6,15.4-.6,2.7.2,4.9.3,7.6s-1.7,5.9-2,8.9c-.5,7.6,7.9,6.7,10.1,12.2,1.2,3-.5,5.9-4.2,5.6-1.9-.1-4.8-3.4-6-4.8-8.7,3-1.1,17.3-2.4,24.1-.7,4.2-2.3,7.3.7,10.6s8.5,1.6,6.6,7.3c-.9,2.6-8,6.3-4.1,9.7,1.9,1.7,10.5-2.6,6.7,2.9-1.9,2.6-11.1,2.2-6.1,6.2,3,2.5,9.5-2.2,11.7,1.6,3.3,5.6-10.9,5.8-13.2,5.4.9,2,1.8,6.1,3.9,7.2s6.2-1.8,7.5,2.3c-2.4,2-17.5,1.4-11.4,8.1,2.2-.8,7.1-1.8,8.3,1s-5.1,3.5-7.1,5.2-3.6,6.5-1.5,9.1,5.9.8,9.1,1.7c6.7,6.5-20.4,10.4-12,18.8,3.3.1,10.5-4.7,7.9,2.3-.4,1.2-3.3,2.9-4.1,4.5s-1,4.4-1.2,7.1c-.6,6.7-1.3,13.5.4,20.1.5,2,1.3,6.8,2.7,8.3s5.7,1.4,8.3,3.1,4.1,7.2,3.9,10.3-2,8.3-6.3,7.3-4.2-5.6-8.6-3.4c4.4,7.3,3.9,15.3,3.5,23-.5,11.2,8.2,8.6,14.8,11.8,10.3,5,4.9,10.5,2.6,18.3-4,13.3.8,23.3,7.6,34.2,3,4.8,4.2,9,5.2,14.3s1.9,6,6.9,7.4c3.2.9,7.8,2.4,10,4.7,4.6,4.8-.1,6.2-2.3,9.7s-.7,7.2,4.2,5.4,9.9-5.9,13.9-3-2.4,7.9-4.9,10.2c-5.2,4.7-4.4,5.9-2.9,11.6s.4,14.5,4.4,18.7,18.1-9,20.7,1.5c-2,2.1-22.9,14.3-13.3,16.6,4.1.9,6.8-4.9,8.7,1.3,1.1,3.9-2.3,8-2.9,11-2.6,11.6,17.3,4,23.2,4.8s3.7,3.5-.1,6.7-12.5,8.6-12.6,13.8,5.1,13.3,7,17.6c8.9,20.8,12.7,44,22.9,64.3a227.4,227.4,0,0,1,11.2,25.9c2.5,6.8,3.3,14,5.7,20.8s4.6,15.5,7,23.5c1,3.4,2.3,12.7,5.6,15,4.8,3.2,10.2-3,13.4-5.7s9.1-5,9.5,1.7c.3,5.1-6.1,6.7-.9,12.2,2.4,2.7,7.7,4.9,10.8,7.3s5.6,3.7,9.1,4.5,10.2,1.2,14.7-.7c6.2-2.7,6.7-5,7.6-10.9s4.2-11.6,9.9-8.4,3.8,6.8,10.1,2.1c11-8.4-16.7-11.3-7.6-20.2s15.4,17.1,22.5-2.1c4.8-13.2,11.9-28.9,8.9-43.2-1.2-5.4-5.8-6-8.9-9.6-4.5-5.2-1.7-9,1.7-13.5,4.9-6.6,8.3-14.3,13.6-20.7s11.9-11.4,18.7-16.1a39.2,39.2,0,0,1,6.4-4.2c4.1-1.8,3.5-2.2,6.1,1.7s2.9,9.5,8.8,8.7,7.6-9.5,11.4-13.2c5.6-5.6,11.4-10.6,18.2-14.4s10.1-9.1,14.9-14.2a43.8,43.8,0,0,0,10-15.1c2.7-6.9,3.1-12.9,2-20.4-1.4-9.3-2-18.8-3.1-28.3-2.3-18.2-10.8-35.4-17.4-52.5-.3-.9-1.5-1.9-1.6-2.9a5.5,5.5,0,0,1,.7-2.6c-.6-3.5-2.4-7.9-3.8-11.8-2.8-7.1-5-14.3-8.1-21.1-5.7-12.9-15.9-18.6-29.5-21.5-4.7-1-11.1-.9-9.5-6.9s10.2-7.4,11.6-12.3c-3.8-.3-19.3,5.2-18.9-4.2.5-7.6,17.4-8.2,8-18.5-4.7-5-11.6-5.6-15.9-12.2-2.4-3.9-2.8-5.8-2.4-10.2,1-8.2-5.6-13.7-9.5-20.9s-3.6-14.4-4.6-21.9c-2.2-17.4,2.4-34.4,3.7-51.7,1.5-19.5,1.9-39.2,4.1-58.6,2.8-24,8-47.9,10.9-71.8a308.1,308.1,0,0,0,1.8-31.8c.3-18.7.5-36.9,5.6-55,2.2-7.7,3.3-15.4,4.7-23.3.9-5.1,5.2-13.2,2.6-17.9s-9.3-7.4-12.8-10.5-8.3-8.1-13.1-11.8-8.6-6.5-10.5-11.7c-5.4-14.3,6.3-30,8.6-43.8a61.7,61.7,0,0,0-.2-18.2c-1-7.7-3.1-14.8-1.2-22.6,2.4-9.8,7.2-19,10.9-28.3,2.9-6.9,6.9-13.4,7.6-21.2s-4.6-15-8.5-21.9-8.9-17.7-15-24.8c-8.5-9.8-21.2-15.2-33.3-20.4-5.8-2.5-11.5-3.7-17.4-5.6s-7.8-5.3-11.1-11.1l-8.9-15.7-10.6-18.8c-4.4-7.9-9.3-15.6-12.9-23.8-6.6-14.8-12.3-30-21.4-43.5s-22.3-27.8-32.7-42.3c-5.9-8.2-10.5-17.7-15-26.6-5.5-10.9-7.6-19.3-8.8-31.3s-3.1-23.2-7-34.2c-.1-.1-.1-.3-.2-.4-1.8-4.9-4.5-10.6-4.8-15.6-.5-6.6.8-12.7-.4-19.3a189.4,189.4,0,0,1-2-23.8c-.2-7.6-1.9-14.9-1.8-22.4.2-22.6,2.5-44.6-2.7-66.9-1-4.2-5.1-12.6-3.3-16.7s5.5-.8,7.6-4.6,1.4-9.1,2.6-12.7c1.8-5.5,2.7-11.2,3.9-16.9s3.1-6.4,1.4-10.6-5.5-4.8-10.3-4.4c.9-4.1,5.6-7,8.1-10.3a36.3,36.3,0,0,0,7.1-15.9c1.9-13.5-3.8-34.1-13.1-44.2C365.9,110.1,348.4,116.4,338.4,117.5Z"/>
  </g>
  <polygon id="Chinatown" onClick={this.onClickHandle("Chinatown")}  class="cls-3" points="492 1530 498 1460 612 1445 614 1458 514 1531 492 1530"/>
  <g id="Two Bridges" onClick={this.onClickHandle("Two Bridges")} >
    <path class="cls-4" d="M587.8,1520.5a39.2,39.2,0,0,1,6.4-4.2c4.1-1.8,3.5-2.2,6.1,1.7s2.9,9.5,8.8,8.7,7.6-9.5,11.4-13.2c5.6-5.6,11.4-10.6,18.2-14.4s10.1-9.1,14.9-14.2a43.8,43.8,0,0,0,10-15.1,36.9,36.9,0,0,0,2.4-9.8H651l-63.3,17.2L514,1531l44,21h1c3.2-5.2,6.1-10.7,10.1-15.5S581,1525.2,587.8,1520.5Z"/>
  </g>
  <g id="Lower Manhattan" onClick={this.onClickHandle("Lower Manhattan")}  class="cls-5">
    <path class="cls-6" d="M476,1619l-23.8-75.5s-33.7-.8-33.3.4a147.7,147.7,0,0,0,6.3,14.7,227.4,227.4,0,0,1,11.2,25.9c2.5,6.8,3.3,14,5.7,20.8s4.6,15.5,7,23.5c1,3.4,2.3,12.7,5.6,15,4.8,3.2,10.2-3,13.4-5.7s9.1-5,9.5,1.7c.3,5.1-6.1,6.7-.9,12.2,2.4,2.7,7.7,4.9,10.8,7.3s5.6,3.7,9.1,4.5,10.2,1.2,14.7-.7c6.2-2.7,6.7-5,7.6-10.9.1-.5.3-1.1.4-1.7L483,1616Z"/>
  </g>
  <g id="Financial District" onClick={this.onClickHandle("Financial District")}  class="cls-5">
    <path class="cls-7" d="M488,1552H478l2,8-12,1-3-9h-9.9L476,1619l7-3,36,34,.3.4c1.3-4.4,4.5-9.4,9.5-6.6s3.8,6.8,10.1,2.1c11-8.4-16.7-11.3-7.6-20.2s15.4,17.1,22.5-2.1c4.4-12,10.7-26.1,9.4-39.4L513,1556Z"/>
  </g>
  <polygon id="Radio City" onClick={this.onClickHandle("Radio City")}  class="cls-8" points="480 1560 478 1552 476 1544 463 1544 465 1552 468 1561 480 1560"/>
  <g id="Tribeca" onClick={this.onClickHandle("Tribeca")}  class="cls-5">
    <path class="cls-9" d="M496,1482l-66-16H404c-4,3.1-8.6,6.9-8.7,10.7s5.1,13.3,7,17.6c6.8,16,10.6,33.3,16.6,49.6l72.1-.9Z"/>
  </g>
  <polygon id="Soho" onClick={this.onClickHandle("Soho")}  class="cls-10" points="445 1434 459 1428 504 1431 504 1441 507 1450 505 1484 460.7 1473.4 445 1434"/>
  <g id="West Village" onClick={this.onClickHandle("West Village")}  class="cls-5">
    <path class="cls-11" d="M430,1466l31,8-2-46,41,3,2-60-8-18-111,1-31.7,10.3,1,.4h.3l.8.3.5.2,1,.4.9.4.4.2.8.4.4.3.7.5.3.2.8.7a5.6,5.6,0,0,1,1.9,3.1,2.4,2.4,0,0,1,0,1.2c0,.2-.1.3-.2.5a4.2,4.2,0,0,1-1.1,1.6,23.6,23.6,0,0,0-2.9,3.3,6.4,6.4,0,0,0-1.3,3c-.4,2.6,1.8,3.8,5.5,2.4l.7-.2,1.6-.8,3.5-1.7,2.9-1,1.9-.2h.9a4.4,4.4,0,0,1,2.4.9c2.9,2,1.5,4.4-.6,6.5l-.7.7-1.1.9-.7.6-.7.5-1.1,1c-1.9,1.7-3.1,3-3.6,4.2a5.6,5.6,0,0,0-.4,1.2,2.8,2.8,0,0,0,0,1.3,6.9,6.9,0,0,0,.2,1.3q.3,1.5.9,3.6c1.3,5.1.4,14.5,4.4,18.7,2,2.2,5.4,1.1,8.9-.2l1.6-.6.8-.4,3.1-1,1.4-.2h1.9l.6.2a2.5,2.5,0,0,1,1,.8,4.4,4.4,0,0,1,.8,1.1,4.9,4.9,0,0,1,.6,1.7c-.1.2-.3.3-.5.5l-1.6,1.2-1.4.9a9.1,9.1,0,0,1-1.6,1.1l-3.4,2.5-1.7,1.4-2.3,2-.7.6-1.2,1.3a4.8,4.8,0,0,0-1.4,2.9,1.5,1.5,0,0,0,.2.9l.3.4a7.7,7.7,0,0,0,2,.9c2.7.6,4.7-1.7,6.4-1.6h.5l.4.3.4.4.2.3a15.9,15.9,0,0,1,.8,1.8,7.7,7.7,0,0,1,.2,1.5,8.3,8.3,0,0,1-.3,2.2c-.1.5-.3.9-.4,1.4l-.6,1.4a22.1,22.1,0,0,0-1.8,4.5h0a2.9,2.9,0,0,0-.2.9v.2c0,.3-.1.5-.1.8h0c0,.3.1.5.1.7v.3c.1.1.1.3.2.5h0c.1.2.1.4.2.5v.2l.3.3v.2c.1.1.2.3.3.3l.2.2.3.2.4.3h.8l.9.2c5.6,1.2,15.7-1.9,19.6-1.4,6.9.9,3.7,3.5-.1,6.7-1,.9-2.3,1.9-3.8,3l.3.2Z"/>
  </g>
  <g id="Civic Center" onClick={this.onClickHandle("Civic Center")}  class="cls-5">
    <path class="cls-12" d="M492.1,1530l-1,22.5L513,1556l50,28,.2.2c-.1-1.3-.3-2.6-.5-3.8-1.2-5.4-5.8-6-8.9-9.6-4.5-5.2-1.7-9,1.7-13.5,1.2-1.7,2.4-3.4,3.5-5.2L514,1531Z"/>
  </g>
  <polygon id="Little Italy" onClick={this.onClickHandle("Little Italy")}  class="cls-13" points="506 1422 504 1431 504 1441 507 1450 505 1499 533 1501 536 1497 529 1449 521 1428 521 1419 506 1422"/>
  <path id="Nolita" onClick={this.onClickHandle("Nolita")}  class="cls-14" d="M506.8,1455.7c7.7.1,15.4.5,23.2,0l-1-6.7-8-21-17,2v11l3,9Z"/>
  <polygon id="Five Points" onClick={this.onClickHandle("Five Points")}  class="cls-15" points="505 1499 503 1519 517 1524 535 1511 533 1501 505 1499"/>
  <g id="Lower East Side" onClick={this.onClickHandle("Lower East Side")}  class="cls-5">
    <path class="cls-16" d="M532,1458l3,30,23-2,93-26h15a54,54,0,0,0-.4-12.6c-1.4-9.3-2-18.8-3.1-28.3a93.8,93.8,0,0,0-3.1-14.7l-135.6,23.7Z"/>
  </g>
  <polygon id="Cooperative Village" onClick={this.onClickHandle("Cooperative Village")}  class="cls-17" points="647 1444 629 1446 628 1466 651 1460 647 1444"/>
  <rect id="Little Germany" onClick={this.onClickHandle("Little Germany")}  class="cls-18" x="555" y="1365" width="31" height="32"/>
  <g id="East Village" onClick={this.onClickHandle("East Village")}  class="cls-5">
    <path class="cls-19" d="M521,1419l4,9,134.7-23.9c-3.7-12.1-9.1-23.8-13.6-35.5-.3-.9-1.5-1.9-1.6-2.9a5.5,5.5,0,0,1,.7-2.6c-.6-3.5-2.4-7.9-3.8-11.8-.4-.9-.7-1.8-1-2.7L520,1353Z"/>
  </g>
  <polygon id="Bowery" onClick={this.onClickHandle("Bowery")}  class="cls-20" points="534.7 1488 558 1486 551 1426 550 1403 520 1403 521 1419 521 1428 529.6 1453 534.7 1488"/>
  <polygon id="Noho" onClick={this.onClickHandle("Noho")}  class="cls-21" points="494 1353 520 1353 521 1428 500 1430 502 1371 494 1353"/>
  <g id="Alphabet City" onClick={this.onClickHandle("Alphabet City")}  class="cls-5">
    <path class="cls-22" d="M551.9,1423.4l107.9-19.1c-3.7-12.2-9.1-23.9-13.7-35.7-.3-.9-1.5-1.9-1.6-2.9a5.5,5.5,0,0,1,.7-2.6c-.6-3.5-2.4-7.9-3.8-11.8-2.8-7.1-5-14.3-8.1-21.1-5.7-12.9-15.9-18.6-29.5-21.5-2.5-.5-5.3-.8-7.3-1.7H549Z"/>
  </g>
  <polygon id="Gramercy" onClick={this.onClickHandle("Gramercy")}  class="cls-23" points="549 1307 476 1308 494 1353 549 1351.9 549 1307"/>
  <g id="Stuyvesant Town" onClick={this.onClickHandle("Stuyvesant Town")}  class="cls-5">
    <path class="cls-24" d="M548,1352l91.6-2.9c-2.4-6.3-4.5-12.7-7.3-18.9a34.3,34.3,0,0,0-4.9-8.2H548Z"/>
  </g>
  <g id="Peter Cooper Village" onClick={this.onClickHandle("Peter Cooper Village")}  class="cls-5">
    <path class="cls-25" d="M548,1322h79.4a37.9,37.9,0,0,0-19.5-15H548Z"/>
  </g>
  <g id="Meatpacking District" onClick={this.onClickHandle("Meatpacking District")}  class="cls-5">
    <path class="cls-26" d="M402,1366l-2-19-20-1-36.4,14.7c.9,1.7,2.4,2.1,5.6,3s7.8,2.4,10,4.7c4.6,4.8-.1,6.2-2.3,9.7s-.7,7.2,4.2,5.4,9.9-5.9,13.9-3a4.8,4.8,0,0,1,1.4,1.5l10.6-3Z"/>
  </g>
  <g id="Chelsea" onClick={this.onClickHandle("Chelsea")}  class="cls-5">
    <path class="cls-27" d="M380,1346l20,1,.7,6.5,93.3-.5-6-16-35-86H323.5c-.2,3.5-2.1,8.1-6.3,7.1s-4.2-5.6-8.6-3.4c4.4,7.3,3.9,15.3,3.5,23-.5,11.2,8.2,8.6,14.8,11.8,10.3,5,4.9,10.5,2.6,18.3-4,13.3.8,23.3,7.6,34.2,3,4.8,4.2,9,5.2,14.3a11.7,11.7,0,0,0,1.5,4.8h.2Z"/>
  </g>
  <g id="Kips Bay" onClick={this.onClickHandle("Kips Bay")}  class="cls-5">
    <path class="cls-28" d="M518,1307h77.5c-1.9-.9-2.9-2.3-2.2-5.2,1.5-5.7,10.2-7.4,11.6-12.3-3.8-.3-19.3,5.2-18.9-4.2.5-7.6,17.4-8.2,8-18.5-4.7-5-11.6-5.6-15.9-12.2a23,23,0,0,1-1.8-3.4L518,1249Z"/>
  </g>
  <g id="Hells Kitchen" onClick={this.onClickHandle("Hells Kitchen")}  class="cls-5">
    <path class="cls-29" d="M417,1127H317.2a5.6,5.6,0,0,1-.8,1.5c-1.9,2.6-11.1,2.2-6.1,6.2,3,2.5,9.5-2.2,11.7,1.6,3.3,5.6-10.9,5.8-13.2,5.4.9,2,1.8,6.1,3.9,7.2s6.2-1.8,7.5,2.3c-2.4,2-17.5,1.4-11.4,8.1,2.2-.8,7.1-1.8,8.3,1s-5.1,3.5-7.1,5.2-3.6,6.5-1.5,9.1,5.9.8,9.1,1.7c6.7,6.5-20.4,10.4-12,18.8,3.3.1,10.5-4.7,7.9,2.3-.4,1.2-3.3,2.9-4.1,4.5s-1,4.4-1.2,7.1c-.6,6.7-1.3,13.5.4,20.1.5,2,1.3,6.8,2.7,8.3s5.7,1.4,8.3,3.1,4.1,7.2,3.9,10.3v.2H418Z"/>
  </g>
  <rect id="Times Square" onClick={this.onClickHandle("Times Square")}  class="cls-30" x="400" y="1156" width="40" height="68"/>
  <polygon id="Midtown" onClick={this.onClickHandle("Midtown")}  class="cls-31" points="515 1218 513.8 1117 400 1117 401.2 1218 515 1218"/>
  <polygon id="Garment District" onClick={this.onClickHandle("Garment District")}  class="cls-32" points="475 1208 400 1208 400 1251 477 1251 475 1208"/>
  <rect id="Tenderloin" onClick={this.onClickHandle("Tenderloin")}  class="cls-33" x="436" y="1208" width="45" height="99"/>
  <polygon id="Koreatown" onClick={this.onClickHandle("Koreatown")}  class="cls-34" points="477 1267 477 1239 454 1239 453 1251 459.5 1267 477 1267"/>
  <polygon id="Herald Square" onClick={this.onClickHandle("Herald Square")}  class="cls-35" points="448 1234 453 1251 477 1251 477 1234 448 1234"/>
  <polygon id="Murray Hill" onClick={this.onClickHandle("Murray Hill")}  class="cls-36" points="477 1208 477 1274 533 1274 532 1208 477 1208"/>
  <polygon id="Rose Hill" onClick={this.onClickHandle("Rose Hill")}  class="cls-37" points="480.1 1274 480 1291 499 1291 499 1297 519 1297 519 1274 480.1 1274"/>
  <g id="Turtle Bay" onClick={this.onClickHandle("Turtle Bay")}  class="cls-5">
    <path class="cls-38" d="M507,1208h55.3c-.2-2.1-.4-4.3-.7-6.4-2.2-17.4,2.4-34.4,3.7-51.7a2.2,2.2,0,0,0,.1-.8l-59.4.9Z"/>
  </g>
  <polygon id="Flatiron District" onClick={this.onClickHandle("Flatiron District")}  class="cls-39" points="499 1291 498 1329 454 1329 455 1291 499 1291"/>
  <polygon id="Nomad" onClick={this.onClickHandle("Nomad")}  class="cls-32" points="454 1297 478 1297 478 1290 509 1290 509 1274 454 1274 454 1297"/>
  <g id="Upper East Side" onClick={this.onClickHandle("Upper East Side")}  class="cls-5">
    <path class="cls-40" d="M551,920H477v196h90.5c.5-7.7,1.1-15.3,1.9-22.9,2.8-24.3,8-48.5,10.9-72.6a313.9,313.9,0,0,0,1.8-32.1c.2-10.7.3-21.2,1.3-31.6l-8.4-.4Z"/>
  </g>
  <rect id="Central Park" onClick={this.onClickHandle("Central Park")}  class="cls-8" x="417" y="846" width="60" height="270"/>
  <polygon id="Lincoln Square" onClick={this.onClickHandle("Lincoln Square")}  class="cls-41" points="416 1116 416 1073 401 1073 400 1059 377 1059 377 1116 416 1116"/>
  <g id="Upper West Side" onClick={this.onClickHandle("Upper West Side")} >
    <path class="cls-42" d="M417,847H317.2c.2,4.1.1,8.2.1,12.5,0,12.8,1.1,25.7.9,38.5-.2,7.1,1.2,14.2.5,21.3s-3.5,13.9-3.5,21.9,1.8,13.7,2.2,20.5c.8,12.6-.3,25.3-.1,37.8.1,4.3.9,9.9-.2,14s-3.8,5-7.6,7.1c-2,1.1-10.1,4.2-6.8,7.7,1.7,1.8,7.7-1.2,10.6.7,6.6,4.3-1.6,10.1-2.6,15.4-.6,2.7.2,4.9.3,7.6s-1.7,5.9-2,8.9c-.5,7.6,7.9,6.7,10.1,12.2,1.2,3-.5,5.9-4.2,5.6-1.9-.1-4.8-3.4-6-4.8-8.7,3-1.1,17.3-2.4,24.1-.7,4.2-2.3,7.3.7,10.6s8.5,1.6,6.6,7.3c-.9,2.6-8,6.3-4.1,9.7,1.7,1.5,8.6-1.8,7.5,1.4H417Z"/>
  </g>
  <polygon id="Columbus Circle" onClick={this.onClickHandle("Columbus Circle")}  class="cls-43" points="430 1127 430 1116 417 1116 417 1101.5 381 1101 382.3 1126.9 430 1127"/>
  <polygon id="Manhattan Valley" onClick={this.onClickHandle("Manhattan Valley")}  class="cls-44" points="415 851.5 366 851 366 868 372 878 373 921 415 921 415 851.5"/>
  <g id="Harlem" onClick={this.onClickHandle("Harlem")} >
    <path class="cls-45" d="M302.7,659.1l.3.8V657A3.9,3.9,0,0,0,302.7,659.1Z"/>
    <path class="cls-46" d="M399,771v45l8,14,1,16h70v74H591.6l1.8-10.6c.9-5.1,5.2-13.2,2.6-17.9s-9.3-7.4-12.8-10.5-8.3-8.1-13.1-11.8-8.6-6.5-10.5-11.7c-5.4-14.3,6.3-30,8.6-43.8a61.7,61.7,0,0,0-.2-18.2c-1-7.7-3.1-14.8-1.2-22.6,2.4-9.8,7.2-19,10.9-28.3,2.9-6.9,6.9-13.4,7.6-21.2s-4.6-15-8.5-21.9-8.9-17.7-15-24.8c-8.5-9.8-21.2-15.2-33.3-20.4-5.8-2.5-11.5-3.7-17.4-5.6s-7.8-5.3-11.1-11.1l-8.9-15.7c-3.3-6-6.7-6.9-10-12.9L315,609c-.4,5.2.4,7.3.3,12.5-.1,2.3.4,4.8-1.1,6.7s-3.6,1.7-4.7,3.3c-3.3,4.9.7,10.1,0,15.1-.5,3.4-5.3,6.9-6.5,10.4v2.9c1.3,2.8,6.1.1,8.3,3.8s.4,13.3.3,17.2c-.2,7.4-1.3,14.7-.8,22.1s2.7,16.2,2.9,24.4c.2,3.8.3,7.5.5,11.2L339,740Z"/>
  </g>
  <g id="Morningside Heights" onClick={this.onClickHandle("Morningside Heights")} >
    <path class="cls-47" d="M407,830l-8-14V771l-60-32H313.2c.4,8.7.7,17.5.3,26.2-.8,17.2-3,35.5-.9,52.5.5,4.6,2.1,8.7,3,13.2a99.4,99.4,0,0,1,1.6,15.1H407Z"/>
  </g>
  <g id="Manhattanville" onClick={this.onClickHandle("Manhattanville")} >
    <path class="cls-48" d="M404,716H311.5a88.2,88.2,0,0,1,1.2,11.4c.5,12.6,1.4,25.2.8,37.8-.3,6.7-.8,13.6-1.2,20.6L404,784Z"/>
  </g>
  <g id="Hamilton Heights" onClick={this.onClickHandle("Hamilton Heights")} >
    <path class="cls-49" d="M408,716l-9-49V636l-11-27H314.9c-.3,4.2-.5,8.3-.6,12.5-.1,2.3.4,4.8-1.1,6.7s-3.6,1.7-4.7,3.3c-3.3,4.9.7,10.1,0,15.1s-7.5,8.4-6.8,12.5,6.3.6,8.6,4.6.4,13.3.3,17.2c-.2,7.4-1.3,14.7-.8,22.1.3,4.3,1,8.7,1.7,13H408Z"/>
  </g>
  <rect id="Tudor City" onClick={this.onClickHandle("Tudor City")}  class="cls-50" x="532" y="1201" width="16" height="17"/>
  <g id="Sutton Place" onClick={this.onClickHandle("Sutton Place")} >
    <path class="cls-51" d="M548,1149h18c.8-10.3.8-22.7,1.4-33H548Z"/>
  </g>
  <g id="Yorkville" onClick={this.onClickHandle("Yorkville")} >
    <path class="cls-52" d="M582.1,988.4c.2-10.7.3-21.2,1.3-31.6l-8.4-.4L551,920H515v126h61.6c1.4-8.5,2.7-17,3.7-25.5A313.9,313.9,0,0,0,582.1,988.4Z"/>
  </g>
  <rect id="Lenox Hill" onClick={this.onClickHandle("Lenox Hill")}  class="cls-53" x="477" y="1046" width="38" height="70"/>
  <rect id="Carnegie Hill" onClick={this.onClickHandle("Carnegie Hill")}  class="cls-54" x="477" y="910" width="38" height="63"/>
  <rect id="Sugar Hill" onClick={this.onClickHandle("Sugar Hill")}  class="cls-55" x="381" y="608" width="28" height="54"/>
  </g>
</svg>
      </div>
    )
  }
}

export default Manhattan
