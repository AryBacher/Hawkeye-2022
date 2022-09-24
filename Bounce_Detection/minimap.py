import cv2

def minimap(pts):
    # Se abre el minimapa
    minimap = cv2.imread("minimap.jpg")

    # Se dibujan los puntos de pique
    for pt in pts:
        if pt is None: continue
        minimap = cv2.circle(minimap, (pt[0] + 51, pt[1] + 25), 3, (0, 0, 255), -1)

    return minimap