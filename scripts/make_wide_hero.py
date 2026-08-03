"""Build a seamless-looking 16:9 hero — full building height, soft side fill."""
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

src = Path(r"C:\Users\lenovo\Desktop\alhejaz\public\brand\hero-lattice-clean.jpg")
out = Path(r"C:\Users\lenovo\Desktop\alhejaz\public\brand\hero-lattice-wide.jpg")

sq = Image.open(src).convert("RGB")
out_h = 1800
out_w = int(out_h * 16 / 9)  # 3200

scale = out_h / sq.height
fitted_w = int(sq.width * scale)
fitted = sq.resize((fitted_w, out_h), Image.Resampling.LANCZOS)

x0 = (out_w - fitted_w) // 2

# Soft side fill from edge columns (stretch + blur) — no hard mirror seams
left_col = fitted.crop((0, 0, 12, out_h)).resize((max(x0, 1), out_h), Image.Resampling.LANCZOS)
right_col = fitted.crop((fitted_w - 12, 0, fitted_w, out_h)).resize(
    (max(out_w - (x0 + fitted_w), 1), out_h), Image.Resampling.LANCZOS
)
left_col = left_col.filter(ImageFilter.GaussianBlur(radius=28))
right_col = right_col.filter(ImageFilter.GaussianBlur(radius=28))

# Darken sides slightly so center building stays the focus
left_arr = np.asarray(left_col).astype(np.float32) * 0.72
right_arr = np.asarray(right_col).astype(np.float32) * 0.72
left_col = Image.fromarray(np.clip(left_arr, 0, 255).astype(np.uint8))
right_col = Image.fromarray(np.clip(right_arr, 0, 255).astype(np.uint8))

canvas = Image.new("RGB", (out_w, out_h), (4, 4, 5))
if x0 > 0:
    canvas.paste(left_col, (0, 0))
canvas.paste(fitted, (x0, 0))
rx = x0 + fitted_w
if rx < out_w:
    canvas.paste(right_col, (rx, 0))

# Feather blend at joints
arr = np.asarray(canvas).astype(np.float32)
feather = 56
for i in range(feather):
    t = i / feather
    # left joint
    c = x0 - feather + i
    if 0 <= c < out_w and 0 <= c + 1 < out_w:
        # mix toward sharp building start
        pass
# Rebuild with alpha-style blend from blurred canvas into sharp center
blurred = canvas.filter(ImageFilter.GaussianBlur(radius=6))
barr = np.asarray(blurred).astype(np.float32)
for i in range(feather):
    t = (i / feather) ** 1.2
    # left: blurred → sharp as we enter building
    c = x0 + i
    if c < out_w:
        arr[:, c] = barr[:, c] * (1 - t) + arr[:, c] * t
    # right
    c = x0 + fitted_w - feather + i
    if 0 <= c < out_w:
        arr[:, c] = arr[:, c] * (1 - t) + barr[:, c] * t

# Keep core building crisp
arr[:, x0 + feather : x0 + fitted_w - feather] = np.asarray(fitted)[
    :, feather : fitted_w - feather
]

wide = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
wide = ImageEnhance.Contrast(wide).enhance(1.1)
wide = ImageEnhance.Brightness(wide).enhance(1.06)
wide.save(out, quality=95, optimize=True)
print("saved", out, wide.size, out.stat().st_size)
