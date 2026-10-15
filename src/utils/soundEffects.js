
let audioContext;

function getAudioContext() {
  if (typeof window === "undefined") return null;

  const AudioContextClass =
    window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) return null;

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  return audioContext;
}

function playTone(context, frequency, startTime, duration, volume) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(
    volume,
    startTime + 0.015
  );
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    startTime + duration
  );

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

export async function playSound(type) {
  try {
    const context = getAudioContext();

    if (!context) return;

    if (context.state === "suspended") {
      await context.resume();
    }

    const start = context.currentTime + 0.01;

    if (type === "cart") {
      playTone(context, 660, start, 0.11, 0.035);
      playTone(context, 880, start + 0.09, 0.14, 0.035);
    }

    if (type === "favorite") {
      playTone(context, 740, start, 0.09, 0.025);
      playTone(context, 988, start + 0.07, 0.13, 0.025);
    }
  } catch {
    // Falhas de áudio não devem interromper a experiência.
  }
}
