/**
 * A basic synthesizer for playing notes
 */
export default class {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();

    // Dynamic compressor prevents polyphony from causing clipping
    this.comp = this.ctx.createDynamicsCompressor();
    this.comp.connect(this.ctx.destination);

    this.frequencies = {
      c: 261.63,
      'c#': 277.18,
      d: 293.66,
      'd#': 311.13,
      e: 329.63,
      f: 349.23,
      'f#': 369.99,
      g: 392.00,
      'g#': 415.30,
      a: 440.00,
      'a#': 466.16,
      b: 493.88,
    };
  }
  play(key, seconds) {
    const now = this.ctx.currentTime;

    // Use gain to hide the start/stop click artifacts
    const gain = this.ctx.createGain();
    const maxGain = 1.0;
    gain.connect(this.comp);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.00);
    gain.gain.exponentialRampToValueAtTime(maxGain, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(maxGain, now + seconds - 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + seconds);

    const oscillator = this.ctx.createOscillator();
    oscillator.connect(gain);
    oscillator.type = 'sine';
    oscillator.frequency.value = this.frequencies[key];
    oscillator.start();
    oscillator.stop(now + seconds);
  }
}
