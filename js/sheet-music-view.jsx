import React from 'react';
import * as ReactDOM from 'react-dom';
import Vex from 'vexflow';

/**
 * Visual display of a snippet of sheet music (wraps an engraving library)
 */
class SheetMusicView extends React.Component {

  componentDidMount = () => {
    this.drawMusic();
  }

  componentDidUpdate = (prevProps, prevState) => {
    this.drawMusic();
  }

  /**
   * Redraw the contents of the canvas
   */
  drawMusic = () => {
    // Clear the canvas
    var container = ReactDOM.findDOMNode(this);
    while (container.lastChild) {
      container.removeChild(container.lastChild);
    }

    // Prepare drawing objects
    var renderer = new Vex.Flow.Renderer(
      container,
      Vex.Flow.Renderer.Backends.SVG
    );
    var ctx = renderer.getContext();
    ctx.resize(this.props.width, this.props.height);

    // Set up and draw stave/clef/key
    var stave = new Vex.Flow.Stave(0, 0, this.props.width-1);
    stave.addClef(this.props.clef);
    var keySig = new Vex.Flow.KeySignature(this.props.keySignature);
        keySig.addToStave(stave);
    stave.setContext(ctx).draw();

    // Format the key names in a way VexFlow will accept
    var keys = this.props.keys.map(function (note) {
      let accidental = note.accidental();
      // VexFlow and Teoria represent double-sharps differently
      if (accidental == 'x') {
        accidental = '##';
      }
      return note.name() + accidental + "/" + note.octave();
    });

    // The StaveNote can have one or more keys (i.e. mono- or polyphonic)
    var staveNote = new Vex.Flow.StaveNote({
      clef: this.props.clef,
      keys: keys,
      duration: "q",
      auto_stem: true
    });

    // Create a Voice in 1/4
    var voice = new Vex.Flow.Voice({
      num_beats: 1,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION
    });

    // Add the StaveNotes from earlier to the Voice
    voice.addTickables([
      staveNote
    ]);

    // Apply accidentals
    Vex.Flow.Accidental.applyAccidentals([voice], this.props.keySignature);

    // Format and justify the notes to 500 pixels
    var formatter = new Vex.Flow.Formatter().
      joinVoices([voice]).format([voice], (this.props.width-1)/2);

    // Render voice
    voice.draw(ctx, stave);
  }

  render() {
    return (
      <div className="rx-sheet-music-view"></div>
    );
  }
}
SheetMusicView.defaultProps = {
  width: 150,
  height: 140,
  clef: "treble"
};
export default SheetMusicView;
