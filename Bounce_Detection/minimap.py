import cv2
import numpy as np

def minimap(pts):
    # Se abre el minimapa
    minimap = cv2.imread("minimap.jpg")

    # Se dibujan los puntos de pique
    for pt in pts:
        minimap = cv2.circle(minimap, pt, 3, (0, 0, 255), -1)

    while True:
        cv2.imshow("Minimapa", minimap)
        
        key = cv2.waitKey(1) & 0xFF
        if key == ord("q"):
            break