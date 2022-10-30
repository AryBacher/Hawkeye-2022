from turtle import color
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import cv2
from base64 import b64encode

# Abre la cancha para dibujar el heatmap
cancha = cv2.imread('minimap.jpg')
plt.imshow(cancha)
plt.axis('off')

# Recibe los puntos de pique
#pts = [[10, 100], [20, 200], [110, 200], [150, 100], [80, 350], [140, 300], [120, 400], [50, 70], [35, 450]]
#pts = [(110, 211), (78, 411), (80, 399), (58, 382), (18, 429), (14, 413), (47, 390), (5, 169), (14, 94), (22, 35), (57, 87), (6, 236), (9, 180), (27, 29), (130, 352), (158, 451), (111, 321), (116, 360), (157, 267), (154, 225), (152, 179), (152, 179), (135, 151), (130, 430), (152, 387), (82, 66), (87, 420), (31, 222), (27, 370), (67, 43), (64, 103), (59, 145), (18, 396), (22, 349), (66, 38), (60, 101), (49, 193), (30, 411), (157, 410), (129, 316), (113, 461), (90, 14), (48, 374), (18, 422), (14, 379), (6, 286), (6, 286), (4, 243), (57, 405), (57, 405), (58, 406), (59, 408), (89, 111), (111, 379), (139, 402), (118, 417), (84, 38), (84, 38), (86, 82), (103, 362)]
#pts = [[[1501, 2915], 1.4], [[937, 2991], 2.77], [[1115, 5361], 3.03], [[1200, 5990], 3.43], [[814, 5683], 5.7], [[318, 5784], 6.2], [[108, 6114], 9.07], [[635, 5787], 12.53], [[635, 5787], 12.57], [[463, 6707], 17.97], [[1828, 6992], 23.6], [[1810, 5364], 29.27], [[1991, 6432], 32.07], [[2287, 6502], 32.4], [[895, 6292], 35.0], [[331, 5490], 37.47], [[366, 6156], 43.2], [[2354, 5850], 45.97], [[2446, 6124], 46.03], [[2022, 4625], 48.73], [[2022, 4625], 48.77], [[1702, 6779], 51.4], [[673, 5577], 54.93], [[673, 5577], 54.97], [[209, 5695], 55.47], [[861, 6080], 56.37], [[936, 6107], 56.63], [[1708, 5658], 57.7], [[2062, 5600], 58.07], [[1579, 5368], 60.33], [[1579, 5368], 60.37]]
pts = [[1115, 5361], [814, 5683], [318, 5784], [108, 6114], [635, 5787], [463, 6707], [1828, 6992], [1810, 5364], [1991, 6432], [2287, 6502], [331, 5490], [366, 6156], [2354, 5850], [2446, 6124], [2022, 4625], [1702, 6779], [673, 5577], [209, 5695], [861, 6080], [2062, 5600]]
pts2 = []
ptX = []
ptY = []

#for pt in pts:
#    pts2.append((int(pt[0][0] / 15), int(pt[0][1] / 15)))

# Transforma los puntos en dos listas (X, Y)
for pt in pts:
    ptX.append(int(pt[0] / 15 + 51))

for pt in pts:
    ptY.append(int(499 - pt[1] / 15))

print("ptx", ptX)
print("pty", ptY)

# Crea el heatmap
kde = sns.kdeplot(
    x = ptX, y = ptY,
    fill = True,
    alpha = .5,
    n_levels = 15,
    cmap = 'inferno',
    thresh = .3
)

plt.scatter(ptX, ptY, s=10, color='red')

plt.xlim(0, 268); plt.ylim(0, 524)

# Guarda el heatmap
plt.savefig("heatmap.jpg", dpi = 1000, bbox_inches = 'tight', pad_inches = 0)

foto = cv2.imread("heatmap.jpg")
foto = cv2.line(foto, (0, 0), (foto.shape[1], 0), (0, 0, 0), 5)
foto = cv2.line(foto, (foto.shape[1], 0), (foto.shape[1], foto.shape[0]), (0, 0, 0), 5)
cv2.imwrite("heatmap.jpg", foto)

plt.clf()
plt.close()