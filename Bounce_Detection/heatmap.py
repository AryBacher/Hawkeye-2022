from turtle import color
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import cv2

# Abre la cancha para dibujar el heatmap
cancha = cv2.imread('minimap.jpg')
plt.imshow(cancha)
plt.axis('off')

# Recibe los puntos de pique
#pts = [[10, 100], [20, 200], [110, 200], [150, 100], [80, 350], [140, 300], [120, 400], [50, 70], [35, 450]]
pts = [(110, 211), (78, 411), (80, 399), (58, 382), (18, 429), (14, 413), (47, 390), (5, 169), (14, 94), (22, 35), (57, 87), (6, 236), (9, 180), (27, 29), (130, 352), (158, 451), (111, 321), (116, 360), (157, 267), (154, 225), (152, 179), (152, 179), (135, 151), (130, 430), (152, 387), (82, 66), (87, 420), (31, 222), (27, 370), (67, 43), (64, 103), (59, 145), (18, 396), (22, 349), (66, 38), (60, 101), (49, 193), (30, 411), (157, 410), (129, 316), (113, 461), (90, 14), (48, 374), (18, 422), (14, 379), (6, 286), (6, 286), (4, 243), (57, 405), (57, 405), (58, 406), (59, 408), (89, 111), (111, 379), (139, 402), (118, 417), (84, 38), (84, 38), (86, 82), (103, 362)]
ptX = []
ptY = []

# Transforma los puntos en dos listas (X, Y)
for pt in pts:
    ptX.append(pt[0] + 51)

for pt in pts:
    ptY.append(499 - pt[1])

# Crea el heatmap
kde = sns.kdeplot(
    x = ptX, y = ptY,
    fill = True,
    alpha = .5,
    n_levels = 15,
    cmap = 'inferno',
    thresh = .3
)

#plt.scatter(ptX, ptY, s=10, color='red')

plt.xlim(0, 268); plt.ylim(0, 524)

# Guarda el heatmap
plt.savefig("heatmap.jpg",dpi = 1000, bbox_inches = 'tight', pad_inches = 0)