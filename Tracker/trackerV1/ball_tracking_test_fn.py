from collections import deque
from cv2 import minEnclosingCircle
import numpy as np
import argparse
import cv2
import imutils
import time

# Argumentos del programa
ap = argparse.ArgumentParser()
ap.add_argument("-v", "--video",
	help="path to the (optional) video file")
ap.add_argument("-b", "--buffer", type=int, default=64,
	help="max buffer size")
args = vars(ap.parse_args())

#center = None
resizer = 1

def tp_fix(contornos, pre_centro, count):
    cnts_pts = []
    for contorno in contornos:
        ((x, y), radius) = cv2.minEnclosingCircle(contorno)
        if x - pre_centro[0] > 100 * resizer or pre_centro[0] - x > 100 * resizer or y - pre_centro[1] > 100 * resizer or pre_centro[1] - y > 100 * resizer and count <= 0.5:
            continue
        cnts_pts.append(contorno)
    if cnts_pts != []:
        return cualEstaMasCerca(pre_centro, cnts_pts)
    else: print("No se encontró la pelota")

def cualEstaMasCerca(punto, lista):
    suma = []
    suma2 = []
    for i in lista:
        (xCenter, yCenter), radius = cv2.minEnclosingCircle(i)
        x = int(xCenter) - int(punto[0]) 
        y = int(yCenter) - int(punto[1])
        
        if x < 0:
            x *= -1
        
        if y < 0:
            y *= -1 
        
        suma.append(x + y)
        suma2.append(i)
    return suma2[suma.index(min(suma))]

def pica (centro1, centro2, centro3):
    gerardPique = True
    a = centro1 - centro2
    b = centro2 - centro3
    if a <= 0 and b >= 0 or a >= 0 and b <= 0:
        gerardPique = False
    return gerardPique

def todo(frame, esResult, cnts, center, primeraVez, preCentro, count, count2, pique3, bajando, pique, pique2, pts, count_list):
    global radius
    global x
    global y

    anchoOG = frame.shape[1]
    altoOG = frame.shape[0]
    
    estaCercaX = anchoOG * 15/100
    estaCercaY = altoOG * 15/100

    frame = imutils.resize(frame, anchoOG * resizer, altoOG * resizer)
    
    # Cámara lenta para mayor análisis
    #cv2.waitKey(100)
    
    blurred = cv2.GaussianBlur(frame, (11, 11), 0)
    #blurred = cv2.dilate(frame, None, iterations=2)
    hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)
    
    # Filtra los tonos verdes de la imagen
    mask = cv2.inRange(hsv, greenLower, greenUpper)
    #cv2.imshow("mask2", mask)
    mask = cv2.erode(mask, None, iterations=2)
    mask = cv2.dilate(mask, None, iterations=2)
    #mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)   #morphology close operation for remove small noise point
    #cv2.imshow("mask3", mask)
    
    # Toma todos los contornos de la imagen
    cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    
    center = None
    
    if len(cnts) > 0:
        # Busca el contorno más grande y encuentra su posición (x, y)
        
        if primeraVez:
            c = max(cnts, key=cv2.contourArea)
            ((x, y), radius) = cv2.minEnclosingCircle(c)
            M = cv2.moments(c)
            center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))
            primeraVez = False
            if esResult == False:
                preCentro_glob[1] = center
            else:
                preCentro_glob[0] = center
            count = 0
            count2 = 0
            pique3.appendleft(center[1])
        
        else:			
            c = tp_fix(cnts, preCentro, count)
            
            if c is not None:
                ((x, y), radius) = cv2.minEnclosingCircle(c)
                M = cv2.moments(c)
                center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))
                preCentro = center
                count2 += count
                count = 0
                pique3.appendleft(center[1])
                if len(pique3) == 3 and count2 <= 0.1:
                    pica(pique3[2], pique3[1], pique3[0])
                    count2 = 0				
            
            else:
                if count_list >= 0.3:
                    primeraVez = True
                    preCentro = None
                count += 1/fps
                count2 = 0
            
        # Sigue si el contorno tiene cierto tamaño
        if radius > 0:
            # Dibuja el círculo en la pelota
            cv2.circle(frame, (int(x), int(y)), int(radius), (0, 255, 255), 2)
            cv2.circle(frame, center, 5, (0, 0, 255), -1)
    
    else:
        if count_list >= 0.3:
            primeraVez = True
            preCentro = None
        count += 1/fps
        count2 = 0
    

    # La variable count es asignada
    if esResult == False: 
        if count != 0:
            count_glob2[0] += count
        else:
            count_glob2[0] = count
    else:
        if count != 0:
            count_glob2[1] += count
        else:
            count_glob2[1] = count
    
    # Actualiza los puntos para trazar la trayectoria
    pts.appendleft(center)
    
    for i in range(1, len(pts)):
        # Ignora los puntos de trayectoria inexistentes
        if pts[i - 1] is None or pts[i] is None:
            continue
        
        # Traza la trayectoria
        thickness = int(np.sqrt(args["buffer"] / float(i + 1)) * 2.5)
        cv2.line(frame, pts[i - 1], pts[i], (0, 0, 255), thickness)
    
    bajando = False
    
    if (center is not None):
        print(center[1])
        pique.appendleft(center[1])
        
        if (len(pique) >= 2):
            if (pique[0] - pique[1] > 0):
                bajando = True
        pique2.appendleft(bajando)
        print(bajando)
    
    if (len(pique2) >= 2):
        if pique2[0] == False and pique2[1] == True:
            print("Gerard")
            frame = cv2.putText(frame, 'Gerard', preCentro, cv2.FONT_HERSHEY_COMPLEX, 3, (0, 0, 255), 0, 2)
    
    frame = imutils.resize(frame, anchoOG, altoOG)
    #frame = imutils.resize(frame, height=768)
    
    # Muestra el frame
    if esResult == False:
        cv2.imshow("Normal", frame)
    else: 
        cv2.imshow("Perspective", frame)

