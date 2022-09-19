from collections import deque
from tkinter import Frame
from imutils.video import VideoStream
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

# Rango de deteccion de verdes
greenLower = np.array([29, 86, 110])
greenUpper = np.array([64, 255, 255])

#BGR_prueba = np.array([[[0,255,0]]], dtype=np.uint8)
#x = cv2.cvtColor(greenUpper, cv2.COLOR_HSV2BGR)
#print(x)

pts = deque(maxlen=args["buffer"])
centros = deque(maxlen=60)


#kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5))  #ellipse kernel

# Toma la cámara si no recibe video
if not args.get("video", False):
	vs = VideoStream(src=0).start()

# Toma video en caso de haber
else:
	vs = cv2.VideoCapture(args["video"])
	
	#fps del video
	fps = int(vs.get(cv2.CAP_PROP_FPS))
	print(fps)

time.sleep(2.0)

n = 3
count = 0

while True:
    frame = vs.read()
    frame = frame[1] if args.get("video", False) else frame

    if frame is None:
        break

    anchoOG = frame.shape[1]
    altoOG = frame.shape[0]

    frame = imutils.resize(frame, height= 1216, width= 2160)

    #frame = imutils.resize(frame, frame.shape[1] * n, frame.shape[0] * n)

    blurred = cv2.GaussianBlur(frame, (11, 11), 0)
    hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)

    mask = cv2.inRange(hsv, greenLower, greenUpper)
    mask = cv2.erode(mask, None, iterations=2)
    mask = cv2.dilate(mask, None, iterations=2)
    
    cv2.imshow("mask3", mask)

	# Toma todos los contornos de la imagen
    cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL,
		cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
	#print(cnts)
    center = None

    cerca = True
    cercaX = False
    cercaY = False

    estaCercaX = anchoOG * 15/100
    estaCercaY = altoOG * 15/100
    estaCercaX = 100
    estaCercaY = 100
    #print(estaCercaX)
    #print(estaCercaY)

    def cercaOlejos():
        print("hola")

    if (len(centros) >= 2):
        if (centros[0][0] - centros[1][0] <= estaCercaX and centros[0][0] - centros[1][0] >= 0 or centros[1][0] - centros[0][0] <= estaCercaX and centros[1][0] - centros[0][0] >= 0):
            cercaX = True
        if (centros[0][1] - centros[1][1] <= estaCercaY and centros[0][1] - centros[1][1] >= 0 or centros[1][1] - centros[0][1] <= estaCercaY and centros[1][1] - centros[0][1] >= 0):
            cercaY = True

    if (cercaX == False and cercaY == False and count <= 0.5):
        cerca = False
    
    if (cerca == False):
        print("Está Lejos")
        frame = cv2.putText(frame, 'Lejos', center, cv2.FONT_HERSHEY_COMPLEX, 3, (0, 0, 255), 0, 2)

    #if (len(centros) >= 2):
        #print(centros[0][0] - centros[1][0])
        #print(centros[1][0] - centros[0][0])
        #print(centros[0][1] - centros[1][1])
        #print(centros[1][1] - centros[0][1])

    #if (len(centros) >= 2) and count <= 1:
        #print(centros[0])
        #print(centros[0][0])
        #print(centros[1])
    
    if len(cnts) > 0:
		# Busca el contorno más grande y encuentra su posición (x, y)
        c = max(cnts, key=cv2.contourArea)
        ((x, y), radius) = cv2.minEnclosingCircle(c)
        M = cv2.moments(c)
        center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))

        centros.appendleft(center)

		# Sigue si el contorno tiene cierto tamaño
        if radius > 0:
			# Dibuja el círculo en la pelota
            cv2.circle(frame, (int(x), int(y)), int(radius), (0, 255, 255), 2)
            cv2.circle(frame, center, 5, (0, 0, 255), -1)

        count = 0
    
    else:
        count += 1/fps
 
	# Actualiza los puntos para trazar la trayectoria
    pts.appendleft(center)
    
    for i in range(1, len(pts)):
		# Ignora los puntos de trayectoria inexistentes
        if pts[i - 1] is None or pts[i] is None:
            continue

		# Traza la trayectoria
        thickness = int(np.sqrt(args["buffer"] / float(i + 1)) * 2.5)
        cv2.line(frame, pts[i - 1], pts[i], (0, 0, 255), thickness)
    
    #print(center)

    #frame = frame[1]
    frame = imutils.resize(frame, anchoOG, altoOG)

	# Muestra el frame
    cv2.imshow("V1", frame)
	
	# Terminar la ejecución si se presiona la "q"
    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):
        break

    break

if not args.get("video", False):
	vs.stop()

else:
	vs.release()

cv2.destroyAllWindows()