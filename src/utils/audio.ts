// Web Audio API Procedural Sound Synthesizer
// Provides celestial crystalline soundscapes with zero external assets

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private oscGroup: OscillatorNode[] = [];

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.initCtx();
      this.startAmbient();
    } else {
      this.stopAmbient();
    }
    return !this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Soft crystalline chime on hover
  public playHoverChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pentatonic celestial frequencies (E6, G#6, B6, D#7)
      const freqs = [1318.5, 1661.2, 1975.5, 2349.3];
      const freq = freqs[Math.floor(Math.random() * freqs.length)];

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // Audio context might be restricted
    }
  }

  // Low subtle resonant pulse on click
  public playClickPulse() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.2);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // Audio context might be restricted
    }
  }

  // Ethereal ambient drone
  private startAmbient() {
    if (!this.ctx) return;
    this.stopAmbient();

    try {
      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.0001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.025, now + 2.5);
      this.ambientGain.connect(this.ctx.destination);

      // F# minor / C# ethereal chord (146.83 Hz, 220 Hz, 277.18 Hz, 440 Hz)
      const chord = [146.83, 220.0, 277.18, 440.0];
      chord.forEach((f) => {
        if (!this.ctx || !this.ambientGain) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);
        osc.connect(this.ambientGain);
        osc.start(now);
        this.oscGroup.push(osc);
      });
    } catch {
      // Audio context might be restricted
    }
  }

  private stopAmbient() {
    if (this.ambientGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
        setTimeout(() => {
          this.oscGroup.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
          this.oscGroup = [];
        }, 900);
      } catch {}
    }
  }
}

export const soundFx = new SoundController();