# Toma la cámara si no recibe video
if not args.get("video", False):
    vs = cv2.VideoCapture(0)

    # Toma video en caso de haber
else:
    vs = cv2.VideoCapture(args["video"])

# Rango de deteccion de verdes
greenLower = np.array([29, 86, 110])
greenUpper = np.array([64, 255, 255])

topLeftX = 749
topLeftY = 253
topRightX = 1095
topRightY = 252
bottomLeftX = 206
bottomLeftY = 797
bottomRightX = 1518
bottomRightY = 785

pts_norm = deque(maxlen=args["buffer"])
pts_pers = deque(maxlen=args["buffer"])

preCentro_glob = deque(maxlen=2)
preCentro_glob.append(None)
preCentro_glob.append(None)

primeraVez_norm = True
primeraVez_pers = True

cnts_norm = None
cnts_pers = None

center_norm = None
center_pers = None

bajando_norm = False
bajando_pers = False

#kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5))  #ellipse kernel

# Fps del video
fps = int(vs.get(cv2.CAP_PROP_FPS))
print(fps)

time.sleep(2.0)

# Puntos de esquinas Alcaraz vs Fucsovics: 366, 196, 608, 198, 78, 378, 724, 398
# Puntos de esquinas TennisBrothers: 311, 106, 456, 105, 89, 331, 628, 326
# Puntos de esquinas TennisBrothers 1080: 749, 253, 1095, 252, 206, 797, 1518, 785

count_glob = 0
count_glob2 = deque(maxlen=2)
count_glob2.append(count_glob)
count_glob2.append(count_glob)

#count_pers = 0
#count_pers2 = deque(maxlen=1)
#count_pers2.appendleft(count_norm)

count2_norm = 0
count2_pers = 0

pique_norm = deque(maxlen=60)
pique_pers = deque(maxlen=60)

pique2_norm = deque(maxlen=60)
pique2_pers = deque(maxlen=60)

pique3_norm = deque(maxlen=3)
pique3_pers = deque(maxlen=3)

while True:
    frame = vs.read()
    frame = frame[1] if args.get("video", False) else frame

    if frame is None:
        break

    pts1 = np.float32([[topLeftX, topLeftY],       [topRightX, topRightY],
                         [bottomLeftX, bottomLeftY], [bottomRightX, bottomRightY]])
    pts2 = np.float32([[0, 0], [164, 0], [0, 474], [164, 474]])

    matrix = cv2.getPerspectiveTransform(pts1, pts2)
    result = cv2.warpPerspective(frame, matrix, (164, 474))

    esResult = False
    todo(frame, esResult, cnts_norm, center_norm, primeraVez_norm, preCentro_glob[0], count_glob, count2_norm, pique3_norm, bajando_norm, pique3_norm, pique2_norm, pts_norm, count_glob2[0])
    esResult = True
    todo(result, esResult, cnts_pers, center_pers, primeraVez_pers, preCentro_glob[1], count_glob, count2_pers, pique3_pers, bajando_pers, pique3_pers, pique2_pers, pts_pers, count_glob2[1])

    # Terminar la ejecución si se presiona la "q"
    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):
        break

if not args.get("video", False):
    vs.stop()

else:
    vs.release()

cv2.destroyAllWindows()