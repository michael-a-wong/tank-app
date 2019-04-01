import React, { Component } from "react";

class Graphic extends React.Component {
  constructor(props) {
    super(props);
    this.paint = this.paint.bind(this);
  }

  componentDidUpdate() {
    this.paint();
  }

  paint() {
    const { width, height, rotation } = this.props;
    const context = this.refs.canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(100, 100);
    context.rotate(rotation, 100, 100);
    context.fillStyle = "#F00";
    context.fillRect(-50, -50, 100, 100);
    context.restore();
  }

  render() {
    const { width, height } = this.props;
    return (
      <canvas
        ref="canvas"
        width={width}
        height={height}
      />
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rotation: 0 };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    requestAnimationFrame(this.tick);
  }

  tick() {
    const rotation = this.state.rotation + 0.04;
    this.setState({ rotation });
    requestAnimationFrame(this.tick);
  }

  render() {
    return <Graphic rotation={this.state.rotation} width={200} height={200} />;
  }
}

export default App;
