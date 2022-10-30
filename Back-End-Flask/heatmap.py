from turtle import color
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import cv2

def heatmap(pts):
    # Abre la cancha para dibujar el heatmap
    cancha = cv2.imread('minimap.jpg')
    plt.imshow(cancha)
    plt.axis('off')

    print(pts)

    # Divide los puntos de pique en X e Y
    ptX = []
    ptY = []

    # Transforma los puntos en dos listas (X, Y)
    for pt in pts:
        ptX.append(int(pt[0] / 15 + 51))

    for pt in pts:
        ptY.append(int(499 - pt[1] / 15))

    # Crea el heatmap
    sns.kdeplot(
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

    plt.clf()
    plt.close()