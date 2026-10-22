#!/usr/bin/env python3"""HeyNuo banner generator — procedural abstract artwork (no AI credits)."""
from PIL import Image, ImageDraw, ImageFilter
import math, os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "banners")
W, H = 2752, 1536  # 2x supersample -> 1376x768

PALETTE = {
    "navy_top": (15, 23, 42),
    "navy_bottom": (30, 41, 59),
}

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def base_canvas():
    """Deep navy diagonal gradient with soft vignette."""
    img = Image.new("RGB", (W, H))
    px = img.load()
    top, bot = PALETTE["navy_top"], PALETTE["navy_bottom"]
    for y in range(H):
        for x in range(0, W, 4):
            t = (x / W * 0.35 + y / H * 0.65)
            c = lerp(top, bot, t)
            for dx in range(4):
                if x + dx < W:
                    px[x + dx, y] = c
    # vignette
    vig = Image.new("L", (W, H), 0)
    dv = ImageDraw.Draw(vig)
    dv.ellipse([-W * 0.25, -H * 0.35, W * 1.25, H * 1.35], fill=90)
    vig = vig.filter(ImageFilter.GaussianBlur(220))
    black = Image.new("RGB", (W, H), (2, 6, 23))
    img = Image.composite(black, img, vig.point(lambda v: 255 - v))
    return img

def glow_circle(img, cx, cy, r, color, alpha=110):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color + (alpha,))
    layer = layer.filter(ImageFilter.GaussianBlur(r * 0.55))
    img.alpha_composite(layer)

def light_streak(img, x0, y0, x1, y1, color, width=6, alpha=70):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.line([x0, y0, x1, y1], fill=color + (alpha,), width=width)
    layer = layer.filter(ImageFilter.GaussianBlur(width * 1.4))
    img.alpha_composite(layer)

def panel(img, x, y, w, h, radius, accent, fill_alpha=46, border_alpha=120):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle([x, y, x + w, y + h], radius=radius, fill=accent + (fill_alpha,))
    d.rounded_rectangle([x, y, x + w, y + h], radius=radius, outline=accent + (border_alpha,), width=3)
    img.alpha_composite(layer)

def dot_grid(img, x0, y0, cols, rows, gap, r, color, alpha=60):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for i in range(cols):
        for j in range(rows):
            cx, cy = x0 + i * gap, y0 + j * gap
            d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color + (alpha,))
    img.alpha_composite(layer)

def finish(img, name):
    img = img.convert("RGB").resize((1376, 768), Image.LANCZOS)
    img.save(os.path.join(OUT, name), quality=88, optimize=True)
    img.resize((800, 447), Image.LANCZOS).save(os.path.join(OUT, name.replace(".jpg", "-800.jpg")), quality=86, optimize=True)
    img.save(os.path.join(OUT, name.replace(".jpg", ".webp")), quality=80, method=6)
    img.resize((800, 447), Image.LANCZOS).save(os.path.join(OUT, name.replace(".jpg", "-800.webp")), quality=78, method=6)
    print("wrote", name)



# ---------- 2. about-og.jpg — warm indigo/amber books & code windows ----------
def about_og():
    img = base_canvas().convert("RGBA")
    glow_circle(img, W * 0.24, H * 0.30, 480, (245, 158, 11))
    glow_circle(img, W * 0.82, H * 0.78, 460, (99, 102, 241))
    light_streak(img, W * 0.05, H * 0.85, W * 0.95, H * 0.18, (252, 211, 77), 6, 40)
    # stacked "books" / slabs
    for i, (y, w) in enumerate([(0.66, 0.34), (0.54, 0.27), (0.42, 0.20)]):
        panel(img, W * (0.14 + i * 0.02), H * y, W * w, H * 0.085, 40,
              (245, 158, 11) if i == 0 else (129, 140, 248), 50, 110)
    # floating code window
    panel(img, W * 0.58, H * 0.18, W * 0.30, H * 0.30, 44, (129, 140, 248), 40, 130)
    panel(img, W * 0.60, H * 0.21, W * 0.10, H * 0.02, 20, (199, 210, 254), 90, 160)
    panel(img, W * 0.60, H * 0.25, W * 0.22, H * 0.018, 16, (199, 210, 254), 70, 140)
    panel(img, W * 0.60, H * 0.285, W * 0.17, H * 0.018, 16, (199, 210, 254), 55, 130)
    dot_grid(img, W * 0.86, H * 0.14, 5, 4, 60, 7, (252, 211, 77), 50)
    finish(img, "about-og.jpg")

