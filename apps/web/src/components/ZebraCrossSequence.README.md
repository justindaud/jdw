# ZebraCrossSequence Component

## Usage

### Scroll-based Animation (Default)
```tsx
import ZebraCrossSequence from '@/components/ZebraCrossSequence';

<ZebraCrossSequence mode="scroll" />
```

### Auto-play Animation
```tsx
<ZebraCrossSequence 
  mode="autoplay" 
  fps={30} 
  loop={true} 
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'scroll' \| 'autoplay'` | `'scroll'` | Animation trigger mode |
| `fps` | `number` | `30` | Frames per second (autoplay only) |
| `loop` | `boolean` | `true` | Loop animation (autoplay only) |
| `className` | `string` | `''` | Custom container classes |

## Features

- ✅ **150 frames** - Smooth animation sequence
- ✅ **Scroll-triggered** - Animates as user scrolls
- ✅ **Auto-play mode** - Continuous loop animation
- ✅ **Canvas rendering** - High performance
- ✅ **Image preloading** - No flickering
- ✅ **Responsive** - Adapts to container size
- ✅ **Debug mode** - Frame counter in development

## Example Placements in page.tsx

### Option 1: Between Hero and About
```tsx
<main>
  {/* Hero Section */}
  <section id="hero">...</section>
  
  {/* Zebra Cross Animation */}
  <ZebraCrossSequence mode="scroll" />
  
  {/* About Section */}
  <section id="about">...</section>
</main>
```

### Option 2: Between Programs and Footer
```tsx
<main>
  {/* Programs Section */}
  <section id="programs">...</section>
  
  {/* Zebra Cross Animation */}
  <ZebraCrossSequence mode="autoplay" fps={24} />
  
  {/* Footer */}
  <Footer />
</main>
```

### Option 3: Full-screen Section
```tsx
<ZebraCrossSequence 
  mode="scroll" 
  className="min-h-screen"
/>
```

## Performance Notes

- Images are preloaded on component mount
- Canvas rendering for smooth 60fps playback
- Scroll listener uses requestAnimationFrame internally
- Total sequence size: ~9MB (150 frames × ~60KB each)
