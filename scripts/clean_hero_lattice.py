from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

src_path = Path(r"C:\Users\lenovo\Desktop\alhejaz\alhijaz42\JPG\pic (4).jpg")
out_path = Path(r"C:\Users\lenovo\Desktop\alhejaz\public\brand\hero-lattice.jpg")
preview_path = Path(r"C:\Users\lenovo\Desktop\alhejaz\public\brand\_preview-hero-clean.jpg")

img = Image.open(src_path).convert("RGB")
max_side = 2400
if max(img.size) > max_side:
    ratio = max_side / max(img.size)
    img = img.resize(
        (int(img.width * ratio), int(img.height * ratio)),
        Image.Resampling.LANCZOS,
    )

arr = np.asarray(img).copy()
h, w = arr.shape[:2]
print("working size", w, h)

x0, x1 = int(w * 0.26), int(w * 0.74)
y0, y1 = int(h * 0.10), int(h * 0.82)

r = arr[:, :, 0].astype(np.int16)
g = arr[:, :, 1].astype(np.int16)
b = arr[:, :, 2].astype(np.int16)
lum = 0.299 * r + 0.587 * g + 0.114 * b

mask = np.zeros((h, w), dtype=bool)
rr, gg, bb = r[y0:y1, x0:x1], g[y0:y1, x0:x1], b[y0:y1, x0:x1]
ll = lum[y0:y1, x0:x1]
is_gold = (rr > 95) & (gg > 70) & (bb < 150) & ((rr + gg) > (bb * 1.7))
is_light = ll > 105
is_logoish = is_gold | is_light | ((ll > 75) & ((rr + gg) > (bb * 1.5)) & (rr > 80))
mask[y0:y1, x0:x1] = is_logoish

mask_img = Image.fromarray((mask.astype(np.uint8) * 255))
mask_img = mask_img.filter(ImageFilter.MaxFilter(13))
mask = np.asarray(mask_img) > 0
print("mask pixels", int(mask.sum()))

try:
    import cv2

    mask_u8 = mask.astype(np.uint8) * 255
    inpainted = cv2.inpaint(arr, mask_u8, 7, cv2.INPAINT_TELEA)
    print("opencv inpaint done")
except Exception as e:
    print("opencv missing, using palette fill", e)
    inpainted = arr.copy()
    ring = np.zeros((h, w), dtype=bool)
    ring[int(h * 0.04) : int(h * 0.96), int(w * 0.04) : int(w * 0.96)] = True
    ring[y0:y1, x0:x1] = False
    palette = arr[ring & (lum < 95)]
    if len(palette) < 200:
        palette = arr[ring]
    ys, xs = np.where(mask)
    idx = np.random.randint(0, len(palette), size=len(ys))
    inpainted[ys, xs] = palette[idx]
    for _ in range(10):
        blur = np.asarray(
            Image.fromarray(inpainted).filter(ImageFilter.GaussianBlur(radius=4))
        )
        inpainted[mask] = blur[mask]

out = Image.fromarray(inpainted.astype(np.uint8))
out.save(out_path, quality=94, optimize=True)
print("saved", out_path, out_path.stat().st_size)

preview = out.resize((900, 900), Image.Resampling.LANCZOS)
preview.save(preview_path, quality=85)
print("preview saved")
