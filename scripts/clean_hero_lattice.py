"""High-quality logo removal from original brand plate — keep natural dome look."""
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageFilter

src_path = Path(r"C:\Users\lenovo\Desktop\alhejaz\alhijaz42\JPG\pic (4).jpg")
out_path = Path(r"C:\Users\lenovo\Desktop\alhejaz\public\brand\hero-dome.jpg")

img = Image.open(src_path).convert("RGB")
# Keep high resolution for crisp dome structure
max_side = 3600
if max(img.size) > max_side:
    ratio = max_side / max(img.size)
    img = img.resize(
        (int(img.width * ratio), int(img.height * ratio)),
        Image.Resampling.LANCZOS,
    )

arr = np.asarray(img).copy()
h, w = arr.shape[:2]
print("working", w, h)

x0, x1 = int(w * 0.27), int(w * 0.73)
y0, y1 = int(h * 0.11), int(h * 0.80)

r = arr[:, :, 0].astype(np.int16)
g = arr[:, :, 1].astype(np.int16)
b = arr[:, :, 2].astype(np.int16)
lum = 0.299 * r + 0.587 * g + 0.114 * b

mask = np.zeros((h, w), dtype=bool)
rr, gg, bb = r[y0:y1, x0:x1], g[y0:y1, x0:x1], b[y0:y1, x0:x1]
ll = lum[y0:y1, x0:x1]
is_gold = (rr > 100) & (gg > 75) & (bb < 155) & ((rr + gg) > (bb * 1.75))
is_light = ll > 118
is_logoish = is_gold | is_light | ((ll > 82) & ((rr + gg) > (bb * 1.55)) & (rr > 88))
mask[y0:y1, x0:x1] = is_logoish

mask_img = Image.fromarray((mask.astype(np.uint8) * 255)).filter(
    ImageFilter.MaxFilter(17)
)
mask = np.asarray(mask_img) > 0
print("mask", int(mask.sum()))

inpainted = cv2.inpaint(arr, mask.astype(np.uint8) * 255, 9, cv2.INPAINT_TELEA)
# Second pass with NS for smoother architecture fill
inpainted = cv2.inpaint(inpainted, mask.astype(np.uint8) * 255, 5, cv2.INPAINT_NS)

out = Image.fromarray(inpainted.astype(np.uint8))
out.save(out_path, quality=96, optimize=True)
print("saved", out_path, out.size, out_path.stat().st_size)
