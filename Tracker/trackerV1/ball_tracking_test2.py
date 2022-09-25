from collections import deque
from cv2 import minEnclosingCircle
from imutils.video import VideoStream
import numpy as np
import argparse
import cv2
import imutils
import time
import sys

sys.path.append('../../')

# Se importa la función de trackeo de la pelota y del minimapa
from Tracker.trackerV1.ball_tracking_fn import ball_tracking
from Bounce_Detection.minimap import minimap

resizer = 1

def tp_fix(contornos, pre_centro):
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

pts = deque(maxlen=args["buffer"])
preCentro = None
primeraVez = True

topLeftX = 749
topLeftY = 253
topRightX = 1095
topRightY = 252
bottomLeftX = 206
bottomLeftY = 797
bottomRightX = 1518
bottomRightY = 785

count = 0
pique = deque(maxlen=60)
pique2 = deque(maxlen=60)

pts_pers = deque(maxlen=args["buffer"])
pts_pique = []
center_pers = None

minimapa = minimap(pts_pique)

# Toma la cámara si no recibe video
if not args.get("video", False):
	vs = cv2.VideoCapture(0)

# Toma video en caso de haber
else:
	vs = cv2.VideoCapture(args["video"])	

# Fps del video
fps = int(vs.get(cv2.CAP_PROP_FPS))
print(fps)

time.sleep(2.0)

while True:
	# Agarra el frame actual
	frame = vs.read()
	frame = frame[1] if args.get("video", False) else frame

	# Verifica si termina el video
	if frame is None:
		break

	medidas_resize = [164, 474]
	n = 1
	pts1 = np.float32([[topLeftX, topLeftY],       [topRightX, topRightY],
					   [bottomLeftX, bottomLeftY], [bottomRightX, bottomRightY]])
	pts2 = np.float32([[0, 0], [medidas_resize[0] * n, 0], [0, medidas_resize[1] * n],
					   [medidas_resize[0] * n, medidas_resize[1] * n]])

	matrix = cv2.getPerspectiveTransform(pts1, pts2)
	result = cv2.warpPerspective(frame, matrix, (medidas_resize[0] * n, medidas_resize[1] * n))

	pre_center_pers = center_pers
	center_pers = ball_tracking(result, "pers")[0]
	pts_pers.appendleft(center_pers)

	anchoOG = frame.shape[1]
	altoOG = frame.shape[0]

	estaCercaX = anchoOG * 15/100
	estaCercaY = altoOG * 15/100

	frame = imutils.resize(frame, anchoOG * resizer, altoOG * resizer)

	pts1 = np.float32([[topLeftX, topLeftY],       [topRightX, topRightY],
                    [bottomLeftX, bottomLeftY], [bottomRightX, bottomRightY]])
	pts2 = np.float32([[0, 0], [164, 0], [0, 474], [164, 474]])
	
	matrix = cv2.getPerspectiveTransform(pts1, pts2)
	result = cv2.warpPerspective(frame, matrix, (164, 474))

	# Cámara lenta para mayor análisis
	#cv2.waitKey(100)
	
	# Verde crudo
	hsv_prueba = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
	cv2.imshow('prueba', hsv_prueba)
	mask_prueba = cv2.inRange(hsv_prueba, greenLower, greenUpper) 
	cv2.imshow('mask1', mask_prueba)

	blurred = cv2.GaussianBlur(frame, (11, 11), 0)
	#blurred = cv2.dilate(frame, None, iterations=2)
	hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)

	# Filtra los tonos verdes de la imagen
	mask = cv2.inRange(hsv, greenLower, greenUpper)
	cv2.imshow("mask2", mask)
	mask = cv2.erode(mask, None, iterations=2)
	mask = cv2.dilate(mask, None, iterations=2)
	#mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)   #morphology close operation for remove small noise point
	cv2.imshow("mask3", mask)

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
			preCentro = center
			count = 0

		else:			
			c = tp_fix(cnts, preCentro)

			if c is not None:
				((x, y), radius) = cv2.minEnclosingCircle(c)
				M = cv2.moments(c)
				center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))
				preCentro = center
				count = 0
			
			else:
				print("COUNT", count)
				if count >= 0.3:
					primeraVez = True
					preCentro = None
				count += 1/fps
				
		# Sigue si el contorno tiene cierto tamaño
		if radius > 0:
			# Dibuja el círculo en la pelota
			cv2.circle(frame, (int(x), int(y)), int(radius), (0, 255, 255), 2)
			cv2.circle(frame, center, 5, (0, 0, 255), -1)

	else:
		print("COUNT", count)
		if count >= 0.3:
			primeraVez = True
			preCentro = None
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
			print("Pica")
			frame = cv2.putText(frame, 'Pica', preCentro, cv2.FONT_HERSHEY_COMPLEX, 3, (0, 0, 255), 0, 2)
			if pre_center_pers is not None: 
				pts_pique.append(pre_center_pers)
				minimapa = minimap(pts_pique)

	frame = imutils.resize(frame, anchoOG, altoOG)
	#frame = imutils.resize(frame, height=768)

	# Resizea la imagen final para que pueda ser visualizada
	result_resized = imutils.resize(result, width = 164, height = 474)

	# Muestra el frame
	cv2.imshow("V1", frame)

	cv2.imshow("Perspective Transformation Resized", result_resized)

	# Se muestra el minimapa
	cv2.imshow("Minimapa", minimapa)
	
	# Terminar la ejecución si se presiona la "q"
	key = cv2.waitKey(1) & 0xFF
	if key == ord("q"):
		break
		

if not args.get("video", False):
	vs.stop()

else:
	vs.release()

cv2.destroyAllWindows()