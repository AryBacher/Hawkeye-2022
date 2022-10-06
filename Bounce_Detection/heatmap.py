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
pts = [[10, 100], [20, 200], [110, 200], [150, 100], [80, 350], [140, 300], [120, 400], [50, 70], [35, 450]]
ptX = []
ptY = []

# Transforma los puntos en dos listas (X, Y)
for pt in pts:
    ptX.append(pt[0] + 51)

for pt in pts:
    ptY.append(524 - pt[1] + 25)

# Crea el heatmap
kde = sns.kdeplot(
    x = ptX, y = ptY,
    fill = True,
    alpha = .5,
    n_levels = 10,
    cmap = 'inferno',
    thresh = .3
)

#plt.scatter(ptX, ptY, s=10, color='red')

plt.xlim(0, 268); plt.ylim(0, 524)

# Guarda el heatmap
plt.savefig("heatmap.jpg",dpi = 1000, bbox_inches = 'tight', pad_inches = 0)