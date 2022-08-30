from collections import deque
from imutils.video import VideoStream
import numpy as np
import argparse
import cv2
import imutils
import time

center = None

def detectar_si_esta_lejos(lista, center):
	contornos = []
	print("la funcion corre")
	print(center)
	for pos in lista:
		if not (pos[0] > center[0] + 100).any() or not (pos[0] < center[0] - 100).any() or not (pos[1] > center[1] + 100).any() or not (pos[1] < center[1] - 100).any():
			print("entra al if")
			contornos.append([pos[0], pos[1]])
	return contornos

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
primeraVez = True

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

#se crean frames temporales para mayor eficencia de procesado


while True:
	# Agarra el frame actual
	frame = vs.read()
	frame = frame[1] if args.get("video", False) else frame

	# Verifica si termina el video
	if frame is None:
		break

	# resize the frame, blur it, and convert it to the HSV
	# color space
	#frame = imutils.resize(frame, width=600)

	# framePrueba = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
	# framePrueba2 = cv2.threshold(framePrueba, 100, 255, cv2.THRESH_BINARY)
	# framePrueba2 = framePrueba2[1]
	# contornos = cv2.findContours(framePrueba2.copy(), cv2.RETR_EXTERNAL,
	# 	cv2.CHAIN_APPROX_SIMPLE)

	# print(contornos)

	# img_contours = np.zeros(framePrueba2.shape, dtype=np.uint8)
	# cv2.drawContours(img_contours, contornos, -1, (0,255,0), 3)

	# cv2.imshow('Todos los Contornos', img_contours)
	
	# Cámara lenta para mayor análisis
	#cv2.waitKey(100)
	
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
	
	#contornos = []
	if center is not None:
		contornos = detectar_si_esta_lejos(cnts, center)
	
	#print(cnts)
	#print(type(contornos))
	
	#print(contornos)
	#cnts = tuple(cnts)
	center = None

	#print(cnts)
	
	###

	if len(cnts) > 0:
		# Busca el contorno más grande y encuentra su posición (x, y)
		if primeraVez:
			contornos = cnts

		#print(cnts)
		#print("v2") 
		#print(contornos)
		
		if contornos != [] or primeraVez:
			c = max(np.float32(contornos), key=cv2.contourArea)
			((x, y), radius) = cv2.minEnclosingCircle(c)
			#M = cv2.moments(c)
			#center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))
			print(center)
			print(contornos)
			center = (int(x), int(y))
			cv2.drawContours(frame, np.float32(contornos).astype(int), -1, (0, 0, 255), 3)
			# Sigue si el contorno tiene cierto tamaño
			if radius > 0:
				# Dibuja el círculo en la pelota
				cv2.circle(frame, (int(x), int(y)), int(radius), (0, 255, 255), 2)
				cv2.circle(frame, center, 5, (0, 0, 255), -1)

	###
 
	# Actualiza los puntos para trazar la trayectoria
	pts.appendleft(center)

	for i in range(1, len(pts)):
		# Ignora los puntos de trayectoria inexistentes
		if pts[i - 1] is None or pts[i] is None:
			continue

		# Traza la trayectoria
		thickness = int(np.sqrt(args["buffer"] / float(i + 1)) * 2.5)
		cv2.line(frame, pts[i - 1], pts[i], (0, 0, 255), thickness)

	# Muestra el frame
	cv2.imshow("V1", frame)

	primeraVez = False
	
	# Terminar la ejecución si se presiona la "q"
	key = cv2.waitKey(1) & 0xFF
	if key == ord("q"):
		break

if not args.get("video", False):
	vs.stop()

else:
	vs.release()

cv2.destroyAllWindows()