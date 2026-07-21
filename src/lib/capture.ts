export interface CaptureGps {
  lat: number;
  lng: number;
  accuracy: number;
}

export interface CaptureBundle {
  projectId: string;
  photoDataUrl: string;
  hash: string | null;
  gps: CaptureGps | null;
  capturedAt: string;
}

const STORAGE_KEY = "esumbong:pendingCapture";

// Geolocation must be read fresh at shutter time (maximumAge: 0) so the
// bundled coordinates reflect where the reporter is standing right now,
// not a cached fix from when the camera screen first opened.
export function getCurrentPosition(options?: PositionOptions): Promise<CaptureGps> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0, ...options }
    );
  });
}

export function captureFrameAsBlob(video: HTMLVideoElement, canvas: HTMLCanvasElement): Promise<Blob | null> {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.resolve(null);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.85));
}

export async function hashBlob(blob: Blob): Promise<string> {
  const buffer = await blob.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function savePendingCapture(bundle: CaptureBundle) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bundle));
  } catch {
    // sessionStorage can throw in private-browsing/quota-exceeded edge cases;
    // the capture flow still works end-to-end, downstream screens just fall
    // back to their placeholder content.
  }
}

export function getPendingCapture(): CaptureBundle | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CaptureBundle) : null;
  } catch {
    return null;
  }
}

export function clearPendingCapture() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
}
