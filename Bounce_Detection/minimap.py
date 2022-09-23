import cv2
import numpy as np

#def minimap(pts):
    # Se crea el minimapa
minimap = np.zeros((524, 268, 3), np.uint8)

# Se dibujan las lineas de la cancha
minimap = cv2.line(minimap, (25, 25), (243, 25), (255, 255, 255), 2)
minimap = cv2.line(minimap, (25, 25), (25, 499), (255, 255, 255), 2)
minimap = cv2.line(minimap, (25, 499), (243, 499), (255, 255, 255), 2)
minimap = cv2.line(minimap, (243, 25), (243, 499), (255, 255, 255), 2)
minimap = cv2.line(minimap, (25, 262), (243, 262), (255, 255, 255), 2)

#for pt in pts:
#    minimap = cv2.circle(minimap, pt, 1, (0, 0, 255), 1)
while True:
    cv2.imshow("Minimapa", minimap)
    
    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):
        break