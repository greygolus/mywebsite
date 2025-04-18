# Video Preloader Setup

## Instructions for Adding the "Lens Distortion (Remix)" Video

To properly add the lens distortion video to the preloader:

1. Rename your "Lens Distortion (Remix) (2).mp4" file to `lens-distortion.mp4`
2. Place it in this directory (`/client/public/videos/`)
3. The preloader component is already configured to use this file path

## Video Requirements for Optimal Display

- Format: MP4 (H.264 codec recommended)
- Resolution: 1920x1080 or similar 16:9 aspect ratio recommended
- Size: Keep under 5MB if possible for fast initial loading
- Duration: The video will loop automatically

## How It Works

The video is referenced in the preloader component:

```tsx
<video
  ref={videoRef}
  className="absolute inset-0 w-full h-full object-cover opacity-50"
  autoPlay
  muted
  playsInline
  loop
  src="/videos/lens-distortion.mp4"
>
  Your browser does not support the video tag.
</video>
```

The preloader has built-in fallback logic if the video fails to load, ensuring the site remains functional even without the video.