# ---------- 3. contact-og.jpg — violet glass envelope + chat bubbles ----------
def contact_og():
    img = base_canvas().convert("RGBA")
    glow_circle(img, W * 0.70, H * 0.30, 470, (139, 92, 246))
    glow_circle(img, W * 0.20, H * 0.80, 430, (59, 130, 246))
    light_streak(img, W * 0.70, H * 0.30, W * 0.24, H * 0.72, (167, 139, 250), 6, 50)
    # envelope
    ex, ey, ew, eh = W * 0.30, H * 0.34, W * 0.34, H * 0.30
    panel(img, ex, ey, ew, eh, 48, (167, 139, 250), 44, 140)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.line([ex + 30, ey + 30, ex + ew / 2, ey + eh * 0.62], fill=(196, 181, 253, 170), width=5)
    d.line([ex + ew - 30, ey + 30, ex + ew / 2, ey + eh * 0.62], fill=(196, 181, 253, 170), width=5)
    img.alpha_composite(layer)
    # chat bubbles
    panel(img, W * 0.68, H * 0.52, W * 0.13, H * 0.10, 60, (96, 165, 250), 60, 150)
    panel(img, W * 0.76, H * 0.40, W * 0.09, H * 0.075, 55, (167, 139, 250), 60, 150)
    dot_grid(img, W * 0.12, H * 0.14, 6, 4, 62, 7, (167, 139, 250), 50)
    finish(img, "contact-og.jpg")

# ---------- 4. privacy-og.jpg — slate shield with lock ----------
def privacy_og():
    img = base_canvas().convert("RGBA")
    glow_circle(img, W * 0.50, H * 0.42, 500, (56, 189, 248))
    glow_circle(img, W * 0.85, H * 0.85, 380, (148, 163, 184))
    light_streak(img, W * 0.10, H * 0.80, W * 0.90, H * 0.22, (125, 211, 252), 6, 40)
    # shield (octagon-ish)
    cx, cy, r = W * 0.50, H * 0.46, 300
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    pts = [(cx - r * 0.72, cy - r), (cx + r * 0.72, cy - r), (cx + r, cy - r * 0.42),
           (cx + r, cy + r * 0.28), (cx, cy + r), (cx - r, cy + r * 0.28),
           (cx - r, cy - r * 0.42)]
    d.polygon(pts, fill=(56, 189, 248, 42), outline=(125, 211, 252, 150))
    d.line(pts + [pts[0]], fill=(125, 211, 252, 150), width=5)
    # lock body + shackle
    d.rounded_rectangle([cx - 95, cy - 30, cx + 95, cy + 150], radius=34, outline=(186, 230, 253, 190), width=8)
    d.arc([cx - 62, cy - 150, cx + 62, cy + 10], 180, 360, fill=(186, 230, 253, 190), width=9)
    img.alpha_composite(layer)
    dot_grid(img, W * 0.10, H * 0.66, 6, 4, 62, 7, (125, 211, 252), 46)
    dot_grid(img, W * 0.84, H * 0.16, 5, 4, 60, 7, (148, 163, 184), 46)
    finish(img, "privacy-og.jpg")

if __name__ == "__main__":
    about_og()
    contact_og()
    privacy_og()
    print("done")
