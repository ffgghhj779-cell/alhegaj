"""Rebuild hero lattice: remove logo, lift visibility to match brand plate."""
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

src_path = Path(r"C:\Users\lenovo\Desktop\alhejaz\alhijaz42\JPG\pic (4).jpg")
out_path = Path(r"C:\Users\lenovo\Desktop\alhejaz\public\brand\hero-lattice-clean.jpg")

img = Image.open(src_path).convert("RGB")
# Keep high res for wide hero pan
max_side = 3200
if max(img.size) > max_side:
    ratio = max_side / max(img.size)
    img = img.resize(
        (int(img.width * ratio), int(img.height * ratio)),
        Image.Resampling.LANCZOS,
    )

arr = np.asarray(img).copy()
h, w = arr.shape[:2]
print("working", w, h)

# Logo sits in center — mask gold + light text only
x0, x1 = int(w * 0.28), int(w * 0.72)
y0, y1 = int(h * 0.12), int(h * 0.78)

r = arr[:, :, 0].astype(np.int16)
g = arr[:, :, 1].astype(np.int16)
b = arr[:, :, 2].astype(np.int16)
lum = 0.299 * r + 0.587 * g + 0.114 * b

mask = np.zeros((h, w), dtype=bool)
rr, gg, bb = r[y0:y1, x0:x1], g[y0:y1, x0:x1], b[y0:y1, x0:x1]
ll = lum[y0:y1, x0:x1]
is_gold = (rr > 100) & (gg > 75) & (bb < 155) & ((rr + gg) > (bb * 1.75))
is_light = ll > 115
is_logoish = is_gold | is_light | ((ll > 80) & ((rr + gg) > (bb * 1.55)) & (rr > 85))
mask[y0:y1, x0:x1] = is_logoish

mask_img = Image.fromarray((mask.astype(np.uint8) * 255))
mask_img = mask_img.filter(ImageFilter.MaxFilter(15))
mask = np.asarray(mask_img) > 0
print("mask", int(mask.sum()))

mask_u8 = mask.astype(np.uint8) * 255
inpainted = cv2.inpaint(arr, mask_u8, 8, cv2.INPAINT_TELEA)

out = Image.fromarray(inpainted.astype(np.uint8))
# Match original plate visibility — lift shadows/midtones carefully
out = ImageEnhance.Brightness(out).enhance(1.18)
out = ImageEnhance.Contrast(out).enhance(1.22)
out = ImageEnhance.Color(out).enhance(0.92)

# Slight wide crop framing so structure reads as architecture, not macro detail
# (keep full frame — no crop; framing handled in CSS)

out.save(out_path, quality=95, optimize=True)
print("saved", out_path, out_path.stat().st_size)
